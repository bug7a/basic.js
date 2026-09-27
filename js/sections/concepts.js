/* Bismillah */

/*

ConceptsSection - v26.09 (basic.js Website)

- Koyu bölüm: altı temel kavram; her biri kısa bir açıklama, küçük bir kod ve el kitabındaki bölümüne bağlantı.

Developer: Bugra Ozden
Email: bugra.ozden@gmail.com

*/

"use strict";

const ConceptsSection = function () {

    const L = SITE.L;
    const T = SITE.T;

    SITE.startSection({ key: "concepts", dark: 1 });

        SITE.sectionIntro(T.conceptsEyebrow, T.conceptsTitle, T.conceptsLead, 1);

        SITE.startGrid();

            T.concepts.forEach(function (concept, index) {

                const card = SITE.startCard({ width: L.columns(3), dark: 1, gap: 12, padding: L.mobile ? 20 : 24 });

                    // GROUP: Numara + başlık
                    HGroup({ width: "100%", height: "auto", align: "left center", gap: 10 });

                        Label({ text: String(index + 1).padStart(2, "0"), fontSize: 12, textColor: SITE.ACCENT });
                        that.elem.style.fontFamily = SITE.MONO;

                        SITE.h3(concept.title, 1, "auto");

                    endGroup();

                    SITE.text(concept.text, "100%", 1, 15);

                    // WHY: codePanel()'den sonra "that" içteki kod kutusudur; çerçeve panele verilir.
                    const panel = SITE.codePanel({ code: SAMPLES.concepts[index], fontSize: 12, copy: 0 });
                    panel.elem.style.border = "1px solid " + SITE.ON_DARK_LINE;

                    SITE.spacer();

                    // GROUP: El kitabı bağlantısı
                    HGroup({ width: "auto", height: "auto", align: "left center", gap: 6 });
                        SITE.label(T.readMore, { bold: 1, fontSize: 14, textColor: SITE.ACCENT });
                        SITE.icon("arrow", SITE.ACCENT, 15);
                    endGroup();

                SITE.endCard();

                card.elem.style.cursor = "pointer";
                card.on("click", function (self, event) {
                    // WHY: Kod seçilirken sayfa değişmesin.
                    if (window.getSelection && String(window.getSelection())) return;
                    location.href = CONFIG.handbookURL + "#/" + concept.chapter;
                });

            });

        SITE.endGrid();

    SITE.endSection();

};
