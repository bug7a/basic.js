/* Bismillah */

/*

basic.js Website - Site Theme & UI Helpers - v26.09

- Renk paleti, ölçüler, ikonlar ve sayfa boyunca tekrar eden arayüz parçaları.
- Color palette, metrics, icons and the small UI pieces the page repeats.

Developer: Bugra Ozden
Email: bugra.ozden@gmail.com

*/

"use strict";

const SITE = {

    // *** COLORS:
    DARK: "#0F1012",            // Koyu bölümler (hero, footer)
    DARK_SOFT: "#18191C",       // Koyu zemin üzerindeki kartlar
    ACCENT: "#F5B82E",          // Ana vurgu (amber)
    ACCENT_HOVER: "#FFC94D",
    ACCENT_TEXT: "#8A5A00",     // Açık zeminde vurgu yazısı
    ACCENT_SOFT: "#FBEFD0",
    BG: "#F6F4EF",              // Sayfa zemini
    BG_SOFT: "#EDEAE2",
    CARD: "#FFFFFF",
    INK: "#141414",
    LINE: "rgba(0, 0, 0, 0.09)",
    LINE_STRONG: "rgba(0, 0, 0, 0.16)",
    TEXT: "rgba(0, 0, 0, 0.82)",
    TEXT_SOFT: "rgba(0, 0, 0, 0.58)",
    TEXT_FAINT: "rgba(0, 0, 0, 0.4)",
    ON_DARK: "rgba(255, 255, 255, 0.94)",
    ON_DARK_SOFT: "rgba(255, 255, 255, 0.64)",
    ON_DARK_FAINT: "rgba(255, 255, 255, 0.4)",
    ON_DARK_LINE: "rgba(255, 255, 255, 0.12)",

    // Kod panelleri
    CODE_BG: "#15171C",
    CODE_BAR: "#1C1F26",
    CODE_LINE: "rgba(255, 255, 255, 0.08)",
    CODE_TEXT: "#D6DAE0",
    CODE_SOFT: "rgba(255, 255, 255, 0.5)",
    RUN: "#2EA043",

    BOLD: "opensans-bold",
    MONO: "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",

    // *** STATE: (site.js doldurur)
    L: null,            // Ölçüler (metrics)
    T: null,            // Metinler (texts)
    lang: "en",
    scrollBox: null,    // Kaydırılan ana kutu
    sections: {},       // { key: box }

};

// *** METRICS:
// Ekran genişliğine göre bütün ölçüleri tek yerden üretir.
SITE.createMetrics = function () {

    const w = page.width;
    const mobile = (w < 760) ? 1 : 0;
    const tablet = (!mobile && w < 1120) ? 1 : 0;

    const gutter = mobile ? 18 : 40;
    const content = Math.min(1180, w - (gutter * 2));
    const gap = mobile ? 14 : 22;

    // Genişliğe göre sütun sayısını düşürür ve tek sütunun genişliğini verir.
    const columns = function (count) {
        let realCount = count;
        if (mobile) realCount = 1;
        else if (tablet && count > 2) realCount = 2;
        return Math.floor((content - (gap * (realCount - 1))) / realCount);
    };

    return {
        w: w,
        h: page.height,
        mobile: mobile,
        tablet: tablet,
        desktop: (!mobile && !tablet) ? 1 : 0,
        gutter: gutter,
        content: content,
        gap: gap,
        columns: columns,

        headerH: mobile ? 60 : 68,
        sectionPadY: mobile ? 64 : 104,

        h1: mobile ? 38 : (tablet ? 52 : 64),
        h2: mobile ? 28 : 42,
        h3: mobile ? 18 : 20,
        lead: mobile ? 16 : 19,
        body: mobile ? 15 : 16,
        small: 13,
        tiny: 11,
    };

};

// *** URL:
SITE.rootUrl = function (path = "") {
    return new URL(CONFIG.rootPath + path, location.href).href;
};

// *** ICONS: (Satır içi SVG, resim dosyası gerekmez.)
SITE.ICON_PATHS = {
    read: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    feather: '<path d="M20.2 12.2a6 6 0 0 0-8.5-8.5L5 10.5V19h8.5z"/><path d="M16 8 2 22M17.5 15H9"/>',
    bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
    hand: '<path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="9"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
    play: '<path d="M7 4.5v15l12-7.5z" fill="currentColor"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
    reset: '<path d="M3 12a9 9 0 1 0 2.6-6.4"/><path d="M3 3v6h6"/>',
    github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    check: '<path d="m5 12 5 5L20 7"/>',
};

