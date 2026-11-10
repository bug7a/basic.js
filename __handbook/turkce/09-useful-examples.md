# basic.js — Faydalı Örnekler (Useful Examples)

basic.js kullanırken CSS özelliklerine JavaScript üzerinden pratik olarak nasıl müdahale edilebileceğini ve sık karşılaşılan arayüz (GUI) ihtiyaçlarının kütüphane nesneleriyle nasıl çözüleceğini gösteren yararlı kod parçacıkları aşağıda listelenmiştir.

---

## Gölgelendirme (Box Shadow)
Nesnelere derinlik (gölge) katmak için, objenin `boxShadow` özelliğine standart CSS gölgeleme tanımları verilebilir.

```javascript
const start = function () {

    page.color = "whitesmoke";

    VGroup({ gap: 20 });

        // Örnek 1: Sağ alta doğru keskin gölge
        Box({ color: "white", boxShadow: "2px 3px 6px rgba(0, 0, 0, 0.6)" });

        // Örnek 2: Merkez etrafında yumuşak dağılan parıltılı gölge
        Box({ color: "white", boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)" });

    endGroup();

};
```

---

## İç ve Dış Çizgiler (Spaceless Inner and Outer Border)
Kutunun kendi `border` özelliğini kullanmak boyutları kaydırabilir. Bunun yerine gölgelendirme (box-shadow) hilesiyle yer kaplamayan iç veya dış kenarlıklar (border) yapılabilir.

```javascript
const start = function () {

    VGroup({ gap: 20 });

        // İç kenarlık (Inner border)
        Box({ color: "white", round: 20, boxShadow: "inset 0px 0px 0px 1px rgba(0, 0, 0, 1)" });

        // Dış kenarlık (Outer border)
        Box({ color: "white", round: 20, boxShadow: "0px 0px 0px 1px rgba(0, 0, 0, 1)" });

    endGroup();

};
```

---

## Kesilmeyen ve Taşan Metin (Nowrap & Ellipsis)
Uzun bir metnin (ne kadar uzun olursa olsun) alt satıra geçmesini engellemek için CSS beyaz boşluk kuralı `css` ile verilir. Kutuya sığmadığında sonuna üç nokta (`...`) eklemek için `ellipsis: 1` kullanılır.

```javascript
const start = function () {

    // Sadece alt satıra geçmeyi engeller (Taşar)
    Label(20, 80, 200, {
        text: "Ne kadar uzun olursa olsun bir satırda kalmaya devam eden etiket.",
        color: "peru",
        css: { whiteSpace: "nowrap" },
    });

    // Alt satıra geçmez ve sığmadığı yerde 3 Nokta (...) ile kırpılır
    Label(20, {
        text: "Kutuya sığmayacak kadar uzun olan bir etiket",
        color: "peru",
        bottom: 80,
        width: 200,
        ellipsis: 1, // Taşmayı üç nokta yapar (1 satır için)
    });

};
```

---

## Tıklanabilir Ekran İmleci (Pointer Cursor)
Bir objenin/metnin üzerine gelindiğinde farenin (mouse) "el işareti"ne dönüşmesi, kullanıcılara tıklanabildiğine dair güçlü bir mesaj verir.

```javascript
const start = function () {

    Label({
        text: "Bana Tıkla",
        border: 1, 
        padding: [12, 4], 
        round: 3, 
        clickable: 1, // Tıklanma olayı alınabilsin diye
        cursor: "pointer", // İmleci "el (pointer)" tipine dönüştür
    }).center();

};
```

---

## Farklı Fare Olayları Eklemek (Mouse Events)
`.on("click")` dışında temel DOM olaylarını da (örn: `mouseover`, `mouseout`) `addEventListener` ile yakalayabilirsiniz.

```javascript
const start = function () {

    const lbl = Label(20, 20, {
        text: "Fare ile üzerine gel!",
        round: 12, 
        padding: [12, 6], 
        clickable: 1,
    });

    // Eskiden .elem.addEventListener(...) yapılıyordu, artık .on("mouseover") da kullanılabilir.
    lbl.on("mouseover", function() {
        lbl.color = "indianred";
    });

    lbl.on("mouseout", function() {
        lbl.color = "transparent";
    });

};
```

---

## Sınırları Aşan Kutular (clipContent)
Normal şartlarda objeler varsayılan `clipContent: 1` davranışı ile kutu sınırlarını kestikleri noktada görünmez olurlar (overflow: hidden). Eğer bir açılır menü ya da alt bileşen, kapsayıcı kutudan dışarı taşmalıysa `clipContent: 0` özelliği kullanılarak sınır dışı görünürlük sağlanır (overflow: visible).

```javascript
const start = function () {

    HGroup();

        // clipContent: 0 ile kutunun dışına taşan alt (child) nesnelerin görünmesine izin verilir.
        const box = Box({ 
            color: "orange", 
            clipContent: 0 
        });

        // Oluşturduktan sonra değiştirmek gerekirse: 
        // box.clipContent = 0;

    endGroup();

    Label({
        text: "Kutu sınırlarından çok daha dışarılara uzanacak bir metin.",
        left: 10, 
        top: 10, 
        width: "auto", 
        color: "yellow",
        css: { whiteSpace: "nowrap" },
    });
    box.add(that);

};
```

---

## Renk Geçişleri (Gradients)
Arayüzleri şıklaştırmak amacıyla çizgisel (linear), merkezden (radial) ya da dairesel (conic) renk geçişleri CSS `background` komutlarıyla eklenebilir.

