/* Bismillah */

/*

Scroll Bar - v24.06

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/javascript-mobile-app-template/


EXAMPLE: {javascript-mobile-app-template}/comp-name.htm


*/

"use strict";
const ScrollBar = function(params = {}) {

    // BOX: Component container
    const box = startBox();

    // Default values
    const defaults = {
        scrollableBox: null,
        bar_border: 0,
        bar_round: 3,
        bar_borderColor: "rgba(0, 0, 0, 1)",
        bar_width: 4,
        bar_mouseOverWidth: 8,
        bar_mouseOverColor: "#141414",
        bar_opacity: 0.6,
        bar_mouseOverOpacity: 0.6,
        bar_padding: 2,
        bar_color: "#141414",
        //scrollOnContent: 1,
        neverHide: 0,
    };

    box.props(defaults, params);

    // *** Private variables:
    //let privateVar = "";
    let _fullscreenBox = null;

    // *** Public variables:
    //box.publicVar = "";

    // *** Private functions:
    //const privateFunc = () => {};

    const closeAuto = function() {
        if (box.setTimeoutVar) clearTimeout(box.setTimeoutVar);
        box.setTimeoutVar = setTimeout(function() {
            if (box.mouseMoving == 1) {
                closeAuto();
            } else {
                if (box.neverHide == 0) {
                    box.boxScrollBarTop.opacity = 0;
                }
            }
        }, 3000);
    };

    const clean_closeAuto = function() {
        if (box.setTimeoutVar) clearTimeout(box.setTimeoutVar);
    };

    box.refreshScroll = function() {

        //console.log("***")

        //box.scrollableBox.elem.appendChild(box.elem);
        //box.add(box.scrollableBox.containerBox);

        // WHY: Scroll bar, scroll edilecek nesne ile aynı taşıyıcıda olmalı.
        
        box.scrollableBox.containerBox.add(box);
        //box.scrollableBox.add(box);

        //box.color = "rgba(0, 0, 0, 0.6)";
        // WHY: Scroll bar, scroll edilecek nesne ile aynı boyda olmalı.
        box.width = box.scrollableBox.width;
        box.height = box.scrollableBox.height;
        // WHY: Scroll bar, scroll edilecek nesne ile aynı konumda olmalı.
        box.aline(box.scrollableBox);

        // Yatay scroll değeri
        //let horizontalScroll = box.scrollableBox.elem.scrollLeft;

        // Maksimum yatay scroll değeri
        //let maxHorizontalScroll = box.scrollableBox.elem.scrollWidth - box.scrollableBox.elem.clientWidth;

        const scrollLeft = box.scrollableBox.elem.scrollLeft;
        const clientWidth = box.scrollableBox.elem.clientWidth;
        const scrollWidth = box.scrollableBox.elem.scrollWidth;
        const oranLeft = clientWidth / scrollWidth;

        //box.left = scrollLeft;

        // WYH: box.bar_width değeri, scrollbar ın üst ve alttan bir miktan boşluk bırakmak içindir.
        //box.boxScrollBarLeft.left = horizontalScroll + (box.bar_width * 2);
        //box.boxScrollBarLeft.width = box.scrollableBox.elem.clientWidth - maxHorizontalScroll - (box.bar_width * 4);

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

        // Dikey scroll değeri
        //let verticalScroll = box.scrollableBox.elem.scrollTop;
        //console.log("Height: " + box.scrollableBox.height)
        //console.log("scrollTop: " + box.scrollableBox.elem.scrollTop)

        // Maksimum dikey scroll değeri
        //let maxVerticalScroll = box.scrollableBox.elem.scrollHeight - box.scrollableBox.elem.clientHeight;
        //console.log("maxVerticalScroll: " + maxVerticalScroll);

        //const carpan = box.scrollableBox.elem.clientHeight / box.scrollableBox.elem.scrollHeight;
        //console.log("carpan: " + carpan);

        const scrollTop = box.scrollableBox.elem.scrollTop;
        const clientHeight = box.scrollableBox.elem.clientHeight;
        const scrollHeight = box.scrollableBox.elem.scrollHeight;
        const oranTop = clientHeight / scrollHeight;

        //box.top = scrollTop;

        //box.boxScrollBarTop.top = verticalScroll + (box.bar_width * 2)
        box.boxScrollBarTop.top = (scrollTop * oranTop) + (box.bar_width * 2); //(scrollTop * clientHeight) / scrollHeight;
        //console.log("box.boxScrollBarTop.top : " + box.boxScrollBarTop.top);
        //box.boxScrollBarTop.height = box.scrollableBox.elem.clientHeight - maxVerticalScroll - (box.bar_width * 4);
        box.boxScrollBarTop.height = (clientHeight * oranTop) - (box.bar_width * 4); //(clientHeight * clientHeight) / scrollHeight;
        //console.log("box.boxScrollBarTop.height : " + box.boxScrollBarTop.height);

        // Eğer scroll a gerek yok ise scroll bar ı gizle.
        if (scrollHeight == clientHeight || box.scrollableBox.scrollY == 0) {
            if (box.neverHide == 0 || scrollHeight == clientHeight) { 
                box.boxScrollBarTop.visible = 0;
            }
        } else if (box.scrollableBox.scrollY == 1) {
            box.boxScrollBarTop.visible = 1;
        }

        //console.log('Maksimum Yatay Scroll: ' + maxHorizontalScroll);
        //console.log('Maksimum Dikey Scroll: ' + maxVerticalScroll);
        //console.log('Yatay Scroll: ' + horizontalScroll);
        //console.log('Dikey Scroll: ' + verticalScroll);
        //console.log('width Scroll: ' + box.scrollableBox.width);
        //console.log('height Scroll: ' + box.scrollableBox.height);

        closeAuto();

    };

    /*
    const mouseMoved_contentDrag = function(event) {

        box.mouseMoving = 1;

        //const clientHeight = box.scrollableBox.elem.clientHeight;
        //const scrollHeight = box.scrollableBox.elem.scrollHeight;
        //const oranTop = scrollHeight / clientHeight;

        if (box.mouseX != 0 && box.boxScrollBarLeft.visible == 1) {
            const fark = event.clientX - box.mouseX;
            //box.scrollableBox.elem.scrollLeft += fark;
            box.scrollableBox.elem.scrollLeft += (fark * -1);
        }

        if (box.mouseY != 0 && box.boxScrollBarTop.visible == 1) {
            const fark = event.clientY - box.mouseY;
            //box.scrollableBox.elem.scrollTop += fark;
            box.scrollableBox.elem.scrollTop += (fark * -1);
            //box.scrollableBox.elem.scrollTop += ((fark * oranTop) * -1);
        }

        box.mouseX = event.clientX; // Fare konumu yatay eksende
        box.mouseY = event.clientY; // Fare konumu dikey eksende
    
        //console.log('Fare konumu: X=' + box.mouseX + ', Y=' + box.mouseY);
        //event.stopPropagation();
        closeAuto();

    };
    */

    const mouseMoved_scrollbarButton = function(event) {

        box.mouseMoving = 1;

        const clientWidth = box.scrollableBox.elem.clientWidth;
        const scrollWidth = box.scrollableBox.elem.scrollWidth;
        const oranLeft = scrollWidth / clientWidth;

        if (box.mouseX != 0 && box.boxScrollBarLeft.clicked == 1) {
            const fark = event.clientX - box.mouseX;
            //box.scrollableBox.elem.scrollLeft += fark;
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
        //box.elem.style.position = "fixed";
        //box.top = 0;
        //box.left = 0;
        //box.scrollableBox.containerBox.add(box);
        
        // BOX: Cover.
        //box.boxCover = Box(0, 0, 20, 20);
        //that.color = "transparent";

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

    endBox();

    // *** OBJECT INIT CODE:
    //box.left = 0;
    //box.top = 0;
    box.refreshScroll();
    box.scrollableBox.onResize(box.refreshScroll);
    box.scrollableBox.elem.addEventListener('scroll', box.refreshScroll);

    // Scroll barlar basarak kaydırılabilsin.
    box.boxScrollBarTop.clickable = 1;
    box.boxScrollBarLeft.clickable = 1;
    box.boxScrollBarTop.elem.style.cursor = "default";
    box.boxScrollBarLeft.elem.style.cursor = "default";

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
    box.boxScrollBarTop.elem.addEventListener("mouseover", function(event) {
        _highlightTopBar();
        clean_closeAuto();
    });

    // Mouse scroll bar butonu üzerindeyken bırakılır ise;
    box.boxScrollBarTop.elem.addEventListener("mouseout", function(event) {
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
    box.boxScrollBarLeft.elem.addEventListener("mouseover", function(event) {
        _highlightLeftBar();
        clean_closeAuto();
    });

    // Mouse scroll bar butonu üzerindeyken bırakılır ise;
    box.boxScrollBarLeft.elem.addEventListener("mouseout", function(event) {
        if (box.boxScrollBarLeft.clicked != 1) {
            _lowlightLeftBar();
            closeAuto();
        }
    });

    // Mouse, scroll edilecek alana girer ise;
    box.scrollableBox.elem.addEventListener("mouseover", function(event) {
        box.boxScrollBarTop.opacity = box.bar_opacity;
        box.boxScrollBarLeft.opacity = box.bar_opacity;
        closeAuto();
        //event.stopPropagation();
    });

    // Mouse scroll edilen alandan dışarı çıkar ise; mouseleave alt nesnelerin üzerine gelindiğinde tetiklenmez.
    box.scrollableBox.elem.addEventListener("mouseleave", function(event) {
        //box.boxScrollBarTop.opacity = 0;
        //event.stopPropagation();
        box.mouseDownForScrolling = 0; // TEST
        //box.elem.style.cursor = ""; // TEST
        closeAuto();
    });

    // *** TEST ***
    /*
    if (box.scrollOnContent == 1) {
        box.scrollableBox.elem.addEventListener("mousedown", function(event) { // mousedown
            box.mouseDownForScrolling = 1;
            box.elem.style.cursor = "grabbing";
        });
        box.scrollableBox.elem.addEventListener("mouseup", function(event) { // mousedown
            box.mouseDownForScrolling = 0;
            //box.clickable = 0;
            //box.elem.style.cursor = "";
            box.elem.style.cursor = "default"; // TODO: Silinebilir
            box.boxScrollBarTop.elem.style.cursor = "default";
            box.boxScrollBarLeft.elem.style.cursor = "default";
            
        });
        box.elem.addEventListener("mouseup", function(event) { // mousedown
            box.mouseDownForScrolling = 0;
            box.clickable = 0;
            box.elem.style.cursor = "default"; // TODO: Silinebilir
        });
        box.scrollableBox.elem.addEventListener("mousemove", function(event) { // mousedown
            if (box.mouseDownForScrolling == 1) {
                box.mouseX = 0;
                box.mouseY = 0;
                setTimeout(function() {
                    box.clickable = 1;
                }, 200);
                box.elem.addEventListener('mousemove', mouseMoved_contentDrag);
                box.mouseDownForScrolling = 0;
            }
            //event.stopPropagation();
        });
    }
    */

    const _enterScrolling = function() {

        box.mouseX = 0;
        box.mouseY = 0;
        //box.clickable = 0;

        _fullscreenBox = Box(0, 0, "100%", "100%", {
            color: "transparent",
            clickable: 1,
        });
        that.elem.style.cursor = "grabbing";
        page.add(that);

        _fullscreenBox.elem.addEventListener('mousemove', mouseMoved_scrollbarButton);

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

        _fullscreenBox.elem.addEventListener("mouseup", function(event) {
            _exitScrolling();
        });

        _fullscreenBox.elem.addEventListener("mouseleave", function(event) {
            _exitScrolling();
        });

    }

    // Sağdaki scroll bar butonuna basılırsa;
    box.boxScrollBarTop.elem.addEventListener("mousedown", function(event) { // mousedown

        box.boxScrollBarTop.clicked = 1;
        _enterScrolling();

    });

    // Alttaki scroll bar butonuna basılırsa;
    box.boxScrollBarLeft.elem.addEventListener("mousedown", function(event) { // mousedown

        box.boxScrollBarLeft.clicked = 1;
        _enterScrolling();

    });

    // scrollHeight değişirse, refreshScroll() çalıştır.
    const contentDiv = box.scrollableBox.elem;
    let lastScrollHeight = contentDiv.scrollHeight;

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (lastScrollHeight !== contentDiv.scrollHeight) {
                //console.log('Scroll height changed:', contentDiv.scrollHeight);
                box.refreshScroll();
                lastScrollHeight = contentDiv.scrollHeight;
            }
        });
    });

    observer.observe(contentDiv, {
        childList: true,
        subtree: true,
        characterData: true
    });
    
    makeBasicObject(box);
    return box;

};