SITE.svg = function (name, color = "currentColor", size = 18, strokeWidth = 2) {
    const paths = SITE.ICON_PATHS[name].replace(/currentColor/g, color);
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="' + color
        + '" stroke-width="' + strokeWidth + '" stroke-linecap="round" stroke-linejoin="round" style="display:block">' + paths + '</svg>';
};

// LABEL: İkon
SITE.icon = function (name, color, size = 18, strokeWidth = 2) {

    Label({ text: SITE.svg(name, color, size, strokeWidth), width: size, height: size });
    that.elem.style.flexShrink = "0";

    return that;

};

// ICON: Logo (356 x 83)
SITE.logo = function (height = 26) {

    Icon({ width: Math.round(height * 356 / 83), height: height, color: "transparent" });
    that.load(CONFIG.logoFile);
    that.elem.title = CONFIG.brandName;
    that.elem.style.flexShrink = "0";

    return that;

};

// *** SECTION:
// Tam genişlikte bir şerit + ortalanmış içerik grubu açar. (2 grup açar)
SITE.startSection = function (params = {}) {

    const L = SITE.L;

    mergeIntoIfMissing(params, {
        key: "",
        dark: 0,
        color: "",
        align: "left top",
        gap: L.gap,
        padY: L.sectionPadY,
    });

    // GROUP: Şerit
    const strip = VGroup({
        width: "100%",
        height: "auto",
        align: "center top",
        color: params.color || (params.dark ? SITE.DARK : SITE.BG),
        padding: [L.gutter, params.padY],
    });
    strip.clipContent = 0;
    if (params.key) SITE.sections[params.key] = strip;

    // GROUP: İçerik
    VGroup({ width: L.content, height: "auto", align: params.align, gap: params.gap });
    that.clipContent = 0; // WHY: Kartlar üzerine gelince kalkar ve gölge alır; kenarlarda kesilmesin.

    return strip;

};

SITE.endSection = function () {
    endGroup(); // içerik
    endGroup(); // şerit
};

// Bölüm başı: üst etiket, başlık ve giriş (ortalı veya sola dayalı)
SITE.sectionIntro = function (eyebrow, title, lead = "", dark = 0, centered = 1) {

    const L = SITE.L;

    VGroup({ width: "100%", height: "auto", align: centered ? "center top" : "left top", gap: 14 });
    that.elem.style.marginBottom = (L.mobile ? 18 : 30) + "px";

        SITE.eyebrow(eyebrow, dark);
        SITE.h2(title, dark, centered);
        if (lead) SITE.lead(lead, Math.min(700, L.content), dark, centered);

    endGroup();

};

// *** TEXT PIECES:

SITE.eyebrow = function (text, dark = 0) {

    Label({ text: text, fontSize: SITE.L.tiny, textColor: dark ? SITE.ACCENT : SITE.ACCENT_TEXT });
    that.elem.style.fontFamily = SITE.BOLD;
    that.elem.style.letterSpacing = "1.6px";
    that.elem.style.whiteSpace = "nowrap";

    return that;

};

SITE.h1 = function (text, dark = 0, width = "100%") {

    Label({ text: text, width: width, fontSize: SITE.L.h1, textColor: dark ? "#FFFFFF" : SITE.INK });
    that.elem.style.fontFamily = SITE.BOLD;
    that.elem.style.lineHeight = "1.05";
    that.elem.style.overflow = "visible"; // WHY: Büyük yazının harfleri (Ö, Ş, ğ, g) satır kutusunun dışına taşar; basic.css etiketi keser.
    that.elem.style.letterSpacing = "-1.2px";

    return that;

};

SITE.h2 = function (text, dark = 0, centered = 0) {

    Label({ text: text, width: "100%", fontSize: SITE.L.h2, textColor: dark ? "#FFFFFF" : SITE.INK });
    that.elem.style.fontFamily = SITE.BOLD;
    that.elem.style.lineHeight = "1.15";
    that.elem.style.overflow = "visible"; // WHY: Büyük yazının harfleri (Ö, Ş, ğ, g) satır kutusunun dışına taşar; basic.css etiketi keser.
    that.elem.style.letterSpacing = "-0.6px";
    if (centered) that.elem.style.textAlign = "center";

    return that;

};

