# basic.js — Ortak Özellikler ve Metodlar (Common Properties)

`basic.js` kütüphanesindeki beş temel arayüz elemanı (**Box, Label, Button, Input** ve **Icon**) aynı çekirdek nesneden (`Basic_UIComponent`) türetildiği için ortaktır. Bu durum, pozisyon, boyutlandırma, stil atama ve olay dinleme (event) eylemlerinin tüm nesnelerde aynı komutlarla yapılabilmesini sağlar.

---

## Tanımlama Döngüsü (that ve prevThat)
Bir nesne oluşturulduğunda, farklı bir nesne oluşturulana kadar geçerliliğini korumak üzere otomatik olarak **`that`** global değişkenine atanır. Bir önceki oluşturulan nesneye ise **`prevThat`** değişkeni üzerinden erişilebilir.

```javascript
window.onload = function() {
    
    // 1. Nesne: KIRMIZI KUTU
    Box(10, 10, 100, 100, { color: "red" });

    // 2. Nesne: MAVİ KUTU (Bu nesne "that" oldu, kırmızı ise "prevThat")
    Box({ color: "blue" });

    // Mavi kutuyu Kırmızı kutunun yarı boyutuna getir
    that.width = prevThat.width / 2;
    that.height = prevThat.height / 2;

    // Mavi kutuyu, Kırmızı kutunun sağına hizala
    that.aline(prevThat, "right", 5, "center");

};
```

---

## Konumlandırma (Position)

### `object.left` ve `object.top`
Bütün boyutlar ve pozisyonlar piksel (`px`) tabanlı Float sayılardır ve doğrudan sayı atanır (Örn: `15.5`). Varsayılan değer `"-1000"` (ekran dışı) olduğundan nesneler atama yapılana dek görünmezler.
- `left` : Nesnenin sol ekran çizgisine olan uzaklığını belirtir.
- `top` : Nesnenin tavan (üst) ekran çizgisine olan uzaklığını belirtir.

### `object.right` ve `object.bottom`
Sağa veya aşağıya dayalı (yapışık) objeler oluşturmak için kullanılır. `right` kullanıldığında `left` kuralı iptal olur. Pencere yeniden boyutlansa da aradaki mesafe (margin) korunur.
- `right` : Nesnenin sağ bariyerinden içeri uzaklığı.
- `bottom` : Nesnenin zemin çizgisinden yukarı olan uzaklığı.

---

## Boyutlandırma (Dimension)

### `object.width` ve `object.height`
Sırasıyla objenin genişliğini ve yüksekliğini Float türünde belirler.
Pek çok nesne `width: "auto"` parametresini destekler. Ayrıca `width: "100%"` yüzdelik veya `"calc(100% - 10px)"` gibi hesaplamalı CSS değişkenlerini destekler.

- Standart Kutu (`Box`) — `100x100` değerinden başlar.
- Standart Buton (`Button`) — `130x50` değerlerinden başlar.

**Bir boyutu okumak bir ölçümdür.** `width` / `height` bir metin olduğunda (`"100%"`, `"auto"`, `"calc(...)"`) ya da bir gruptaki nesnenin `left` / `top` değeri okunduğunda, tarayıcı önce sayfayı yeniden yerleştirir. Bir döngüde yazmayı ve okumayı karıştırmayın (yaz, `center()`, yine yaz...): önce bütün değerleri okuyun, sonra yazın. Kendi verdiğiniz sayıları okumak bedavadır.

---

## Görünüm ve Stil (Visuals)

