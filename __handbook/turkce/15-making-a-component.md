# basic.js — Bileşen Yazmak (Making a Component)

Bileşen, bir `Box` yapan, parçalarını içine koyan ve kutuyu döndüren bir fonksiyondur. Bir sayfa onu basic.js'in herhangi bir nesnesi gibi kullanır (`14-using-components.md`). Bu bölüm bir tane yapar: `StarRating`, kullanıcının tıklayarak puan verdiği bir sıra yıldız. OzdenUI'ın bileşenleri de aynı yolla yazılır; kitin tam başlangıç noktası `_component-template.js` dosyasıdır.

---

## Bileşenin Tamamı

```javascript
"use strict";

// Default values:
const StarRatingDefaults = {
    key: "0", // Nesneye sizin verdiğiniz ad: bir olayda okunur (self.key)
    width: "auto",
    height: "auto", // Yıldız grubuyla büyür.
    value: 0, // 0 ... maxValue
    maxValue: 5,
    enabled: 1,
    ariaLabel: "Puan",
    onChange: function (self) { }, // Oluşturulurken ve setValue(value, 1) ile çağrılmaz
    styleName: "light", // "light", "dark" ya da StarRating.styles'a eklenen bir ad
    style: { // Açık stil paketi (varsayılan)
        layout: { gap: 4 },
        star: { fontSize: 28, textColor: Black(0.2) },
        on: { textColor: "#F2B01E" },
        disabled: { opacity: 0.45 },
        focus: { ringColor: "rgba(95, 158, 160, 0.6)" },
    },
};

const StarRating = function (params = {}) {

    // Stil paketini birleştir: params.style > StarRating.styles[styleName] > StarRatingDefaults.style
    basic.applyStylePackage(params, StarRating.styles, StarRatingDefaults);

    // Parametreleri birleştir:
    mergeIntoIfMissing(params, StarRatingDefaults);

    // BOX: bileşenin kabı
    let box = startObject(params);

    // *** PRIVATE VARIABLES:
    const _s = box.style;

    // *** PUBLIC VARIABLES:
    box.stars = []; // Yıldızların Label'ları
    // NOTE: Varsayılanlar da açık değişkendir: box.value, box.maxValue, box.enabled...

    // *** PRIVATE FUNCTIONS:

    // PAINT: değerin ve durumun görünüşü
    const paint = function () {
        box.stars.forEach(function (star, index) {
            star.textColor = (index < box.value) ? _s.on.textColor : _s.star.textColor;
            star.cursor = (box.enabled == 1) ? "pointer" : "default";
        });
        box.opacity = (box.enabled == 1) ? 1 : _s.disabled.opacity;
        box.tabIndex = (box.enabled == 1) ? 0 : -1;
        box.aria = { valuenow: box.value, disabled: (box.enabled != 1) };
    };

    // *** PUBLIC FUNCTIONS:

    // silent: 1 -> onChange çağrılmaz.
    box.setValue = function (value, silent = 0) {
        value = Math.max(0, Math.min(box.maxValue, Math.round(value)));
        if (value === box.value) return;
        box.value = value;
        paint();
        if (!silent) box.onChange(box);
    };
    // USAGE: get: rating.value, set: rating.setValue(4)

    box.setEnabled = function (value) {
        box.enabled = basic.isOn(value) ? 1 : 0;
        paint();
    };
    // USAGE: rating.setEnabled(0)

    // *** OBJECT VIEW:

    box.role = "slider";
    box.aria = { label: box.ariaLabel, valuemin: 0, valuemax: box.maxValue };

    // GROUP: bir sıra yıldız
    box.layout = HGroup({ hug: 1, position: "relative", align: "left center", ..._s.layout });

        for (let number = 1; number <= box.maxValue; number++) {
            const star = Label({ text: "★", ..._s.star });
            star.on("click", function () {
                if (box.enabled != 1) return;
                box.setValue(number);
            });
            box.stars.push(star);
        }

    endGroup();

    // *** OBJECT INIT CODE:

    // KEYBOARD: oklar değeri değiştirir. Halka yalnızca klavyede görünür.
    box.setFocusRing(_s.focus.ringColor);
    box.on("keydown", function (self, event) {
        if (box.enabled != 1) return;
        const isUp = (event.key === "ArrowRight" || event.key === "ArrowUp");
        const isDown = (event.key === "ArrowLeft" || event.key === "ArrowDown");
        if (!isUp && !isDown) return;
        event.preventDefault(); // WHY: oklar sayfayı kaydırmamalı
        box.setValue((isUp) ? box.value + 1 : box.value - 1);
    });

    paint();

    return endObject(box);

};

// *** STYLE PACKAGES:
// NOTE: Bir paket yalnızca varsayılan (light) stilden farklı anahtarları taşır.
StarRating.styles = {
    light: StarRatingDefaults.style,
    dark: {
        star: { fontSize: 28, textColor: White(0.25) },
        focus: { ringColor: "rgba(95, 179, 181, 0.7)" },
    },
};
```