SITE.h3 = function (text, dark = 0, width = "100%") {

    Label({ text: text, width: width, fontSize: SITE.L.h3, textColor: dark ? "#FFFFFF" : SITE.INK });
    that.elem.style.fontFamily = SITE.BOLD;
    that.elem.style.lineHeight = "1.3";
    that.elem.style.overflow = "visible"; // WHY: Büyük yazının harfleri (Ö, Ş, ğ, g) satır kutusunun dışına taşar; basic.css etiketi keser.

    return that;

};

SITE.lead = function (text, width = "100%", dark = 0, centered = 0) {

    Label({ text: text, width: width, fontSize: SITE.L.lead, textColor: dark ? SITE.ON_DARK_SOFT : SITE.TEXT_SOFT });
    that.elem.style.lineHeight = "1.6";
    if (centered) that.elem.style.textAlign = "center";

    return that;

};

SITE.text = function (text, width = "100%", dark = 0, size = 0) {

    Label({ text: text, width: width, fontSize: size || SITE.L.body, textColor: dark ? SITE.ON_DARK_SOFT : SITE.TEXT_SOFT });
    that.elem.style.lineHeight = "1.65";

    return that;

};

// LABEL: Tek satır
SITE.label = function (text, params = {}) {

    mergeIntoIfMissing(params, { fontSize: 15, textColor: SITE.TEXT, bold: 0 });

    Label({ text: text, fontSize: params.fontSize, textColor: params.textColor });
    if (params.bold) that.elem.style.fontFamily = SITE.BOLD;
    that.elem.style.whiteSpace = "nowrap";

    return that;

};

// LABEL: Küçük hap
SITE.chip = function (text, params = {}) {

    mergeIntoIfMissing(params, { color: SITE.ACCENT_SOFT, textColor: SITE.ACCENT_TEXT, fontSize: 12, mono: 0 });

    Label({ text: text, fontSize: params.fontSize, textColor: params.textColor, color: params.color, round: 100 });
    that.elem.style.padding = "6px 12px";
    that.elem.style.whiteSpace = "nowrap";
    that.elem.style.fontFamily = params.mono ? SITE.MONO : SITE.BOLD;

    return that;

};

// *** BUTTONS:

