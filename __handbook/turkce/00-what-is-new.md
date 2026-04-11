# basic.js — Sürüm Notları (What is New?)

Bu belgede basic.js kütüphanesine eklenen yeni özellikler, güncellemeler ve değişiklikler yer almaktadır.

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
