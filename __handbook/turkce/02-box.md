# basic.js — Box (Kutu Nesnesi)

basic.js kütüphanesinde `Box()` nesnesi, ekranda dikdörtgen veya kare şeklinde temel görünümler oluşturmak için kullanılır. Genellikle arka plan, yapısal kapsayıcı (container) veya diğer nesneleri gruplamak için işlev görür. 

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
