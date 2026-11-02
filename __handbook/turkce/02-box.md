# basic.js — Box (Kutu Nesnesi)

basic.js kütüphanesinde `Box()` nesnesi, ekranda dikdörtgen veya kare şeklinde temel görünümler oluşturmak için kullanılır. Genellikle arka plan, yapısal kapsayıcı (container) veya diğer nesneleri gruplamak için işlev görür. 

> **Sadece Box nesnesi başka nesneleri içinde tutabilir.** `startBox()`, `createIn()` ve gruplar
> (`AutoLayout`, `HGroup`, `VGroup` — bunlar da Box nesnesidir) hep bir Box ile çalışır. `Button`,
> `Label`, `Input` veya `Icon` içine nesne **alamaz**. Bir butonun üzerine bir şey koymak için, onu
> butonla aynı kutuda kardeş olarak oluşturun ve `position: "absolute"` ile yerleştirin.

---

## Box Oluşturma

Bir `Box` oluşturmanın standart yolu parametre objesi ile oluşturmaktır:

```javascript
window.onload = function() {

    const myBox = Box({ 
        left: 20, 
        top: 20, 
        width: 100, 
        height: 100, 
        color: "orangered" 
    });

}
```

Alternatif olarak, doğrudan koordinat ve boyut vererek de oluşturulabilir:
`Box(left, top, width, height, ayarlar)`

---

## Temel Davranış

- Bir `Box` içine eklenen (`add()`) her nesne, kutunun koordinat sistemini referans alır.
- Varsayılan `position` değeri `"absolute"` dır. Konum (`left`, `top`) verilmezse başlangıç noktası olarak `-1000` atanır ve ekranda (görünen alanda) bulunmaz.
- Ancak temel özellik setinde bulunan `center()` gibi bir fonksiyon ile otomatik olarak konumlandırılabilir.

---

## Parametreler ve Özellikler

`Box()` nesnesine atanabilecek başlıca özellikler şunlardır:

### Görünüm ve Boyut
- `left` (number) — Nesnenin yatay (X ekseni) konumu.
- `top` (number) — Nesnenin dikey (Y ekseni) konumu.
- `width` (number / string) — Genişlik (ör: `200`, `"100%"`, `"auto"`, `"calc(100% - 20px)"`).
- `height` (number / string) — Yükseklik.
- `color` (string) — Arka plan rengi (Varsayılan: `"whitesmoke"`).

### Kenarlık (Border)
- `border` (number) — Kenarlık kalınlığı (Varsayılan: `0`).
- `borderColor` (string) — Kenarlık rengi (Varsayılan: `"rgba(0, 0, 0, 0.6)"`).
- `round` (number) — Köşe yuvarlaklığı (Varsayılan: `0`).

### Kaydırma (Scroll) ve Kesme
- `clipContent` (boolean) — Boyutları aşan içeriğin kutu sınırları dışına taşıp taşmayacağı (Varsayılan: `1` yani dışarı taşmayı gizler).
- `scrollX` (boolean) — Yatay kaydırma çubuğu aktifliği.
- `scrollY` (boolean) — Dikey kaydırma çubuğu aktifliği.

### Kutusunun dışına çıkan içerik (clipContent: 0)

**Her Box kenarlarını aşan içeriği keser; her grup da keser** (`HGroup`, `VGroup`, `AutoLayout` de birer kutudur). Varsayılan budur (`clipContent: 1`, CSS `overflow: hidden`) ve kolay unutulur, çünkü içerik içeride durdukça hiçbir şey kesilmez.

İçerik hareket edince, büyüyünce ya da parlayınca dışarı çıkar:
- fareyle üstüne gelince yukarı kalkan (`transform: translateY(-2px)`) ya da büyüyen (`scale(1.05)`) bir düğme,
- fareyle büyüyen bir resim ya da kart,
- bir gölge (`boxShadow`), parlama ya da düğmenin odak çizgisi,
- hareketle kayan ya da zıplayan bir nesne.

Yüksekliği içeriği kadar olan bir grupta (`height: "auto"`, `hug: 1`) kalkan düğme hemen kenara değer: üstü kesilir ve düğme bozuk görünür. Böyle nesneleri tutan kutuya ya da gruba `clipContent: 0` ver:

