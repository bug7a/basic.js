# basic.js — Image / Icon (Resim Nesnesi)

basic.js kütüphanesinde resim veya ikon dosyalarını (PNG, JPG, SVG vb.) ekranda göstermek için `Icon()` nesnesi kullanılır. Resimler dış bağlantılardan veya yerel dizinden asenkron (sonradan) yüklenir.

---

## Image veya Icon Oluşturma

Hızlı `Icon` fonksiyonu temel bir imaj kontrolü verir.

```javascript
window.onload = function() {

    const myIcon = Icon({ 
        left: 20, 
        top: 20, 
        width: 128, 
        height: 128, 
        padding: 15,
        color: "rgba(0, 0, 0, 0.05)"
    });
    
    // ".load" metodu ile resim dosyasını yükle.
    myIcon.load("test.png");

}
```

---

## Parametreler ve Özellikler

### Yürütme ve Boyut
- `load(path_to_image)` — Belirtilen dosya yolundaki (url veya göreceli konum) resim dosyasını elemente bağlar.
- `width` ve `height` özelliklerine sayısal değer verilirse, resim o boyuta zorlanır. 

### Otomatik Boyutlandırma (autoSize)
Eğer resmin kendi gerçek (orjinal) boyutu ile ekrana yerleşmesi isteniyorsa, `autoSize` özelliği kullanılabilir.
- Genişlik (`width`) ve Yükseklik (`height`) açıkça (açık değer olarak) belirtilmezse, default olarak `autoSize: 1` ayarlanır. Yani resim orjinal boyutunda görünür.
- `autoSize` değerine daha büyük sayılar vererek, orjinal boyutu oranlı küçültebilirsiniz. 
    - `autoSize: 2` → Orijinal boyutu yarıya / yarısına 2 kata ufaltır.
    - `autoSize: 3` → Orijinal boyutu çeyreğe küçültmez, tam olarak `(genişlik / 3)` ve `(yükseklik / 3)` oranında bölerek ayarlar.

### Yüklenme Olayı ve Gerçek Boyut
Resim belgemize tamamen çekildiğinde/yüklendiğinde bunu algılamak ve ona göre hareket etmek için `.onLoad()` kullanılır.

- `naturalWidth` — Dosyanın orjinal tam genişliği.
- `naturalHeight` — Dosyanın orjinal tam yüksekliği.

---

## Örnekler

### Örnek 1: Resmi Yükleyip Boyutları Ekrana Yazdırma

```javascript
window.onload = function() {
    
    const icoLogo = Icon({
        right: 20,
        top: 20
    });
    
    // Resmin kaynağını başlat.
    icoLogo.load("test.png");
    
    // Başarılı bir şekilde indirildiğinde işlem yap
    icoLogo.onLoad(function(loadedIcon) {
        println("Orjinal Genişlik: " + loadedIcon.naturalWidth);
        println("Orjinal Yükseklik: " + loadedIcon.naturalHeight);
    });

};
```

---

## Özet
- `Icon()` → İnternetten veya dizinden grafik dosyalarını okur.
- Parametrede boyut belirtilmezse, otomatik olarak resmin asıl çözünürlüğü gösterilir.
- Orijinal görüntü boyutu, internetten resim tamamen yüklendikten (`.onLoad`) sonra okunabilir veya otomatik işleme konulabilir.
