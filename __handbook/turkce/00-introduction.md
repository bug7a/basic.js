# basic.js — Başlangıç Kılavuzu ve Felsefesi (Introduction)

`basic.js`, web uygulamaları geliştirmeyi mümkün olduğunca **basit, hızlı ve anlaşılır** hale getirmek için oluşturulmuş hafif bir JavaScript kütüphanesidir. HTML veya CSS yazmanıza gerek yok!

Amacı:
Kod yazmayı zorlaştırmak değil, **keyifli ve akıcı bir deneyime dönüştürmek**.

- Project Site: https://bug7a.github.io/basic.js/

---

## Neden basic.js?

- **Okunabilirliği Çok Yüksek Kod:** Karmaşık yapıların arasında kaybolmak yerine, sanki bir hikaye okuyormuşçasına akıcı, bakıldığında derhal anlaşılan ve kendini açıklayan bir sözdizimi sunmaya odaklanır. Yazılım geliştirmeyi, parçaları üst üste koyduğunuz bir lego oyunu kadar basit ve keyifli bir sürece dönüştürmeye çalışır.

`Kod, sadece makine için değil, insan için de yazılır.`

- **Sıfır Öğrenme Eğrisi:** Bitmek bilmeyen dokümanlar veya ağır teorik kavramlar yerine, sadece kodun akışına bakarak dakikalar içinde üretime geçebileceğiniz kadar doğal ve zahmetsiz bir öğrenme yolu kurgular. Temel konseptleri hızla kavrayıp, aklınızdaki fikirleri anında çalışan bir arayüze dönüştürmenize yardımcı olmayı amaçlar.

`Az sayıda temel konsept var.`

- **Hafif ve Yüksek Performanslı:** Gereksiz yüklerden ve dış bağımlılıklardan arınmış yapısıyla, doğrudan DOM üzerinde en düşük kaynakla en yüksek tepki hızını vermeyi hedefler. Performansı ön planda tutan yalın yapısı sayesinde, özellikle hızın ve esnekliğin kritik olduğu projelerde akıcı bir deneyim sunar.

`Ekstra bağımlılık yok.`

- **Tam Kontrol ve Esneklik:** HTML ve CSS dosyaları arasında bölünmek yerine, tüm arayüz süreçlerini ve yerleşimleri tamamen JavaScript tabanlı bir yapıya taşıyarak size sınırsız bir hareket alanı yaratmaya gayret eder. Her detayı tek bir merkezden, tam hakimiyetle yönetebileceğiniz bir geliştirme altyapısı sunar.

`Daha esnek yapı sağlar.`

- **Hızlı Prototipleme ve Çevik Geliştirme:** Özellikle işlerin çok bölündüğü aşırı kompleks yapılar yerine, arayüz esnekliği ve mantık hızının ön planda olduğu küçük veya orta ölçekli projelerde, solo geliştiriciler için süreci çok daha verimli hale getirmeye gayret eder.

`Over-engineering yapmaz.`
`Basit işleri basit tutar.`

---

## Çalışma Mantığı ve Örnek

Bu sistemin bir lego setinden farkı olmadığını basit bir tıklama sayacı (Counter) örneğiyle daha iyi görebilirsiniz:

```javascript
// Değişkenler
let lblText;
let clickedCount = 0;
    
// Uygulama çalışınca tetiklenecek ilk (ana) fonksiyon
window.onload = function() {

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
        that.elem.style.cursor = "pointer";
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

Ayrıca kütüphanede meydana gelen en son gelişmelere, eklenen taze metodlara hızlıca bakmak için **`00-what-is-new.md`** sürüm notlarını inceleyebilirsiniz.

Hayrını görmenizi dilerim.


## LICENSE

Copyright 2020-2026 Bugra Ozden <bugra.ozden@gmail.com>
- https://github.com/bug7a

Licensed under the Apache License, Version 2.0

