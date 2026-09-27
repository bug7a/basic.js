/* Bismillah */

/*

PlaygroundSection - v26.09 (basic.js Website)

- Deneme alanı: hazır örnekler arasında sekmeler (comp-m4 Tabs) ve düzenlenebilir canlı kod (LiveCode).
- Örneklerin kodu: js/samples.js -> SAMPLES.playground, adları: js/texts.js -> playgroundTabs

Developer: Bugra Ozden
Email: bugra.ozden@gmail.com

*/

"use strict";

const PlaygroundSection = function () {

    const L = SITE.L;
    const T = SITE.T;
    const keys = Object.keys(SAMPLES.playground);

    SITE.startSection({ key: "playground", align: "center top" });

        SITE.sectionIntro(T.playgroundEyebrow, T.playgroundTitle, T.playgroundLead);

        // TABS: Hazır örnekler
        Tabs({
            variant: "pill",
            tabs: keys.map(function (key) { return { key: key, text: T.playgroundTabs[key] }; }),
            value: keys[0],
            ariaLabel: T.playgroundTitle,
            style: {
                pillBar: { color: SITE.BG_SOFT, padding: [4, 4], round: 12 },
                tab: { fontSize: 14, padding: [16, 8], minHeight: 38, round: 9 },
                pillIndicator: { round: 9 },
            },
            onChange: function (self) {
                PlaygroundSection.live.setCode(SAMPLES.playground[self.value], 1);
            },
        });
        that.elem.style.maxWidth = "100%";

        // LIVE CODE: Düzenlenebilir örnek
        PlaygroundSection.live = LiveCode({
            width: "100%",
            height: 500,
            split: L.mobile ? 0 : 1,
            editorRatio: 0.56,
            editorHeight: 380,
            resultHeight: 320,
            fontSize: L.mobile ? 12 : 13,
            code: SAMPLES.playground[keys[0]],
            fileName: "playground.js",
            lazy: 1,
        });
        that.elem.style.marginTop = "6px";
        that.elem.style.boxShadow = "0px 20px 50px rgba(0, 0, 0, 0.12)";

    SITE.endSection();

};
