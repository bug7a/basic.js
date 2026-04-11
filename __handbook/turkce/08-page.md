# basic.js — Page (Sayfa Nesnesi)

`page` nesnesi uygulamanın ve ekranın yönetimini sağlayan ve otomatik olarak oluşturulan temel objedir. `MainBox` sınıfından (class) türetilmiştir. 

> **Not:** Ekranın sadece görünebilir alanını temsil eder ve Scrollbar (kaydırma çubuğu) desteklemez. Sayfanın uzamasını ve kaydırılmasını istiyorsanız, boyutları esnek olan bir alt `Box` nesnesi oluşturmalısınız.

---

## HTML Bağlantısı

**`page.bodyElement`**
Nesne ile doğrudan DOM (HTML) arasındaki köprüyü kurar.
- HTML içerisinde bulunan `<body>` elementini kullanır.
- Saf JavaScript (Vanilla JS) tarafında tam olarak karşılığı `document.getElementsByTagName("BODY")[0]` ifadesidir.

---

## Boyut ve Görünüm

**`page.color`**
Sayfanın arkaplan rengini ayarlar (Örn: `"white"`, `"#141414"`).

**`page.width`** ve **`page.height`**
Anlık sayfa/pencere genişliğini ve yüksekliğini okumaya (çekmeye) yarar.
- **Dikkat:** Bu değer dışarıdan doğrudan atamayla DEĞİŞTİRİLEMEZ. Sadece bilgi alma (Okuma) amaçlıdır. Yeniden boyutlandırmalar CSS/Pencere tabanlıdır.

---

## Sayfaya Ölçekleme ve Yerleştirme (Fit & Zoom)

**`page.zoom`** (Float)
Sayfanın ne kadar büyüyeceğini veya küçüleceğini ölçekleme oranıdır.
- Varsayılan değer: `1` (%100 orjinal boyutu ifade eder). 
- `0.5` girilirse yarıya, `1.5` girilirse %150 oranında boyutlanır. Sayfa özelliklerinde `.fit()` fonksiyonları da alt tarafta bu `.zoom` değişkenini baz alır (CSS: `transform scale`). 

**`page.fit(originalWidth, maxWidth)`**
Ekranın içerisine arayüzün (content) genişlik bazında tam olarak sığmasını sağlayan dinamik boyut fonksiyonudur.
- `originalWidth`: Ekranda görünmesini hedeflediğiniz orijinal içerik genişliği.
- `maxWidth`: İçeriğin genişleyebileceği en yüksek mesafe sınırı (Girilmesi zorunlu değildir, girilmezse `originalWidth` ile aynı değer varsayılır). 

**`page.autoFit(contentWidth, contentHeight)`**
Yukarıdaki komutun biraz daha pratik formudur. Belirtilen içerik ölçülerini bozmadan (en boy oranıyla) sayfaya akıllıca sığdırır.

```javascript
window.onload = function() {

    // Başlangıçta sayfayı bir kere ekrana sığdır.
    page.autoFit(1280, 720);

    // Ana Arkaplan (Siyah Zemin)
    HGroup({ color: "#141414" });
    
        // Odanın İçeriği (İçteki Beyaz Çalışma Alanı, her zaman 1280x720)
        startBox({ width: 1280, height: 720, color: "white" });

            Label({ text: "İçerik ölçüleriniz artık her zaman formunu korur." }).center();

        endBox();

    endGroup();

    // Boyut değiştiğinde yeniden ölçekleme olayını tetikle
    page.onResize(pageResized);
    
};

const pageResized = function() {
    // Tarayıcı boyutu değiştiğinde akıllı ölçeği tekrar uygula
    page.autoFit(1280, 720);
};
```

---

## Eylem ve Olaylar (Events)

**`page.onClick(fonksiyon)`**
Sayfa üzerine (**body** dahilindeki boş bir yöne) her tıklandığında içindeki fonksiyon tetiklenir.
- Sayfaya eklenen / türetilen diğer temel nesneler (Button vb.) aslında `page` in bir parçası olduğundan, onlara tıklamak `page` onClick eylemini de otomatik tetikleyebilir. 
- Sadece boş arkaplan eylemlerini algılamak için; `page` in hemen altına ve her şeyin arkasında kalacak şeffaf bir `Box` yaratıp `.onClick()` özelliğini onun üzerinden okumak da bir çözümdür.
- Etkiyi kaldırmak için `page.remove_onClick(fonksiyon_adi)` kullanılabilir.

**`page.onResize(fonksiyon)`**
Pencere boyutu her değiştiğinde eyleme geçilecek fonksiyon verilir.
- Sayfanın açıldığı (window.onload) **İLK AN TETİKLENMEZ!** Programcı açılıştaki boyutlandırılmayı mecburen 1 kere manuel çağırmalıdır.
- Etkiyi kaldırmak için `page.remove_onResize(fonksiyon_adi)` kullanılır.

---

## İşlemsel Komutlar

**`page.add(nesne)`**
Oluşturduğunuz (özellikle .remove yapıp sonradan çağrılan vs) temel objeleri tekrar sayfanın en üst kalbine yüklemek/taşımak istediğinizde kullanılır.
- Normal şartlarda yeni yaratılan nesneler otomatikman `.add` yapılmışçasına `page` içerisine düşer (Şayet Container seçimi değiştirilmediyse).
