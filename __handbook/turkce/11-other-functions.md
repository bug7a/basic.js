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
