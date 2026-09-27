/* Bismillah */

/*

HeroSection - v26.09 (basic.js Website)

- Koyu giriş bölümü: sürüm, başlık, giriş, iki düğme, kısa bilgiler ve canlı bir kod örneği (LiveCode).

Developer: Bugra Ozden
Email: bugra.ozden@gmail.com

*/

"use strict";

const HeroSection = function (params = {}) {

    mergeIntoIfMissing(params, { onNavClick: function (key) { } });

    const L = SITE.L;
    const T = SITE.T;

    const strip = SITE.startSection({ key: "top", dark: 1, align: "center top", gap: L.mobile ? 18 : 24 });
    strip.elem.style.paddingTop = (L.headerH + (L.mobile ? 44 : 90)) + "px";
    strip.elem.style.paddingBottom = (L.mobile ? 60 : 100) + "px";
    // Hafif bir ışık: başlığın arkasında amber bir parıltı
    strip.elem.style.backgroundImage = "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(245, 184, 46, 0.16), rgba(245, 184, 46, 0) 70%)";

        // GROUP: Sürüm hapı
        HGroup({ width: "auto", height: "auto", align: "left center", gap: 8, padding: [14, 7], color: "rgba(245, 184, 46, 0.12)", round: 100 });
        that.border = 1;
        that.borderColor = "rgba(245, 184, 46, 0.3)";

            Box({ width: 7, height: 7, round: 4, color: SITE.ACCENT });
            SITE.label(TEXTS.fill(T.heroEyebrow), { fontSize: 13, textColor: SITE.ACCENT });

        endGroup();

        // LABEL: Başlık
        SITE.h1(T.heroTitle, 1, Math.min(900, L.content));
        that.elem.style.textAlign = "center";

        // LABEL: Giriş
        SITE.lead(T.heroLead, Math.min(680, L.content), 1, 1);

        // GROUP: Düğmeler
        HGroup({ width: "auto", height: "auto", align: "center center", gap: 12, wrap: 1 });
        that.elem.style.marginTop = "8px";

            SITE.button({ text: T.heroPrimary, icon: "arrow", iconRight: 1, kind: "primary", onClick: function () { params.onNavClick("start"); } });
            SITE.button({ text: T.heroSecondary, icon: "book", kind: "ghost-dark", onClick: function () { location.href = CONFIG.handbookURL; } });

        endGroup();

        // GROUP: Kısa bilgiler
        HGroup({ width: "100%", height: "auto", align: "center center", gap: L.mobile ? 12 : 22, wrap: 1 });

            T.heroFacts.forEach(function (fact) {
                HGroup({ width: "auto", height: "auto", align: "left center", gap: 6 });
                    SITE.icon("check", SITE.ACCENT, 15, 2.6);
                    SITE.label(TEXTS.fill(fact), { fontSize: 14, textColor: SITE.ON_DARK_SOFT });
                endGroup();
            });

        endGroup();

        // LIVE CODE: Canlı örnek
        HeroSection.live = LiveCode({
            width: "100%",
            height: 430,
            split: L.mobile ? 0 : 1,
            editorRatio: L.tablet ? 0.56 : 0.6,
            editorHeight: 380,
            resultHeight: 260,
            fontSize: L.mobile ? 12 : 13,
            code: SAMPLES.hero,
            fileName: "app.js",
        });
        that.elem.style.marginTop = (L.mobile ? 20 : 36) + "px";
        that.elem.style.boxShadow = "0px 30px 80px rgba(0, 0, 0, 0.5), 0px 0px 0px 1px rgba(255, 255, 255, 0.08)";

        // LABEL: İpucu
        SITE.label(T.heroDemoHint, { fontSize: 13, textColor: SITE.ON_DARK_FAINT });
        that.elem.style.whiteSpace = "normal";
        that.elem.style.textAlign = "center";

    SITE.endSection();

};
