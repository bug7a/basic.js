# basic.js — Diğer Fonksiyonlar (Other Functions)

basic.js kütüphanesinin ekosistemini yönetmek ve varsayılan (default) davranışları manipüle etmek amacıyla arka planda çalışan global yardımcı fonksiyonlardır.

---

## 1. Döngü Zamanlayıcısı (Loop Timer)

**`setLoopTimer(milisecond)`**
Sayfanızda / projenizde genel geçer bir `loop()` fonksiyonu tanımladıysanız, bu fonksiyonun ne sıklıkla çalıştırılacağını (tekrar edileceğini) belirleyen metottur.
- Parametre olarak milisaniye (`Integer`) cinsinden süre verilir.
- Standart (varsayılan) değeri `1000`'dir (Yani saniyede 1 kez çalışır).

---

## 2. Varsayılan Kapsayıcı Yönetimi (Container Box)

Yeni bir arayüz elemanı oluşturulduğunda (Örneğin `Box()`, `Button()`), bu nesnenin içine ekleneceği ilk ana çatı varsayılan olarak `page` (Sayfa / MainBox) nesnesidir. Aşağıdaki fonksiyonlar aracılığıyla bu yapıya dışarıdan müdahale edilebilir.

**`setDefaultContainerBox(boxObject)`**
Oluşturulacak nesnelerin otomatik olarak (bizzat `.add()` yazılmasına gerek kalmadan) hangi objenin içine taşınacağını / ekleneceğini belirler.
- `page` dışında başka bir `Box` veya ebeveyn eleman verildiğinde, kod hiyerarşisindeki yaratılan yeni buton veya etiketler otomatik o nesnenin içerisine akar.
- Tekrar en başa dönmek ve varsayılan yapıyı sıfırlamak için `setDefaultContainerBox(page)` kullanılabilir.

**`getDefaultContainerBox()`**
Mevcut durumda yaratılan nesnelerin eklendiği ebeveyn nesneyi (`Box` veya `MainBox`) döndürür / okur.

**`restoreDefaultContainerBox()`**
Varsayılan listesinde / hiyerarşisinde belirlenmiş olan bir önceki konteyner kutusuna pratik bir şekilde geri dönmeyi sağlar.

**`createIn(container, func)`** (v26.09.18)
`func` fonksiyonunun sonucunu döndürür (v26.10.23). `func(container)` fonksiyonunu `container` varsayılan kap olacak şekilde çalıştırır ve ardından önceki kabı geri yükler; `func` hata fırlatsa bile. `setDefaultContainerBox(container)` ... `setDefaultContainerBox(previous)` ikilisinin güvenli hâlidir: zaten var olan bir kutunun içinde nesne oluşturmak için kullanın (örneğin bir bileşen oluşturulduktan sonra onun liste kutusuna satır eklemek için).

```javascript
const listBox = Box(20, 20, 240, 80, { color: "whitesmoke" });

createIn(listBox, function () {
    Label({ text: "Yeni satır" });
});
// Varsayılan kap, çağrıdan önceki ile aynıdır.
```

---

## 3. Yakınlaştırma Hesaplaması (Page Zoom)

**`withPageZoom(length)`**
`page.zoom` ayarı ile ekran ölçülerini (uzaklık/yakınlık) değiştirdiyseniz, bir `uzunluk (length)` birimini sayfanın güncel zoom değerine oranlayıp hesaplayarak (`Float`) olarak geri dönen zeki hesaplama ayarcısıdır. 

---

## 4. Özel Nesneyi Sisteme Bağlama

**`makeBasicObject(object)`**
Uygulamada kendi oluşturduğunuz özel tasarımlı / gelişmiş bir nesneyi, basic.js ekosistemine sorunsuzca entegre edip tanıtmayı sağlar.
- Fonksiyondan geçen nesneye, yeni bir basic.js nesnesi yaratılana dek global boyutlardaki `that` isimli değişkenden erişilebilir.
- Eğer geliştirmek istediğiniz özel nesne; birden fazla temel bileşenden (Label, Button vs) oluşuyorsa, hepsini üzerinde barındıran temel taşıyıcı eleman olarak `Box` elemanını kullanmanız ve kutuyu makeBasicObject içine yollamanız tavsiye edilir.
- Bir bileşen, bunu sizin yerinize yapan `startObject()` / `endObject()` ile yapılır: `15-making-a-component.md`.

---

## 5. remove() ile Temizlenen Olaylar ve Zamanlayıcılar (v26.10.23)

Bu metotlar her nesnede vardır. Başlattıkları işi `remove()` temizler; sayfanın veya bileşenin bunu ayrıca hatırlaması gerekmez.

| Metot | Ne yapar |
|---|---|
| `obj.listenTo(target, event, func, capture)` | `window`, `document` veya herhangi bir elemanın olayını dinler: `func(self, event)`. Kaldırma fonksiyonu döndürür. |
| `obj.onPageResize(func)` | Pencere boyutu değişince çalışır: `func(self, event)`. Kaldırma fonksiyonu döndürür. |
| `obj.after(ms, func)` | `func(self)` bir kez çalışır. İptal fonksiyonu döndürür. |
| `obj.every(ms, func)` | `func(self)` tekrar tekrar çalışır. Durdurma fonksiyonu döndürür. |
| `obj.own(other)` | Başka bir yerde yapılan nesne (`page` üzerindeki bir menü) `obj` ile birlikte kaldırılır. `other` döndürür. |

```javascript
const lblTime = Label({ text: "Bekliyor", fontSize: 20 });

// lblTime kaldırılınca kendiliğinden durur.
lblTime.every(1000, function (self) {
    self.text = new Date().toLocaleTimeString();
});

lblTime.listenTo(window, "keydown", function (self, event) {
    if (event.key === "Escape") self.textColor = "tomato";
});

// 5 saniye sonra yazı kaldırılır: zamanlayıcı ve klavye dinleyicisi de onunla gider.
lblTime.after(5000, function (self) {
    self.remove();
});
```

**`obj.setFocusRing(color)`**
Nesneye klavye ile gelindiğinde bir halka çizer; fare tıklamasından sonra çizmez. `""` kaldırır.
