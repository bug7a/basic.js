# basic.js — Autolayout (Otomatik Yerleşim)

basic.js kütüphanesi ile nesneleri ekranda otomatik olarak hizalamak için **HGroup()** ve **VGroup()** fonksiyonları kullanılır. Bu fonksiyonlar CSS Flexbox altyapısını kullanarak nesneleri yatay veya dikey olarak sıralar.

---

## Temel Nesneler (Basic Objects)

- `Box()` — Kutu nesnesi (div)
- `Label()` — Metin etiketi
- `Button()` — Buton
- `Icon()` — Görsel / İkon
- `Input()` — Metin giriş alanı

---

## Position Davranışı (Çok Önemli!)

Temel nesnelerin `.position` değeri varsayılan olarak **`"absolute"`** dır.

- **Absolute (Varsayılan):** Nesne, `top` ve `left` gibi konum değerleri verilmezse ekranda **görüntülenmez** (nesne, ekran dışında oluşturulur).
- **Relative (Grup içinde):** Bir nesne `HGroup()` veya `VGroup()` içinde oluşturulursa, `.position` değeri otomatik olarak **`"relative"`** olur. Bu sayede nesne konum belirtilmeden **otomatik olarak sıraya girer**.

```javascript
// ❌ Grup dışında: position = "absolute" (konum verilmezse görünmez)
Label({ text: "Merhaba" });  // Konum yok → ekranda görülmez

// ✅ Grup içinde: position = "relative" (otomatik sıralama)
HGroup();
    Label({ text: "Merhaba" });  // Otomatik sıraya girer
endGroup();
```

---

## HGroup() — Yatay Gruplama

İçindeki nesneleri **yatay (horizontal)** olarak yan yana sıralar.

```javascript
HGroup({ /* parametreler */ });

    // Nesneler buraya eklenir...

endGroup();
```

## VGroup() — Dikey Gruplama

İçindeki nesneleri **dikey (vertical)** olarak alt alta sıralar.

```javascript
VGroup({ /* parametreler */ });

    // Nesneler buraya eklenir...

endGroup();
```

> **Not:** Her `HGroup()` veya `VGroup()` çağrısından sonra **mutlaka `endGroup()` ile kapatılmalıdır.** Her ikisi için de aynı `endGroup()` fonksiyonu kullanılır.

> **Varsayılan Boyut:** HGroup ve VGroup nesneleri varsayılan olarak `left: 0`, `top: 0`, `width: "100%"`, `height: "100%"` değerleriyle oluşturulur. Yani parametre verilmezse bulunduğu kapsayıcıyı tamamen kaplar. Eğer `fit: 1` parametresi verilirse, grup nesnesi içindeki nesneleri tam olarak sarar (`width: "auto"`, `height: "auto"`).

---

## Parametreler

`HGroup()` ve `VGroup()` fonksiyonları bir parametre objesi alır. Kullanılabilecek parametreler:

### Düzen Parametreleri

- `align` (string, varsayılan: `"center"`) — İçeriklerin hizalanma yönü.
- `gap` (number / string, varsayılan: `"0px"`) — Nesneler arası boşluk (piksel).
- `padding` (number / array) — İç kenar boşluğu. Tek değer veya `[yatay, dikey]` şeklinde dizi.
- `fit` (boolean) — `true` ise boyut içeriğe göre otomatik ayarlanır (`width/height: "auto"`).
- `flow` (string) — Akış yönü. HGroup: `"horizontal"`, VGroup: `"vertical"`. Otomatik ayarlanır.

### align Değerleri

`align` parametresi iki yönlü hizalama sağlar:

- `"top left"` — Sol üst
- `"top center"` — Üst orta
- `"top right"` — Sağ üst
- `"center left"` — Sol orta
- `"center"` — Tam orta (varsayılan)
- `"center right"` — Sağ orta
- `"bottom left"` — Sol alt
- `"bottom center"` — Alt orta
- `"bottom right"` — Sağ alt

> **İpucu:** Yön sırası değiştirilebilir. `"left top"` ile `"top left"` aynı sonucu verir.

### Görünüm Parametreleri (Box ile ortak)

- `width` (number / string) — Genişlik (ör: `200`, `"100%"`, `"auto"`, `"calc(100% - 20px)"`).
- `height` (number / string) — Yükseklik.
- `color` (string, varsayılan: `"transparent"`) — Arka plan rengi.
- `border` (number) — Kenarlık kalınlığı.
- `borderColor` (string) — Kenarlık rengi.
- `round` (number) — Köşe yuvarlaklığı.

---

## Gruba Sonradan Nesne Ekleme (.add)

`endGroup()` ile kapatılmış bir gruba, dışarıda oluşturulan nesneler `.add()` metodu ile sonradan eklenebilir.

**Önemli:** Grup dışında oluşturulan nesnenin `.position` değeri varsayılan olarak `"absolute"` olur. Bu durumda iki seçenek vardır:

