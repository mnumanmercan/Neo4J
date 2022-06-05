var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver');

var app = express();

//Viev Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', '123456'))

app.get('/', (req, res) => {
    res.render('login')
})

//---------------------------------GETS----------------------------
//--------------ADMIN LOGIN
app.get('/adminLogin', (req, res) => {
    var session = driver.session();
    session
        .run('MATCH(a:Arastirmaci) RETURN a LIMIT 25')
        .then(result => {
            var personArr = [];
            result.records.forEach(record => {
                personArr.push({
                    id: record._fields[0].identity.low,
                    name: record._fields[0].properties.name,
                    sname: record._fields[0].properties.sname,
                    YayinId: record._fields[0].properties.YayinId
                })
                //console.log(record._fields[0].properties);
            })

            session
                .run('MATCH(y:Yayinlar) RETURN y LIMIT 25')
                .then(result2 => {
                    var yayinArr = [];
                    result2.records.forEach(record => {
                        yayinArr.push({
                            id: record._fields[0].identity.low,
                            yName: record._fields[0].properties.yName,
                            yil: record._fields[0].properties.yil,
                            typeId: record._fields[0].properties.typeId
                        })
                    })
                    res.render('adminLogin', {
                        persons: personArr,
                        yayinlar: yayinArr
                    })
                    console.log(yayinArr);
                })
                .catch(err => {
                    console.log(err);
                })
            

        })
        .catch(err => {
            console.log(err);
        })

})
//------------------USER LOGIN
app.get('/userLogin', (req, res) => {
    var session6 = driver.session();
    session6
    .run('MATCH(a:Arastirmaci) RETURN a LIMIT 25')
    .then(result => {
        var personArr = [];
        result.records.forEach(record => {
            personArr.push({
                id: record._fields[0].identity.low,
                name: record._fields[0].properties.name,
                sname: record._fields[0].properties.sname,
                YayinId: record._fields[0].properties.YayinId
            })
            //console.log(record._fields[0].properties);
        })

        session6
            .run('MATCH(y:Yayinlar) RETURN y LIMIT 25')
            .then(result2 => {
                var yayinArr = [];
                result2.records.forEach(record => {
                    yayinArr.push({
                        id: record._fields[0].identity.low,
                        yName: record._fields[0].properties.yName,
                        yil: record._fields[0].properties.yil,
                        typeId: record._fields[0].properties.typeId
                    })
                })
                res.render('userLogin', {
                    persons: personArr,
                    yayinlar: yayinArr
                })
                console.log(yayinArr);
            })
            .catch(err => {
                console.log(err);
            })
        

    })
    .catch(err => {
        console.log(err);
    })

})

app.get('/neovis',(req,res)=>{
    res.render('neovis');
})

//----------------------------------POST---------------------
//--------------ADMIN LOGIN

app.post('/admin/login', (req, res) => {
    var session2 = driver.session();
    var name = req.body.admin_name;
    var pass = req.body.admin_password;

    session2
        .run('MATCH (a:Admin) WHERE a.name=$nameParam and a.pass=$passParam return a', { nameParam: name, passParam: pass })
        .then(result => {
            if (result.records.length > 0) {
                res.redirect('../adminLogin');
            } else {
                console.log("Girilen bilgiler yanlis")
                res.redirect('/');
            }

            session2.close();
        })
        .catch(err => {
            console.log(err);
        })



})
//----------------USER LOGIN
app.post('/user/login', (req, res) => {
    var session5 = driver.session();
    var name = req.body.user_name;
    var pass = req.body.user_password;

    session5
        .run('MATCH (u:User) WHERE u.name=$nameParam and u.pass=$passParam return u', { nameParam: name, passParam: pass })
        .then(result => {
            if (result.records.length > 0) {
                res.redirect('../userLogin');
            } else {
                console.log("Girilen bilgiler yanlis")
                res.redirect('/');
            }

            session5.close();
        })
        .catch(err => {
            console.log(err);


        })
    console.log("Girilen bilgiler yanlis")
})
//----------Arastirmaci ekleme
app.post('/person/add',(req,res)=>{
    var session7 = driver.session();
    var name = req.body.name;
    var sname = req.body.sname;
    var yayinId = req.body.yayinId;
    session7
    .run('CREATE (a:Arastirmaci {name:$nameParam,sname:$snameParam,YayinId:$yayinIdParam}) return a',{nameParam:name,snameParam:sname,yayinIdParam:yayinId})
    .then( result => {
        res.redirect('/adminLogin');

        session7.close();
    })
    .catch(err => {
        console.log(err);
    })

    res.redirect('/adminLogin');
})

//--------------Arastirmaci silme
app.post('/person/del',(req,res)=>{
    var session8 = driver.session();
    var name = req.body.name;
    var sname = req.body.sname;
    var yayinId = req.body.yayinId;
    session8
    .run('MATCH (a:Arastirmaci {name:$nameParam,sname:$snameParam}) delete a',{nameParam:name,snameParam:sname})
    .then( result => {
            res.redirect('/adminLogin');
        
        session8.close();
    })
    .catch(err => {
        console.log(err);
    })

    res.redirect('/adminLogin');
})

app.post('/person/rel',(req,res)=>{
    var session9 = driver.session();
    var name = req.body.name;
    var yName = req.body.yName;
    session9
    .run('MATCH (a:Arastirmaci {name:$nameParam}),(b:Yayinlar {yName:$yNameParam}) MERGE (a)-[r:YAZAR]-(b)',{nameParam:name,yNameParam:yName})
    .then(result => {
        res.redirect('/adminLogin');

        session9.close();
    })
    .catch(err => {
        console.log(err);
    })

})

app.post('/vis',(req,res)=>{
    res.redirect('/neovis');
})

app.post('/back',(req,res)=>{
    res.redirect('/adminLogin');
})

app.post('/exit',(req,res)=>{
    res.redirect('/');
})

app.listen(3000);
console.log("Server Started on Port 3000");

module.exports = app;