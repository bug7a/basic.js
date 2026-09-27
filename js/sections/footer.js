/* Bismillah */

/*

FooterSection - v26.09 (basic.js Website)

- Koyu alt bölüm: son sürümle gelenler (hap listesi) ve alt bilgi (logo, bağlantılar, lisans).

Developer: Bugra Ozden
Email: bugra.ozden@gmail.com

*/

"use strict";

const FooterSection = function (params = {}) {

    mergeIntoIfMissing(params, { onNavClick: function (key) { } });

    const L = SITE.L;
    const T = SITE.T;

    SITE.startSection({ key: "news", dark: 1, gap: 0, padY: L.mobile ? 56 : 80 });

        // GROUP: Yenilikler kartı
        VGroup({ width: "100%", height: "auto", align: "left top", gap: 16, padding: L.mobile ? 22 : 36, color: SITE.DARK_SOFT, round: 18, border: 1, borderColor: SITE.ON_DARK_LINE });

            SITE.eyebrow(T.newsEyebrow, 1);
            SITE.h2(TEXTS.fill(T.newsTitle), 1);
            that.fontSize = L.mobile ? 24 : 30;
            SITE.text(T.newsText, "100%", 1);

            // GROUP: Yeni özellikler
            HGroup({ width: "100%", height: "auto", align: "left top", gap: 8, wrap: 1 });

                T.newsItems.forEach(function (item) {
                    SITE.chip(item, { color: "rgba(255, 255, 255, 0.07)", textColor: SITE.ON_DARK, mono: 1 });
                });

            endGroup();

            // GROUP: Sürüm notları bağlantısı
            const link = HGroup({ width: "auto", height: "auto", align: "left center", gap: 6 });
            link.elem.style.cursor = "pointer";
                SITE.label(T.newsLink, { bold: 1, fontSize: 14, textColor: SITE.ACCENT });
                SITE.icon("arrow", SITE.ACCENT, 15);
            endGroup();
            link.on("click", function () { location.href = CONFIG.handbookURL + "#/what-is-new"; });

        endGroup();

        // BOX: Çizgi
        Box(0, 0, "100%", 1, { color: SITE.ON_DARK_LINE });
        that.elem.style.margin = (L.mobile ? 40 : 60) + "px 0px 28px 0px";
        that.elem.style.flexShrink = "0";

        // GROUP: Alt bilgi
        HGroup({ width: "100%", height: "auto", align: "left center", gap: 16, wrap: 1 });

            // GROUP: Logo
            HGroup({ width: "auto", height: "auto", align: "left center", gap: 10 });
                SITE.logo(30);
            endGroup();

            SITE.text(TEXTS.fill(T.footerText) + " " + T.footerMade, "auto", 1, 13);
            that.elem.style.flex = "1 1 280px";

            // GROUP: Bağlantılar
            HGroup({ width: "auto", height: "auto", align: "left center", gap: 18, wrap: 1 });

                [
                    { text: T.navHandbook, url: CONFIG.handbookURL },
                    { text: T.navComponents, url: CONFIG.componentsURL },
                    { text: "GitHub", url: CONFIG.githubURL },
                ].forEach(function (item) {
                    const lbl = SITE.label(item.text, { fontSize: 14, textColor: SITE.ON_DARK_SOFT });
                    lbl.elem.style.cursor = "pointer";
                    lbl.on("mouseenter", function () { lbl.textColor = "#FFFFFF"; });
                    lbl.on("mouseleave", function () { lbl.textColor = SITE.ON_DARK_SOFT; });
                    lbl.on("click", function () {
                        if (/^https?:/.test(item.url)) window.open(item.url, "_blank", "noopener");
                        else location.href = item.url;
                    });
                });

            endGroup();

        endGroup();

        // GROUP: Telif + yazar bağlantısı
        HGroup({ width: "auto", height: "auto", align: "left center", gap: 4 });
        that.elem.style.marginTop = "18px";

            SITE.label("© 2020–" + new Date().getFullYear(), { fontSize: 12, textColor: SITE.ON_DARK_FAINT });

            const lblAuthor = SITE.label("Bugra Ozden", { fontSize: 12, textColor: SITE.ON_DARK_SOFT });
            lblAuthor.elem.style.cursor = "pointer";
            lblAuthor.elem.style.textDecoration = "underline";
            lblAuthor.on("mouseenter", function () { lblAuthor.textColor = "#FFFFFF"; });
            lblAuthor.on("mouseleave", function () { lblAuthor.textColor = SITE.ON_DARK_SOFT; });
            lblAuthor.on("click", function () { window.open(CONFIG.authorURL, "_blank", "noopener"); });

        endGroup();

    SITE.endSection();

};
