/* Bismillah */

/*

basic.js Website - Texts - v26.09

- Sitedeki bütün yazılar. İki dilde de aynı anahtarlar bulunmalıdır. Kod örnekleri: js/samples.js
- All the copy of the site. Both languages must have the same keys. Code samples: js/samples.js
- {size}, {components}, {chapters}, {license}, {version} -> js/config.js ve basic.version ile doldurulur.

Developer: Bugra Ozden
Email: bugra.ozden@gmail.com

*/

"use strict";

const TEXTS = {

    en: {
        htmlLang: "en",
        pageTitle: "basic.js – Build web interfaces with plain JavaScript",
        pageDescription: "basic.js is a small, dependency-free JavaScript library that creates the page objects for you. Layout, style and behavior stay together in plain JavaScript.",
        languageButton: "TR",
        languageHint: "Türkçe",

        // HEADER
        nav: {
            why: "Why",
            compare: "How it works",
            concepts: "Concepts",
            playground: "Playground",
            start: "Get started",
        },
        navHandbook: "Handbook",
        navComponents: "Components",
        menu: "Menu",

        // HERO
        heroEyebrow: "v{version} · Open source",
        heroTitle: "Build web interfaces with plain JavaScript.",
        heroLead: "basic.js creates the page objects for you. Write one function with the layout, style and behavior of your screen, and open the page in a browser.",
        heroPrimary: "Get started",
        heroSecondary: "Read the handbook",
        heroFacts: ["{size} gzipped", "0 dependencies", "No build step", "{license}"],
        heroDemoHint: "This is live code. Change it: the result updates.",

        // WHY
        whyEyebrow: "WHY BASIC.JS",
        whyTitle: "Keep simple things simple",
        why: [
            { icon: "read", title: "Reads like the screen", text: "The code of a screen follows its layout: a group, a title, a button. You understand it at a glance, months later too." },
            { icon: "feather", title: "Small and dependency-free", text: "One file, {size} gzipped, works directly on the DOM. Add it to a page and start." },
            { icon: "bolt", title: "Runs right away", text: "Add a script tag, save, refresh. The code you write is the code that runs." },
            { icon: "hand", title: "Full control in one place", text: "Layout, style and behavior live together in JavaScript, so everything about a screen is in one place." },
        ],

        // COMPARE
        compareEyebrow: "HOW IT WORKS",
        compareTitle: "The same card, two ways",
        compareLead: "Here is one card written with HTML, CSS and JavaScript, and again with basic.js. In basic.js the whole card is one function that reads like the screen.",
        compareClassic: "HTML + CSS + JavaScript",
        compareClassicNote: "3 files",
        compareBasic: "basic.js",
        compareBasicNote: "1 function",
        compareResult: "Result (live)",

        // CONCEPTS
        conceptsEyebrow: "SIX IDEAS",
        conceptsTitle: "Everything you need fits on one screen",
        conceptsLead: "basic.js has a handful of concepts. Learn them once and you can read any page built with it.",
        concepts: [
            { title: "Objects", text: "Box, Label, Button, Input and Icon. Settings go in one object; positions (left, top, width, height) can come first.", chapter: "box" },
            { title: "that", text: "The object created last. Style it right after you create it, without a variable.", chapter: "common-properties" },
            { title: "Containers", text: "Objects created between startBox() and endBox() go inside that box. Every start has its end.", chapter: "box" },
            { title: "AutoLayout", text: "HGroup and VGroup place their objects in a row or a column, with gap, padding and alignment.", chapter: "autolayout" },
            { title: "Events", text: "on(\"click\", ...) on any object. The handler gets the object itself and the event.", chapter: "common-properties" },
            { title: "Motion", text: "Tell an object what to animate with setMotion(), then just change its properties.", chapter: "motion" },
        ],
        readMore: "Read more",

        // PLAYGROUND
        playgroundEyebrow: "PLAYGROUND",
        playgroundTitle: "Try it here",
        playgroundLead: "Pick an example, change the code and watch the result update, right here in the page.",
        playgroundTabs: {
            layout: "Layout",
            todo: "To-do list",
            motion: "Motion",
            clock: "Clock",
        },

        // LIVE CODE
        run: "Run",
        reset: "Reset",
        result: "Result",
        console: "Console",
        editHint: "Edit the code · Ctrl + Enter runs it",

        // ECOSYSTEM
        ecosystemEyebrow: "ECOSYSTEM",
        ecosystemTitle: "More than a library",
        ecosystemLead: "basic.js comes with a handbook, the JS-Component Kit and ready app templates, all written with the same few ideas.",
        ecosystem: [
            { key: "handbook", icon: "book", title: "Handbook", text: "{chapters} chapters, from the first Box to motion and utilities. Every example runs in the page.", link: "Open the handbook" },
            { key: "components", icon: "grid", title: "Components", text: "{components} ready components: tabs, tables, date pickers, charts, toasts, dialogs… each with a live example and its code.", link: "Browse the components" },
            { key: "templates", icon: "layout", title: "App templates", text: "Mobile apps, a modular admin panel, an installable PWA and forms that post to a service. Start from a working app.", link: "See the templates" },
            { key: "toolkit", icon: "code", title: "VS Code tools", text: "Extensions for basic.js: code completion, an object navigator and a view inspector.", link: "In the repository" },
        ],

        // GET STARTED
        startEyebrow: "GET STARTED",
        startTitle: "Start in three steps",
        steps: [
            { title: "Get the basic folder", text: "Copy the basic folder (basic.min.js, basic.min.css and the font folder) next to your page." },
            { title: "Create a page", text: "Load the two files, then your own script. The body stays empty." },
            { title: "Write start()", text: "basic.js creates the page and calls start(). Open the file in a browser, or with VS Code Live Server." },
        ],
        downloadGithub: "Download from GitHub",
        viewSource: "View basic.js",

        // WHAT'S NEW
        newsEyebrow: "RELEASE",
        newsTitle: "New in v{version}",
        newsText: "New since v26.09.18, for cleaner components and fitted pages. One change to check in older pages: since v26.10.25 five helpers are under basic.* (basic.num()…), and the old create* functions are gone.",
        newsItems: ["basic.uiScale", "basic.scaleStyle()", "basic.applyStylePackage()", "basic.resolveTheme()", "basic.addCss()", "basic.isOn()", "Alpha()", "listenTo()", "onPageResize()", "after() / every()", "own()", "onHoverChange()", "setFocusRing()"],
        newsLink: "Release notes",

        // COPY
        copy: "Copy",
        copied: "The code is copied.",
        copyFailed: "The code could not be copied.",

        // FOOTER
        footerText: "basic.js is open source under the {license} license.",
        footerMade: "This page is built with basic.js.",
    },

    tr: {
        htmlLang: "tr",
        pageTitle: "basic.js – Saf JavaScript ile web arayüzleri",
        pageDescription: "basic.js, sayfa nesnelerini sizin için oluşturan küçük ve bağımlılıksız bir JavaScript kütüphanesidir. Yerleşim, görünüm ve davranış saf JavaScript içinde bir arada durur.",
        languageButton: "EN",
        languageHint: "English",

        // HEADER
        nav: {
            why: "Neden",
            compare: "Nasıl çalışır",
            concepts: "Kavramlar",
            playground: "Dene",
            start: "Başla",
        },
        navHandbook: "El kitabı",
        navComponents: "Bileşenler",
        menu: "Menü",

        // HERO
        heroEyebrow: "v{version} · Açık kaynak",
        heroTitle: "Web arayüzlerini saf JavaScript ile kurun.",
        heroLead: "basic.js sayfa nesnelerini sizin için oluşturur. Ekranınızın yerleşimini, görünümünü ve davranışını bir fonksiyonda yazın, sayfayı tarayıcıda açın.",
        heroPrimary: "Başlayın",
        heroSecondary: "El kitabını okuyun",
        heroFacts: ["{size} (gzip)", "0 bağımlılık", "Derleme yok", "{license}"],
        heroDemoHint: "Bu canlı bir kod. Değiştirin: sonuç yenilenir.",

        // WHY
        whyEyebrow: "NEDEN BASIC.JS",
        whyTitle: "Basit işler basit kalsın",
        why: [
            { icon: "read", title: "Ekran gibi okunur", text: "Bir ekranın kodu, ekranın düzenini izler: bir grup, bir başlık, bir düğme. Bir bakışta, aylar sonra da anlaşılır." },
            { icon: "feather", title: "Küçük ve bağımlılıksız", text: "Gzip ile {size} olan tek bir dosya, doğrudan DOM üzerinde çalışır. Sayfaya ekleyin ve başlayın." },
            { icon: "bolt", title: "Hemen çalışır", text: "Bir script etiketi ekleyin, kaydedin, yenileyin. Yazdığınız kod, çalışan koddur." },
            { icon: "hand", title: "Her şey tek yerde", text: "Yerleşim, görünüm ve davranış JavaScript içinde bir arada durur; bir ekranla ilgili her şey tek yerdedir." },
        ],

        // COMPARE
        compareEyebrow: "NASIL ÇALIŞIR",
        compareTitle: "Aynı kart, iki yol",
        compareLead: "Aynı kart önce HTML, CSS ve JavaScript ile, sonra basic.js ile yazıldı. basic.js'te kartın tamamı, ekran gibi okunan tek bir fonksiyondur.",
        compareClassic: "HTML + CSS + JavaScript",
        compareClassicNote: "3 dosya",
        compareBasic: "basic.js",
        compareBasicNote: "1 fonksiyon",
        compareResult: "Sonuç (canlı)",

        // CONCEPTS
        conceptsEyebrow: "ALTI FİKİR",
        conceptsTitle: "Bilmeniz gereken her şey tek ekrana sığar",
        conceptsLead: "basic.js'in birkaç kavramı vardır. Bir kez öğrenin; onunla yapılmış her sayfayı okuyabilirsiniz.",
        concepts: [
            { title: "Nesneler", text: "Box, Label, Button, Input ve Icon. Ayarlar tek bir nesnede verilir; konumlar (left, top, width, height) önce yazılabilir.", chapter: "box" },
            { title: "that", text: "En son oluşturulan nesne. Bir değişkene gerek kalmadan, oluşturduğunuz anda biçimlendirin.", chapter: "common-properties" },
            { title: "Kapsayıcılar", text: "startBox() ile endBox() arasında oluşturulan nesneler o kutunun içine girer. Her start'ın bir end'i vardır.", chapter: "box" },
            { title: "AutoLayout", text: "HGroup ve VGroup, içlerindeki nesneleri bir satıra veya sütuna dizer; boşluk, iç boşluk ve hizalama ile.", chapter: "autolayout" },
            { title: "Olaylar", text: "Her nesnede on(\"click\", ...). Fonksiyona nesnenin kendisi ve olay gelir.", chapter: "common-properties" },
            { title: "Hareket", text: "setMotion() ile neyin canlanacağını söyleyin, sonra sadece özelliklerini değiştirin.", chapter: "motion" },
        ],
        readMore: "Devamını okuyun",

        // PLAYGROUND
        playgroundEyebrow: "DENEME ALANI",
        playgroundTitle: "Burada deneyin",
        playgroundLead: "Bir örnek seçin, kodu değiştirin ve sonucun yenilenmesini doğrudan bu sayfada izleyin.",
        playgroundTabs: {
            layout: "Yerleşim",
            todo: "Yapılacaklar",
            motion: "Hareket",
            clock: "Saat",
        },

        // LIVE CODE
        run: "Çalıştır",
        reset: "Sıfırla",
        result: "Sonuç",
        console: "Konsol",
        editHint: "Kodu değiştirin · Ctrl + Enter çalıştırır",

        // ECOSYSTEM
        ecosystemEyebrow: "EKOSİSTEM",
        ecosystemTitle: "Bir kütüphaneden fazlası",
        ecosystemLead: "basic.js ile birlikte bir el kitabı, JS-Component Kit ve hazır uygulama şablonları gelir; hepsi aynı birkaç fikirle yazılmıştır.",
        ecosystem: [
            { key: "handbook", icon: "book", title: "El kitabı", text: "İlk Box'tan harekete ve yardımcı fonksiyonlara {chapters} bölüm. Her örnek sayfanın içinde çalışır.", link: "El kitabını açın" },
            { key: "components", icon: "grid", title: "Bileşenler", text: "{components} hazır bileşen: sekmeler, tablolar, tarih seçiciler, grafikler, bildirimler, pencereler… her biri canlı örneği ve koduyla.", link: "Bileşenlere göz atın" },
            { key: "templates", icon: "layout", title: "Uygulama şablonları", text: "Mobil uygulamalar, modüler bir yönetim paneli, kurulabilir bir PWA ve bir servise gönderilen formlar. Çalışan bir uygulamadan başlayın.", link: "Şablonları görün" },
            { key: "toolkit", icon: "code", title: "VS Code araçları", text: "basic.js için eklentiler: kod tamamlama, nesne gezgini ve görünüm denetçisi.", link: "Depoda" },
        ],

        // GET STARTED
        startEyebrow: "BAŞLAYIN",
        startTitle: "Üç adımda başlayın",
        steps: [
            { title: "basic klasörünü alın", text: "basic klasörünü (basic.min.js, basic.min.css ve font klasörü) sayfanızın yanına kopyalayın." },
            { title: "Bir sayfa oluşturun", text: "İki dosyayı, sonra kendi kodunuzu yükleyin. body boş kalır." },
            { title: "start() yazın", text: "basic.js sayfayı oluşturur ve start() fonksiyonunu çağırır. Dosyayı tarayıcıda veya VS Code Live Server ile açın." },
        ],
        downloadGithub: "GitHub'dan indirin",
        viewSource: "basic.js'i görün",

        // WHAT'S NEW
        newsEyebrow: "SÜRÜM",
        newsTitle: "v{version} ile gelenler",
        newsText: "v26.09.18'den bu yana gelenler: daha temiz bileşenler ve page.fit ile sığdırılan sayfalar için. Eski sayfalarda bakılacak tek değişiklik: v26.10.25 ile beş yardımcı basic.* altına taşındı (basic.num()…), eski create* fonksiyonları kaldırıldı.",
        newsItems: ["basic.uiScale", "basic.scaleStyle()", "basic.applyStylePackage()", "basic.resolveTheme()", "basic.addCss()", "basic.isOn()", "Alpha()", "listenTo()", "onPageResize()", "after() / every()", "own()", "onHoverChange()", "setFocusRing()"],
        newsLink: "Sürüm notları",

        // COPY
        copy: "Kopyala",
        copied: "Kod kopyalandı.",
        copyFailed: "Kod kopyalanamadı.",

        // FOOTER
        footerText: "basic.js, {license} lisansı ile açık kaynaktır.",
        footerMade: "Bu sayfa basic.js ile yapılmıştır.",
    },

};

// {size} gibi yer tutucuları doldurur.
TEXTS.fill = function (text) {
    return String(text)
        .replace(/\{size\}/g, CONFIG.sizeGzip)
        .replace(/\{components\}/g, CONFIG.componentCount)
        .replace(/\{chapters\}/g, CONFIG.chapterCount)
        .replace(/\{license\}/g, CONFIG.license)
        .replace(/\{version\}/g, (typeof basic !== "undefined" && basic.version) ? basic.version : "");
};
