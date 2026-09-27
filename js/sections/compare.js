/* Bismillah */

/*

CompareSection - v26.09 (basic.js Website)

- Aynı kartın iki yazılışı: solda HTML + CSS + JavaScript (3 dosya), sağda basic.js (1 fonksiyon, canlı).

Developer: Bugra Ozden
Email: bugra.ozden@gmail.com

*/

"use strict";

const CompareSection = function () {

    const L = SITE.L;
    const T = SITE.T;
    const columnWidth = L.mobile ? L.content : L.columns(2);

    SITE.startSection({ key: "compare", color: SITE.BG_SOFT });

        SITE.sectionIntro(T.compareEyebrow, T.compareTitle, T.compareLead);

        // GROUP: İki sütun
        HGroup({ width: "100%", height: "auto", align: "left top", gap: L.gap, wrap: 1 });
        that.clipContent = 0;

            // GROUP: Klasik yol
            VGroup({ width: columnWidth, height: "auto", align: "left top", gap: 12 });

                CompareSection.columnTitle(T.compareClassic, T.compareClassicNote, 0);

                SITE.codePanel({ title: "index.html", code: SAMPLES.compareHtml, language: "html", copy: 0 });
                SITE.codePanel({ title: "style.css", code: SAMPLES.compareCss, language: "css", copy: 0 });
                SITE.codePanel({ title: "app.js", code: SAMPLES.compareScript, language: "js", copy: 0 });

            endGroup();

            // GROUP: basic.js
            VGroup({ width: columnWidth, height: "auto", align: "left top", gap: 12 });
            that.clipContent = 0;

                CompareSection.columnTitle(T.compareBasic, T.compareBasicNote, 1);

                LiveCode({
                    width: "100%",
                    split: 0,
                    editorHeight: L.mobile ? 420 : 470,
                    resultHeight: 230,
                    fontSize: L.mobile ? 12 : 13,
                    showHint: 0,
                    code: SAMPLES.compareBasic,
                    fileName: "app.js",
                    lazy: 1,
                });

            endGroup();

        endGroup();

    SITE.endSection();

};

// GROUP: Sütun başlığı ve "3 dosya" hapı
CompareSection.columnTitle = function (title, note, accent) {

    HGroup({ width: "100%", height: 34, align: "left center", gap: 10 });

        SITE.label(title, { bold: 1, fontSize: 18, textColor: SITE.INK });
        SITE.chip(note, {
            color: accent ? SITE.ACCENT : "rgba(0, 0, 0, 0.07)",
            textColor: accent ? SITE.DARK : SITE.TEXT_SOFT,
        });

    endGroup();

};
