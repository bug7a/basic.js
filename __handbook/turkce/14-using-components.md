# basic.js — Bileşenleri Kullanmak (Using Components)

Bileşen, basic.js ile yapılmış hazır bir sayfa parçasıdır: ikonlu bir buton, başlıklı bir metin alanı, bir liste, bir pencere. OzdenUI'ın bileşenleri `comp/` klasöründedir, her biri tek bir `.js` dosyasıdır; kataloğu hepsini gösterir: https://bug7a.github.io/js-components/

Bu bölüm hepsinde ortak olanı anlatır. Bir bileşenin kendi parametreleri dosyasının başında ve örnek sayfasındadır. Kendi bileşeninizi yazmak için: `15-making-a-component.md`.

---

## Bileşeni Yüklemek

```html
<!-- LIBRARY FILES -->
<link rel="stylesheet" type="text/css" href="basic/basic.css">
<script src="basic/basic.js" type="text/javascript" charset="utf-8"></script>

<!-- COMPONENT FILES -->
<script src="comp/smart-button.js" type="text/javascript" charset="utf-8"></script>
<script src="comp/tooltip.js" type="text/javascript" charset="utf-8"></script>
<script src="comp/text-field.js" type="text/javascript" charset="utf-8"></script>
<script src="comp/dialog.js" type="text/javascript" charset="utf-8"></script>
<script src="comp/select-box.js" type="text/javascript" charset="utf-8"></script>
```

