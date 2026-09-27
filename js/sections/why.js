/* Bismillah */

/*

WhySection - v26.09 (basic.js Website)

- Dört kısa neden: okunur kod, küçük boyut, derleme yok, her şey tek yerde.

Developer: Bugra Ozden
Email: bugra.ozden@gmail.com

*/

"use strict";

const WhySection = function () {

    const L = SITE.L;
    const T = SITE.T;

    SITE.startSection({ key: "why" });

        SITE.sectionIntro(T.whyEyebrow, T.whyTitle);

        SITE.startGrid();

            T.why.forEach(function (item) {

                SITE.startCard({ width: L.columns(4), gap: 14 });

                    SITE.iconBadge(item.icon);
                    SITE.h3(item.title);
                    SITE.text(TEXTS.fill(item.text), "100%", 0, 15);

                SITE.endCard();

            });

        SITE.endGrid();

    SITE.endSection();

};