- `color` (String) — Objenin zemin / arkaplan rengini ayarlar (Örn: `"red"`, `"#FFFFFF"`, `"rgba(0,0,0,0.5)"`).
- `visible` (Boolean) — `1` ise ekranda belirir (CSS block), `0` ise tamamen kaybolup diğerlerine yer açar (CSS none).
- `opacity` (Float) — Şeffaflık seviyesi (Max: `1` görünür, Min: `0` görünmez).
- `round` (Integer) — Köşelerin yuvarlaklık radius derecesi. Sayı kutunun yarısını aşarsa nesne oval (daire) olur.
- `border` (Integer) — İç alan sınırları çizen kenarlık kalınlığı (`0` ise gizlenir, `1` ise ince siyah çizgi). Objeyi dışarıya taşırmaz. İçeriden çizer.
- `borderColor` (String) — Kenarlık (border) atandıysa çizginin rengini belirler.
- `fontSize` / `textColor` / `textAlign` — Nesne metin taşıyorsa onun stili değiştirilir. Standart yazı büyüklüğü `20` px boyutundadır. Hizalama (textAlign) `"center"`, `"right"` vb. olabilir.
- `rotate` (Integer) — Objeyi çevirir (derece olarak: `90`, `360` vb.). CSS `transform` değerinin yalnızca `rotate()` kısmını değiştirir: oradaki bir `translateY()` ya da `scale()` kalır. `setMotion("transform 0.3s")` ile hareketli olur.

---

## Metin: `text` ve `plainText`

- `text` HTML'dir: `Label({ text: "<b>Toplam</b>: 12" })`. Kendi metinleriniz için kullanın.
- `plainText` hiçbir zaman HTML olarak okunmaz. **Kullanıcıdan ya da sunucudan gelen her metin için onu kullanın** (bir ad, bir mesaj, bir dosya adı): `lblName.plainText = user.name;`. `text`'e verilen `<img onerror=...>` gibi bir metin kod olarak çalışır.

### Metin rengini izleyen bir ikon

Bir Label içindeki SVG'de `stroke="currentColor"` (ya da `fill="currentColor"`) yazın: ikon Label'ın `textColor` rengini alır. Böylece hover yalnızca `textColor`'ı değiştirir, SVG yeniden yazılmaz:

```javascript
const btnClose = Label({
    text: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    textColor: "#999",
    lineHeight: "0",
    cursor: "pointer",
});
btnClose.onHoverChange(function (self, isOver) {
    self.textColor = (isOver) ? "tomato" : "#999";
});
```

---

## Erişilebilirlik: `role`, `aria`, `tabIndex` (v26.10.23)

Bir Label ya da Box bir `<div>`'dir: ekran okuyucu onun bir buton ya da bir sekme olduğunu bilmez. Bunu şu özelliklerle söyleyin (odağı alan elemana yazılırlar, Input'ta `<input>`'a):

