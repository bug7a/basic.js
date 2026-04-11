# basic.js — Input / TextBox (Metin Giriş Nesnesi)

basic.js kütüphanesinde kullanıcılardan klavye aracılığıyla metin veya sayı girişleri (input) almak için `Input()` nesnesi kullanılır.

---

## Input Oluşturma

Varsayılan bir metin kutusu ve başlığı ile oluşturulması:

```javascript
window.onload = function() {

    const inpName = Input({ 
        left: 30, 
        top: 50, 
        title: "Kullanıcı Adı:",
        minimal: 1,
        color: "whitesmoke"
    });

}
```

Alternatif (Hızlı) Formato:
`Input(left, top, width, height, ayarlar)`

---

## Parametreler ve Özellikler

### Görünüm ve Durum
- `title` (string) — Giriş kutusunun üst bölümünde yer alacak ek bilgi başlığı.
- `text` (string) — Kullanıcının metin kutusuna girdiği / bulunduğu değeri almak veya dışarıdan değeri yazmak/atamak için kullanılır.
- `minimal` (boolean) — Köşe ve gölgeleri kaldırarak, oldukça düz ve yalın bir HTML input görünümü elde etmeyi sağlar.
- `enabled` (boolean) — Metin kutusunun aktif (yazılabilir) veya deaktif (kilitli) olma durumu (Varsayılan: `1`). 

### Tipografik Yapı (Input İçi)
- `fontSize` / `textSize` — Kullanıcının yazacağı yazının metin büyüklüğü.
- `textColor` — Kullanıcının girdiği metnin rengi.
- `textAlign` — Metnin kutu içerisindeki (solda, merkezde, sağda) hizası.

---

## Olaylar (Events)

Kullanıcı, metin kutusundaki değere bir harf bile eklese ya da çıkarsa bunu canlı olarak (anında) algılamak için `.on("input", ...)` kullanılır.

```javascript
window.onload = function() {
    
    const inpCity = Input({
        left: 50,
        top: 50,
        title: "Şehir:",
        color: "white"
    });
    
    // Kullanıcı klavyede her tuşa bastığında "input" olayı tetiklenir
    inpCity.on("input", function(self, event) {
        println("Şu an yazılan değer: " + inpCity.text);
    });

    // Kullanıcı input alanından çıkıp başka bir yere tıkladığında "change" olayı tetiklenir
    inpCity.on("change", function(self, event) {
        println("Değer değişti: " + inpCity.text);
    });

};
```
_Desteklenen Standart Html Olayları:_ `input`, `change`, `focus`, `paste`

---

## Özet
- `Input()` → Kullanıcının manuel veri girişi yapmasına izin veren bir alandır.
- `.text` parametresi ile içerisindeki string (yazı) alınabilir veya program ile değiştirilebilir.
- Tıklanabilirlik ve etkileşim özellikleri diğer basic.js nesneleriyle (Box, Button vb.) ortak temel özellikleri paylaşır.
