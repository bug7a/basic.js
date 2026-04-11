# basic.js — Button (Buton Nesnesi)

basic.js kütüphanesinde `Button()` nesnesi, kullanıcı ile etkileşime girmek ve tıklamaları algılamak için kullanılır.

---

## Button Oluşturma

Standart oluşturma işlemi:
```javascript
window.onload = function() {

    const btnOk = Button({ 
        left: 20, 
        top: 20, 
        text: "Kabul Et" 
    });

}
```

Alternatif (Hızlı) Parametre Formu:
`Button(left, top, width, height, ayarlar)`

---

## Parametreler ve Özellikler

### Görünüm
- `text` (string) — Butonun üzerindeki yazı.
- `color` (string) — Buton arkaplan rengi (Varsayılan: `basic.ACTION_COLOR`).
- `textColor` (string) — Buton yazı rengi.
- `fontSize` (number) — Buton yazı boyutu (Varsayılan: `20`).
- `minimal` (boolean) — Butonun arka plan ve kenarlıklarını silerek sade (yazı linki benzeri) bir görünüm sağlar (Değer `1` veya `0` alır).

### Davranış
- `enabled` (boolean) — Butonun tıklanabilir olup olmadığı (Değer `1` veya `0` alır, varsayılan: `1`).
- `value` (string) — Arkaplanda butonla birlikte taşınmak istenen gizli/kullanıcıya görünmeyen veriler için kullanılabilen özellik.

### Hizalama İçin 
- Diğer temel nesnelerde olduğu gibi `left`, `top`, `width`, `height`, `right`, `bottom` parametrelerini destekler. Varsayılan genişliği `130px`, yüksekliği `50px`'tir.

---

## Buton Olayları

Butonlarda `.on("click", fonksiyon)` kullanımı standartlaştırılmıştır.

```javascript
window.onload = function() {

    const btn = Button(40, 40, 180, 50, { 
        text: "HELLO",
        color: "orangered",
    });

    btn.on("click", function() {
        println("Butona Tıklandı!");
    });

};
```

---

## Örnekler

### Örnek 1: Minimal Butonlar

Minimal özellik, genellikle menü yönlendirmelerinde, uyarı veya iptal gibi diyalog butonlarında işe yarar.

```javascript
window.onload = function() {
    
    HGroup({ align: "center", gap: 10 });
    
        Button({ text: "Tamam", color: basic.ACTION2_COLOR });

        Button({ 
            text: "İptal", 
            color: "transparent", 
            border: 1, 
            borderColor: Black(0.05), 
            minimal: 1 
        }); // Sadece tıklanabilir düz yazı görünümünde olur

    endGroup();
    
};
```

---

## Özet
- `Button()` → Tıklanabilir arayüz elemanları oluşturur.
- `.on("click", ...)` ile tıklama olayları dinlenir.
- `.minimal` parametresi ile şeffaf arkaplana sahip saf metin butonuna dönüşebilir.
- İçine farklı nesneler `.add()` ile EKLEMEMELİDİR. Yapısal olarak `.add()` fonksiyonunu desteklese de kullanımı butonlar için geçerli değildir.
