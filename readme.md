# basic.js — Tanıtım Sitesi

basic.js kütüphanesinin **tek sayfalık** tanıtım sitesi. Sayfanın tamamı **basic.js** ile, saf JavaScript ile çizilir.
Framework, derleme adımı ve CSS dosyası yoktur.

Çalıştırmak için klasörü bir web sunucusu ile açın (VS Code Live Server: port 5505) ve `index.htm` sayfasına gidin.

---

## Sayfa akışı

| Bölüm | Dosya | İçerik |
|---|---|---|
| Üst çubuk | `js/header.js` | Sabit, koyu menü. Geniş ekranda bölüm bağlantıları, dar ekranda açılır menü. |
| Giriş | `js/sections/hero.js` | Başlık, iki düğme, kısa bilgiler ve **canlı kod** (düzenlenebilir). |
| Neden | `js/sections/why.js` | Dört neden. |
| Nasıl çalışır | `js/sections/compare.js` | Aynı kart: HTML + CSS + JS (3 dosya) ve basic.js (1 fonksiyon, canlı). |
| Kavramlar | `js/sections/concepts.js` | Altı temel fikir; her biri el kitabındaki bölümüne gider. |
| Deneme alanı | `js/sections/playground.js` | Dört hazır örnek (sekmeler) ve düzenlenebilir canlı kod. |
| Ekosistem | `js/sections/ecosystem.js` | El kitabı, bileşenler, şablonlar, VS Code araçları. |
| Başlangıç | `js/sections/start.js` | Üç adım: basic klasörü, sayfa şablonu, `start()`. |
| Alt bölüm | `js/sections/footer.js` | Son sürümle gelenler ve alt bilgi. |

Sayfayı kuran fonksiyon: `js/site.js` → `SiteApp.build()`.

---

## Canlı kod (LiveCode)

`js/live-code.js`, bu sitedeki düzenleyici + sonuç kutusudur (bileşen şablonuna uygun: `LiveCode({...})`, `remove()` temizler).

- Kod, basic.js yüklü küçük bir sayfa olarak `WebView` (iframe, srcdoc) içinde çalışır. `start()` veya `window.onload`
  içermeyen kod bir `start()` fonksiyonunun içine konur.
- Yazmayı bırakınca (`CONFIG.autoRunDelay`, 700 ms) kod yeniden renklendirilir ve çalışır. Ctrl (Cmd) + Enter hemen çalıştırır.
  Enter girintiyi korur, Tab 4 boşluk ekler, Sıfırla ilk koda döner.
- `console.log`, `println` ve hatalar sonucun altında gösterilir (son 4 satır).
- `lazy: 1` olan kutular, ekrana gelince ilk kez çalışır.

---

## Sık yapılacak değişiklikler

- **Metinler:** `js/texts.js` (`TEXTS.en` / `TEXTS.tr`, aynı anahtarlar). `{size}`, `{version}` gibi yer tutucular
  `js/config.js` ve `basic.version` ile doldurulur.
- **Kod örnekleri:** `js/samples.js`. Deneme alanına örnek eklemek için `SAMPLES.playground` içine bir anahtar,
  `js/texts.js` → `playgroundTabs` içine de adını ekleyin.
- **Sayılar:** `js/config.js` → `sizeGzip`, `componentCount`, `chapterCount`. basic.min.js veya bileşenler değişince güncelleyin.
- **Renkler:** `js/theme.js` başındaki `SITE` nesnesi. Vurgu rengi `ACCENT` (`#F5B82E`).
- **Bağlantılar:** `js/config.js` (el kitabı, bileşenler, yönetim paneli, GitHub).

---

## Notlar

- `page` kaydırılmaz: bütün içerik `scrollY: 1` verilmiş tam ekran bir `Box` içindedir (ScrollBar ile). Üst çubuk bu kutunun dışındadır.
- Pencere genişliği değişince sayfa yeniden kurulur ve ziyaretçi baktığı bölümde tutulur (canlı kodlardaki değişiklikler sıfırlanır).
- Dil düğmesi sayfayı yeniden kurar; seçim `basic.storage` içinde saklanır.
- **Site kendi içinden çalışır:** Kütüphane `basic/` klasöründe, bileşenler (`web-view`, `tabs`, `toast`) `comp/` klasöründe,
  hepsi `.min` olarak. Klasör olduğu gibi başka bir yere kopyalanıp yayınlanabilir. Canlı örnekler `basic/basic.min.js` ile
  çalışır (`js/config.js` → `rootPath: "./"`). Bu kopyalar deponun ana dizinindeki `_make-standalone.sh` ile yapılır ve
  kendiliğinden güncellenmez: kütüphane veya bu bileşenler değişince `./_make-standalone.sh 03-webpage-m2/webpage-basicjs`
  çalıştırın. `basic/` ve `comp/` içindeki dosyaları elle düzenlemeyin.
- `js/code-highlight.js`, ana dizindeki `index/code-highlight.js` dosyasının kopyasıdır; buna CSS renklendirmesi eklendi.
- Düzenleyicide Chrome satır sonunu `<br>` olarak ekler; `LiveCode` bunları satır sonu metnine çevirir.

---

## SEO

- **Dil adreste:** Varsayılan dil adresin kendisidir, diğer dil `?lang=tr` / `?lang=en` ile açılır (`js/site.js` → `loadLanguage`).
  Dil değişince adres de değişir; kopyalanan bağlantı aynı dilde açılır. Arama motoru iki dili ayrı adreslerde okur.
- **`CONFIG.siteURL`** (`js/config.js`): Sayfanın yayın adresi. Yazılınca sayfa `canonical`, `hreflang` (tr / en / x-default)
  ve `og:url` etiketlerini kendisi ekler. Adres belli olunca `index.htm` içindeki `og:image` değerini de tam adres yapın
  (bağlantı önizlemeleri JavaScript çalıştırmaz).
- **`index.htm`:** `<head>` içinde paylaşım etiketleri (Open Graph, `summary_large_image`) ve JSON-LD (schema.org) var;
  `<body>` içindeki `<noscript>` bölümü sayfanın içeriğini düz HTML olarak verir. İkisi de `js/texts.js`'teki
  (varsayılan dildeki) metinlerden yapıldı: metinler değişince bunları da güncelleyin.
- **`assets/og-image.jpg`:** Bağlantı önizleme resmi (1200 × 630), sayfanın ilk ekranı.

## English

A one-page website for the basic.js library, built with basic.js itself. Serve the folder with a web server and open `index.htm`.
It has a live, editable code example in the hero, a "same card, two ways" comparison (HTML + CSS + JS vs basic.js),
six core concepts linked to the handbook, a playground with four examples that re-run as you type, the ecosystem
(handbook, components, templates, VS Code tools) and a three-step getting started. Texts: `js/texts.js` (en/tr),
code samples: `js/samples.js`, settings: `js/config.js`.