```javascript
const start = function () {

    VGroup({ gap: 8, });

        // (Linear) Soldan sağa renk geçişi (Saydamdan -> Yeşile)
        Box({ width: 200, css: { background: "linear-gradient(to right, #FFFFFF00, seagreen)" } });

        // (Linear) Yukarıdan aşağı çoklu renk
        Box({ width: 200, css: { background: "linear-gradient(to bottom, pink, purple, indianred)" } });

        // (Radial) Merkezden dışarı dağılan (Güneş benzeri) renk geçişi
        Box({ width: 200, css: { background: "radial-gradient(gold, indianred, black)" } });

        // (Conic) Saat yönünde yuvarlak renk turu
        Box({ width: 200, css: { background: "conic-gradient(red, yellow, green, blue, black)" } });

    endGroup();

};
```

---

## Görsel Filtreleme (CSS Filters)
Bir `Icon` ya da genel bir objenin rengini, pusluğunu ve karşıtlığını tek tıkla değiştirebilirsiniz.

```javascript
const start = function () {

    // Tamamen Siyah / Beyaz yapar
    Icon(10, 10, 100, 100, { border: 1, css: { filter: "grayscale(100%)" } }).load("test.png");

    // Renkleri tam tersiyle değiştirir (Negatif etki)
    Icon(10, 118, 100, 100, { border: 1, css: { filter: "invert(100%)" } }).load("test.png");

    // DİĞER FİLTRE DEĞERLERİ:
    // "blur(5px)", "brightness(200%)", "sepia(100%)", 
    // "saturate(8)", "hue-rotate(90deg)", "contrast(200%)"
    // "drop-shadow(8px 8px 10px gray)" // Görselin seffaf alanlarına etki etmeden atılan gölge

    // BİRDEN FAZLA FİLTREYİ BİRLİKTE KULLANMAK İÇİN:
    // that.css = { filter: "grayscale(50%) blur(2px)" };

};
```

---

## Özel Yazı Tipi Atama (Custom Fonts)
Yazılarınızın standardı dışına çıkmak istediğinizde, sisteme yüklü bir Google Fonts ya da harici web font değerini doğrudan atayabilirsiniz.

```javascript
const start = function () {

    // Sayfaya @font-face olarak eklenmiş olmalıdır.
    Label(20, 20, { text: "Farklı Bir Font Denemesi", fontFamily: "opensans-bold" });

};
```

---

## Ölçekleme ve Hareket (.transform & scale)
Fare efektiyle arayüz elemanlarını CSS Matrix/Transform destekli olarak büyütüp küçültebilir ve animasyonlar ekleyebilirsiniz.

```javascript
const start = function () {

    HGroup();

        const lbl = Label({ 
            text: "Hover Effect", 
            color: "white", 
            padding: 10, 
            clickable: 1,
            round: 13,
            // Boyut katsayısı ve merkezin durumu (tam ortadan büyür)
            css: { transform: "scale(1)", transformOrigin: "50% 50%" },
        });

        // Etki geçişlerini pürüzsüzleştirir
        lbl.setMotion("transform 0.5s, background-color 0.5s");

        lbl.on("mouseover", function(self, event) {
            self.color = "indianred";
            self.css = { transform: "scale(1.2)" }; // %20 daha büyüt
        });

        lbl.on("mouseout", function(self, event) {
            self.color = "white";
            self.css = { transform: "scale(1)" }; // Eski haline geri getir
        });

    endGroup();

};
```

---

## Seçilebilir Metin (Selectable Text)
Kütüphanede kullanıcı arayüzü dokunmatik cihazlardaki "metin kopyalama çubuğu" açılmaması için kapatılmıştır. Ancak dilediğiniz bir metnin Mouse/Ekran ile kopyalanmasını isterseniz seçilebilirliği aktif edebilirsiniz.

```javascript
const start = function () {

    // selectable: 1, bunu bir label/buton için serbest bırakır.
    // Komple blok seçmek için ayrıca: css: { userSelect: "all" }
    Label(10, 10, { text: "Kopyalanabilir Makale Formatı...", selectable: 1 });

};
```

---

## CSS Sınıfları Ekleme (classList.add)
Bileşenlere hazır bir sınıfı atayarak global bir CSS bloğunu (`.css` dosyasında yazılmış) etkili biçimde çalıştırabilirsiniz.

```javascript
const start = function () {
    
    Box(10, 10, 50, 50, { color: "red" });

    // JavaScript kullanarak CSS sınıf düzenleme
    that.elem.classList.add("highlight");
    // that.elem.classList.toggle("highlight"); // Varsa sil, yoksa ekle.
    // that.elem.classList.remove("highlight");

};
```

---

## Özel Kenarlıklar Çizme (Custom Border)
Belirli bir objenin yalnızca sağında veya solunda, bazı köşelerinde farklı çerçeveler olmasını isterseniz tekil sınırları CSS ile çizebilirsiniz.

```javascript
const start = function () {

    page.color = "whitesmoke";

    Box({ 
        right: 40,
        bottom: 40,
        width: 300, 
        height: 300, 
        color: "rgba(255, 255, 255, 0.7)",
        // Her kenara farklı bir çizim vermek
        css: {
            borderTop: "2px dotted rgba(0, 0, 0, 0.9)", // Noktalı tavan çizgisi
            borderBottom: "5px solid rgba(0, 0, 0, 0.9)", // Kalın ve düz taban çizgisi
            // borderLeft: "1px dashed rgba(0, 0, 0, 0.9)",
            // borderRight: "1px dashed rgba(0, 0, 0, 0.9)",
        },
    });

};
```
