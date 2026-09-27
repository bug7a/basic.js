/* Bismillah */

/*

SiteHeader - v26.09 (basic.js Website)

- Sayfanın üstünde sabit duran koyu menü çubuğu. (Kaydırılan kutunun dışındadır.)
- Geniş ekranda bölüm bağlantıları görünür; dar ekranda menü düğmesi bir açılır liste açar.
- Kaydırınca altına ince bir çizgi gelir.

Developer: Bugra Ozden
Email: bugra.ozden@gmail.com

*/

"use strict";

// Default values:
const SiteHeaderDefaults = {
    onNavClick: function (key) { },
    onLanguageClick: function () { },
};

const SiteHeader = function (params = {}) {

    mergeIntoIfMissing(params, SiteHeaderDefaults);

    const L = SITE.L;
    const T = SITE.T;
    const showNav = (L.w >= 1100) ? 1 : 0;
    const navKeys = ["why", "compare", "concepts", "playground", "start"];

    // BOX: Component container
    let box = startObject({
        left: 0,
        top: 0,
        width: "100%",
        height: L.headerH,
        color: "rgba(15, 16, 18, 0.9)",
    });
    box.elem.style.zIndex = "50";
    box.elem.style.backdropFilter = "blur(10px)";
    box.elem.style.borderBottom = "1px solid transparent";
    box.setMotion("border-color 0.25s");
    box.clipContent = 0;

    // *** PRIVATE VARIABLES:
    let menuBox = null;

    // *** PRIVATE FUNCTIONS:

    const closeMenu = function () {
        if (menuBox) {
            menuBox.remove();
            menuBox = null;
        }
    };

    const openMenu = function () {

        closeMenu();

        // GROUP: Açılır menü (üst çubuğun altında)
        createIn(page, function () {

            menuBox = VGroup({
                left: 0,
                top: L.headerH,
                width: "100%",
                height: "auto",
                align: "left top",
                gap: 2,
                padding: [L.gutter - 12, 12],
                color: "rgba(15, 16, 18, 0.97)",
            });
            menuBox.position = "absolute";
            menuBox.elem.style.zIndex = "49";
            menuBox.elem.style.borderBottom = "1px solid " + SITE.ON_DARK_LINE;

                const addItem = function (text, onClick) {
                    const item = HGroup({ width: "100%", height: 48, align: "left center", padding: [12, 0], round: 8, color: "transparent" });
                    item.elem.style.cursor = "pointer";
                        SITE.label(text, { fontSize: 16, textColor: SITE.ON_DARK });
                    endGroup();
                    item.on("mouseenter", function () { item.color = "rgba(255, 255, 255, 0.06)"; });
                    item.on("mouseleave", function () { item.color = "transparent"; });
                    item.on("click", function () { closeMenu(); onClick(); });
                };

                navKeys.forEach(function (key) {
                    addItem(T.nav[key], function () { params.onNavClick(key); });
                });

                addItem(T.navHandbook, function () { location.href = CONFIG.handbookURL; });
                addItem(T.navComponents, function () { location.href = CONFIG.componentsURL; });

            endGroup();

        });

    };

    // *** PUBLIC FUNCTIONS:

    box.refreshScrollState = function (scrollTop) {
        box.elem.style.borderBottomColor = (scrollTop > 8) ? SITE.ON_DARK_LINE : "transparent";
    };

    box.closeMenu = closeMenu;

    // WHY: box.superRemove is overwritten by a component that extends this one, so the local copy is called below.
    const superRemove = box.remove;
    box.superRemove = superRemove;
    box.remove = function () {
        if (!box) return;
        closeMenu(); // NOTE: The menu is created on page, remove() of the header does not reach it.
        superRemove.call(box);
        box = null;
    };

    // *** OBJECT VIEW:

    // GROUP: Ortalanmış içerik
    HGroup({ width: "100%", height: "100%", align: "center center", padding: [L.gutter, 0] });
    that.clipContent = 0;

        HGroup({ width: L.content, height: "100%", align: "left center", gap: L.mobile ? 6 : 10 });
        that.clipContent = 0;

            // GROUP: Logo
            const brand = HGroup({ width: "auto", height: "auto", align: "left center", gap: 10 });
            brand.elem.style.cursor = "pointer";
            brand.elem.style.flexShrink = "0";

                SITE.logo(36);

            endGroup();

            brand.on("click", function () { params.onNavClick("top"); });

            SITE.spacer();

            // Bölüm bağlantıları (geniş ekran)
            if (showNav) {

                navKeys.forEach(function (key) {
                    const link = SITE.label(T.nav[key], { fontSize: 14, textColor: SITE.ON_DARK_SOFT });
                    link.elem.style.cursor = "pointer";
                    link.elem.style.padding = "8px 10px";
                    link.setMotion("color 0.15s");
                    link.on("mouseenter", function () { link.textColor = "#FFFFFF"; });
                    link.on("mouseleave", function () { link.textColor = SITE.ON_DARK_SOFT; });
                    link.on("click", function () { params.onNavClick(key); });
                });

                SITE.spacer();

            }

            if (!L.mobile) {
                SITE.button({
                    text: T.navHandbook,
                    icon: "book",
                    kind: "plain-dark",
                    height: 38,
                    fontSize: 14,
                    onClick: function () { location.href = CONFIG.handbookURL; },
                });
            }

            SITE.button({
                icon: "github",
                kind: "plain-dark",
                height: 38,
                fontSize: 15,
                hint: "GitHub",
                onClick: function () { window.open(CONFIG.githubURL, "_blank", "noopener"); },
            });

            SITE.button({
                text: T.languageButton,
                kind: "ghost-dark",
                height: 36,
                fontSize: 12,
                hint: T.languageHint,
                onClick: params.onLanguageClick,
            });

            if (!showNav) {
                SITE.button({
                    icon: "menu",
                    kind: "plain-dark",
                    height: 38,
                    fontSize: 16,
                    hint: T.menu,
                    onClick: function () { if (menuBox) closeMenu(); else openMenu(); },
                });
            }

        endGroup();

    endGroup();

    return endObject(box);

};
