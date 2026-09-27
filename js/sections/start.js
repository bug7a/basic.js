/* Bismillah */

/*

StartSection - v26.09 (basic.js Website)

- Üç adımda başlangıç: basic klasörünü alın, sayfayı oluşturun, start() yazın.
  Geniş ekranda her adımın açıklaması solda, kodu sağdadır.

Developer: Bugra Ozden
Email: bugra.ozden@gmail.com

*/

"use strict";

const StartSection = function () {

    const L = SITE.L;
    const T = SITE.T;
    const stacked = (L.mobile || L.tablet) ? 1 : 0;
    const textWidth = stacked ? L.content : Math.round(L.content * 0.36);
    const codeWidth = stacked ? L.content : L.content - textWidth - 48;

    SITE.startSection({ key: "start", gap: stacked ? 36 : 44 });

        SITE.sectionIntro(T.startEyebrow, T.startTitle);

        T.steps.forEach(function (step, index) {

            // GROUP: Adım
            HGroup({ width: "100%", height: "auto", align: "left top", gap: stacked ? 18 : 48, wrap: stacked ? 1 : 0 });
            that.clipContent = 0;

                // GROUP: Açıklama
                VGroup({ width: textWidth, height: "auto", align: "left top", gap: 12 });

                    // LABEL: Adım numarası
                    Label({ text: String(index + 1), width: 38, height: 38, fontSize: 17, textColor: SITE.DARK, color: SITE.ACCENT, round: 19 });
                    that.elem.style.fontFamily = SITE.BOLD;
                    that.elem.style.display = "flex";
                    that.elem.style.alignItems = "center";
                    that.elem.style.justifyContent = "center";

                    SITE.h3(step.title);
                    SITE.text(step.text, "100%", 0, 15);

                endGroup();

                // Kod veya düğmeler
                if (index == 0) {

                    HGroup({ width: codeWidth, height: "auto", align: stacked ? "left top" : "left center", gap: 12, wrap: 1 });
                    that.elem.style.alignSelf = "center";

                        SITE.button({ text: T.downloadGithub, icon: "github", kind: "dark", onClick: function () { window.open(CONFIG.githubURL, "_blank", "noopener"); } });
                        SITE.button({ text: T.viewSource, icon: "code", kind: "ghost", onClick: function () { window.open(CONFIG.sourceURL, "_blank", "noopener"); } });

                    endGroup();

                } else if (index == 1) {
                    SITE.codePanel({ title: "index.htm", code: SAMPLES.pageTemplate, language: "html", width: codeWidth });
                } else {
                    SITE.codePanel({ title: "app.js", code: SAMPLES.startFunction, language: "js", width: codeWidth });
                }

            endGroup();

        });

    SITE.endSection();

};