```javascript
// GROUP: Fareyle yukarı kalkan düğmeler
HGroup({ width: "auto", height: "auto", gap: 12, clipContent: 0 }); // WHY: kalkışları ve gölgeleri kesilmesin

    Button({ text: "Oyna", width: 120, height: 44 });
    that.elem.style.transition = "transform 0.15s";
    that.on("mouseover", function (self) { self.elem.style.transform = "translateY(-2px)"; });
    that.on("mouseout", function (self) { self.elem.style.transform = ""; });

endGroup();
```

- Nesne ile sayfa arasındaki her kutuya bak: kesen tek bir kutu, nesneyi kesmeye yeter.
- Kesmenin istendiği yerde `clipContent: 1` kalsın: köşeleri yuvarlak bir resim, kutusundan büyük bir arka plan resmi, kayan bir liste (`scrollY: 1` zaten keser).
- Label'da da aynı özellik var: `clipContent: 0` satırın dışına taşan harfleri gösterir (büyük yazıda g, ş, ğ).

---

## Kutuya Nesne Ekleme (.add() ve .in())

### .add() ile Ekleme
Oluşturulan bir kutuyu, başka bir kutunun veya sayfanın (`page`) içine eklemek (ya da kutuya nesne eklemek) için `.add()` kullanılır.

```javascript
const box1 = Box({ left: 10, top: 10, width: 200, height: 200, color: "lightgray" });
const box2 = Box({ left: 20, top: 20, width: 50, height: 50, color: "tomato" });

box1.add(box2); // box2, box1'in içine eklenir. Koordinatları box1'e göredir.
```

### startBox() ve endBox() ile Blok Oluşturma
Daha okunabilir ağaç (tree) şeklinde kod blokları oluşturmak için `startBox()` ve `endBox()` fonksiyonlarını kullanabilirsiniz. `startBox()` çağrıldığında oluşturulan kutu varsayılan konteyner olur ve içine eklenen nesneler doğrudan bu kutunun içine yerleştirilir. `endBox()` çağrıldığında bu blok sonlandırılır ve varsayılan konteyner bir önceki haline döner.

```javascript
startBox({ left: 0, top: 40, width: "100%", height: 100 });
    
    // Bu blok arasında oluşturulan nesneler doğrudan üstteki kutunun içine eklenir.
    Label({ left: 10, top: 10, text: "Bu başlık kutu içindedir" });

endBox();
```

### createIn() ile Var Olan Bir Kutunun İçinde Nesne Oluşturma
`createIn(container, func)`, `func` fonksiyonunu `container` varsayılan kap olacak şekilde çalıştırır ve ardından önceki kabı geri yükler (`func` hata fırlatsa bile). Zaten var olan bir kutuya nesne eklemek için kullanılır; örneğin bir bileşen oluşturulduktan sonra onun liste kutusuna satır eklemek için. Tek başına `setDefaultContainerBox()` çağrısından farklı olarak elle geri alma gerekmez.

```javascript
const card = Box({ left: 0, top: 40, width: 300, height: 200 });

// ... daha sonra, kodun herhangi bir yerinde:
createIn(card, function (box) {           // box === card
    Label({ left: 10, top: 10, text: "Sonradan, kartın içinde oluşturuldu" });
    Button({ left: 10, top: 50, text: "Tamam" });
});
// Varsayılan kap, bu çağrıdan önceki ile aynıdır.
```

---

## Örnekler

### Örnek 1: Olay (Event) Dinleyici Ekleme
Kutuya tıklandığında çalışacak bir kod eklemek:

```javascript
window.onload = function() {

    const myBox = Box({ 
        width: 100, 
        height: 100, 
        color: "orangered" 
    });
    
    // Kutuyu ekranın ortasına otomatik hizala
    myBox.center();
    
    // Kutuya tıklanınca boyutunu arttır
    myBox.on("click", function() {
        myBox.width += 20;
        myBox.height += 20;
        myBox.center(); // Büyüdükten sonra tekrar ortalamak için
    });

}
```

---

## Özet
- `Box()` → Temel dikdörtgen veya görünmez kapsayıcı nesnesi oluşturur.
- Otomatik olarak içine veri eklenebilen temel nesnedir (`.add()` veya `startBox()`/`endBox()`).
- Çeşitli görünüm (renk, köşe, kenarlık), hizalama ve kaydırma (scroll) desteklerine sahiptir.
