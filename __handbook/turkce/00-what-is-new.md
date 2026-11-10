# basic.js — Sürüm Notları (What is New?)

Bu belgede basic.js kütüphanesine eklenen yeni özellikler, güncellemeler ve değişiklikler yer almaktadır.

---

## Versiyon 26.11.10

*   **Grubun `stretch: 1` parametresi:** bir `VGroup` içinde genişliği verilmemiş (bir `HGroup` içinde yüksekliği verilmemiş) nesneler grubu enine doldurur: `VGroup({ align: "left top", stretch: 1 })`. `css: { alignItems: "stretch" }` yazmanın kısa yolu; o da eskisi gibi çalışır. Boyutu verilmiş nesne boyutunu korur. `group.stretch = 0`, `align`'ın verdiği yeri geri getirir. Kaynak: `basic/basic-what-is-new.md`.

---

## Versiyon 26.11.07

*   **`border` ve `round` da `padding` gibi dizi alır:** `border: [0, 0, 0, 1]` yalnızca altta bir çizgidir (`[yatay, dikey]` ya da `[sol, üst, sağ, alt]`: `padding`'in sırası). `round: [12, 0]` üstteki iki köşeyi yuvarlar (`[üst, alt]`), `round: [12, 12, 0, 12]` her köşeyi ayrı ayrı (`[solÜst, sağÜst, sağAlt, solAlt]`, CSS'teki gibi saat yönünde). `center()` her kenarın kalınlığını ayrı sayar. Sayı eskisi gibi çalışır: tam uyumlu. Örnekli başvuru: `basic/basic-what-is-new.md`.
*   **Grubun `gap: [x, y]`'si:** x bir satırdaki öğelerin arası, y satırların arası (`wrap: 1` ile kayan bir grupta): çipler ve etiketler için `HGroup({ wrap: 1, gap: [8, 12] })`. `padding`'in sırası. Sayı eskisi gibi çalışır.
*   **El kitabı: `padding`'in sırası** yanlış yazılmıştı (`[dikey, yatay]`, `[üst, sağ, alt, sol]`). Doğrusu, kodun hep okuduğu gibi, `[yatay, dikey]` ve `[sol, üst, sağ, alt]`: `padding: [20, 10]` solda ve sağda 20, üstte ve altta 10'dur. Kütüphanede bir şey değişmez.

---

## Versiyon 26.11.05

*   **`basic.zIndexAbove(obj, minimum)`:** `obj`'den açılan bir listenin ya da menünün z-index'i: `obj`'yi tutan katmanın (bir Dialog, bir SidePanel, bir Tooltip popover'ı) üstünde, en az `minimum`. Bileşenlerin listeleri ve menüleri açılırken bunu kullanır; bir Dialog ya da SidePanel içindeki SelectBox, SelectDate ya da ContextMenu artık onun üstünde açılır (arkasında açılıyordu). Bir katmanın dışında bir şey değişmez.
*   **Düzeltme: bir üst kutunun `remove()`'u, bileşenlerinin sahiplendiği panelleri de temizler:** silinen bir kabın (sayfa değişimi) içindeki bileşenlerin liste panelleri ScrollBar'larını, pencere dinleyicilerini ve DOM'larını tutuyordu; doğrudan `remove()` çalışıyordu. Artık ikisi de her şeyi temizler. Örnekli başvuru: `basic/basic-what-is-new.md`.

---

## Versiyon 26.11.01

*   **Bileşenler sığdırılmış bir sayfada boylarını korur:** `page.fit(600, 800)` ile sığdırılan (telefonda 0.65'e küçülen) bir sayfada bir kez `basic.uiScale = 1 / page.zoom` yazın: Tabs, Dialog, Toast, Tooltip, SelectBox ve SelectDate bunu yeni `scale` parametrelerinin varsayılanı olarak alır ve normal bir sayfadaki kadar büyük kalır. `basic.scaleStyle(style, factor)`, `basic.scaleSize(value, factor)` ve `basic.scaleCssText(text, factor)` (bir gölgenin px'leri) kendi bileşenleriniz için bir stilin ölçülerini çarpar. Varsayılan 1 ile hiçbir şey değişmez. Örnekli başvuru: `basic/basic-what-is-new.md`.

---

## Versiyon 26.10.27

*   **Stil paketleri parametreleri de değiştirebilir:** kendi `style` anahtarı olan bir paket bir parametre paketidir. `style`'ı bileşenin stiline, diğer anahtarları sayfanın vermediği parametrelere gider: `Tabs.styles.dark = { style: { tab: { textColor: "white" } }, closeIconFile: "tabs/close-white.svg" }`. `style` anahtarı olmayan paket eskisi gibi çalışır. Tam uyumlu. `InputB` (comp-m2) koyu stili için bunu kullanır. Örnekli başvuru: `basic/basic-what-is-new.md`.
*   **`minimal` ve `border`:** `minimal` bir Button / Input'un kenarı yoktur (basic.css), artık `border` da 0 okunur (1 okunuyordu). Verdiğiniz bir kenar (`border: 2`) kalır. Ekranda bir şey değişmez.

---

## Versiyon 26.10.25

