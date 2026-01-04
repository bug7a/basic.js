/* Bismillah */

/*

Scroll Bar - v25.07

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Webpage: https://bug7a.github.io/js-components/



*/

"use strict";
const ScrollBar = function(params = {}) {

    // BOX: Component container
    let box = startBox();

    // Default values
    const defaults = {
        scrollableBox: null,
        bar_border: 0,
        bar_round: 3,
        bar_borderColor: "rgba(0, 0, 0, 1)",
        bar_width: 4,
        bar_mouseOverWidth: 4, //8
        bar_mouseOverColor: "#373836",
        bar_opacity: 0.4,
        bar_mouseOverOpacity: 0.9,
        bar_padding: 2,
        bar_color: "#373836",
        //scrollOnContent: 1,
        neverHide: 1,
        showDots: 1,
    };

    box.props(defaults, params);

    // *** Private variables:
    let _fullscreenBox = null;

    // *** Public variables:
    //box.publicVar = "";

    // *** Private functions:
    //const privateFunc = function() {};

    const closeAuto = function() {
        if (box.setTimeoutVar) clearTimeout(box.setTimeoutVar);
        box.setTimeoutVar = setTimeout(function() {
            if (box.mouseMoving == 1) {
                closeAuto();
            } else {
                if (box.neverHide == 0) {
                    box.boxScrollBarTop.opacity = 0;
                    box.boxScrollBarLeft.opacity = 0;
                    box.topRightDot.visible = 0;  
                    box.bottomLeftDot.visible = 0;
                    box.bottomRightDot.visible = 0;
                }
            }
        }, 2000);
    };

    const clean_closeAuto = function() {
        if (box.setTimeoutVar) clearTimeout(box.setTimeoutVar);
    };

    box.refreshScroll = function() {

        // WHY: Scroll bar, scroll edilecek nesne ile aynı taşıyıcıda olmalı.
        box.scrollableBox.containerBox.add(box); // WHY: Scrollbar ı her zaman en üstte göster.

        // WHY: Scroll bar, scroll edilecek nesne ile aynı boyda olmalı.
        box.width = box.scrollableBox.width;
        box.height = box.scrollableBox.height;

        // WHY: Scroll bar, scroll edilecek nesne ile aynı konumda olmalı.
        box.aline(box.scrollableBox); // WHY: Belki alt ve sağ kullanılıyordur.

        // Yatay scroll değerleri
        const scrollLeft = box.scrollableBox.elem.scrollLeft;
        const clientWidth = box.scrollableBox.elem.clientWidth;
        const scrollWidth = box.scrollableBox.elem.scrollWidth;
        const oranLeft = clientWidth / scrollWidth;

        // WYH: box.bar_width değeri, scrollbar ın üst ve alttan bir miktan boşluk bırakmak içindir.
        box.boxScrollBarLeft.left = (scrollLeft * oranLeft) + (box.bar_width * 2);
        box.boxScrollBarLeft.width = (clientWidth * oranLeft) - (box.bar_width * 4);

        // Eğer scroll a gerek yok ise scroll bar ı gizle.
        if (scrollWidth == clientWidth || box.scrollableBox.scrollX == 0) {
            if (box.neverHide == 0 || scrollWidth == clientWidth) { 
                box.boxScrollBarLeft.visible = 0;
            }
        } else if (box.scrollableBox.scrollX == 1) {
            box.boxScrollBarLeft.visible = 1;
        }

        // Dikey scroll değerleri
        const scrollTop = box.scrollableBox.elem.scrollTop;
        const clientHeight = box.scrollableBox.elem.clientHeight;
        const scrollHeight = box.scrollableBox.elem.scrollHeight;
        const oranTop = clientHeight / scrollHeight;

        // WYH: box.bar_width değeri, scrollbarın sağ ve solunda boşluk bırakmak için
        box.boxScrollBarTop.top = (scrollTop * oranTop) + (box.bar_width * 2); //(scrollTop * clientHeight) / scrollHeight;
        box.boxScrollBarTop.height = (clientHeight * oranTop) - (box.bar_width * 4); //(clientHeight * clientHeight) / scrollHeight;

        // Eğer scroll a gerek yok ise scroll bar ı gizle.
        if (scrollHeight == clientHeight || box.scrollableBox.scrollY == 0) {
            if (box.neverHide == 0 || scrollHeight == clientHeight) { 
                box.boxScrollBarTop.visible = 0;
            }
        } else if (box.scrollableBox.scrollY == 1) {
            box.boxScrollBarTop.visible = 1;
        }

        // Refresh dot buttons
        box.refreshDotButtons();

        closeAuto();

    };

    box.refreshDotButtons = function() {
        if (box.showDots) {
            let visibleCount = 0;
            if (box.boxScrollBarTop.visible == 0) {
                visibleCount++;
                box.topRightDot.visible = 0;                
            } else {
                box.topRightDot.visible = 1;   
            }
            if (box.boxScrollBarLeft.visible == 0) {
                visibleCount++;
                box.bottomLeftDot.visible = 0;
            } else {
                box.bottomLeftDot.visible = 1;
            }
            if (visibleCount > 1) {
                box.bottomRightDot.visible = 0;
            } else {
                box.bottomRightDot.visible = 1;
            }
        }
    };

    const mouseMoved_scrollbarButton = function(self, event) {

        box.mouseMoving = 1;

        const clientWidth = box.scrollableBox.elem.clientWidth;
        const scrollWidth = box.scrollableBox.elem.scrollWidth;
        const oranLeft = scrollWidth / clientWidth;

        if (box.mouseX != 0 && box.boxScrollBarLeft.clicked == 1) {
            const fark = event.clientX - box.mouseX;
            box.scrollableBox.elem.scrollLeft += fark * oranLeft;
        }

        const clientHeight = box.scrollableBox.elem.clientHeight;
        const scrollHeight = box.scrollableBox.elem.scrollHeight;
        const oranTop = scrollHeight / clientHeight;

        if (box.mouseY != 0 && box.boxScrollBarTop.clicked == 1) {
            const fark = event.clientY - box.mouseY;
            box.scrollableBox.elem.scrollTop += fark * oranTop;
        }

        box.mouseX = event.clientX; // Fare konumu yatay eksende
        box.mouseY = event.clientY; // Fare konumu dikey eksende
    
        //console.log('Fare konumu: X=' + box.mouseX + ', Y=' + box.mouseY);
        //event.stopPropagation();
        closeAuto();

    };

        // *** OBJECT TEMPLATE:
        box.color = "transparent";
        box.setMotion("opacity 0.2s");

        // BOX: Dikey scroll bar.
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

        // BOX: Yatay scroll bar.
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

        // scroll dot buttons
        box.topRightDot = Box({
            right: box.bar_padding,
            top: 2,
            width: box.bar_width,
            height: box.bar_width,
            color: box.bar_color,
            opacity: box.bar_opacity,
            round: box.bar_width,
            visible: 0,
        });

        box.bottomRightDot = Box({
            right: box.bar_padding,
            bottom: 2,
            width: box.bar_width,
            height: box.bar_width,
            color: box.bar_color,
            opacity: box.bar_opacity,
            round: box.bar_width,
            visible: 0,
        });

        box.bottomLeftDot = Box({
            left: 2,
            bottom: box.bar_padding,
            width: box.bar_width,
            height: box.bar_width,
            color: box.bar_color,
            opacity: box.bar_opacity,
            round: box.bar_width,
            visible: 0,
        });

    endBox();

    // *** OBJECT INIT CODE:
    //box.left = 0;
    //box.top = 0;
    box.position = "absolute";
    box.refreshScroll();
    box.scrollableBox.onResize(box.refreshScroll); // {EVENT}
    box.scrollableBox.on('scroll', box.refreshScroll); // {EVENT}

    // Scroll barlar basarak kaydırılabilsin.
    box.boxScrollBarTop.clickable = 1;
    box.boxScrollBarLeft.clickable = 1;
    //box.boxScrollBarTop.elem.style.cursor = "default";
    //box.boxScrollBarLeft.elem.style.cursor = "default";

    const _highlightTopBar = function() {
        box.boxScrollBarTop.width = box.bar_mouseOverWidth;
        box.boxScrollBarTop.color = box.bar_mouseOverColor;
        box.boxScrollBarTop.opacity = box.bar_mouseOverOpacity;
    };

    const _lowlightTopBar = function() {
        box.boxScrollBarTop.width = box.bar_width;
        box.boxScrollBarTop.color = box.bar_color;
        box.boxScrollBarTop.opacity = box.bar_opacity;
    };

    // Mouse scroll bar butonu üzerine gelindiğinde;
    box.boxScrollBarTop.on("mouseover", function(self, event) { // {EVENT}
        _highlightTopBar();
        clean_closeAuto();
    });

    // Mouse scroll bar butonu üzerindeyken bırakılır ise;
    box.boxScrollBarTop.on("mouseout", function(self, event) { // {EVENT}
        if (box.boxScrollBarTop.clicked != 1) {
            _lowlightTopBar();
            closeAuto();
        }
    });

    const _highlightLeftBar = function() {
        box.boxScrollBarLeft.height = box.bar_mouseOverWidth;
        box.boxScrollBarLeft.color = box.bar_mouseOverColor;
        box.boxScrollBarLeft.opacity = box.bar_mouseOverOpacity;
    };

    const _lowlightLeftBar = function() {
        box.boxScrollBarLeft.height = box.bar_width;
        box.boxScrollBarLeft.color = box.bar_color;
        box.boxScrollBarLeft.opacity = box.bar_opacity;
    };

    // Mouse scroll bar butonu üzerine gelindiğinde;
    box.boxScrollBarLeft.on("mouseover", function(self, event) { // {EVENT}
        _highlightLeftBar();
        clean_closeAuto();
    });

    // Mouse scroll bar butonu üzerindeyken bırakılır ise;
    box.boxScrollBarLeft.on("mouseout", function(self, event) { // {EVENT}
        if (box.boxScrollBarLeft.clicked != 1) {
            _lowlightLeftBar();
            closeAuto();
        }
    });

    // Mouse, scroll edilecek alana girer ise;
    box.scrollableBox.on("mouseover", function(self, event) { // {EVENT}
        box.boxScrollBarTop.opacity = box.bar_opacity;
        box.boxScrollBarLeft.opacity = box.bar_opacity;
        box.refreshDotButtons();
        closeAuto();
        //event.stopPropagation();
    });

    // Mouse scroll edilen alandan dışarı çıkar ise; mouseleave alt nesnelerin üzerine gelindiğinde tetiklenmez.
    box.scrollableBox.on("mouseleave", function(self, event) { // {EVENT}
        //box.boxScrollBarTop.opacity = 0;
        //event.stopPropagation();
        box.mouseDownForScrolling = 0; // TEST
        //box.elem.style.cursor = ""; // TEST
        closeAuto();
    });

    const _enterScrolling = function() {

        box.mouseX = 0;
        box.mouseY = 0;
        //box.clickable = 0;

        _fullscreenBox = Box(0, 0, "100%", "100%", {
            color: "transparent",
            clickable: 1,
        });
        //that.elem.style.cursor = "grabbing";
        page.add(that);

        _fullscreenBox.on('mousemove', mouseMoved_scrollbarButton); // {EVENT}

        const _exitScrolling = function() {

            box.mouseMoving = 0;
            box.boxScrollBarLeft.clicked = 0;
            box.boxScrollBarTop.clicked = 0;
            //box.clickable = 0;

            closeAuto();
            _lowlightTopBar();
            _lowlightLeftBar();
            _fullscreenBox.remove();

        };

        _fullscreenBox.on("mouseup", function(self, event) { // {EVENT}
            _exitScrolling();
        });

        _fullscreenBox.on("mouseleave", function(self, event) { // {EVENT}
            _exitScrolling();
        });

    }

    // Sağdaki scroll bar butonuna basılırsa;
    box.boxScrollBarTop.on("mousedown", function(self, event) { // mousedown // {EVENT}

        box.boxScrollBarTop.clicked = 1;
        _enterScrolling();

    });

    // Alttaki scroll bar butonuna basılırsa;
    box.boxScrollBarLeft.on("mousedown", function(self, event) { // mousedown // {EVENT}

        box.boxScrollBarLeft.clicked = 1;
        _enterScrolling();

    });

    page.onResize(box.refreshScroll);

    box.superRemove = box.remove;
    box.remove = function() {

        // Remove object has event.
        if (_fullscreenBox) _fullscreenBox.remove();
        if (box.boxScrollBarLeft) box.boxScrollBarLeft.remove();
        if (box.boxScrollBarTop) box.boxScrollBarTop.remove();

        // Clean onResize events:
        box.scrollableBox.remove_onResize(box.refreshScroll);
        page.remove_onResize(box.refreshScroll);

        // Clean timer
        clean_closeAuto();
       
        // 3. Stop MutationObserver
        if (observer && typeof observer.disconnect === "function") {
            observer.disconnect();
        }

        box.superRemove.call(box);
        box = null;

    };
    
    // scrollHeight değişirse, refreshScroll() çalıştır.
    const contentDiv = box.scrollableBox.elem;
    let lastScrollHeight = contentDiv.scrollHeight;

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (lastScrollHeight !== contentDiv.scrollHeight) {
                box.refreshScroll();
                lastScrollHeight = contentDiv.scrollHeight;
            }
        });
    });

    observer.observe(contentDiv, { // {EVENT}
        childList: true,
        subtree: true,
        characterData: true
    });
    
    makeBasicObject(box);
    return box;

};