1. `position: "relative"` ile oluşturup otomatik sıralamaya dahil etmek.
2. `top` / `left` gibi konum değerleri vererek grup kutusu içinde manuel konumlandırmak.

```javascript
// Grup oluştur ve kapat
const grp = HGroup({ align: "center", gap: 10 });

    Box({ width: 40, height: 40, color: "tomato" });

endGroup();

// Dışarıda yeni bir nesne oluştur
const lbl = Label({ text: "Sonradan Eklendi" });

// Gruba taşı (position hâlâ "absolute")
grp.add(lbl);

// Seçenek 1: Otomatik sıralama için position değiştir
lbl.position = "relative";

// Seçenek 2: Konum vererek grup içinde konumlandır (absolute kalır)
// lbl.top = 10;
// lbl.left = 50;
```

---

## Örnekler

### Örnek 1: Basit Yatay Sıralama

Üç kutuyu yan yana sıralar:

```javascript
window.onload = function() {

    const BOX_SIZE = 50;

    HGroup({ align: "center", gap: 10 });

        Box({ width: BOX_SIZE, height: BOX_SIZE, color: "tomato" });
        Box({ width: BOX_SIZE, height: BOX_SIZE, color: "gold" });
        Box({ width: BOX_SIZE, height: BOX_SIZE, color: "dodgerblue" });

    endGroup();

};
```

### Örnek 2: Dikey Etiket Listesi

Etiketleri alt alta sıralar:

```javascript
window.onload = function() {

    VGroup({ align: "top left", gap: 4, padding: 20 });

        Label({ text: "Satır 1" });
        Label({ text: "Satır 2" });
        Label({ text: "Satır 3" });

    endGroup();

};
```

### Örnek 3: İç İçe Gruplar (Nested Groups)

Dikey grup içinde yatay bir satır:

```javascript
window.onload = function() {

    VGroup({ align: "top center", gap: 15, padding: 20 });

        Label({ text: "Başlık", fontSize: 24 });

        // Butonlar yan yana
        HGroup({ gap: 10, fit: 1 });

            Button(0, 0, 100, 40, { text: "Evet", color: "dodgerblue", textColor: "white" });
            Button(0, 0, 100, 40, { text: "Hayır", color: "lightgray" });

        endGroup();

    endGroup();

};
```

### Örnek 4: Bilgi Kartı

Kart benzeri bir yapı — ikon, başlık ve açıklama içerir:

```javascript
window.onload = function() {

    page.color = "#F0F2F5";

    // Kartı sayfada ortala
    HGroup();

        initCard({
            title: "Hoş Geldiniz",
            description: "basic.js ile kolay arayüz geliştirin.",
            button1: "Evet",
            button2: "Hayır",
        });

    endGroup();

};

const initCard = function(params = {}) {

    const defaults = {
        title: "title-text",
        description: "description-text",
        button1: "button1-text",
        button2: "button2-text",
        button1Color: "dodgerblue",
        button2Color: "lightgray",
    };

    // Marge params:
    mergeIntoIfMissing(params, defaults);

    const initView = function(params) {

        const { title, description } = params;

        VGroup({
            align: "top center",
            width: "auto",
            height: "auto",
            color: "white",
            padding: 30,
            gap: 10,
            border: 1,
            round: 8,
            borderColor: "lightgray",
        });

            Label({ text: params.title, fontSize: 22 });
            Label({ text: params.description, fontSize: 14, textColor: "gray" });

            initButtons(params);

        endGroup();

    };

    const initButtons = function(params) {

        const { button1, button2, button1Color, button2Color} = params;

        HGroup({ gap: 10, align: "center" });

            Button(0, 0, 120, 40, { 
                text: button1, 
                color: button1Color, 
                textColor: "white", 
                round: 6 
            });

            Button(0, 0, 120, 40, { 
                text: button2, 
                color: button2Color, 
                textColor: "white", 
                round: 6 
            });

        endGroup();

    };

    initView(params);

};


```

### Örnek 5: Döngü ile Nesne Oluşturma

Bir dizi üzerinden döngüyle nesneler oluşturma:

```javascript
const ITEMS = ["ID", "Name", "Email"];

window.onload = function() {

    HGroup({ align: "center", gap: 4, padding: 20 });

        ITEMS.forEach(text => {
            Label({
                text: text,
                color: "lightgray",
                round: 6,
                padding: [12, 6],
            });
        });

    endGroup();

};
```

---

## Özet

- `HGroup()` → Yatay sıralama → `endGroup()` ile kapatılır.
- `VGroup()` → Dikey sıralama → `endGroup()` ile kapatılır.

- Grup içindeki nesneler otomatik olarak `position: "relative"` olur.
- Grup dışındaki nesneler `position: "absolute"` kalır ve konum (top, left) belirtilmelidir.
- `endGroup()` her iki grup tipi için de aynıdır.
- Gruplar iç içe kullanılabilir (nested).