- **Sıra:** önce `basic.css` ve `basic.js`, sonra bileşenler, en son sayfanızın kodu.
- **Bir bileşen başka birine ihtiyaç duyabilir**; o dosya ondan önce yüklenir: bir `Dialog`'un butonları `SmartButton`'dır. Başka bir bileşenden yapılmış bileşen ondan sonra gelir (`email-field.js`, `text-field.js`'ten sonra). Kesin liste, bileşenin örnek sayfasındaki `<script>` satırlarıdır: onları kopyalayın.
- **Bazı dosyalar yalnızca varsa kullanılır:** `tooltip.js` ondan önce yüklenmişse `TextField` uyarısının ipucunu bir baloncukta gösterir; `search-input.js` yüklenmişse `SelectBox` arama kutusunu bir `SearchInput` yapar, `scroll-bar.js` yüklenmişse listesine bir `ScrollBar` verir.
- **Bir bileşen, basic.js'in bir sürümü için yazılmıştır:** onu, birlikte geldiği `basic.js` kadar yeni (ya da daha yeni) bir `basic.js` ile kopyalayın.

---

## Bileşen Oluşturmak

Bileşen, temel nesneler gibi tek bir parametre nesnesi alır ve kutusunu döndürür: parçalarını içinde tutan bir `Box`. Bu yüzden her nesne gibi yerleştirilir: `left` ve `top` ile ya da bir grubun içinde. Oluşturulduktan sonra `that` bileşenin kendisidir.

```javascript
const start = function () {

    page.color = "whitesmoke";

    VGroup({ gap: 16 });

        const fldName = TextField({
            styleName: "ozden",
            titleText: "Ad",
            placeholder: "Adınız",
            onChange: function (self) {
                btnSave.setEnabled(self.value !== "");
            },
        });

        const btnSave = SmartButton({
            labelText: "Kaydet",
            tone: "cyan",
            enabled: 0,
            onClick: async function (self) {
                const isSure = await Dialog.confirm({
                    titleText: "Ad kaydedilsin mi?",
                    messageText: fldName.value,
                    confirmText: "Kaydet",
                });
                if (isSure) self.setLabelText("Kaydedildi");
            },
        });

    endGroup();

};
```

Bir ad yazılınca buton açılır ve kaydetmeden önce sorar. Verilmeyen bir parametre varsayılan değerinde kalır: varsayılanlar bileşenin dosyasının başındadır (`TextFieldDefaults`), her birinin bir açıklaması vardır ve her biri bileşenin bir özelliğidir de (`fldName.titleText`).

---

## Görünüşü: styleName ve style

- **`styleName`** bileşenin bir stil paketini seçer (`TextField.styles`). Yeni bir bileşende `light` (varsayılan) ve `dark` vardır; çoğunda daha fazlası da: `minimal` / `minimalDark` (küçük, çizgilerden), `ozden` / `ozdenDark`. Koyu bir sayfa koyu paketi alır.
- **`style`** paketin yalnızca bazı anahtarlarını değiştirir; ötekiler kalır.
- **`tone`** bir `SmartButton`'ın rengidir: ana iş için `"cyan"`, silmek için `"orange"`...

```javascript
SmartButton({ labelText: "Gönder", tone: "cyan", style: { box: { round: 22 } } });
TextField({ styleName: "ozdenDark", titleText: "E-posta" });
```

---

## Parametrelerin Adları

Bileşenler aynı şey için aynı adı kullanır; böylece bir sayfa bir bileşenden ötekine geçerken ad aramaz:

| Ne | Ad |
|---|---|
| Bir denetimin değeri | `value` (işaret kutusu: `checked`; bir aralık: `minValue`, `maxValue`, `step`) |
| Gösterilen bir metin | `...Text`: `labelText`, `titleText`, `messageText`, `descriptionText` |
| Boş alandaki ipucu | `placeholder` |
| Ekran okuyucunun okuduğu ad | `ariaLabel` (ikon butonu buna ihtiyaç duyar) |
| Açık / kapalı (`1` / `0`) | `enabled`, `required`, `selected`, `animated` |
| Gösterilebilen bir parça | `show...`: `showDescription`, `showSearch` |
| Bir resim, bir ikon | `...IconFile`: `iconFile` |
| Görünüş | `styleName`, `style` |
| Değer değişti | `onChange(self)` |
| Başka bir olay | `onClick(self)`, `onOpen(self)`: önce bileşenin kendisi gelir |
| Nesneye sizin verdiğiniz ad | `key`: bir olayda okunur (`self.key`) |
| Bir listenin öğesi | `key`, `text`, `description`, `iconFile`, `enabled: 0` |
| Bir form denetiminin seçeneği (`SelectBox`) | `value`, `label`, `disabled`: HTML `<option>`'ın adları |

---

## Oluşturulduktan Sonra: setX()

- Bileşenden bir değeri **okuyun**: `fldName.value`, `btnSave.labelText`.
- Onu bir `setX()` fonksiyonuyla **değiştirin**: `fldName.setValue("Ada")`, `btnSave.setEnabled(0)`, `btnSave.setLabelText("Kaydedildi")`. Fonksiyon değeri kaydeder ve çizer. Doğrudan yazılan bir özellik (`btnSave.labelText = "Kaydedildi"`) yalnızca kaydedilir: bileşen onu görmez.
- Bir setter parametresinin tam adını alır: `setValue()`, `setLabelText()`, `setTitleText()`. Bir bileşenin setter'ları dosyasındaki `USAGE` satırlarındadır.
- `silent` alan bir setter, değeri `onChange`'i çağırmadan değiştirir: `selLanguage.setValue("tr", 1)`.

---

## Olaylar

Olay, bir fonksiyon tutan parametredir; ilk argümanı bileşenin kendisidir:

```javascript
const selLanguage = SelectBox({
    options: [{ value: "tr", label: "Türkçe" }, { value: "en", label: "English" }],
    value: "en",
    onChange: function (self) {
        println("Dil: " + self.value);
    },
});
```

- **`onChange` değer değişince çağrılır**, düz bir `setValue()` ile de. Bileşen oluşturulurken ve `silent: 1` ile çalışan bir setter'da çağrılmaz. Üç eski bileşen onu `setValue()`'dan hiç çağırmaz ve bunu `onChange` açıklamasında söyler: `TextField` (ve ondan yapılan alanlar), `Slider` ve `JsonEditor`.
- Bir olay sonradan da verilebilir: `btnSave.onClick = function (self) { ... };`

---

## Bileşeni Kaldırmak

`fldName.remove()` bileşeni bütün parçalarıyla kaldırır: nesneleri, olayları, zamanlayıcıları ve sayfada açtığı listeler ile menüler. Bir bileşenin `destroy()`'u yoktur.

---

## Bilinmesi Gerekenler

- **Bir grup dışına taşanı keser** (`clipContent: 1`): bir gölgeyi, klavye odağının halkasını, büyüyen bir butonu. Böyle bir gruba `clipContent: 0` verin.
- **`page.fit()` ile sığdırılmış bir sayfada** ekran pikseli için yapılmış bileşenler yakınlaştırmayla küçülür: `basic.uiScale` boyutlarını korur (`08-page.md`).
- **`animated: 0`** hareket eden bir bileşenin hareketini durdurur. Sistem daha az hareket istediğinde de hareketi durur.
- **Klavye:** bileşenler Tab, Enter, Boşluk ve ok tuşlarıyla çalışır. Bir ikon butonu (`labelText` olmadan) bir `ariaLabel` ister.
- Bir alandan açılan liste ya da menü, bir `Dialog`'un üstüne kendiliğinden çıkar.
- **Metinler yazıldığı gibi gösterilir:** `<b>` içeren bir `labelText` ya da `titleText` `<b>` olarak görünür; böylece bir kullanıcının yazdığı ad HTML olarak çalışamaz. Sayfanızın kendi HTML'i için bileşene `allowHtml: 1` verin.

---

## Hangi İş İçin Hangi Bileşen

Kitin yeni bir sayfa için bileşenleri ve açık ile koyu sayfadaki görünüşleri. Yeni sayfalar için olmayan bir bileşen bunu dosyasının başında (`NOT FOR NEW PROJECTS`) ve katalogda söyler.

| İhtiyaç | Bileşen (dosya) | Açık sayfa | Koyu sayfa |
|---|---|---|---|
| Bir buton | `SmartButton` (`smart-button.js`) | `ozden` (varsayılan); ana iş için `tone: "cyan"` | `ozdenDark`; `tone: "cyanDark"` |
| Bir arama kutusu | `SearchInput` (`search-input.js`) | `ozden` | `ozdenDark` |
| İşaret kutusu, radyo butonu | `CheckBox` (`check-box.js`), `RadioButton` (`radio-button.js`) | `light` | `dark` |
| Bir metin alanı | `TextField` (`text-field.js`) ve ondan yapılan alanlar: `EmailField`, `PasswordField`, `PhoneField`, `NumberField`, `CurrencyField`, `UrlField`, `TextAreaField` (her biri kendi dosyasında) | `light` | `dark` |
| Bir liste | `ItemList` (`item-list.js`) | `ozden` (varsayılan) | `ozdenDark` |
| Açılır liste | `SelectBox` (`select-box.js`) | `light` | `dark` |
| Büyük bir tablo | `SmartTable` (`smart-table.js`) | `light` | `dark` |
| Bir grafik | `GraphBox` (`graph-box.js`) | varsayılan | `theme: "dark"` |
| Bir kaydırıcı | `Slider` (`slider.js`) | `round` | `roundDark` |
| Bir baloncuk, bir açılır kutu | `Tooltip` (`tooltip.js`) | | |
| Bir pencere | `Dialog` (`dialog.js`) | `ozden` (varsayılan) | `ozdenDark` |
| Bir yükleme ekranı | `LoadingScreen` (`loading-screen.js`) | | |
| Kayan bir sayfa ya da bölüm | `ScrollArea` (`scroll-area.js`): `ScrollArea({ gap: 20, padding: 40 })` ... `endGroup()`; bir grupta öteki nesnelerin bıraktığı yeri alır | `light` | `dark` |

---

## Bir Bileşeni Öğrenmek

- **Dosyasının başı:** ne yaptığı, varsayılanları (her birinin bir açıklaması) ve fonksiyonlarının `USAGE` satırları.
- **Örnek sayfaları** (`02-comp-examples/`): her görünüşü, kopyalanmaya hazır.
- **Katalog:** https://bug7a.github.io/js-components/
