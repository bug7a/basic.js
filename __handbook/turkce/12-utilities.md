# basic.js — Yardımcı Fonksiyonlar (Utilities)

basic.js kütüphanesi içerisinde arayüz (GUI) elemanlarının haricinde işlerinizi hızlı yürütmeye yarayan ve standart javascript dillerinde daha uzun satırlar kaplayan matematik, mantık, veri ve tarih özelliklerini barındıran global yardımcı fonksiyonları bulunur.

Bu fonksiyonlara, başlarında obje veya eklenti takılmadan uygulamanız içerisinde her an erişebilirsiniz. Kütüphane eklentisi olmadan bir Javascript dosyası yazıyormuş gibi düşünebilirsiniz.

---

## 1. Konsol ve Çıktı

Konsol log mekanizmasını basitleştirir.

- `println(mesaj)` — `console.log()` kısaltmasıdır.
- `println(mesaj, tür)` — tür alanına hata metodu eklenirse `console.error()`, log gelirse `console.log()` olur. Örneğin: `println("Burası Hatalı!", "error")` veya tip eklentisine `warn`, `info`, `table`, `dir` gönderilebilir.

## 2. Tip Dönüşümü 

- `num(değer_string, tip_secenegi)` — String i metne dönüştürür.
    - default: `tip_secenegi = float` varsayılan formatı kullanır. (`3.14` float)
    - `tip_secenegi = integer/int` — sadece tam sayı formatı destekler.
- `str(sayi_numarasi)` — Sayısal nesneyi formattan ayırmadan basit bir String (metin) değişkenine geçirir. `String($num)` muadilidir.
- `twoDigitFormat(sayi_numarasi)` — Gönderilen rakam, sadece tek haneden oluşuyorsa (`0` ile `9` arasında ise), başına `'0'` ekleyip 2 haneli döndürür (Tarih ve Saat formatlarında özellikle işlevseldir).

## 3. Matematiksel Geliştirmeler

- `random(baslangic, bitis)` — Kullanıcının belirlediği ilk parametre ve son parametre arasındaki (ilk ve son parametreler de olasılıklara dahil edilebilir) rassal/rastgele sayılar (Random Numbers) üretir. 

```javascript
// 0 ile 100 arasında sayı türetir.
let rastgeleSayi = random(0, 100);
```

## 4. Cihaz Saptamaları 

- `isMobile()` — Ekranın şu an Mobile (Dokunmatik Cihaz - Tablet, Akıllı Telefon) modundan erişilip erişilmediğini tarar. Eğer Browser destekli bir mobilden girilirse veya mobil uygulama yapısında ise `1` değeri (True) verir; aksi takdirde `0` değeri döner.

```javascript
if ( isMobile() ) {
    println("Bir mobil cihazdan giriş yapıldı.");
}
```

## 5. Tarayıcı Eylemleri

- `go(url_adresi, hedef)` — `window.open` mekanizmasının bir arayüzüdür.
    - `hedef = "_self"` (Varsayılan) aynı sekmede siteyi değişir.
    - `hedef = "_blank"` derseniz farklı sekmede / başka pencere adında oluşturur.

## 6. Tarih (Date) Verileri

Herhangi bir nesne takıntısı (new vb) olmaksızın anlık saptamaları, hızlı özellik mantığında verir. 
`basic.date` değişkenine eklemlenmiş fonksiyonlar:

- `basic.date.now` — Anlık saat zamanını milisaniye cinsinden verir (`Date.now()` a eşittir)
- `basic.date.year` — Anlık yılı verir. (Örneğin `2026`)
- `basic.date.monthNumber` — Ay sayısını (numarasını) verir. Normal JavaScript API de `Ocak=0` olduğu halde kütüphanemiz bunu basitleştirmek için `Ocak=1` den başlatılmıştır.
- `basic.date.ayAdi` / `basic.date.monthName` — Numara yerine yazıyla Türkçe (`"Şubat" vb.`) veya ingilizce adıyla (`"February"`) dönen ay ismi.
- `basic.date.dayOfWeek` — Haftanın numarası değerini (`0-6`)  bulur.
- `basic.date.dayOfMonth` — Ayın Günü (Tarihsel rakam `1-31` arasında) değerini ölçer.
- `basic.date.gunAdi` / `basic.date.dayName` — Güne karşılık Türkçe okunuş değeri ile haftanın birimi çekilir (`"Çarşamba" vb`).

## 7. Saat (Time) Verileri

- `basic.time.hour` — Günü (24 Saat Sisteminde) 0-23 arasında çekip rakam döndürür.
- `basic.time.minute` — 0-59 arasında geçerli dakika döner.
- `basic.time.second` — 0-59 geçerli saniye formundadır.
- `basic.time.millisecond` — Anlık milisaniyeyi okur.

> Not: Bu değerlerin önünde duruma göre "0" eklemesi yapmanız istenirse `twoDigitFormat(basic.time.minute)` şeklinde yardımcınızı kolayca entegre edebilirsiniz.

## 8. Hafıza / Veri Saklama (Storage) Kalıcılığı

Uygulamanız kapanıp tarayıcı kapatıldığında, bir veriyi silinmeyip sonraki sefere kalsın diye Tarayıcı Ön Belleğine yazar. Json/Array (nesneleri/Dizileri) string verisi çevirisine kalmaksızın direkt akıllı algılar. Kısaca verileri kalıcı yapar.

Kullanımı:
- `basic.storage.save(anahtar_key_kodu, deger_icerigi)` —  Tarayıcıda veriyi kaydeder.
- `basic.storage.load(anahtar_key_kodu)` — Daha önce kayıtlanan datayı objesi/nesnesi şeklinde de-compile vaziyette sana ulaştırır.
- `basic.storage.has(anahtar_key_kodu)` — Değerin olup olmadığını (Null/Tanımsız mı) kontrol edip `True`/`False` döner.
- `basic.storage.remove(anahtar_key_kodu)` — Anahtarı sadece temizler/kaldırır, var sayılmaz.
- `basic.storage.clear()` — O sisteme / uygulamaya ait Storage de bulunan tüm log ve kalıcı nesneleri temizler.

```javascript
// Data kaydı yap.
basic.storage.save("KullaniciID", "US1991A5B");

// Silinip tekrar açıldıysa bul...
let dataVarMi = basic.storage.has("KullaniciID");

// Bulunan içeriği değişken atayıp, onu log a at..
if (dataVarMi) {
    let _kayitliID = basic.storage.load("KullaniciID");
    println("Geri Gelen ID Bilgisi: " + _kayitliID);
}
```

---

## Özet
- basic.js'in utilities kısmı yazılımcıya aranje edilmiş işleri en aza indirgemek ve kod israfının önüne geçilmesini sağlamak amacı ilkesindedir.
- Özellikle `page` veya sayfa yönetimi fonksiyonlarında sık kullanılmak üzere tasarlanmıştır.
