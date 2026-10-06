# basic.js — Sürüm Notları (What is New?)

Bu belgede basic.js kütüphanesine eklenen yeni özellikler, güncellemeler ve değişiklikler yer almaktadır.

---

## Versiyon 26.09.18

*   **Tam uyumlu düzeltmeler ve eklemeler:** Önceki sürümler için yazılmış bütün sayfalar ve bileşenler değişiklik gerekmeden çalışır (137 örnek ve şablon sayfası headless Chrome'da karşılaştırıldı: DOM birebir aynı). Sayfalarda değişiklik gerekmez. Önceki sürüm (26.09.17) başvuru için `basic/basic-bugra.js` / `basic-bugra.min.js` olarak saklanır. Örnekli tam başvuru: `basic/basic-v26.09.18.md`. Kendi kendini kontrol eden test sayfası: `test/basic-test.htm`.
*   **Düzeltmeler:** `left`, `top`, `right`, `bottom`, `width`, `height` için `"100"` ve `"50%"` / `"calc()"` değerleri çalışır. Gizli bir grupta (`VGroup({ visible: 0 })`) oluşturulan nesneler gerçek flex öğesi olur. Sayfa hazır olmadan nesne oluşturmak anlaşılır bir hata fırlatır. Kütüphane yardımcısı ile aynı adı taşıyan bir sayfa değişkeni (`const createButton`) `Button()` fonksiyonunu bozamaz. `remove()` bekleyen hareket zamanlayıcılarını temizler. `props()` nesneyi döndürür.
*   **Yeni özellikler (bütün nesneler):** `css`, `cursor`, `zIndex`, `boxShadow`, `fontFamily`, `bold`, `italic`, `lineHeight`, `ellipsis`, `selectable`, `grow`, `shrink`, `plainText`, `isRemoved`, `children`.
*   **Yeni metotlar (bütün nesneler):** `show()`, `hide()`, `toggle()`, `setSize()`, `setPosition()`, `bringToFront()`, `contains()`, `once()`, `animate()` (Promise döndürür).
*   **Input:** `value`, `placeholder`, `inputType`, `maxLength`, `readOnly`, `focus()`, `blur()`, `select()`, `onEnter()`. **Icon:** `alt`, `imageFit`.
*   **Gruplar:** `HGroup` / `VGroup` / `AutoLayout` için `wrap: 1` ve `justify: "space-between" | "left" | "center" | "right" | ...`.
*   **`hug: 1`:** Grupların `fit: 1` parametresi için daha anlaşılır yeni bir ad (grup içindeki nesneleri sarar, `width/height: "auto"`). `fit` eskisi gibi çalışmaya devam eder; oluşturduktan sonra `group.hug` ve `group.fit` ikisi de 1 döndürür.
*   **`createIn(container, func)`:** Var olan bir kutunun içinde nesne oluşturur (örneğin bileşen oluşturulduktan sonra onun liste kutusuna) ve ardından önceki varsayılan kabı geri yükler; `func` hata fırlatsa bile. `setDefaultContainerBox()` fonksiyonunun güvenli hâli. Kendi başlat/bitir yığınını kullanır; bu yüzden başka bir kutu açıkken çağrılsa bile içinde açılan gruplar o kutuda kalır (2026-10-05'te düzeltildi).
*   **page:** `on()`, `off()`, `onKeyDown()`, `title`. **basic:** `version`, `isReady`, `sleep()`, `nextFrame()`, `clamp()`, `lerp()`, `objectOf()`, `escapeHtml()`, `storage.loadOr()`.

---

## Versiyon 26.09.17

*   **`remove()` içindeki nesneleri de siler:** Bir nesne silindiğinde, içindeki bütün basic.js nesneleri de silinir (önce üstteki nesneler). Bir alt nesnenin `destroy()` fonksiyonu varsa (bileşen şablonu) önce o çağrılır. Böylece bileşenler global olaylarını temizleyebilir (örneğin `page.onResize`, `window` olayları, `RadioButton` grupları gibi statik listeler).
    *   **Neden:** Önceden yalnızca silinen nesnenin kendisi temizleniyordu. Alt nesnelerin `onResize` kayıtları ve global olayları kalıyordu, bu yüzden silinen bir sayfa bütün nesneleriyle birlikte bellekte kalıyordu. Admin panel şablonunda her sayfa değişiminde yaklaşık 400 DOM düğümü ve 250 olay dinleyicisi kalıyordu (240 sayfa değişiminden sonra: 70 MB bellek, 121.000 DOM düğümü). Artık 0.
    *   **Not:** Silinen bir nesne tekrar kullanılmak için değildir. `remove()` sonrası nesneyi ekrana tekrar eklemeyin, yenisini oluşturun.
    *   **Not:** Doğrudan `page` üzerinde oluşturulan nesneler (örneğin bir sayfanın açtığı `ContextMenu`) sayfa kutusunun içinde değildir. Onları sayfanızın veya bileşeninizin `remove()` fonksiyonunda kendiniz silin.
    *   **Not:** Bu setteki bileşenler artık bu temizliği `destroy()` yerine `remove()` içinde yapar (`const superRemove = box.remove;` … `superRemove.call(box);`); böylece bir bileşen diğer bütün nesneler gibi silinir: `myComponent.remove();`. `destroy()` fonksiyonu olan nesneler için (örneğin `ScrollBar`) o fonksiyon hâlâ önce çağrılır.
*   **`object.elem._basicObject`:** Her element, kendi basic.js nesnesine bir bağlantı tutar (`makeBasicObject()` ekler).
*   **`object._isRemoved`:** `remove()` sonrası `1` olur. İkinci `remove()` çağrısı bir şey yapmaz.

---

## Versiyon 26.03.26

*   **`HGroup()`, `VGroup()`, `endGroup()`:** Arayüz elemanlarını ekranda yatay veya dikey olarak otomatik hizalayabilmek (Auto Layout) için eklendi.
*   **`parentBox` / `containerBox`:** Nesnelerin içinde bulundukları ana kutuyu (kapsayıcıyı) doğrudan referans alabilmesi için eklendi.
*   **`HGroup({ fit: 1 })`:** Otomatik yerleşim gruplarının (HGroup, VGroup vs.) boyutlarını içerisindeki nesnelere göre otomatik sarması (shrink-to-fit) özelliği eklendi.
*   **`basic.storage`:** Önceden dışarıda yer alan yapı `basic.storage` isim alanına taşındı. Ayrıca `has()` ile kontrol ve `clear()` ile tüm veriyi silme özellikleri eklendi.
*   **`basic.clock`:** Saat işlemleri `basic.clock` çatısı altına toplandı. Değişken isimlerinde `.millisecond` gibi yapısal güncellemeler yapıldı.
*   **`basic.date`:** Tarih işlemleri `basic.date` çatısı altına toplandı. O güne ait bilgilere doğrudan erişmek için yeni `.dayOfWeek` ve `.dayOfMonth` özellikleri eklendi.
*   **`waitAndRun()`:** Performans yönetimi için, belirli fonksiyonların milisaniyelik gecikme aralıklarla kontrollü (debounced) çalıştırılmasını ve bekletilebilmesini sağlayan fonksiyon eklendi.
*   **`mergeIntoIfMissing(params, defaults)`:** Parametre objelerini, iç içe objeler (deep) dahil olmak üzere, var olan verileri ezmeden sadece eksik kalan özellikleri ekleyip güvenle kopyalayan (merge) fonksiyon eklendi.
*   **`Black()` / `White()` Saydamlığı:** Doğrudan şeffaflık (opacity) değeri alan pratik renk fonksiyonları eklendi. Örnek kullanım: `Black(0.2)`, `White(0)`.

---

## Versiyon 25.06

*   **`AutoLayout()` / `endAutoLayout()`:** Otomatik yerleşim (layout) işlemlerini başlatmak ve bitirmek için yeni fonksiyonlar eklendi.
*   **`.clipContent`:** Sınırları aşan (overflow) içeriği kesmek veya gizlemek için yeni bir özellik eklendi.
*   **`autoFit()`:** Daha iyi bir isimlendirme tutarlılığı sağlamak amacıyla eski `fitAuto()` fonksiyonunun ismi `autoFit()` olarak güncellendi.
*   **`.totalLeft` / `.totalTop`:** Bir elementin doğrudan ana sayfaya (page) göre toplam (mutlak) pozisyonunu almak için yeni özellikler eklendi.
*   **`.padding`:** İç boşluk (padding) tanımlamaları çok daha esnek hale getirildi. Artık tek değer, array olarak yatay/dikey veya tam kutu modeli formatlarını destekliyor.
    *   Örnek kullanımlar: `.padding = 4`, `.padding = [12, 4]`, `.padding = [14, 4, 14, 4]`