// GROUP: Düğme (ikonlu olabilir). kind: "primary", "dark", "light", "ghost", "ghost-dark", "code", "run", "plain-dark", "plain"
// NOTE: Button yerine grup: Button içine nesne konulamaz.
SITE.button = function (params = {}) {

    const L = SITE.L;

    mergeIntoIfMissing(params, {
        text: "",
        icon: "",
        iconRight: 0,
        kind: "primary",
        height: L.mobile ? 46 : 50,
        fontSize: L.mobile ? 15 : 16,
        hint: "",
        onClick: function (self) { },
    });

    const colors = {
        "primary": { base: SITE.ACCENT, hover: SITE.ACCENT_HOVER, text: SITE.DARK, border: "" },
        "dark": { base: SITE.INK, hover: "#2C2C2C", text: "#FFFFFF", border: "" },
        "light": { base: "#FFFFFF", hover: "#EFEDE6", text: SITE.INK, border: "" },
        "ghost": { base: "transparent", hover: "rgba(0, 0, 0, 0.05)", text: SITE.INK, border: SITE.LINE_STRONG },
        "ghost-dark": { base: "transparent", hover: "rgba(255, 255, 255, 0.08)", text: "#FFFFFF", border: "rgba(255, 255, 255, 0.22)" },
        "plain": { base: "transparent", hover: "rgba(0, 0, 0, 0.05)", text: SITE.TEXT, border: "" },
        "plain-dark": { base: "transparent", hover: "rgba(255, 255, 255, 0.08)", text: SITE.ON_DARK, border: "" },
        "code": { base: "transparent", hover: "rgba(255, 255, 255, 0.08)", text: SITE.CODE_TEXT, border: "rgba(255, 255, 255, 0.14)" },
        "run": { base: SITE.RUN, hover: "#35B24C", text: "#FFFFFF", border: "" },
    }[params.kind];

    const btn = HGroup({
        width: "auto",
        height: params.height,
        align: "center center",
        gap: 8,
        padding: [params.text ? Math.round(params.height * 0.44) : 0, 0],
        color: colors.base,
        round: Math.min(12, Math.round(params.height / 3.6)),
    });
    btn.elem.style.flexShrink = "0";
    if (!params.text) btn.width = params.height;
    if (colors.border) {
        btn.border = 1;
        btn.borderColor = colors.border;
    }

        const iconSize = (params.icon == "play") ? Math.round(params.fontSize * 0.8) : Math.round(params.fontSize * 1.1);

        if (params.icon && !params.iconRight) btn.lblIcon = SITE.icon(params.icon, colors.text, iconSize);

        if (params.text) {
            btn.lblText = Label({ text: params.text, fontSize: params.fontSize, textColor: colors.text });
            btn.lblText.elem.style.fontFamily = SITE.BOLD;
            btn.lblText.elem.style.whiteSpace = "nowrap";
        }

        if (params.icon && params.iconRight) btn.lblIcon = SITE.icon(params.icon, colors.text, iconSize);

    endGroup();

    btn.elem.style.cursor = "pointer";
    btn.elem.setAttribute("role", "button");
    btn.elem.setAttribute("tabindex", "0");
    if (params.hint || params.text) {
        btn.elem.title = params.hint || "";
        btn.elem.setAttribute("aria-label", params.hint || params.text);
    }

    btn.setMotion("background-color 0.15s, transform 0.12s");
    btn.on("mouseenter", function () { btn.color = colors.hover; });
    btn.on("mouseleave", function () { btn.color = colors.base; btn.elem.style.transform = "scale(1)"; });
    btn.on("mousedown", function () { btn.elem.style.transform = "scale(0.97)"; });
    btn.on("mouseup", function () { btn.elem.style.transform = "scale(1)"; });
    btn.on("click", function () { params.onClick(btn); });
    btn.on("keydown", function (self, event) {
        if (event.key == "Enter" || event.key == " ") {
            event.preventDefault();
            params.onClick(btn);
        }
    });

    btn.setText = function (text) {
        if (btn.lblText) btn.lblText.text = text;
    };

    return btn;

};

// *** CODE PANEL: (Okunur, çalıştırılmaz)
// GROUP: Koyu kod kartı. title: dosya adı, note: sağdaki küçük yazı. (1 grup açıp kapatır)
SITE.codePanel = function (params = {}) {

    mergeIntoIfMissing(params, {
        title: "",
        note: "",
        code: "",
        language: "js",
        width: "100%",
        fontSize: SITE.L.mobile ? 12 : 13,
        copy: 1,
    });

    const panel = VGroup({ width: params.width, height: "auto", align: "left top", gap: 0, color: SITE.CODE_BG, round: 14 });
    panel.clipContent = 1;
    panel.elem.style.alignItems = "stretch";
    panel.elem.style.flexShrink = "0";

        SITE.codeBar(params.title, params.note, params.copy ? params.code : "");

        // BOX: Kod (düz HTML, seçilebilir)
        Box({ width: "100%", height: "auto", color: "transparent" });
        that.elem.style.position = "relative";
        that.elem.appendChild(SITE.createPre(params.code, params.language, params.fontSize));

    endGroup();

    return panel;

};

// GROUP: Kod kartının başlık çubuğu (üç nokta, dosya adı, not, kopyala)
SITE.codeBar = function (title, note = "", copyText = "") {

    const bar = HGroup({ width: "100%", height: 42, align: "left center", gap: 10, padding: [14, 0], color: SITE.CODE_BAR });
    bar.elem.style.flexShrink = "0";

        // GROUP: Üç nokta
        HGroup({ width: "auto", height: "auto", align: "left center", gap: 6 });
        that.elem.style.flexShrink = "0";
            ["#FF5F57", "#FEBC2E", "#28C840"].forEach(function (color) {
                Box({ width: 10, height: 10, round: 5, color: color });
            });
        endGroup();

        if (title) {
            Label({ text: basic.escapeHtml(title), fontSize: 12, textColor: SITE.CODE_SOFT });
            that.elem.style.fontFamily = SITE.MONO;
            that.elem.style.whiteSpace = "nowrap";
        }

        SITE.spacer();

        if (note) {
            Label({ text: note, fontSize: 12, textColor: SITE.CODE_SOFT });
            that.elem.style.whiteSpace = "nowrap";
        }

        if (copyText) {
            SITE.button({ icon: "copy", kind: "code", height: 28, fontSize: 13, hint: SITE.T.copy, onClick: function () { SITE.copy(copyText); } });
        }

    endGroup();

    return bar;

};

