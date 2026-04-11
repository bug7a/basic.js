# basic.js — BSound (Ses Nesnesi)

basic.js kütüphanesinde `BSound` sınıfı, tarayıcı üzerinde ses ve müzik dosyalarını yönetmek ve çalmak için kullanılır. Görünmez (arayüzü olmayan) bir ses motorudur.

---

## Ses Motorunu Başlatma

Basit bir `BSound` örneği (instance) yaratılarak ve müzik dosyası adresi belirtilerek oluşturulur.

```javascript
window.onload = function() {

    const backgroundMusic = new BSound();
    
    // Ses dosyasını yüklemeye başlat (.wav veya .mp3)
    backgroundMusic.load("assets/audio/loop_theme.mp3");

}
```

---

## Metodlar ve Olaylar

### Oynatma (Playback) Metodları
- `.play()` — Yüklenmiş olan sesi başlatır. Eğer duraklatılmış (pause) ise kaldığı yerden devam eder.
- `.pause()` — Çalan sesi duraklatır.
- `.stop()` — Çalan sesi tamamen durdurur ve başlatma/ilerleme çubuğunu `0` saniyesine (başa) çeker.

### Kontrol Özellikleri
- `.loop` (boolean) — Sesin / müziğin bittiğinde tekrar baştan başlamasını ayarlayan yapı (Değer `1` veya `0` alır).
- `.playing` (boolean) — Sesin şu anda etkin bir şekilde çalıp çalınmadığını okur (Dönen değerler `true/false`, salt okunurdur).
- `.paused` (boolean) — Sesin duraklatılıp duraklatılmadığını kontrol eder.
- `time` ve `timeLeft`, `currentTime` özelliği aracılığı ile arka plan çalar saat süreleri takip edilebilir.

### Yüklenme Olayı (.onLoad)
Grafik nesnelerinde (Image/Icon) olduğu gibi, ses dosyaları da boyutları sebebiyle anında hazır olmayabilirler. Çalmaya (okumaya) hazır olduğu durumu `.onLoad()` ile yakalanır.

```javascript
const fxOkey = new BSound();
fxOkey.load("assets/audio/ok.wav");

// Ses dosyasının tarayıcı tarafından belleğe alınarak çalmaya hazır hale geldiği an
fxOkey.onLoad(function(loadedSound) {
    println("Ses dosyası başarıyla hazırlandı.");
});
```

---

## Örnekler

### Örnek 1: Döngüsel Arka Plan Müziği ve Buton Kontrolü

```javascript
window.onload = function() {
    
    // Sesi hazırla
    const gameMusic = new BSound();
    gameMusic.load("music.mp3");
    gameMusic.loop = 1; // Sürekli baştan çalacak
    
    HGroup({ gap: 10, align: "center" });

        // Oynat Butonu
        Button({ text: "Başlat", color: "mediumseagreen" })
        .on("click", function() {
            gameMusic.play();
        });

        // Durdur Butonu
        Button({ text: "Durdur", color: "tomato" })
        .on("click", function() {
            gameMusic.stop(); // Tamamen ve baştan sustur
        });

    endGroup();

};
```

---

## Özet
- `BSound` → Ekran üzerinden bağımsız olarak görünmez şekilde ses çalıştıran yapıdır.
- Bir kere yaratılıp `.load()` fonksiyonu ile içerik verildikten sonra, yazılımla defalarca kez `.play()` edilebilir.
- Arka plan müzikleri için idealdir ve `.loop = 1` şeklinde kullanılabilir.