Kullanımı:

```javascript
const start = function () {

    page.color = "whitesmoke";

    VGroup({ gap: 16 });

        const lblInfo = Label({ text: "Bu sayfayı puanlayın", fontSize: 18 });

        const rating = StarRating({
            value: 3,
            onChange: function (self) {
                lblInfo.text = "Puan: " + self.value;
            },
        });

    endGroup();

};
```

Parçaları, tek tek:

---

## 1. Varsayılanlar

- **`StarRatingDefaults`** her parametreyi varsayılan değeri ve bir açıklamayla tutar. `mergeIntoIfMissing(params, StarRatingDefaults)` verilmeyen parametreleri doldurur (`params`'ı değiştirir).
- **`startObject()`'ten sonra her parametre kutunun bir özelliğidir:** `box.value`, `box.maxValue`, `box.onChange`. Sayfa da onları aynı yolla okur: `rating.value`.
- **Adlar** `14-using-components.md`'deki tablodan gelir ("Parametrelerin Adları"): `value`, `maxValue`, `enabled`, `ariaLabel`, `onChange(self)`.
- **Bir varsayılana asla basic.js'in bir setter'ının adı verilmez:** `text`, `color`, `title`, `html`, `visible`, `zoom`... Kutuda bu setter'lar zaten vardır: `text` kutunun üstüne yazar, `html` parçalarını siler. Bunların yerine `labelText`, `htmlText`, `scale` kullanın.
- **`"auto"` ve `"100%"`'ü `startObject()`'ten önce, `params`'tan okuyun:** ondan sonra `box.width` ve `box.height` ölçülmüş sayılardır.

```javascript
const isAutoHeight = (String(params.height) === "auto");
let box = startObject(params);
```

---

## 2. Kutu ve Parçaları

- **`startObject(params)`** bileşenin kutusunu yapar. `endObject(box)`'a kadar yapılan nesneler onun içine girer; `endObject(box)` kutuyu döndürür ve `that`'i bileşen yapar.
- **Parçaları bir adla kutunun üzerinde tutun** (`box.layout`, `box.stars`): bileşenin fonksiyonları, bir sayfa ve ondan yapılan bir bileşen onlara oradan ulaşır.
- **Parçaları bir grup yerleştirir** (`box.layout`). `height: "auto"` olan bir kutu yalnızca akıştaki şeylerle büyür: grup `position: "relative"` alır (`hug: 1` genişliğini ve yüksekliğini `"auto"` yapar).
- **Bir bileşen, bir dosya:** adıyla (`star-rating.js`), başında bir açıklama bloğuyla: adı ve sürümü, ne yaptığı, `USAGE` satırları.
- **Bölümler** her bileşende aynı sıradadır: `// *** PRIVATE VARIABLES:`, `// *** PUBLIC VARIABLES:`, `// *** PRIVATE FUNCTIONS:`, `// *** PUBLIC FUNCTIONS:`, `// *** OBJECT VIEW:`, `// *** OBJECT INIT CODE:`, fonksiyondan sonra da `// *** STYLE PACKAGES:`.
- **Varsayılan bir ikon dosyanın içinde bir SVG'dir** (`"data:image/svg+xml;utf8," + encodeURIComponent('<svg ...>')`); böylece dosyanın bir kopyası tek başına çalışır. Öteki dosyalar aynı adlı bir klasöre gider (`star-rating/`).
- **Bir metin `plainText` ile yazılır** (`Label.text` HTML'dir). Bileşenin metinleri sayfanın HTML'i olabilecekse bir `allowHtml: 0` parametresi ve `text` ya da `plainText` yazan tek bir `setText(label, text)` olur (`comp/dialog.js`). `test/components-test.htm` her `...Text` parametresini denetler.

---

## 3. Durumu Çizmek

- **Durumun görünüşünü tek bir fonksiyon çizer:** `paint()`. Her değişiklik onu çağırır; böylece hiçbir setter bir parçayı unutamaz.
- **Daha büyük bir bileşen çizimini işine göre böler:** `applyContent()` (metinler, ikon), `paint()` (durumun renkleri), `refreshLayout()` (boyutlara bağlı olan), `drawAll()` (hepsi). Bir değişiklik yalnızca gerektiğini çağırır: fare üstüne gelince yalnızca boyanır.
- **Durum tek bir yerde belirlenir:** `paint()`'in okuduğu, `"normal"`, `"hover"`, `"selected"` ya da `"disabled"` veren bir `getState()`.

---

## 4. setX() Fonksiyonları

Bileşen yapıldıktan sonra değişebilen bir değer, kendi adıyla bir setter alır: `setValue()`, `setEnabled()`. Setter bu sırayla denetler, kaydeder, çizer ve haber verir:

```javascript
box.setValue = function (value, silent = 0) {
    value = Math.max(0, Math.min(box.maxValue, Math.round(value)));
    if (value === box.value) return;   // bir şey değişmedi: ne çizim ne olay
    box.value = value;                 // kaydet
    paint();                           // çiz
    if (!silent) box.onChange(box);    // haber ver
};
```

Bir parametre, `setX()`'i olan düz bir özelliktir; asla bir JavaScript getter / setter'ı (`get value()`) değildir.

---

## 5. Olaylar

- **Olay, bir fonksiyon tutan bir varsayılandır:** `onChange: function (self) { }`. Bileşen onu önce kendisini vererek çağırır: `box.onChange(box)`.
- **`onChange` yalnızca değer gerçekten değişince çağrılır:** oluşturulurken ve `silent: 1` ile çağrılmaz.
- **Parçaların olayları:** `star.on("click", ...)`. `on()` nesneyi tıklanabilir yapar.

---

## 6. Stil Paketleri

- **İlk satır `basic.applyStylePackage(params, StarRating.styles, StarRatingDefaults)`'tur.** Kutunun stili artık şudur: `params.style`, `styleName`'in paketinin üstünde; o da varsayılan stilin üstünde. Paket kopyalanır, asla değiştirilmez.
- **`StarRating.styles.light` varsayılan stildir;** başka bir paket yalnızca farklı anahtarları taşır (`dark`).
- **Bileşen stilini `_s` ile okur** (`const _s = box.style`).
- **Bir sayfa kendi paketini ekleyebilir:**

```javascript
StarRating.styles.red = { on: { textColor: "tomato" } };
StarRating({ styleName: "red", value: 4 });
```

- **Stili düz tutun:** bir parça ve anahtarları (`star: { fontSize, textColor }`). `mergeIntoIfMissing` 4 seviye kopyalar; daha derindeki nesneler paylaşılır.

---

## 7. Klavye ve Ekran Okuyucu

- **`box.role` ve `box.aria`** bir ekran okuyucuya bileşenin ne olduğunu söyler: `role: "slider"`, `aria-valuenow`, `aria-valuemax`. `box.aria = { ... }` yalnızca verilen anahtarları ayarlar.
- **`box.tabIndex = 0`:** Tab tuşu ona ulaşır; kapalıyken `-1`.
- **`box.setFocusRing(color)`:** klavye odağı için bir halka, tıklamadan sonra değil.
- **Enter ve Boşluk** basılan bir bileşende tıklama gibi çalışır; **oklar** bir değeri değiştirir. `event.preventDefault()` sayfanın kaymasını önler.

---

## 8. Hareket

- **Hareket eden bir bileşen bir `animated` parametresi** (`1` / `0`) ve bir `setAnimated()` alır. `animated: 0` onu tamamen hareketsiz bırakır.
- **Küçük ve sessiz:** tek bir süre ve tek bir eğri, `0.25s cubic-bezier(0.2, 0.8, 0.2, 1)`; yalnızca `transform`, `opacity` ve `box-shadow` hareket eder; ilk görünüşte hiçbir şey hareket etmez. Hareket `setMotion()` ile verilir (`10-motion.md`).
- **Daha az hareket:** sistem bunu istediğinde bileşen hareket etmez:

```javascript
const isMotionOn = function () {
    if (box.animated != 1) return false;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};
```

---

## 9. Temizlik

basic.js'in `remove()`'u kutuyu parçaları ve onların olaylarıyla kaldırır. Kutu üzerinden kaydedilen global bir şey de onunla gider; bu yüzden çoğu bileşenin kendi `remove()`'una ihtiyacı yoktur:

```javascript
box.listenTo(window, "keydown", function (self, event) { ... }); // window.addEventListener değil
box.onPageResize(function () { ... });                            // page.onResize değil
box.after(300, function () { ... });                              // setTimeout değil
box.every(1000, function () { ... });                             // setInterval değil
```

- **Her şeyin üstünde duran bir liste ya da menü** `page` üzerinde yapılır ve `box.own()` ile tutulur: bileşenle birlikte kaldırılır. Bir `Dialog`'daki bir alandan açıldığında `basic.zIndexAbove(box, minimum)` alanın katmanının üstünde bir z-index verir.

```javascript
box.menu = box.own(createIn(page, function () {
    return Box({ width: 200, height: 120, color: "white", visible: 0 });
}));
box.menu.zIndex = basic.zIndexAbove(box, 100);
```

- **`remove()`'u yalnızca basic.js'in bilemeyeceği şey için yeniden yazın** (bütün bileşenlerin bir listesi, bir gözlemci):

```javascript
// WHY yerel kopya: bundan yapılan bir bileşen kendi box.superRemove'unu yazar.
const superRemove = box.remove;
box.superRemove = superRemove;
box.remove = function () {
    if (!box) return;                 // WHY: remove() iki kez çağrılabilir (üstünün remove()'u da çağırır)
    StarRating.all = StarRating.all.filter(function (other) { return other !== box; });
    superRemove.call(box);            // basic.js'in remove()'u: parçalar ve olayları
    box = null;                       // bu yüzden box let ile tanımlanır
};
```

- **Bir bileşenin asla `destroy()`'u olmaz:** her şey `remove()` ile gider.

---

## 10. Başka Bir Bileşenden Yapılan Bileşen

`startExtendedObject(StarRating, params)` bir `StarRating` yapar ve kutusunu verir; yeni kod ona ekler, `endExtendedObject(box)` da `that`'i yeni bileşen yapar. Dosyası `StarRating`'in dosyasından sonra yüklenir.

```javascript
// Değerini de yazan bir StarRating: "3 / 5".
const StarRatingWithText = function (params = {}) {

    // BOX: yıldızlarıyla bir StarRating'in kutusu
    const box = startExtendedObject(StarRating, params);

    // *** PUBLIC FUNCTIONS:
    // WHY saklanan fonksiyon: yeni setValue() önce StarRating'inkini çağırır, sonra yazıyı yazar.
    const superSetValue = box.setValue;
    box.setValue = function (value, silent = 0) {
        superSetValue(value, silent);
        box.lblValue.text = box.value + " / " + box.maxValue;
    };

    // *** OBJECT VIEW:
    // WHY createIn(): burada yapılan nesneler kutuya değil, sayfanın kabına giderdi.
    box.lblValue = createIn(box.layout, function () {
        return Label({ text: box.value + " / " + box.maxValue, fontSize: 16, textColor: Black(0.5) });
    });

    return endExtendedObject(box);

};
```

`StarRating`'in tıklamaları ve okları `box.setValue()`'yu çağırır; böylece yenisine de ulaşırlar.

---

## Kısa Kontrol

1. Her parametre `XxxDefaults` içinde, bir açıklamayla ve tablodaki bir adla durur.
2. Hiçbir varsayılan basic.js'in bir setter'ının adını taşımaz (`text`, `color`, `title`, `html`, `visible`, `zoom`).
3. Değişen bir değerin bir `setX()`'i vardır; `onChange(self)` yalnızca gerçekten değişince çağrılır.
4. Bir `light` ve bir `dark` paketi vardır.
5. Klavye ona ulaşır ve onu kullanır; bir `role`'ü, `aria` anahtarları ve bir odak halkası vardır.
6. Global bir şey kutu üzerinden kaydedilir; böylece onu yalnızca `remove()` temizler.
7. Dosyasının bir kopyası tek başına çalışır: ikonları içindedir.