- `role` (String) — `"button"`, `"tab"`, `"tree"`, `"dialog"`... `""` kaldırır.
- `aria` (Object) — `{ label: "Kapat", selected: true, level: 2 }`, `aria-label`, `aria-selected`, `aria-level` yazar. Yalnızca verilen anahtarlar değişir. `true` / `false`, `"true"` / `"false"` olur; `null` özelliği kaldırır. Anahtarlar `aria-` olmadan ARIA adlarıdır (`labelledby`, `activedescendant` ARIA'daki gibi tek kelime).
- `tabIndex` (Number) — `0`: Tab tuşu nesneye ulaşır; `-1`: yalnızca kodun `elem.focus()`'u; `null`: elemanın varsayılanı.

```javascript
const btnSave = Label({ text: "Kaydet", role: "button", tabIndex: 0, aria: { label: "Formu kaydet" } });
btnSave.aria = { disabled: true }; // aria-label kalır
```

---

## Fonksiyonlar ve Olaylar (Events)

### `object.props`
Nesnenin pek çok değişkenini aynı anda değiştirmek için Array formunda pratik stil değişimidir.
`box.props({ width: 200, color: "black", round: 10 });`

### `object.clickable`
Nesnenin tıklama (mouse / pointer) algılayıp algılamayacağını `1` ve `0` boolean ile belirler.

### `object.on` ve `object.off`
Tüm temel HTML DOM olayları dinlenebilir. Örneğin: `click`, `mouseover`, `mouseout`. (Dikkat: Bir nesneye `.on("click", ...)` veya eskiden kullanılan adıyla `.onClick()` atandığında, `clickable = 1` şeklinde otomatik olarak tıklanabilir moda (imleç) döner). Taramayı engellemek için  `.off(OlayAdı, Fonksiyon)` kullanılır.

### `object.onResize`
Oluşturulan kutu boyutları akılcı bir şekilde değiştiğinde tetiklenir (Ayrıca obje sıfırdan ilk var olduğunda ekran takibini başlatmak için 1 kez çağrılır).

```javascript
let lblName = Label({ width: "auto", text: "İsim Etiketi" });
lblName.onResize(function(resizedLabel) {
    // Label veya Text içeriklerinin genişliği (auto) değiştikçe hep ekranın ortasına al
    resizedLabel.center();
});
```

---

## Hizalama ve Ortalamalar (Alignment)

- `object.center()` / `object.centerBy(target)` — Nesneyi merkezine ortalar veya hedeflenen "target" nesnesinin tam merkezine gelir. Parametre olarak (`"top"` veya `"left"`) girip sadece dikey/yatay merkezleme yaptırabilirsiniz.
- `object.aline(target, direction, space, secondDirection)` — Çok esnek bir dizi dizilim komutudur. Hedef olarak belirttiğiniz başka bir UI Nesnesine göre yaslanır. Yön (`"left", "right", "top", "bottom"`) ve objeler arası boşluk (`space`) pikseli yazılabilir.

*(Uyarı: `center`, `centerBy` ve `aline` fonksiyonları obje `position = "absolute"` iken hesaplama yapar ve çağrıldığı 1 sefere mahsus anında hizalar).*

---

## Hareket / Animasyon (Motion)

- `object.setMotion("kural zaman")` — Tüm değişimlerin veya atanan css string verilerinin (Örn: `opacity 0.5s`) akıcı olarak animasyonlu değişimini sağlar.
- `object.getMotion()` — Atanan String tabanlı hareket komut değerini gösterir.
- `object.withMotion(fonksiyon)` — İlk değerlerin sıçramaması için hareket işlemini çok kısa bir ertelemeye salan (zaman damgası atanaran) zeki bir fonksiyondur.
- `object.dontMotion()` — Kural atanmış bir objenin (setMotion yapılmışsa) anlık bir değişikliğinde animasyonu es geçmesine yarayan, duraklama komutudur.
- **`setMotion()` ile aynı anda yapılan değişiklik hareket etmez** (bilerek: yeni bir nesnenin ilk değerleri uçarak gelmemeli). Değeri sonra değiştirin (bir tıklama, bir zamanlayıcı) ya da hemen hareket etmesi gerekiyorsa `setMotionNow()` kullanın.
- **Gölgeli, çok sayıda hareketli nesne:** gölgeler her frame'de yeniden boyanır (300 kart: `left` ile de `translate` ile de frame başına ~110 ms). Onlara `css: { willChange: "transform" }` verin: her biri kendi katmanını alır ve 60 fps hareket eder. Gölge yoksa `left` yeterince hızlıdır.

---

## DOM ve Ebeveyn Ağacı

- `object.elem` — Kütüphanenin yarattığı elemanın bizzat Javascript (Document Object Model) altındaki Element karşılığıdır. `elem.style` ile her şeye müdahale edilebilir.
- `object.containerBox` veya `object.parentBox` — Objenin eklendiği Container (Box sınıfından doğar) değişkenini getirir. (`page` nesnesi genel varsayılan konteynerdir).
- `object.remove()` — Objeyi ekrandan DOM modelinden, olaylardan ve ebeveyn ağacından kalıcı siler. İçindeki basic.js nesneleri de silinir. Silinen bir nesneyi tekrar kullanmayın.
- **Bileşenler de `remove()` ile silinir.** Bir bileşen `remove()` fonksiyonunu kendisi genişletir (`const superRemove = box.remove;` … `superRemove.call(box);`) ve global kayıtlarını orada temizler: `window` / `document` olayları, zamanlayıcılar, `page.onResize` ve doğrudan `page` üzerinde oluşturduğu nesneler (menüler, açılır kutular). Yani tek çağrı yeterlidir: `myComponent.remove();`. (Eski bileşenlerde ayrı bir `destroy()` fonksiyonu vardı. `remove()`, varsa bir alt nesnenin `destroy()` fonksiyonunu hâlâ önce çağırır.)
