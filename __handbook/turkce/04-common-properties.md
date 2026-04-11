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

---

## Görünüm ve Stil (Visuals)

- `color` (String) — Objenin zemin / arkaplan rengini ayarlar (Örn: `"red"`, `"#FFFFFF"`, `"rgba(0,0,0,0.5)"`).
- `visible` (Boolean) — `1` ise ekranda belirir (CSS block), `0` ise tamamen kaybolup diğerlerine yer açar (CSS none).
- `opacity` (Float) — Şeffaflık seviyesi (Max: `1` görünür, Min: `0` görünmez).
- `round` (Integer) — Köşelerin yuvarlaklık radius derecesi. Sayı kutunun yarısını aşarsa nesne oval (daire) olur.
- `border` (Integer) — İç alan sınırları çizen kenarlık kalınlığı (`0` ise gizlenir, `1` ise ince siyah çizgi). Objeyi dışarıya taşırmaz. İçeriden çizer.
- `borderColor` (String) — Kenarlık (border) atandıysa çizginin rengini belirler.
- `fontSize` / `textColor` / `textAlign` — Nesne metin taşıyorsa onun stili değiştirilir. Standart yazı büyüklüğü `20` px boyutundadır. Hizalama (textAlign) `"center"`, `"right"` vb. olabilir.
- `rotate` (Integer) — CSS rotate özelliğiyle objeyi çevirir (Derece olarak alır: `90`, `360` vb.).

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

---

## DOM ve Ebeveyn Ağacı

- `object.elem` — Kütüphanenin yarattığı elemanın bizzat Javascript (Document Object Model) altındaki Element karşılığıdır. `elem.style` ile her şeye müdahale edilebilir.
- `object.containerBox` veya `object.parentBox` — Objenin eklendiği Container (Box sınıfından doğar) değişkenini getirir. (`page` nesnesi genel varsayılan konteynerdir).
- `object.remove()` — Objeyi ekrandan DOM modelinden, olaylardan ve ebeveyn ağacından kalıcı siler.