// Renklendirilmiş <pre> (düz HTML)
// NOTE: basic.css kutulara pointer-events: none ve sayfaya user-select: none verir; burada açılıyor.
SITE.createPre = function (code, language = "js", fontSize = 13) {

    const pre = document.createElement("pre");
    pre.style.cssText = "margin: 0px; padding: 16px 18px; white-space: pre-wrap; word-break: break-word; tab-size: 4;"
        + "font-family: " + SITE.MONO + "; font-size: " + fontSize + "px; line-height: " + Math.round(fontSize * 1.62) + "px;"
        + "color: " + SITE.CODE_TEXT + "; outline: none; caret-color: #FFFFFF;"
        + "pointer-events: auto; user-select: text; -webkit-user-select: text; cursor: text;";
    pre.setAttribute("spellcheck", "false");
    pre.innerHTML = SITE.codeHtml(code, language);

    return pre;

};

// Renklendirilmiş kod, her satır ayrı bir blokta.
// WHY: Uzun bir satır kaydığında, devamı sol kenardan değil, satırın kendi girintisinden (+2 karakter) başlar.
// NOTE: Satır sonları ("\n") metin olarak kalır: textContent kodun aynısıdır (düzenleyicinin imleci ve getCode() buna dayanır).
//       endNewLine: 1, son satırın sonuna da "\n" ekler (düzenleyicideki görünmez son satır).
SITE.codeHtml = function (code, language = "js", endNewLine = 0) {

    const html = CodeHighlight.highlight(code, (language == "html" || language == "css") ? language : "js");
    const indents = String(code).split("\n").map(function (line) {
        return /^[ \t]*/.exec(line)[0].replace(/\t/g, "    ").length;
    });

    const lines = [];
    let current = "";
    let openTag = ""; // WHY: Bir yorum veya metin birden çok satıra yayılabilir; açık <span> her satırda yeniden açılır.

    html.split(/(<span[^>]*>|<\/span>|\n)/).forEach(function (part) {
        if (part == "\n") {
            lines.push(current + (openTag ? "</span>" : ""));
            current = openTag;
        } else if (/^<span/.test(part)) {
            openTag = part;
            current += part;
        } else if (part == "</span>") {
            openTag = "";
            current += part;
        } else {
            current += part;
        }
    });
    lines.push(current);

    return lines.map(function (line, index) {
        const hang = (indents[index] || 0) + 2;
        const end = (index < lines.length - 1 || endNewLine) ? "\n" : "";
        return '<span style="display: block; padding-left: ' + hang + 'ch; text-indent: -' + hang + 'ch;">' + line + end + '</span>';
    }).join("");

};

// *** GRID / CARD:

// GROUP: Kartların yan yana dizildiği, taşınca alt satıra geçen satır. (1 grup açar)
SITE.startGrid = function (gap = SITE.L.gap) {

    const grid = HGroup({ width: "100%", height: "auto", align: "center top", gap: gap, wrap: 1 });
    grid.elem.style.alignItems = "stretch"; // WHY: Aynı satırdaki kartlar aynı boyda dursun.
    grid.clipContent = 0;

    return grid;

};

SITE.endGrid = function () {
    endGroup();
};

// GROUP: Kart. (1 grup açar)
SITE.startCard = function (params = {}) {

    const L = SITE.L;

    mergeIntoIfMissing(params, {
        width: L.columns(3),
        gap: 12,
        padding: L.mobile ? 22 : 28,
        dark: 0,
        hover: 1,
    });

    const card = VGroup({
        width: params.width,
        height: "auto",
        align: "left top",
        gap: params.gap,
        padding: params.padding,
        color: params.dark ? SITE.DARK_SOFT : SITE.CARD,
        round: 16,
        border: 1,
        borderColor: params.dark ? SITE.ON_DARK_LINE : SITE.LINE,
    });

    if (params.hover) {
        card.setMotion("transform 0.2s, box-shadow 0.2s, border-color 0.2s");
        card.on("mouseenter", function () {
            card.elem.style.transform = "translateY(-3px)";
            card.elem.style.boxShadow = params.dark ? "0px 12px 30px rgba(0, 0, 0, 0.4)" : "0px 12px 30px rgba(0, 0, 0, 0.07)";
            card.borderColor = params.dark ? "rgba(255, 255, 255, 0.24)" : SITE.LINE_STRONG;
        });
        card.on("mouseleave", function () {
            card.elem.style.transform = "translateY(0px)";
            card.elem.style.boxShadow = "none";
            card.borderColor = params.dark ? SITE.ON_DARK_LINE : SITE.LINE;
        });
    }

    return card;

};

