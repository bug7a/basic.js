# basic.js — Başlangıç Kılavuzu ve Felsefesi (Introduction)

`basic.js`, web uygulamaları geliştirmeyi **basit, hızlı ve anlaşılır** hale getiren hafif bir JavaScript kütüphanesidir. Arayüzün tamamını saf JavaScript ile kurarsınız.

Amacı:
**Kod yazmayı keyifli ve akıcı bir deneyime dönüştürmek.**

- Project Site: https://bug7a.github.io/basic.js/

---

## Neden basic.js?

- **Okunabilirliği Çok Yüksek Kod:** Sanki bir hikaye okuyormuşçasına akıcı, bakıldığında anlaşılan ve kendini açıklayan bir sözdizimi sunar. Arayüz kurmak, lego parçalarını üst üste koymak gibidir.

`Kod, sadece makine için değil, insan için de yazılır.`

- **Kısa Öğrenme Süreci:** Başlamak için birkaç kavram ve kodun akışı yeterlidir; böylece fikirlerinizi hızla çalışan bir arayüze dönüştürebilirsiniz.

`Az sayıda temel konsept var.`

- **Hafif:** Dış bağımlılığı yoktur ve doğrudan DOM üzerinde çalışır; bir küçük kod dosyası ve bir küçük stil dosyasından oluşur.

`Ekstra bağımlılık yok.`

- **Tam Kontrol ve Esneklik:** Arayüz ve yerleşim JavaScript ile yazılır; her detayı tek yerden yönetirsiniz, bir renk veya genişlik de hesaplayıp çalışırken değiştirebileceğiniz bir değişkendir.

`Bir ekranla ilgili her şey tek yerdedir.`

- **Hızlı Prototipleme:** Özellikle solo geliştiriciler ve arayüzü de mantığı da tek kişinin yazdığı küçük veya orta ölçekli projeler için verimlidir.

`Basit işleri basit tutar.`

---

## Çalışma Mantığı ve Örnek

Bu sistemin bir lego setinden farkı olmadığını basit bir tıklama sayacı (Counter) örneğiyle daha iyi görebilirsiniz:

```javascript
// Değişkenler
let lblText;
let clickedCount = 0;
    
// Uygulama çalışınca tetiklenecek ilk (ana) fonksiyon
const start = function () {

    // Her şeyin üzerinde barındığı sayfanın (page) rengini değiştiriyoruz
    page.color = "whitesmoke";

    // GROUP: Otomatik yerleşim grubunu başlat. 
    // Tüm içeriğini yatay olarak otomatik ortala.
    HGroup({
        // flow: "horizontal", // Veya "vertical"
        // align: "center", // Veya "top left", "center right"
        // gap: 0,
        // padding: 0, // Örn: [0, 0, 0, 0]
    });

        // LABEL: Grubun içerisine tıklanabilir bir buton niyetine kutu ekliyoruz
        lblText = Label({
            text: "Click Me",
            color: "white",
            padding: [12, 4],
            round: 4,
            border: 1,
            borderColor: "rgba(0, 0, 0, 0.1)",
        });
        
        // Son yaratılan eleman "that" isimli değişkene eşlenir.
        // Bu yüzden adını söylemeden de olay eklenebilir veya fare işareti atanabilir.
        that.cursor = "pointer";
        that.on("click", increaseOne);

    // Grubu Kapatıyoruz.
    endGroup();

};

// Butona (.on("click")) tıklandıkça çalışacak dış bağlantılı fonksiyon
const increaseOne = function(self, event) {

    // Değişkeni artır
    clickedCount++;
    
    // Lego parçamızın (.text) metin içeriğini değiştir
    lblText.text = "Clicked Count: " + clickedCount;

    // Konsola da yazdırabiliriz
    println(clickedCount);

};
```

basic.js, sayfa hazır olunca `start` adlı fonksiyonu çağırır. (Eski sayfalar `window.onload = function () { ... }` yazar: o da çalışır.)

---

## Elkitabı (Handbook) Dosya Yapısı

Elinizdeki bu elkitabı, kütüphaneyi en verimli biçimde nasıl kullanabileceğinizi temelden ileri düzeye doğru örneklendirir:

1. **Temel Bileşenler:**
   Görsel çerçevemizi oluşturan objeler (`02-box.md`, `01-label.md`, `03-image.md` vb.).
2. **Girdi ve Etkileşim:**
   Kullanıcıdan veri almak ve işlem yaptırmak üzerine kurgulanan nesneler (`06-button.md`, `07-input.md`).
3. **Sayfa ve Düzen Hiyerarşisi:**
   Ekranın tamamını kontrol etmek (`08-page.md`) veya objeleri üst düzey bir nizamda birbirine eklemlemek (`05-autolayout.md`).
4. **Ortak Özellikler:**
   Aksi özel olarak belirtilmediği sürece her elemanın standart olarak sahip olduğu yetenekler (`04-common-properties.md`).
5. **Animasyonlar ve Araçlar:**
   Nesnelere hayat veren animasyon kontrolleri (`10-motion.md`), dahili ses oynatıcısı (`13-sound.md`) ve sisteme güç veren yardımcı fonksiyonlar (`12-utilities.md` ve `11-other-functions.md`).
6. **Pratik Bilgiler (İpucu ve Hileler):**
   Bir bileşene gölge atamak veya arayüzde gradient gibi karmaşık hissettiren ama kütüphaneyle tek satır olan hayat kurtaran CSS/arayüz taktikleri (`09-useful-examples.md`).
7. **Bileşenler:**
   OzdenUI'ın hazır bileşenlerini kullanmak (`14-using-components.md`) ve kendi bileşeninizi yazmak (`15-making-a-component.md`).

Ayrıca kütüphanede meydana gelen en son gelişmelere, eklenen taze metodlara hızlıca bakmak için **`00-what-is-new.md`** sürüm notlarını inceleyebilirsiniz.

Hayrını görmenizi dilerim.


## LICENSE

Copyright 2020-2026 Bugra Ozden <bugra.ozden@gmail.com>
- https://github.com/bug7a

Licensed under the Apache License, Version 2.0

