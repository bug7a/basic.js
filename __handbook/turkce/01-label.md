# basic.js — Label (Metin Nesnesi)

basic.js kütüphanesinde `Label()` nesnesi, kullanıcılar tarafından doğrudan değiştirilemeyen (ancak özellikleri JavaScript üzerinden her zaman güncellenebilen) yazılar, başlıklar veya açıklamalar göstermek için kullanılır.

---

## Label Oluşturma

Bir `Label` oluşturmanın standart yolu:

```javascript
window.onload = function() {

    Label({ 
        left: 20, 
        top: 20, 
        text: "Merhaba basic.js",
        fontSize: 24,
        textColor: "#4A4A4A"
    });

}
```

---

## Parametreler ve Özellikler

### Görünüm ve Boyut
- `text` (string) — Açıkta görünecek metin (HTML kodlarını destekler).
- `fontSize` / `textSize` (number) — Metin boyutu (Varsayılan: `20`).
- `textColor` (string) — Metin rengi (Varsayılan: `"rgba(0, 0, 0, 0.8)"`).
- `textAlign` (string) — Metnin hizası (Varsayılan: `"left"`, alternatifler `"center"`, `"right"` olabilir).
- `color` (string) — Label'ın arkaplan rengi (Varsayılan: `"transparent"`).

### İç Boşluklar (Padding)
- `padding` (number / array) — Kutu içerisindeki iç boşlukları (piksel) tanımlar (Varsayılan: `0`).
    - Yalnızca sayı verildiğinde tüm kenarlardan uygulanır: `padding: 10`
    - Array ile `[dikey, yatay]` veya `[üst, sağ, alt, sol]` şeklinde özel tanımlamalar yapılabilir: `padding: [10, 20]`, `padding: [5, 10, 15, 20]`

---

## Örnekler

### Örnek 1: Çok Satırlı Başlık ve Metin Grubu

HGroup ve VGroup içinde sıralanarak okunabilir başlık ve açıklamalar yaratılabilir.

```javascript
window.onload = function() {

    VGroup({ align: "top left", gap: 10, padding: 20 });

        Label({ 
            text: "Kullanıcı Sözleşmesi", 
            fontSize: 24, 
            textColor: "dodgerblue" 
        });

        Label({ 
            text: "Lütfen aşağıdaki maddeleri dikkatlice okuyunuz ve kabul ediniz.", 
            fontSize: 14, 
            textColor: "gray" 
        });

    endGroup();

};
```

### Örnek 2: Tıklanabilir Metinler

Her ne kadar Buton (`Button`) bu iş için önerilse de istenilen durumlarda Label elemanı da bir buton gibi davranabilir. Olay tetikleyici atanabilir.

```javascript
const labelStyle = {
    textColor: basic.ACTION_COLOR,
    color: "whitesmoke",
    padding: [20, 4],
    round: 13,
    border: 1,
    borderColor: Black(0.1),
};

const lblLink = Label({
    left: 50,
    top: 50,
    text: "Tıklayınız",
    ...labelStyle,
});
// İmleci değiştirmek iyi bir kullanıcı deneyimi (UX) deneyimidir.
lblLink.elem.style.cursor = "pointer";

lblLink.on("click", function() {
    println("Label elementine tıklandı.");
});
```

---

## Özet
- `Label()` → Ekrana HTML destekli yazılar veya başlıklar yerleştirir.
- Sahip olduğu kutu modeli (genişlik, yükseklik, iç boşluk) sayesinde, `HGroup` ve `VGroup` gibi hizalama gruplarının içine eklendiğinde düz çıplak metinlerin aksine çok daha istikrarlı ve düzenli bir yerleşim sağlar.
- İç boşluklar (`padding`) kullanılarak daha iyi görünen hap şeklindeki etiket tasarımları oluşturulabilir.