SITE.endCard = function () {
    endGroup();
};

// GROUP: İkon zemini
SITE.iconBadge = function (name, dark = 0, size = 46) {

    const badge = VGroup({ width: size, height: size, align: "center", color: dark ? "rgba(245, 184, 46, 0.14)" : SITE.ACCENT_SOFT, round: 12 });
    badge.elem.style.flexShrink = "0";

        SITE.icon(name, dark ? SITE.ACCENT : SITE.ACCENT_TEXT, Math.round(size * 0.48));

    endGroup();

    return badge;

};

// *** SMALL PIECES:

// BOX: Esnek boşluk
SITE.spacer = function () {

    Box(0, 0, 1, 1, { color: "transparent" });
    that.elem.style.flex = "1 1 0";
    that.elem.style.minWidth = "0";

    return that;

};

// Kutuya kaydırma çubuğu ekler (scroll-bar.js yüklü değil ise sessizce geçer).
SITE.addScrollBar = function (scrollableBox, params = {}) {

    if (typeof ScrollBar !== "function") return null;

    params.scrollableBox = scrollableBox;
    return ScrollBar(params);

};

// *** COPY:
SITE.copy = function (text) {

    const T = SITE.T;

    const done = function () {
        if (typeof Toast === "function") Toast.show({ key: "copy", type: "success", message: T.copied });
    };

    const fail = function () {
        if (typeof Toast === "function") Toast.show({ key: "copy", type: "error", message: T.copyFailed });
    };

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, fail);
        return;
    }

    const area = document.createElement("textarea");
    area.value = text;
    area.style.cssText = "position: fixed; left: -9999px; top: 0px;";
    document.body.appendChild(area);
    area.select();

    let ok = false;
    try {
        ok = document.execCommand("copy");
    } catch (error) {
        ok = false;
    }

    area.remove();
    if (ok) done(); else fail();

};

// *** NAVIGATION:

// Bölüme yumuşakça kaydırır.
SITE.scrollToKey = function (key, smooth = 1) {

    const target = SITE.sections[key];
    if (!target || !SITE.scrollBox) return;

    const boxElem = SITE.scrollBox.elem;
    const top = target.elem.getBoundingClientRect().top - boxElem.getBoundingClientRect().top + boxElem.scrollTop - SITE.L.headerH;

    boxElem.scrollTo({ top: Math.max(0, top), behavior: smooth ? "smooth" : "auto" });

};

// Ekranın üstündeki bölümün anahtarı. (Yeniden kurarken yeri korumak için)
SITE.getVisibleSectionKey = function () {

    if (!SITE.scrollBox) return "";

    const boxTop = SITE.scrollBox.elem.getBoundingClientRect().top;
    let foundKey = "";

    for (let key in SITE.sections) {
        if (SITE.sections[key].elem.getBoundingClientRect().top - boxTop <= SITE.L.headerH + 4) foundKey = key;
    }

    return foundKey;

};

// *** CSS:
// WHY: Label içindeki satır içi <code> ve <b> etiketlerinin görünümü satır içi stil ile verilemez.
SITE.injectCss = function () {

    if (document.getElementById("bjs-site-css")) return;

    const style = document.createElement("style");
    style.id = "bjs-site-css";
    style.textContent = ""
        + "b, strong { font-family: opensans-bold; font-weight: normal; }"
        + ".bjs-text code { font-family: " + SITE.MONO + "; font-size: 0.88em; background: rgba(0, 0, 0, 0.06); border-radius: 5px; padding: 1px 5px; }"
        + ".bjs-dark code { background: rgba(255, 255, 255, 0.1); color: #FFFFFF; }"
        + "::selection { background: rgba(245, 184, 46, 0.35); }";
    document.head.appendChild(style);

};
