/* Bismillah */

/*

basic.js Website - Site Controller - v26.09

- Sayfayı kurar, dili değiştirir, ekran genişliği değişince yeniden kurar.
- Builds the page, switches the language and rebuilds it when the window width changes.

Developer: Bugra Ozden
Email: bugra.ozden@gmail.com

*/

"use strict";

const SiteApp = {
    header: null,
    resizeTimer: null,
    lastWidth: 0,
};

// *** FIRST RUNNING FUNCTION:
const start = function () {

    SITE.lang = SiteApp.loadLanguage();

    page.color = SITE.DARK;

    SITE.injectCss();
    CodeHighlight.injectCss();

    if (typeof Toast === "function") {
        Toast.setOptions({ position: "bottom-center", theme: "dark" });
    }

    SiteApp.build();

    page.onResize(SiteApp.onPageResize);

};

// *** BUILD:

SiteApp.build = function (keepSectionKey = "") {

    SITE.L = SITE.createMetrics();
    SITE.T = TEXTS[SITE.lang];
    SITE.sections = {};
    SiteApp.lastWidth = SITE.L.w;

    SiteApp.applyDocumentInfo();

    // BOX: Kaydırılan tam ekran kutu
    // WHY: page kaydırılmaz. Uzun içerik, scrollY: 1 verilmiş bir Box içinde durur.
    SITE.scrollBox = startBox(0, 0, "100%", "100%", {
        color: SITE.BG,
        scrollY: 1,
    });

        // GROUP: Sayfa akışı
        VGroup({
            width: "100%",
            height: "auto", // Yükseklik içerikle büyür, böylece kutu kayabilir.
            align: "center top",
            gap: 0,
        });

            HeroSection({ onNavClick: SiteApp.onNavClick });
            WhySection();
            CompareSection();
            ConceptsSection();
            PlaygroundSection();
            EcosystemSection();
            StartSection();
            FooterSection({ onNavClick: SiteApp.onNavClick });

        endGroup();

    endBox();

    SiteApp.scrollBar = SITE.addScrollBar(SITE.scrollBox, { bar_color: "#8A8A86", bar_mouseOverColor: "#5A5A56" });

    // BOX: Üst çubuk (kaydırılan kutunun dışında)
    SiteApp.header = SiteHeader({
        onNavClick: SiteApp.onNavClick,
        onLanguageClick: SiteApp.toggleLanguage,
    });

    SITE.scrollBox.on("scroll", function () {
        SiteApp.header.refreshScrollState(SITE.scrollBox.elem.scrollTop);
    });

    // Yeniden kurulumdan sonra, ziyaretçiyi baktığı bölümde tut.
    if (keepSectionKey) SITE.scrollToKey(keepSectionKey, 0);

};

// Sayfadaki her şeyi siler.
SiteApp.destroy = function () {

    if (SiteApp.header) {
        SiteApp.header.remove();
        SiteApp.header = null;
    }

    if (SiteApp.scrollBar) {
        SiteApp.scrollBar.remove();
        SiteApp.scrollBar = null;
    }

    if (SITE.scrollBox) {
        // NOTE: remove(), içindeki LiveCode ve WebView nesnelerini de temizler.
        SITE.scrollBox.remove();
        SITE.scrollBox = null;
    }

};

// *** ACTIONS:

// Menüden, düğmelerden ve alt bilgiden çağırılır.
SiteApp.onNavClick = function (key) {

    if (key == "top") {
        SITE.scrollBox.elem.scrollTo({ top: 0, behavior: "smooth" });
        return;
    }

    SITE.scrollToKey(key);

};

SiteApp.toggleLanguage = function () {

    SITE.lang = (SITE.lang == "tr") ? "en" : "tr";
    basic.storage.save(CONFIG.languageStorageKey, SITE.lang);
    history.replaceState(null, "", SiteApp.languageAddress(SITE.lang)); // WHY: A copied link opens in this language.

    const sectionKey = SITE.getVisibleSectionKey();
    SiteApp.destroy();
    SiteApp.build(sectionKey);

};

