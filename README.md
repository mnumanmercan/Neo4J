# Neo4J
## Academic Search Engine with Neo4J Graph Database 
    Akademik makalelere , yazar ve yayın bilgilerine ulaşılabilecek bir arama sistemi.
> *  Bu sistemde database olarak Neo4J Graph Database kullandım 

Kocaeli Üniversitesi Yazılım Laboratuvarı 2. Dönem 3. Projesi olarak akademik yayın arama web uygulaması yapmaya çalıştım. Burda bizden istenen teknolojiler :

 * Neo4J Graph Veri Tabanı Kullanımı
 * Backend ile sunucu istekleri yonlendirme vs.
 * Admin ve User sayfaları 
   - Veri tabanını görünteleme
   - Veri Tabanını grafik arayüzü ile gösterme (Neovis.JS , npm lib)
   - Eleman ekleme çıkarma ve Neo4J mantığı ile bazı bağlantılar ve ilişkiler kurma 


![LoginPage](/img/LoginPage.jpg)

Login saglandiktan sonra : 
> * Verilerin tablo görüntüsü
> * Arastirmaci ekleme,silme,arastirmacı yayın ilişkisi kurma gibi veri tabanında gerceklesebilen yetkilendirme formları var
> * Neovis ile yapılan veri tabanının visualize ile grafik gösterimine erişmek için grafik butonu
>

![AdminPage](/img/adminLogin.png)
>Admin sayfası bu şekilde. Not: Arayüz düzeltmeleri yapılacaktır odak backend oldugu icin bu kısma yeterince vakit ayrılamadı.

![Neovis](/img/Neovis.jpg)
>Neovis paketi ile Neo4J yi kendim visualize edip gösterdim 

 Projeyi indirdikten sonra terminalde şu komutları sırasıyla çalıştırın:

* `$ npm install`
* `$ node app`

 Böylece projeniz çalışmaya hazır hale gelecektir , fakat tabi birde Neo4J veri tabanımız gerekiyor.Aşağıdaki linkten desktop indirebilir ya da sandbox ile ücretsiz çalıştırabilirsiniz. Ben Neo4J desktop ile devam ettim. 

[Neo4J](https://neo4j.com/try-neo4j/)

![Neo4J](/img/Neo4JDB.png)