*   **UYUMSUZ: yardımcılar `basic.*` altında:** `num`, `str`, `isMobile`, `go` ve `twoDigitFormat` artık `basic.num()`, `basic.str()`, `basic.isMobile()`, `basic.go()` ve `basic.twoDigitFormat()`; global değiller.
*   **UYUMSUZ: eski `create*` globalleri kaldırıldı:** `createBox`, `createLabel`, `createButton`, `createImage` / `createIcon`, `createTextBox` / `createInput`. Yerine `Box()`, `Label()`, `Button()`, `Icon()`, `Input()` (aynısı, props ile). Fonksiyonlar `basic.createBox()`... olarak duruyor. Eski bir sürüme göre yazılmış sayfada yalnızca adı değiştirmek yeter.
*   **`basic.resolveTheme(temalar, ad)`:** bir temanın renkleri (`"auto"`: sistem ayarı), eksik anahtarlar açık temadan. `Modal`, `Toast` ve `ChartBox` bunu kullanır; yeni bir tema yalnızca farklı anahtarları içerir: `Toast.THEMES.ocean = { background: "#0B2239" }`.
*   **`Alpha(renk, oran)`:** `Black(0.5)` / `White(0.5)` gibi, ama her renk için: `Alpha("#456789", 0.5)` sonucu `"rgba(69,103,137,0.5)"`. Hex renkler `rgba` olur; bir ad, `rgb()` ya da bir `var(--token)` `color-mix` ile şeffaflaşır. Tam uyumlu. Örnekli başvuru: `basic/basic-what-is-new.md`.

---

## Versiyon 26.10.24

*   **`basic.applyStylePackage(params, Comp.styles, CompDefaults)`:** Bir bileşenin stil paketleri (`styleName: "dark"`) tek satırda; her bileşenin yazdığı üç satırın yerine. Sıra aynı: `params.style` > `styleName` paketi > `Defaults.style`. Bir paket olduğu gibi de verilebilir, `Tabs({ style: Tabs.styles.dark })`: kopyalanır, paketin kendisi hiç değişmez. Tam uyumlu. `comp/tabs.js` ve `_component-template.js` bunu kullanır (v26.10.24 gerekir). Örnekli başvuru: `basic/basic-what-is-new.md`.

---

## Versiyon 26.10.23

*   **Daha sade bileşenler, tam uyumlu:** Önceki sürümler için yazılmış bütün sayfalar ve bileşenler değişiklik gerekmeden çalışır. Bir nesnenin global kayıtları artık kendi `remove()`'u ile temizlenir; bu yüzden bir bileşenin bunlar için kendi `remove()`'unu yazmasına gerek kalmaz (önceden 63 bileşenden 42'si `remove()`'u yalnızca bunları temizlemek için eziyordu ve unutulan bir temizlik bellek sızıntısına yol açıyordu). Örnekli başvuru: `basic/basic-what-is-new.md`. Kendi kendini kontrol eden test sayfası: `test/basic-test.htm` (137 kontrol).
*   **`remove()` ile temizlenenler:** `obj.listenTo(window, "keydown", func)` (başka bir elemanın olayı; kaldırma fonksiyonunu döndürür), `obj.onPageResize(func)`, `obj.after(ms, func)` (bir kez; iptal fonksiyonunu döndürür), `obj.every(ms, func)` (tekrar tekrar; durdurma fonksiyonunu döndürür), `obj.own(başkaNesne)` (başka bir yerde, örneğin `page` üzerinde oluşturulan bir menü, bu nesneyle birlikte silinir).
*   **Yeni metotlar (bütün nesneler):** `onHoverChange(func)` (`func(self, isOver)`), `setFocusRing(color)` (yalnızca klavyede görünen odak halkası, CSS `:focus-visible`).
*   **basic:** `isOn(value)` (`1`, `"1"`, `true`), `addCss(id, css, replace)` (bir `<style>`'ı bir kez ekler: `:hover`, `::-webkit-scrollbar`, `@keyframes` gibi satır içi yazılamayanlar için).
*   **`createIn(container, func)`** artık `func`'ın sonucunu döndürür: `const menu = box.own(createIn(page, function () { return Box(...); }));`
*   **Düzeltme (gruplar):** Bir grubun (`HGroup`, `VGroup`, `AutoLayout`) props'una verilen `grow`, `shrink` ve `css`, grubun flex stilleri tarafından eziliyor ve kayboluyordu. Artık `VGroup({ align: "left top", css: { alignItems: "stretch" } })` ve `HGroup({ grow: 1 })` yazıldığı gibi çalışır.
*   **Düzeltme (`rotate`):** `obj.rotate = 45` transform'un geri kalanını (bir `translateY()`, bir `scale()`) siliyordu. Artık yalnızca kendi `rotate()` kısmını değiştirir.
*   **Erişilebilirlik özellikleri (her nesne):** `role` (`"button"`, `"tab"`...), `aria` (`{ label: "Kapat", selected: true }`: yalnızca verilen anahtarlar değişir, `null` birini kaldırır) ve `tabIndex`. `elem.setAttribute("aria-...")` satırlarının yerine geçer. Bkz. "Ortak Özellikler".
*   **Bileşen şablonu** (`_component-template.js`) bunlarla yazıldı; `comp/tree-view.js` kendi `remove()`'u olmayan ilk bileşen.

---

## Versiyon 26.09.18

*   **Tam uyumlu düzeltmeler ve eklemeler:** Önceki sürümler için yazılmış bütün sayfalar ve bileşenler değişiklik gerekmeden çalışır (137 örnek ve şablon sayfası headless Chrome'da karşılaştırıldı: DOM birebir aynı). Sayfalarda değişiklik gerekmez. Önceki sürüm (26.09.17) başvuru için `basic/backup/v26.09.17/basic-bugra.js` / `basic-bugra.min.js` olarak saklanır. Örnekli tam başvuru: `basic/basic-what-is-new.md`. Kendi kendini kontrol eden test sayfası: `test/basic-test.htm`.
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
