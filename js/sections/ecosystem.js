/* Bismillah */

/*

EcosystemSection - v26.09 (basic.js Website)

- basic.js ile gelenler: el kitabı, bileşenler, uygulama şablonları, VS Code araçları. Her kart kendi sayfasını açar.

Webpage: https://bug7a.github.io/basic.js/

Copyright 2020-2026 Bugra Ozden <bugra.ozden@gmail.com> (https://bug7a.github.io/)
Licensed under the Apache License, Version 2.0
SPDX-License-Identifier: Apache-2.0

*/

"use strict";

const EcosystemSection = function () {

    const L = SITE.L;
    const T = SITE.T;

    const links = {
        handbook: CONFIG.handbookURL,
        components: CONFIG.componentsURL,
        templates: CONFIG.templatesURL,
        toolkit: CONFIG.toolkitURL,
    };

    SITE.startSection({ key: "ecosystem", color: SITE.BG_SOFT });

        SITE.sectionIntro(T.ecosystemEyebrow, T.ecosystemTitle, T.ecosystemLead);

        SITE.startGrid();

            T.ecosystem.forEach(function (item) {

                const card = SITE.startCard({ width: L.columns(4), gap: 14 });

                    SITE.iconBadge(item.icon);
                    SITE.h3(item.title);
                    SITE.text(TEXTS.fill(item.text), "100%", 0, 15);

                    SITE.spacer();

                    // GROUP: Bağlantı
                    HGroup({ width: "auto", height: "auto", align: "left center", gap: 6 });
                        SITE.label(item.link, { bold: 1, fontSize: 14, textColor: SITE.ACCENT_TEXT });
                        SITE.icon("arrow", SITE.ACCENT_TEXT, 15);
                    endGroup();

                SITE.endCard();

                card.elem.style.cursor = "pointer";
                card.elem.setAttribute("role", "link");
                card.on("click", function () {
                    const url = links[item.key];
                    if (/^https?:/.test(url)) window.open(url, "_blank", "noopener");
                    else location.href = url;
                });

            });

        SITE.endGrid();

    SITE.endSection();

};
