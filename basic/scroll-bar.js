/* Bismillah */

/*

Scroll Bar - v26.03

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Webpage: https://bug7a.github.io/js-components/



*/

"use strict";

const ScrollBar = function (params = {}) {

    let box = startBox();

    const defaults = {
        scrollableBox: null,
        bar_border: 0,
        bar_round: 3,
        bar_borderColor: "rgba(0, 0, 0, 1)",
        bar_width: 4,
        bar_mouseOverWidth: 4,
        bar_mouseOverColor: "#373836",
        bar_opacity: 0.4,
        bar_mouseOverOpacity: 0.9,
        bar_padding: 2,
        bar_color: "#373836",
        neverHide: 1,
        showDots: 1,
    };

    box.props(defaults, params);

    // --- Private state ---
    let _fullscreenBox = null;
    let _autoHideTimer = null;
    let _observer = null;

    // Mouse drag state
    let _mouseX = 0;
    let _mouseY = 0;
    let _mouseMoving = false;
    let _dragScrollBar = null; // "top" | "left" | null

    // --- Helpers ---

    const _scheduleAutoHide = function () {
        _cancelAutoHide();
        _autoHideTimer = setTimeout(function () {
            if (_mouseMoving) {
                _mouseMoving = false;
                _scheduleAutoHide();
                return;
            }
            if (!box.neverHide) {
                box.boxScrollBarTop.opacity = 0;
                box.boxScrollBarLeft.opacity = 0;
                box.topRightDot.visible = 0;
                box.bottomLeftDot.visible = 0;
                box.bottomRightDot.visible = 0;
            }
        }, 2000);
    };

    const _cancelAutoHide = function () {
        if (_autoHideTimer) {
            clearTimeout(_autoHideTimer);
            _autoHideTimer = null;
        }
    };

    // --- Bar highlight / lowlight ---

    const _setBarState = function (isTop, highlight) {
        const bar = isTop ? box.boxScrollBarTop : box.boxScrollBarLeft;
        const prop = isTop ? "width" : "height";
        bar[prop] = highlight ? box.bar_mouseOverWidth : box.bar_width;
        bar.color = highlight ? box.bar_mouseOverColor : box.bar_color;
        bar.opacity = highlight ? box.bar_mouseOverOpacity : box.bar_opacity;
    };

    // --- Scroll refresh ---

    box.refreshScroll = function () {

        box.scrollableBox.containerBox.add(box);

        box.width = box.scrollableBox.width;
        box.height = box.scrollableBox.height;
        box.aline(box.scrollableBox);

        if (!box.neverHide) {
            box.boxScrollBarTop.opacity = box.bar_opacity;
            box.boxScrollBarLeft.opacity = box.bar_opacity;
        }

        const elem = box.scrollableBox.elem;

        // Horizontal bar
        const scrollLeft = elem.scrollLeft;
        const clientWidth = elem.clientWidth;
        const scrollWidth = elem.scrollWidth;
        const ratioH = clientWidth / scrollWidth;

        box.boxScrollBarLeft.left = scrollLeft * ratioH + box.bar_width * 2;
        box.boxScrollBarLeft.width = clientWidth * ratioH - box.bar_width * 4;

        const needsHScroll = scrollWidth > clientWidth && box.scrollableBox.scrollX == 1;
        box.boxScrollBarLeft.visible = needsHScroll ? 1 : 0;

        // Vertical bar
        const scrollTop = elem.scrollTop;
        const clientHeight = elem.clientHeight;
        const scrollHeight = elem.scrollHeight;
        const ratioV = clientHeight / scrollHeight;

        box.boxScrollBarTop.top = scrollTop * ratioV + box.bar_width * 2;
        box.boxScrollBarTop.height = clientHeight * ratioV - box.bar_width * 4;

        const needsVScroll = scrollHeight > clientHeight && box.scrollableBox.scrollY == 1;
        box.boxScrollBarTop.visible = needsVScroll ? 1 : 0;

        box.refreshDotButtons();
        _scheduleAutoHide();
    };

    box.refreshDotButtons = function () {

        if (box.showDots == 0) return;

        // boxScrollBarTop  = dikey (vertical) scrollbar
        // boxScrollBarLeft = yatay (horizontal) scrollbar
        const vVisible = box.boxScrollBarTop.visible == 1;
        const hVisible = box.boxScrollBarLeft.visible == 1;

        box.topRightDot.visible = vVisible ? 1 : 0;   // sadece dikey varsa
        box.bottomLeftDot.visible = hVisible ? 1 : 0;   // sadece yatay varsa
        box.bottomRightDot.visible = (vVisible || hVisible) ? 1 : 0; // ikisi de varsa
        
    };

    // --- Drag scrolling ---

    const _onDragMove = function (self, event) {
        _mouseMoving = true;

        const elem = box.scrollableBox.elem;

        if (_mouseX != 0 && _dragScrollBar == "left") {
            const ratio = elem.scrollWidth / elem.clientWidth;
            elem.scrollLeft += (event.clientX - _mouseX) * ratio;
        }

        if (_mouseY != 0 && _dragScrollBar == "top") {
            const ratio = elem.scrollHeight / elem.clientHeight;
            elem.scrollTop += (event.clientY - _mouseY) * ratio;
        }

        _mouseX = event.clientX;
        _mouseY = event.clientY;

        _scheduleAutoHide();
    };

    const _enterDragging = function () {
        _mouseX = 0;
        _mouseY = 0;

        _fullscreenBox = Box(0, 0, "100%", "100%", {
            color: "transparent",
            clickable: 1,
        });

        page.add(_fullscreenBox);
        _fullscreenBox.on("mousemove", _onDragMove);

        const _exitDragging = function () {
            _mouseMoving = false;
            _dragScrollBar = null;

            _setBarState(true, false);
            _setBarState(false, false);
            _scheduleAutoHide();

            if (_fullscreenBox) {
                _fullscreenBox.remove();
                _fullscreenBox = null;
            }
        };

        _fullscreenBox.on("mouseup", _exitDragging);
        _fullscreenBox.on("mouseleave", _exitDragging);
    };

    // --- DOM construction ---

    box.color = "transparent";
    box.setMotion("opacity 0.2s");

    box.boxScrollBarTop = Box({
        right: box.bar_padding,
        border: box.bar_border,
        borderColor: box.bar_borderColor,
        round: box.bar_round,
        width: box.bar_width,
        color: box.bar_color,
        opacity: box.bar_opacity,
    });
    box.boxScrollBarTop.setMotion("width 0.2s, opacity 0.5s");

    box.boxScrollBarLeft = Box({
        bottom: box.bar_padding,
        border: box.bar_border,
        borderColor: box.bar_borderColor,
        round: box.bar_round,
        height: box.bar_width,
        color: box.bar_color,
        opacity: box.bar_opacity,
    });
    box.boxScrollBarLeft.setMotion("height 0.2s, opacity 0.5s");

    const _dotDefaults = {
        width: box.bar_width,
        height: box.bar_width,
        color: box.bar_color,
        opacity: box.bar_opacity,
        round: box.bar_width,
        visible: 0,
    };

    box.topRightDot = Box({ ..._dotDefaults, right: box.bar_padding, top: 2 });
    box.bottomRightDot = Box({ ..._dotDefaults, right: box.bar_padding, bottom: 2 });
    box.bottomLeftDot = Box({ ..._dotDefaults, left: 2, bottom: box.bar_padding });

    endBox();

    // --- Init ---

    box.position = "absolute";
    box.refreshScroll();

    box.scrollableBox.onResize(box.refreshScroll);
    box.scrollableBox.on("scroll", box.refreshScroll);
    box.scrollableBox.on("wheel", box.refreshScroll);
    page.onResize(box.refreshScroll);

    // Bar interactivity
    box.boxScrollBarTop.clickable = 1;
    box.boxScrollBarLeft.clickable = 1;

    box.boxScrollBarTop.on("mouseover", function () {
        _setBarState(true, true);
        _cancelAutoHide();
    });

    box.boxScrollBarTop.on("mouseout", function () {
        if (_dragScrollBar != "top") _setBarState(true, false);
        _scheduleAutoHide();
    });

    box.boxScrollBarTop.on("mousedown", function () {
        _dragScrollBar = "top";
        _enterDragging();
    });

    box.boxScrollBarLeft.on("mouseover", function () {
        _setBarState(false, true);
        _cancelAutoHide();
    });

    box.boxScrollBarLeft.on("mouseout", function () {
        if (_dragScrollBar != "left") _setBarState(false, false);
        _scheduleAutoHide();
    });

    box.boxScrollBarLeft.on("mousedown", function () {
        _dragScrollBar = "left";
        _enterDragging();
    });

    // Scroll alanı hover
    box.scrollableBox.on("mouseover", function () {
        box.boxScrollBarTop.opacity = box.bar_opacity;
        box.boxScrollBarLeft.opacity = box.bar_opacity;
        box.refreshDotButtons();
        _scheduleAutoHide();
    });

    box.scrollableBox.on("mouseleave", function () {
        _dragScrollBar = null;
        _scheduleAutoHide();
    });

    // --- MutationObserver ---

    const _contentElem = box.scrollableBox.elem;
    let _lastScrollHeight = _contentElem.scrollHeight;

    _observer = new MutationObserver(function (mutations) {
        if (_contentElem.scrollHeight != _lastScrollHeight) {
            box.refreshScroll();
            _lastScrollHeight = _contentElem.scrollHeight;
        }
    });

    _observer.observe(_contentElem, {
        childList: true,
        subtree: true,
        characterData: true,
    });

    // --- Cleanup ---

    const _superRemove = box.remove.bind(box);

    box.remove = function () {
        _cancelAutoHide();

        if (_fullscreenBox) {
            _fullscreenBox.remove();
            _fullscreenBox = null;
        }

        if (_observer) {
            _observer.disconnect();
            _observer = null;
        }

        box.scrollableBox.remove_onResize(box.refreshScroll);
        page.remove_onResize(box.refreshScroll);

        _superRemove();
        box = null;
    };

    makeBasicObject(box);
    return box;
};