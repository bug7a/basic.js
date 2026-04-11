# basic.js — Motion (Hareket ve Animasyonlar)

basic.js kütüphanesinde oluşturulan herhangi bir GUI nesnesinin (Box, Button, Image vb.) pozisyonlarını, boyutlarını veya renklerini anında (sertçe) değiştirmek yerine, yavaş ve estetik geçişlerle (akıcı şekilde) değiştirmek için `Motion` mekanizması kullanılır.

---

## Motion Başlatma

Animasyon komutu, öncelikle hangi özelliklerin "hangi sürede" değişeceğini bir kural olarak tanımlar ve `.setMotion()` ile nesneye verilir.

```javascript
window.onload = function() {

    HGroup();

        const box = Box({ 
            width: 120, 
            height: 120, 
            color: "orangered" 
        });
        
        // Herhangi bir değişiklik olduğunda 0.3 saniyede akıcı (soft) geçiş yap.
        box.setMotion("left 0.3s, top 0.3s, width 0.3s, height 0.3s");

        box.on("click", function() {
            
            // Genişlik ve yükseklik kod ile sertçe değiştirildiğinde, .setMotion araya girerek bir animasyon uygular.
            box.width += 50;
            box.height += 50;

        });

    endGroup();

}
```

---

## Hareket Metodları

Temel seviye nesnelere eklenen başlıca animasyon kontrolleri şunlardır:

### `.setMotion(kural_dizgesi)`
Nesneye uygulanan genel CSS (transition) komut stringini alır. 
- Örnek: `box.setMotion("all 0.5s")` (Tüm özellikler yarım saniyede değişsin)
- Örnek: `box.setMotion("opacity 0.2s, background-color 1s")`

### `.withMotion(fonksiyon)`
Genellikle birden fazla css değişkeniyle oluşan veya anlık eklenen animasyonların düzgün işlenmesi adına (browser buglarını önlemek için) ufak bir zaman damgasıyla bir kere çalıştırılan akıllı bir fonksiyondur.

```javascript
window.onload = function() {

    HGroup();

        const box = Box({ 
            width: 120, 
            height: 120, 
            color: "orangered",
            opacity: 0
        });
        
        box.setMotion("opacity 0.2s");
        box.withMotion(function(self) {
            self.opacity = 1;
        });

    endGroup();

}
```

### `.dontMotion()`
Animasyon verilmiş bir nesnenin, herhangi bir olayı anlık/sert olarak yapmak istediğinde aradan geçici bir süreliğine animasyonu kaldırmasını olanak tanıyan fonksiyondur.

```javascript
// Bu işlemler yavaş ve pürüzsüz uygulanacaktır (Önceki .setMotion ayarlarından dolayı)
box.width = 200;

// Ancak yerinin hemen DEĞİŞMESİ, animasyonsuz anında sekmesi gerekiyor
box.dontMotion();
box.left = 10;
```

---

## Örnekler

### Örnek 1: Açılır / Kapanır Pop-up Box Tasarımı
Ekranda baştan oluşturulmuş ancak görünmez (opacity = 0) olan bir yapıyı, sonradan aşağıdan yukarıya doğru çekip görünür yapmak.

```javascript
let box = null;

window.onload = function() {

    page.color = Black(0.8);

    HGroup();
    
        box = Box({
            width: 300,
            height: 200,
            color: "white"
        });

    endGroup();
        
    // Başlangıç değerleri (Aşağıda ve opaklıkta)
    box.opacity = 0;
    box.elem.style.transform = "translateY(150px)";

    // Hangi özelliklerin animasyon ile değişeceğini söylüyoruz
    box.setMotion("transform 0.3s, opacity 0.3s");
    
    // Çıkarılmasını izleyen ufak bir zamanlama aralığı
    box.withMotion(function(self) {
        self.opacity = 1;
        self.elem.style.transform = "translateY(0px)";  // Havaya sıçrat
    });

};
```

---

## Özet
- basic.js'de arayüz geçişleri CSS `transition` üzerinden yürütülür ve en çok `.setMotion` metodu ile tetiklenir.
- Tarayıcıda performans ve sekme sorunlarını çözmek için DOM değişiklikleri sonrasında `.withMotion()` kullanılmalıdır.
- Yalnızca anında zıplama yapması gereken objelerde (örneğin kaydırma scroll pozisyonu algılandığında elementin takibi vs.) `.dontMotion()` yapıları kullanılır.
