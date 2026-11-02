/* Bismillah */

/*

basic.js Website - Site Configuration - v26.09

- Tüm site ayarları bu dosyadadır. Metinler: js/texts.js  |  Kod örnekleri: js/samples.js
- All site settings are in this file. Texts: js/texts.js  |  Code samples: js/samples.js

Developer: Bugra Ozden
Email: bugra.ozden@gmail.com

*/

"use strict";

const CONFIG = {

    // *** BRAND:
    brandName: "basic.js",
    logoFile: "assets/basicjs-ui-library-white-text.svg", // Logo (356 x 83), koyu zemin için yazıları beyaz kopyası / text made white for the dark background, relative to this page

    // *** PATHS: (Bu sayfaya göre)
    // Canlı örnekler buradaki basic/basic.min.js ile çalışır. (Site kendi içinden çalışır: basic/ ve comp/ bu klasörde,
    // ana dizindeki _make-standalone.sh ile kopyalanır.)
    rootPath: "./",

    // *** LINKS:
    githubURL: "https://github.com/bug7a/js-components",
    handbookURL: "https://bug7a.github.io/basic.js-handbook/",
    componentsURL: "https://bug7a.github.io/js-components/",
    authorURL: "https://bug7a.github.io/", // Alt bilgideki "Bugra Ozden"
    templatesURL: "https://github.com/bug7a/js-components/tree/main/04-templates",
    toolkitURL: "https://github.com/bug7a/js-components/tree/main/__developer-toolkit",
    // "basic.js'i görün" düğmesi (kaynak kod GitHub'da; bu klasörde sadece .min dosyası var)
    sourceURL: "https://github.com/bug7a/js-components/blob/main/basic/basic.js",

    // *** FACTS: (Tanıtımdaki sayılar. basic.min.js değişince güncelleyin.)
    // basic/basic.min.js: 45.1 KB, gzip: 14.3 KB (v26.11.01)
    sizeGzip: "14 KB",
    componentCount: 69,
    chapterCount: 16,
    license: "Apache 2.0",

    // *** LIVE CODE:
    // Deneme alanında yazmayı bırakınca, sonucun yenilenmesi için beklenen süre (ms)
    autoRunDelay: 700,

    // *** LANGUAGE:
    defaultLanguage: "en", // "tr", "en"
    languageStorageKey: "bjs_lang",

    // *** SEO:
    // The published address of this page (ex: "https://bug7a.github.io/basic.js/"). "": not known yet.
    // With it, the page adds its canonical, hreflang (?lang=tr / ?lang=en) and og:url links.
    // Also write it into og:image in index.htm: link previews do not run JavaScript.
    siteURL: "https://bug7a.github.io/basic.js/",
    ogImage: "assets/og-image.jpg", // The link preview picture (1200 x 630), relative to this page

    // *** BEHAVIOR:
    // Pencere genişliği değişince sayfa yeniden kurulur (ms gecikme ile).
    rebuildOnResizeDelay: 180,

};