// Önce adres (?lang=tr), sonra kayıtlı dil; ikisi de yok ise tarayıcı dili Türkçe ise Türkçe, değil ise varsayılan dil.
SiteApp.loadLanguage = function () {

    // The address first (?lang=tr): a shared link or a search engine asks for this language.
    const asked = new URLSearchParams(location.search).get("lang");
    if (asked == "tr" || asked == "en") return asked;

    const saved = basic.storage.load(CONFIG.languageStorageKey);
    if (saved && TEXTS[saved]) return saved;

    const browserLanguage = (navigator.language || "").toLowerCase();
    if (browserLanguage.indexOf("tr") === 0) return "tr";

    return CONFIG.defaultLanguage;

};

// Ekran genişliği değişince, sayfa yeniden kurulur.
SiteApp.onPageResize = function () {

    SiteApp.resizeTimer = waitAndRun(SiteApp.resizeTimer, function () {

        // WHY: Sadece yükseklik değişmiş ise (mobil adres çubuğu) yeniden kurma.
        if (page.width == SiteApp.lastWidth) return;

        const sectionKey = SITE.getVisibleSectionKey();
        SiteApp.destroy();
        SiteApp.build(sectionKey);

    }, CONFIG.rebuildOnResizeDelay);

};

// *** DOCUMENT:
SiteApp.applyDocumentInfo = function () {

    const T = SITE.T;

    document.title = T.pageTitle;
    document.documentElement.setAttribute("lang", T.htmlLang);

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", T.pageDescription);


    SiteApp.applySeo();

};

// *** SEO:
// The language is in the address: the default language is the address itself, the other one has ?lang=.
// So a search engine reads both languages, and a shared link opens in the same language.
// CONFIG.siteURL (the published address) adds canonical, hreflang and og:url. "": not known yet.

// The address of a language. base: CONFIG.siteURL (no hash), or the current address (the hash is kept).
SiteApp.languageAddress = function (lang, base) {
    const url = new URL(base || location.href);
    if (lang == CONFIG.defaultLanguage) url.searchParams.delete("lang");
    else url.searchParams.set("lang", lang);
    if (base) url.hash = "";
    return url.href;
};

// The link preview texts of the language, and the links that need the published address.
// WHY: The texts in <head> are in one language; Google reads the page after the code, so they are set here too.
SiteApp.applySeo = function () {

    const T = SITE.T;

    SiteApp.setSeoTag("meta", "property", "og:title", "content", T.pageTitle);
    SiteApp.setSeoTag("meta", "property", "og:description", "content", T.pageDescription);
    SiteApp.setSeoTag("meta", "property", "og:locale", "content", (SITE.lang == "tr") ? "tr_TR" : "en_US");

    if (!CONFIG.siteURL) return;

    SiteApp.setSeoTag("link", "rel", "canonical", "href", SiteApp.languageAddress(SITE.lang, CONFIG.siteURL));
    ["en", "tr", "x-default"].forEach(function (lang) {
        const href = SiteApp.languageAddress((lang == "x-default") ? CONFIG.defaultLanguage : lang, CONFIG.siteURL);
        SiteApp.setSeoTag("link", "hreflang", lang, "href", href, { rel: "alternate" });
    });
    SiteApp.setSeoTag("meta", "property", "og:url", "content", SiteApp.languageAddress(SITE.lang, CONFIG.siteURL));
    SiteApp.setSeoTag("meta", "property", "og:image", "content", new URL(CONFIG.ogImage, CONFIG.siteURL).href);

};

// Finds (or adds) <tag key="value"> in <head> and sets one of its attributes.
SiteApp.setSeoTag = function (tag, key, value, attr, content, extra) {
    let elem = document.head.querySelector(tag + "[" + key + "=\"" + value + "\"]");
    if (!elem) {
        elem = document.createElement(tag);
        elem.setAttribute(key, value);
        if (extra) Object.keys(extra).forEach(function (name) { elem.setAttribute(name, extra[name]); });
        document.head.appendChild(elem);
    }
    elem.setAttribute(attr, content);
};

