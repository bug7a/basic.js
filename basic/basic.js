/* Bismillah */

/*

basic.js (v26.09.18) A lightweight JavaScript library for building web-based applications with simple code. No need to write HTML or CSS — just use basic JavaScript.
- Project Site: https://bug7a.github.io/basic.js/

v26.09.18 is v26.09.17 plus the improvements below. Every page and component written for the
previous versions works unchanged (same globals, same defaults, same DOM). The previous version is
kept as basic/basic-bugra.js (and basic-bugra.min.js).

WHAT IS NEW IN v26.09.18 (see basic/basic-v26.09.18.md for examples):
- Fixes:      "100" and "50%" work for left/top/right/bottom/width/height. Children created in a hidden
              HGroup/VGroup are real flex items (visible: 0 at create time). Objects created before the
              page is ready throw a clear error. Timers of a removed object can not run anymore.
              A page variable named like a library helper (const createButton) can not break the library.
- Props:      css, cursor, zIndex, boxShadow, fontFamily, bold, italic, lineHeight, ellipsis, selectable,
              grow, shrink, plainText, isRemoved, children
- Methods:    show(), hide(), toggle(), once(), setSize(), setPosition(), bringToFront(), contains(), animate()
- Input:      value, placeholder, inputType, maxLength, readOnly, focus(), blur(), select(), onEnter()
- Label:      clipContent (0: the text is not cut at the edges)
- Icon:       alt, imageFit
- Groups:     wrap, justify, hug (alternative name for fit) (HGroup / VGroup / AutoLayout)
- Global:     createIn(container, func) - creates objects inside an existing box, then restores the container
- page:       on(), off(), onKeyDown(), title
- basic:      version, isReady, sleep(), nextFrame(), clamp(), lerp(), objectOf(), escapeHtml(), storage.loadOr()

The Art of Fun Coding — With basic.js


Copyright 2020-2026 Bugra Ozden <bugra.ozden@gmail.com>
- https://github.com/bug7a

Licensed under the Apache License, Version 2.0

*/

(function() {
"use strict";
const basic = {};

basic.version = "26.09.18";
basic.library = "basic.js";
basic.isReady = 0; // 1 after the page object is created (before start() runs).

/*
if ( typeof module === "object" && typeof module.exports === "object" ) {
    module.exports = basic;
} else {
    window.basic = basic;
}
*/

window.basic = basic;
basic.startTime = Date.now();

basic.ACTION_COLOR = "#689BD2";
basic.ACTION2_COLOR = "cadetblue";
basic.WARNING_COLOR = "tomato";
basic.ALERT_COLOR = "gold";
basic.CANCEL_COLOR = "lightgray";
basic.TEXT_COLOR = "rgba(0, 0, 0, 0.8)";
basic.BACKGROUND_COLOR = "whitesmoke";
basic.DARK_BACKGROUND_COLOR = "#141414";
basic.FONT_SIZE = 20;
basic.BUTTON_WIDTH = 130;
basic.BUTTON_HEIGHT = 50;
basic.BUTTON_COLOR = basic.ACTION_COLOR;
basic.BUTTON_TEXT_COLOR = "rgba(0, 0, 0, 0.65)";
basic.TEXTBOX_WIDTH = 270;
basic.TEXTBOX_HEIGHT = 50;

basic.gunler = ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"];
basic.days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
basic.aylar = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
basic.months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

window.that = null;
window.previousThat = null;
window.prevThat = null;

let defaultContainerBox = null;
let previousDefaultContainerBox;
let loopTimer;
const resizeDetection = {};
let removeCascadeDepth = 0; // remove(): 0 -> Children of the object are removed too. (Only in the first remove() call)

const motionController = {};
motionController.WITH_MOTION_TIME = 50;
motionController.DONT_MOTION_TIME = 40;

basic.start = function () {

    // - windows için ayrı css dosyası olabilir.
    /*
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = './basic/basic.min.css';
    document.getElementsByTagName('HEAD')[0].appendChild(link);
    */

    window.page = new MainBox();
    page.containerBox = null;
    setDefaultContainerBox(page);
    basic.isReady = 1;

    //page.bodyElement.style.margin = "0px";
    //page.bodyElement.style.overflow = "hidden";
    // console.log("basic.js: set body { margin: 0px, overflow: hidden }");
    page.mainBox = createBox(0, 0, page.width, page.height);
    //page.mainBox = createBox(0, 0, "100%", "100%");
    page.mainBox.containerBox = null;
    that.elem.style.position = "fixed";
    that.color = "transparent";
    
    
    page.onResize(function() {
        if (typeof page.refreshSize === "function") {
            page.refreshSize();
        }
    });
    
    
    if (typeof start === "function") {
        start();
        basic.afterStart();
    }

    if (typeof loop === "function") {
        if(!loopTimer) setLoopTimer(1000);
    }

};

basic.afterStart = function () {

    // Hız testi:
    // var timeUsed = (Date.now() - basic.startTime)
    // console.log(timeUsed);

    // Hız testi için kullanılabilecek yöntem.
    //console.time("işlem");
        // ağır işlem
    //console.timeEnd("işlem");
};

// you cant use console.log in *.min.js files but println
const println = function ($message, $type = "log") {
    // type: "error", "warn", "info", "table", "dir", ""
    const _console = console;
    _console[$type]($message);
};
window.println = println;

window.random = function ($first, $second) {

    let result = 0;

    if ($second != undefined) {

        if ($second < $first) {
            println("basic.js: random(): The second parameter (number) must be greater than the first.", "error");
        
        } else {
            // WHY: Math.round ile ilk ve son sayı, diğerlerinin yarısı kadar çıkıyordu.
            result = $first + Math.floor(Math.random() * (($second - $first) + 1));
        }

    } else {
        println("basic.js: random(): Two parameters (numbers) must be sent.", "error");
    }

    return result;

};
//window.random = basic.random;

window.num = function ($str, $type = "float") {

    if ($type == "float") {
        const i = parseFloat($str);
        return Math.round(i * 100) / 100;
        
    } else if ($type == "integer" || $type == "int") {
        return parseInt($str);
    }

};
//window.num = basic.num;

window.str = function ($num) {
    return String($num);
};
//window.str = basic.str;

window.isMobile = function () {

    let answer = 0;

    let a = navigator.userAgent || navigator.vendor || window.opera;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) { 
        answer = 1;
    }

    return answer;

};
//window.isMobile = basic.isMobile;

window.go = function ($url, $windowType = "_self") {

    // window.location.href = $url;
    const openedWindow = window.open($url, $windowType);
    // openedWindow.document.write("<p>Test Message</p>");

    return openedWindow;

};
//window.go = basic.go;

// Tek haneli sayıyı, başına "0" ekleyerek iki haneli yapar. 03:10:05
window.twoDigitFormat = function($number) {

    if ($number <= 9) {
        $number = "0" + $number;
    }

    return $number;

};
//window.twoDigitFormat = basic.twoDigitFormat;

basic.storage = {

    save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    has(key) {
        return localStorage.getItem(key) !== null;
    },

    load(key) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (e) {
            console.warn("storage parse error:", key);
            return null;
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    },

    clear() {
        localStorage.clear();
    }

};
// basic.storage olarak değiştirilebilir.
/*
window.storage = {

    save(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    load(key) {
        return JSON.parse(window.localStorage.getItem(key));
    },
    remove(key) {
        window.localStorage.removeItem(key);
    }

};
*/
//window.storage = basic.storage;

// Zaman bilgisi
basic.time = {

    get hour() {
        let dt = new Date();
        return dt.getHours();
    },
    get minute() {
        let dt = new Date();
        return dt.getMinutes();
    },
    get second() {
        let dt = new Date();
        return dt.getSeconds();
    }, 
    get millisecond() {
        let dt = new Date();
        return dt.getMilliseconds();
    }

};
//window.clock = basic.clock;

// Tarih bilgisi
basic.date = {

    get year() {
        let dt = new Date();
        return dt.getFullYear();
    },
    get monthNumber() {
        let dt = new Date();
        let month = dt.getMonth();
        month++;
        return month;
    },
    get ayAdi() {
        return basic.aylar[this.monthNumber - 1];
    },
    get monthName() {
        return basic.months[this.monthNumber - 1];
    },
    get dayOfWeek() {
        let dt = new Date();
        return dt.getDay(); // 0-6
    },
    get gunAdi() {
        return basic.gunler[this.dayOfWeek];
    },
    get dayName() {
        return basic.days[this.dayOfWeek];
    },
    get dayOfMonth() {
        let dt = new Date();
        return dt.getDate(); // 1-31
    },
    get now() {
        return Date.now();
    }

};
//window.date = basic.date;

// *** v26.09.18: small helpers under the basic namespace (no new globals).

// await basic.sleep(300);
basic.sleep = function ($ms = 0) {
    return new Promise(function (resolve) { setTimeout(resolve, $ms); });
};

// await basic.nextFrame(); -> the browser painted once.
basic.nextFrame = function () {
    return new Promise(function (resolve) { requestAnimationFrame(resolve); });
};

basic.clamp = function ($value, $min, $max) {
    return Math.min(Math.max($value, $min), $max);
};

// 0 -> $a, 1 -> $b
basic.lerp = function ($a, $b, $t) {
    return $a + ($b - $a) * $t;
};

// The basic.js object of a DOM element (or of its nearest parent that has one).
basic.objectOf = function ($elem) {
    let elem = $elem;
    while (elem) {
        if (elem._basicObject) return elem._basicObject;
        elem = elem.parentElement;
    }
    return null;
};

// For user data in .text / .html: basic.escapeHtml(userName)
basic.escapeHtml = function ($str) {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return String(($str === null || $str === undefined) ? "" : $str).replace(/[&<>"']/g, function (c) { return map[c]; });
};

// basic.storage.loadOr("settings", { theme: "light" })
basic.storage.loadOr = function ($key, $fallback) {
    const value = basic.storage.load($key);
    return (value === null) ? $fallback : value;
};

// Position and size values: 100 -> "100px", "100" -> "100px", "50%" / "calc(100% - 10px)" / "auto" -> as is.
const toCssLength = function ($value) {
    if (typeof $value == "string") {
        const s = $value.trim();
        if (s !== "" && !isNaN(Number(s))) return Number(s) + "px";
        return s;
    }
    return parseFloat($value) + "px"; // WHY: Same as basic.js for numbers. (NaN is ignored by the browser.)
};

// Adds a new object's element to the current default container.
const attachToContainer = function ($obj, $element) {
    if (!defaultContainerBox) {
        throw new Error("basic.js: The library is not ready yet. Create objects in start() or window.onload.");
    }
    $obj._containerBox = defaultContainerBox;
    defaultContainerBox.elem.appendChild($element);
};

// Is the container an HGroup / VGroup / AutoLayout?
// WHY: basic.js checked elem.style.display == "flex". A hidden group (visible: 0) has display "none",
//      so the children created in it were absolutely positioned instead of flex items.
const isFlexContainer = function ($box) {
    return !!($box && ($box._isFlex || ($box.elem && $box.elem.style.display == "flex")));
};

// Common methods and properties of basic objects.
class Basic_UIComponent {

    /*
    _type;
    _containerBox;

    _element;
    _visible;
    _displayType;
    _opacity;
    _rotate;

    _backgroundColor;

    _border;
    _borderColor;
    _round;
    
    _fontSize;
    _textColor;
    _textAlign;

    _motionString;
    _clickable;
    _eventFuncList;

    NOTE: Browsers perform "render optimization." JavaScript collects many small changes you make to the DOM or style attributes while it's running, then applies these changes all at once. But be careful! If you force Reflow/Style (for example, by calling .offsetHeight), the browser will be forced to apply all the changes at once.

    */

    constructor($type) {

        this._type = $type;

        this._visible = 1;
        this._displayType = "block";
        this._opacity = 1;
        this._rotate = 0;
        this._padding = 0;

        this._motionString = "none";
        this._clickable = 0;
        this._eventFuncList = []; // for _addEventListener() - Otomatik temizleme
        
    }

    // alternative for containerBox
    get parentBox() {
        return this._containerBox;
    }

    // alternative for containerBox
    set parentBox($value) {
        this._containerBox = $value;
    }

    get containerBox() {
        return this._containerBox;
    }

    set containerBox($value) {
        this._containerBox = $value;
    }

    // Hizalama ve boyutlandırma.

    get left() {
        if (this.position == "absolute") {
            return parseFloat(this.elem.style.left);
        } else {
            return this.elem.offsetLeft;
        }
    }

    set left($value) {
        this.elem.style.right = "";
        this.elem.style.left = toCssLength($value);
    }

    get top() {
        if (this.position == "absolute") {
            return parseFloat(this.elem.style.top);
        } else {
            return this.elem.offsetTop;
        }
    }

    set top($value) {
        this.elem.style.bottom = "";
        this.elem.style.top = toCssLength($value);
    }

    get right() {
        return parseFloat(this.elem.style.right);
    }

    set right($value) {
        this.elem.style.left = "";
        this.elem.style.right = toCssLength($value);
    }

    get bottom() {
        return parseFloat(this.elem.style.bottom);
    }

    set bottom($value) {
        this.elem.style.top = "";
        this.elem.style.bottom = toCssLength($value);
    }

    get totalLeft() {
        return calcSpace(this.elem, "Left");
    }

    get totalTop() {
        return calcSpace(this.elem, "Top");
    }
    
    get width() {

        if (typeof this._width != "string") {
            return this._width || 0;
        } else {
            return this.elem.offsetWidth;
        }

    }

    set width($value) {

        // VALUES TYPE:
        // 100
        // "auto"
        // "100%"
        // "calc(100% - 10px)"
        
        // "100" (numeric string) is stored as the number 100.
        if (typeof $value == "string" && $value.trim() !== "" && !isNaN(Number($value))) $value = Number($value);
        this._width = $value;
        this.elem.style.width = toCssLength($value);
        
    }

    get height() {

        if (typeof this._height != "string") {
            return this._height || 0;
        } else {
            return this.elem.offsetHeight;
        }
        
    }

    set height($value) {
        
        if (typeof $value == "string" && $value.trim() !== "" && !isNaN(Number($value))) $value = Number($value);
        this._height = $value;
        this.elem.style.height = toCssLength($value);

    }

    get rotate() {
        return this._rotate;
    }

    set rotate($value) {
        this._rotate = parseInt($value);
        this.elem.style.transform = "rotate(" + $value + "deg)";
    }

    // -- Hizalama ve boyutlandırma SONU

    // Genel özellikler

    get visible() {
        return this._visible;
    }

    set visible($value) {

        this._visible = $value;

        // display tipini daha sonra kullanmak üzere sakla.
        if (this.elem.style.display && this.elem.style.display != "none") {
            this._displayType = this.elem.style.display;
        }

        this.elem.style.display = ($value == 1) ? this._displayType : "none";

    }

    get clickable() {
        return this._clickable;
    }

    set clickable($value) {
        this._clickable = $value;
        this._textElem.style.pointerEvents = ($value == 1) ? "auto" : "none";
    }

    get opacity() {
        return this._opacity;
    }

    set opacity($value) {
        this._opacity = $value;
        this.elem.style.opacity = $value;
    }

    get color() {
        return this._backgroundColor;
    }

    set color($value) {
        this._backgroundColor = $value;
        this._textElem.style.backgroundColor = $value;
    }

    get padding() {
        return this._padding || 0;
    }

    set padding($value) {

        this._padding = $value;
        let paddingLeft, paddingRight, paddingTop, paddingBottom;

        if (typeof $value === 'number') {
            paddingLeft = paddingRight = paddingTop = paddingBottom = $value;
        }
        
        else if (Array.isArray($value)) {
            const len = $value.length;

            if (len === 1) {
                paddingLeft = paddingRight = paddingTop = paddingBottom = $value[0];
            }
            else if (len === 2 || len === 3) {
                paddingLeft  = paddingRight  = $value[0];
                paddingTop   = paddingBottom = $value[1];
            }
            else if (len === 4) {
                paddingLeft   = $value[0];
                paddingTop    = $value[1];
                paddingRight  = $value[2];
                paddingBottom = $value[3];
            }
            else {
                //throw new Error('padding değeri 1–4 elemanlı bir dizi ya da tek sayı olmalıdır.');
            }
        }
        else {
            //throw new Error('padding değeri ya sayı olmalı ya da 1–4 elemanlı bir dizi olmalıdır.');
        }

        this.elem.style.paddingLeft   = paddingLeft  + 'px';
        this.elem.style.paddingTop    = paddingTop   + 'px';
        this.elem.style.paddingRight  = paddingRight + 'px';
        this.elem.style.paddingBottom = paddingBottom+ 'px';
    }

    // -- Genel özellikler SONU

    // Kenarlık

    get border() {
        return this._border;
    }

    set border($value) {
        this._border = $value;
        this._textElem.style.borderWidth = $value + "px";
    }

    get borderColor() {
        return this._borderColor;
    }

    set borderColor($value) {
        this._borderColor = $value;
        this._textElem.style.borderColor = $value;
    }

    get round() {
        return this._round;
    }

    set round($value) {
        this._round = $value;
        this._textElem.style.borderRadius = $value + "px";
    }

    // -- Kenarlık SONU
    
    // Metin özellikleri
    
    get fontSize() {
        return this._fontSize;
    }

    set fontSize($value) {
        this._fontSize = $value;
        this._textElem.style.fontSize = $value + "px";
    }

    // fontSize Alternatif kullanım.
    get textSize() {
        return this.fontSize;
    }

    set textSize($value) {
        this.fontSize = $value;
    }
    
    get textColor() {
        return this._textColor;
    }

    set textColor($value) {
        this._textColor = $value;
        this._textElem.style.color = $value;
    }

    get textAlign() {
        return this._textAlign;
    }

    set textAlign($value) {
        this._textAlign = $value;
        this._textElem.style.textAlign = $value;
    }
    
    // Metin özellikleri SONU

    get position() {
        return (this.elem.style.position) ? this.elem.style.position : "absolute";
    }

    set position($value) {
        this.elem.style.position = $value;

        if ($value == "relative") {
            this.left = 0;
            this.top = 0;
        }
    }

    // Otomatik hizalama metodları

    center($position) {
        moveToCenter(this, $position);
    }

    centerBy($obj, $position) {
        moveToCenterBy(this, $obj, $position);
    }

    aline($obj, $position, $space = 0, $secondPosition) {
        moveToAline(this, $obj, $position, $space, $secondPosition);
    }

    // -- Otomatik hizalama metodları SONU

    // *** v26.09.18 ADDITIONS (all objects) ***

    // The element that carries the color, border, click and text styles and the events: TextBox overrides it with its <input>.
    get _textElem() {
        return this.elem;
    }

    // Raw CSS without touching .elem:
    // obj.css = { whiteSpace: "nowrap" }   obj.css.whiteSpace = "nowrap"   obj.css = "white-space: nowrap"
    get css() {
        return this.elem.style;
    }

    set css($value) {
        if (!$value) return;
        if (typeof $value == "string") {
            this.elem.style.cssText += "; " + $value;
            return;
        }
        for (let key in $value) this.elem.style[key] = $value[key];
    }

    // "pointer", "default", "text", "move", "grab", "not-allowed"...
    get cursor() {
        return this._cursor || "";
    }

    set cursor($value) {
        this._cursor = $value || "";
        this.elem.style.cursor = this._cursor;
        if (this._textElem !== this.elem) this._textElem.style.cursor = this._cursor;
    }

    get zIndex() {
        const z = parseInt(this.elem.style.zIndex);
        return isNaN(z) ? 0 : z;
    }

    set zIndex($value) {
        this.elem.style.zIndex = ($value === "" || $value === null || $value === undefined) ? "" : String($value);
    }

    // "0 2px 8px rgba(0, 0, 0, 0.2)" or "none"
    get boxShadow() {
        return this.elem.style.boxShadow;
    }

    set boxShadow($value) {
        this.elem.style.boxShadow = $value || "";
    }

    // "opensans" (default), "opensans-bold", or any font family name.
    get fontFamily() {
        return this._fontFamily || "";
    }

    set fontFamily($value) {
        this._fontFamily = $value || "";
        this._applyFont();
    }

    // bold: 1 -> opensans-bold (the bundled bold font). With another fontFamily -> font-weight: bold.
    get bold() {
        return this._bold ? 1 : 0;
    }

    set bold($value) {
        this._bold = ($value) ? 1 : 0;
        this._applyFont();
    }

    _applyFont() {
        const family = this._fontFamily || "";
        const el = this._textElem;
        if (family === "" || family.indexOf("opensans") === 0) {
            el.style.fontFamily = (this._bold) ? "opensans-bold" : family;
            el.style.fontWeight = "";
        } else {
            el.style.fontFamily = family;
            el.style.fontWeight = (this._bold) ? "bold" : "";
        }
    }

    get italic() {
        return this._italic ? 1 : 0;
    }

    set italic($value) {
        this._italic = ($value) ? 1 : 0;
        this._textElem.style.fontStyle = ($value) ? "italic" : "";
    }

    // Number -> px (lineHeight: 24). String -> as is (lineHeight: "1.4" = 1.4 x font size).
    get lineHeight() {
        return this._lineHeight;
    }

    set lineHeight($value) {
        this._lineHeight = $value;
        this._textElem.style.lineHeight = (typeof $value == "number") ? $value + "px" : ($value || "");
    }

    // ellipsis: 1 -> one line, "..." at the end when the text does not fit the width.
    get ellipsis() {
        return this._ellipsis ? 1 : 0;
    }

    set ellipsis($value) {
        this._ellipsis = ($value) ? 1 : 0;
        const el = this._textElem;
        el.style.whiteSpace = ($value) ? "nowrap" : "";
        el.style.textOverflow = ($value) ? "ellipsis" : "";
        // WHY: Off -> back to clipContent (Label, Box: 0 -> visible), or to basic.css.
        el.style.overflow = ($value) ? "hidden" : ((this._clipContent === 0) ? "visible" : "");
    }

    // selectable: 1 -> the user can select and copy the text. (basic.css turns selection off for every object.)
    get selectable() {
        return this._selectable ? 1 : 0;
    }

    set selectable($value) {
        this._selectable = ($value) ? 1 : 0;
        this.elem.style.userSelect = ($value) ? "text" : "";
        this.elem.style.webkitUserSelect = ($value) ? "text" : "";
        if ($value) this.clickable = 1; // WHY: pointer-events: none blocks the selection too.
    }

    // Flex child (inside HGroup / VGroup): grow: 1 -> takes the free space. shrink: 1 -> can get smaller.
    get grow() {
        return this._grow || 0;
    }

    set grow($value) {
        this._grow = $value;
        this.elem.style.flexGrow = String($value);
    }

    get shrink() {
        return this._shrink || 0;
    }

    set shrink($value) {
        this._shrink = $value;
        this.elem.style.flexShrink = String($value);
    }

    // Text without HTML. Safe for user data (.text is innerHTML).
    get plainText() {
        return this._textElem.textContent;
    }

    set plainText($value) {
        this._textElem.textContent = ($value === null || $value === undefined) ? "" : String($value);
    }

    // 1 after remove().
    get isRemoved() {
        return this._isRemoved ? 1 : 0;
    }

    // The basic.js objects directly inside this object (not the deeper ones).
    get children() {
        const list = [];
        const elems = this.elem.children;
        for (let i = 0; i < elems.length; i++) {
            if (elems[i]._basicObject) list.push(elems[i]._basicObject);
        }
        return list;
    }

    show() {
        this.visible = 1;
        return this;
    }

    hide() {
        this.visible = 0;
        return this;
    }

    toggle() {
        this.visible = (this.visible == 1) ? 0 : 1;
        return this;
    }

    setSize($width, $height) {
        if ($width !== undefined && $width !== null) this.width = $width;
        if ($height !== undefined && $height !== null) this.height = $height;
        return this;
    }

    setPosition($left, $top) {
        if ($left !== undefined && $left !== null) this.left = $left;
        if ($top !== undefined && $top !== null) this.top = $top;
        return this;
    }

    // Puts the object above its siblings (zIndex = highest sibling + 1). The DOM order does not change.
    bringToFront() {
        let max = 0;
        const parent = this.elem.parentElement;
        if (parent) {
            for (let i = 0; i < parent.children.length; i++) {
                const z = parseInt(parent.children[i].style.zIndex);
                if (!isNaN(z) && z > max) max = z;
            }
        }
        this.zIndex = max + 1;
        return this;
    }

    // Is $obj inside this object (at any depth)?
    contains($obj) {
        return !!($obj && $obj !== this && $obj.elem && this.elem.contains($obj.elem));
    }

    // Like on(), but the function runs only once. Returns the remover function.
    once($eventName, $func, $useCapture = false) {
        let removeEvent = null;
        removeEvent = this.on($eventName, function (self, event) {
            if (removeEvent) removeEvent();
            $func(self, event);
        }, $useCapture);
        return removeEvent;
    }

    // Animates property changes and returns a Promise:
    // await box.animate({ left: 100, opacity: 0.5 }, 300);   box.animate({ width: 200 }, 500, "ease-out").then(...)
    // The transition set by setMotion() is restored when the animation ends.
    animate($props = {}, $duration = 300, $easing = "ease") {

        const _that = this;

        return new Promise(function (resolve) {

            if (_that._isRemoved) { resolve(_that); return; }

            // The transition to restore is the one before the first animate() call (chained calls keep it).
            if (_that._animateTimeout) {
                clearTimeout(_that._animateTimeout);
            } else {
                _that._animateBaseTransition = _that.elem.style.transition;
            }

            _that.elem.style.transition = "all " + $duration + "ms " + $easing;
            void _that.elem.offsetWidth; // WHY: Forces a reflow, so the transition starts from the current values.

            for (let key in $props) _that[key] = $props[key];

            _that._animateTimeout = setTimeout(function () {
                _that._animateTimeout = null;
                if (!_that._isRemoved) _that.elem.style.transition = _that._animateBaseTransition || "";
                resolve(_that);
            }, $duration + 20);

        });

    }

    // *** v26.09.18 ADDITIONS END ***

    // Nesneyi sil.
    remove() {

        // WHY: A child can be removed by its parent (below) and by its own code. Only the first call works.
        if (this._isRemoved) return;
        this._isRemoved = 1;

        // 0. Remove the basic.js objects inside this object too.
        // WHY: Only this object was cleaned before. Its children kept their global registrations
        //      (resizeDetection list and ResizeObserver, page.onResize of ScrollBar, SelectDate, SelectTime,
        //      static lists like RadioButton groups...), so a removed page stayed in the memory with all
        //      of its objects (about 400 DOM nodes and 250 event listeners for every page change).
        if (removeCascadeDepth == 0) {

            removeCascadeDepth++;

            try {

                const childElements = this.elem.querySelectorAll("*");

                // Parents first (document order).
                // WHY: destroy() of a component can clean its own children, then they are skipped here.
                for (let i = 0; i < childElements.length; i++) {

                    const child = childElements[i]._basicObject;
                    if (!child || child === this || child._isRemoved) continue;

                    try {
                        // Components clean their global events in destroy(). (Component template)
                        if (typeof child.destroy === "function") child.destroy();
                        if (!child._isRemoved) child.remove();
                    } catch (error) {
                        println("basic.js: A child object could not be removed: " + error.message, "warn");
                    }

                }

            } finally {
                removeCascadeDepth--;
            }

        }

        // v26.09.18: Pending timers of this object must not run after it is removed.
        if (this._setMotionTimeout) clearTimeout(this._setMotionTimeout);
        if (this._withMotionTimeout) clearTimeout(this._withMotionTimeout);
        if (this._dontMotionTimeout) clearTimeout(this._dontMotionTimeout);
        if (this._animateTimeout) clearTimeout(this._animateTimeout);

        // 1.  Eklenmiş tüm eventleri kaldır. _addEventListener() - Otomatik temizleme
        if (this._eventFuncList && this._eventFuncList.length) {
            for (let i = this._eventFuncList.length - 1; i >= 0; i--) {
                const ev = this._eventFuncList[i];
                ev.elem.removeEventListener(ev.eventName, ev.eventFunc);
                this._eventFuncList.pop();
            }
        }

        // 2. Eğer resizeDetection kaydı varsa, onu da kaldır
        if (resizeDetection && typeof resizeDetection.remove_onResize === "function") {
            resizeDetection.remove_onResize(this.elem, null); // null ile tüm fonksiyonları sil
        }

        // NOTE: Eğer page.onResize kullanılmış ise manuel kaldırılmalı.

        // 3. DOM'dan sil
        this.elem.remove();

        // 4. Tüm özellikleri sil:
        /*
        const _this = this;
        setTimeout(function() {
            for (let key in _this) {
                delete _this[key];  // Tüm özellikleri sil
            }
        }, 1000); // WHY: May be have a css animation
        */

    }

    // Toplu özellik değiştirmesi.
    props($defaultParams, $params, $props) {
        setProparties(this, $defaultParams, $params, $props);
        return this;
    }

    // Olay ekleme: onClick, onResize da kullanılıyor.
    _addEventListener($eventName, $func, $element, $useCapture = false) {

        /* // More options:
        $useCapture =
        {
            capture: false,    // Event capture mı bubbling mi? (varsayılan: false)
            once: false,       // Sadece 1 defa mı çalışsın? (true ise dinleyici otomatik kaldırılır)
            passive: false     // `event.preventDefault()` çağrılmayacaksa true yapılabilir
        }
        */

        let _that = this;

        const eventFunc = function (event) {
            $func(_that, event); // İlk parametre nesnenin kendisi.
        }
        $element.addEventListener($eventName, eventFunc, $useCapture);

        // Otomatik temizleme için kaydet.
        const eventDataItem = {};
        eventDataItem.eventName = $eventName;
        eventDataItem.originalFunc = $func;
        eventDataItem.eventFunc = eventFunc;
        eventDataItem.elem = $element;

        this._eventFuncList.push(eventDataItem); // Nesne .remove() edilirken, hepsi temizlenir.

        const removeEvent = function() {
            _that._removeEventListener($eventName, $func, $element);
        };

        return removeEvent; // Eklenen olayı kolayca silmek için fonksiyon döndür.

    };

    // Olay silme: remove_onClick, remove_onResize da kullanılıyor.
    _removeEventListener($eventName, $func, $element) {

        //Otomatik temizleme
        let eventFunc = null; // Orjinal fonksiyon bulunacak.
        
        for (let i = 0; i < this._eventFuncList.length; i++) {
            if (this._eventFuncList[i].originalFunc == $func) {
                eventFunc = this._eventFuncList[i].eventFunc;
                this._eventFuncList.splice(i, 1);
                break;
            }
        }

        if (eventFunc) {
            $element.removeEventListener($eventName, eventFunc);
        }
        
        //$element.removeEventListener($eventName, $func);

    };

    // NEW: Olay ekleme: object.on("click", function);
    on($eventName, $func, $useCapture = false) {

        const _elem = this._textElem; // WHY: textbox için olayları input elementine bağla.
        this.clickable = 1; // WHY: Clickable bazen 0 da unutulabilir, otomatik 1 ver. Gerekirse kullanıcı 0 yapar.
        
        return this._addEventListener($eventName, $func, _elem, $useCapture);

        /* #1
        _elem.addEventListener($eventName, $func, $useCapture);

        // Olayı kolayca silebilmek için hazır bir fonksiyon oluştur.
        const removeEvent = function() {
            _elem.removeEventListener($eventName, $func);
        };

        return eventInfo;

        */
        
        // TODO: $eventName resize ise, resizeDetection.onResize ile ekleme yapılabilir.

    }
    // NOTE: Bir olay eklendiğinde, silme fonksiyonunu oluşturup, return ediyor.

    // NEW: Olay ekleme: object.off("click", function);
    off($eventName, $func) {

        // Eğer ihityaç olursa, manuel olarak da, tek tek eventler silinebilir.
        const _elem = this._textElem;
        
        //_elem.removeEventListener($eventName, $func);
        this._removeEventListener($eventName, $func, _elem);

    }

    onResize($func) {
        resizeDetection.onResize(this, $func);
    }

    remove_onResize($func) {
        resizeDetection.remove_onResize(this.elem, $func);
    }

    // Hareket
    setMotion($motionString) {

        // example motionString: "left 1s, top 1s, width 1s, height 1s, transform 1s, background-color 1s, border-radius 1s, opacity 1s"
        // example motionString: "all 0.3s"
        //this.setMotionNow($motionString);
        const _that = this;

        if(this._setMotionTimeout) clearTimeout(this._setMotionTimeout);
        this._setMotionTimeout = setTimeout(function(){
            _that.setMotionNow($motionString);
        }, motionController.DONT_MOTION_TIME);

    }

    getMotion() {
        return this._motionString;
    }

    setMotionNow($motionString) {

        this._motionString = $motionString;
        this.elem.style.transition = $motionString;

    }

    // Özellik değişimi, hareket ile olsun.
    withMotion($func) {

        const _that = this;

        if(this._withMotionTimeout) clearTimeout(this._withMotionTimeout);
        this._withMotionTimeout = setTimeout(function() {
            _that.canMotionNow();
             $func(_that);
         }, motionController.WITH_MOTION_TIME);

    }

    // Harekete, belli bir süre ara ver.
    dontMotion() {

        this.elem.style.transition = "none";
        const _that = this;

        if(this._dontMotionTimeout) clearTimeout(this._dontMotionTimeout);
        this._dontMotionTimeout = setTimeout(function(){
            _that.elem.style.transition = _that._motionString;
        }, motionController.DONT_MOTION_TIME);

    }

    // Harekete arayı, süresi dolmadan iptal et.
    canMotionNow() {
        this.elem.style.transition = this._motionString;
    }

}

/* MAINBOX COMPONENT (page) */
class MainBox {

    /*
    _box;
    _element;
    _bodyElement;
    _backgroundColor;
    _zoom;
    */

    constructor() {

        this._bodyElement = document.getElementsByTagName("BODY")[0];
        this._element = this._bodyElement;

        this._backgroundColor = "white";
        this._zoom = 1;

    }

    // short usage of element
    get elem() {
        return this._element;
    }

    get element() {
        return this._element;
    }

    /*
    get contElement() {
        return this._element;
    }
    */
    // NOTE: .elem, .elem, .elem all the same. You can delete contElement --> element

    get bodyElement() {
        return this._bodyElement;
    }

    get mainBox() {
        return this._box;
    }

    set mainBox($value) {
        this._box = $value;
        this._element = this._box.elem;
    }

    get width() {
        let _w;
        _w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return withPageZoom(_w);
    }

    get height() {
        let _h;
        _h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        return withPageZoom(_h);
    }

    // .text alternatif kullanım:
    get html() {
        return this._box.elem.innerHTML;
    }

    set html($value) {
        this._box.elem.innerHTML = $value;
    }

    get zoom() {
        return this._zoom;
    }

    set zoom($value) {
        this._zoom = $value;
        this.bodyElement.style.transformOrigin = "top left";
        this.bodyElement.style.transform = "scale(" + $value + ")";

        page.refreshSize();

    }

    get color() {
        return this._backgroundColor;
    }

    set color($value) {
        this._backgroundColor = $value;
        this.bodyElement.style.backgroundColor = $value;
    }

    // fit
    fit($value = document.body.clientWidth, $maxValue) {

        // WHY: onResize da hesaplama yaparken, zoom değerini hesaba katmasın diye.
        // mesela page.width zoom değeri hesaba katıldığında farklı oluyor.
        page.zoom = 1; 
        let _w = page.width;

        // ikinci değer yok ise,
        $maxValue = $maxValue || $value;

        // ekran genişliği izin verilenden fazla ise,
        if (_w > $maxValue) {
            page.zoom = $maxValue / $value;
        } else {
            page.zoom = _w / $value;
        }

    };

    // fit
    autoFit($contentWidth, $contentHeight) {

        // WHY: onResize da hesaplama yaparken, zoom değerini hesaba katmasın diye.
        // mesela page.width zoom değeri hesaba katıldığında farklı oluyor.
        page.zoom = 1; 

        const _currentCarpan = page.width / page.height;
        const _carpan = $contentWidth / $contentHeight;

        let _width = 0;

        // Yeterli genişlik yok ise; Genişliğe sığdır.
        if (_currentCarpan <= _carpan) {
            _width = page.width;

        // Yüksekliğe sığdır.
        } else {
            _width = page.height * _carpan;
            
        }

        page.fit($contentWidth, _width);

    };

    
    refreshSize() {
        page.mainBox.width = page.width;
        page.mainBox.height = page.height;
    }   
    

    onClick($func) {
        this._box._addEventListener("click", $func, window);
    }

    remove_onClick($func) {
        this._box._removeEventListener("click", $func, window);
    }

    onResize($func) {
        this._box._addEventListener("resize", $func, window);
    }

    remove_onResize($func) {
        this._box._removeEventListener("resize", $func, window);
    }

    // *** v26.09.18 ADDITIONS (page) ***

    // Window events: page.on("keydown", function (self, event) {}). Returns the remover function.
    on($eventName, $func, $useCapture = false) {
        return this._box._addEventListener($eventName, $func, window, $useCapture);
    }

    off($eventName, $func) {
        this._box._removeEventListener($eventName, $func, window);
    }

    onKeyDown($func) {
        return this.on("keydown", $func);
    }

    remove_onKeyDown($func) {
        this.off("keydown", $func);
    }

    // The browser tab title.
    get title() {
        return document.title;
    }

    set title($value) {
        document.title = $value;
    }

    // *** v26.09.18 ADDITIONS END ***

    add($obj) {
        // Eklenen nesnenin, üst nesnesi değişiyor.
        if ($obj.containerBox != this) {
            $obj.containerBox = this;
            // this.box.clickable = 1;
            this.elem.appendChild($obj.elem);
        }
    }

}

/* BOX COMPONENT */
class BBox extends Basic_UIComponent {

    constructor($left = -1000, $top = -1000, $width = 100, $height = 100) {
        
        super("box");

        // Renk
        this._backgroundColor = "whitesmoke";

        // Kenarlık
        this._border = 0;
        this._borderColor = "rgba(0, 0, 0, 0.6)";
        this._round = 0;
        
        // Text
        this._fontSize = 16;
        this._textColor = "rgba(0, 0, 0, 0.8)";
        this._textAlign = "left";

        this._clipContent = 1;

        const divElement = document.createElement("DIV");
        divElement.classList.add("basic_box");

        divElement.style.left = $left + "px";
        divElement.style.top = $top + "px";

        this._element = divElement;
        attachToContainer(this, this._element);

        this.width = $width;
        this.height = $height;

        if (isFlexContainer(defaultContainerBox)) {
            this.position = "relative";
        }

        makeBasicObject(this);

    }

    get elem() {
        return this._element;
    }

    get element() {
        return this._element;
    }

    /*
    get contElement() {
        return this._element;
    }
    */

    get text() {
        return this.elem.innerHTML;
    }

    set text($value) {
        this.elem.innerHTML = $value;
    }

    // .text alternatif kullanım:
    get html() {
        return this.elem.innerHTML;
    }

    set html($value) {
        this.elem.innerHTML = $value;
    }

    get clipContent() {
        return this._clipContent;
    }

    set clipContent($value) {
        this._clipContent = $value;
        if ($value) {
            this.elem.style.overflowX = "hidden";
            this.elem.style.overflowY = "hidden";
        } else {
            this.elem.style.overflowX = "visible";
            this.elem.style.overflowY = "visible";
        }
    }
    
    get scrollX() {
        return (this.elem.style.overflowX == "auto") ? 1 : 0;
    }

    get scrollY() {
        return (this.elem.style.overflowY == "auto") ? 1 : 0;
    }

    set scrollX($value) {
        this.elem.style.overflowX = "hidden";

        if ($value == 1) {
            this.clickable = 1;
            this.elem.style.overflowX = "auto";
        }
    }

    set scrollY($value) {
        this.elem.style.overflowY = "hidden";

        if ($value == 1) {
            this.clickable = 1;
            this.elem.style.overflowY = "auto";
        }
    }

    onClick($func) {
        this.clickable = 1;
        this._addEventListener("click", $func, this.elem);
    }

    remove_onClick($func) {
        this._removeEventListener("click", $func, this.elem);
    }

    add($obj) {
        //if ($obj.containerBox != this) {
            // Eklenen nesnenin, üst nesnesini değiştir.
            $obj.containerBox = this;
            // İçine başka bir nesne eklendiğinde, artık basılabilir.
            //this.clickable = 1;
            this.elem.appendChild($obj.elem);
        //}
    }

    // Ağaç şeklinde kod blokları oluştumak için bir teknik. (Deneysel Teknik)
    in($func) {
        createIn(this, $func);
    }

}
//window.Box = Box;

// Alternatif kullanım
const createBox = function ($left, $top, $width, $height) {
    return new BBox($left, $top, $width, $height);
};
window.createBox = createBox;

// Alternatif kullanım
/*
window.cbox = function ($left, $top, $width, $height) {
    return new BBox($left, $top, $width, $height);
}
*/

/* BUTTON COMPONENT */
class BButton extends Basic_UIComponent {

    constructor($left = -1000, $top = -1000, $width = basic.BUTTON_WIDTH, $height = basic.BUTTON_HEIGHT) {

        super("button");

        // renk
        this._backgroundColor = basic.BUTTON_COLOR;

        // kenarlık
        this._border = 1;
        this._borderColor = "rgba(0, 0, 0, 0.40)";
        this._round = 4;
        
        // text
        this._fontSize = 20;
        this._textColor = basic.BUTTON_TEXT_COLOR;
        this._textAlign = "center";

        this._clickable = 1;

        const buttonElement = document.createElement("BUTTON");
        buttonElement.innerHTML = "Button";
        buttonElement.classList.add("basic_button");
        buttonElement.setAttribute("type", "button");

        buttonElement.style.left = $left + "px";
        buttonElement.style.top = $top + "px";

        this._element = buttonElement;
        attachToContainer(this, this._element);

        this.width = $width;
        this.height = $height;

        if (isFlexContainer(defaultContainerBox)) {
            this.position = "relative";
        }

        makeBasicObject(this);

    }

    get elem() {
        return this._element;
    }

    get element() {
        return this._element;
    }

    /*
    get contElement() {
        return this._element;
    }*/

    get buttonElement() {
        return this._element;
    }

    get text() {
        return this.buttonElement.innerHTML;
    }

    set text($value) {
        this.buttonElement.innerHTML = $value;
    }

    // Buttonun value özelliğini kullan.
    get value() {
        return this.buttonElement.value;
    }

    set value($value) {
        this.buttonElement.value = $value;
    }

    get enabled() {
        return (this.buttonElement.disabled) ? 0 : 1;
    }

    set enabled($value) {
        this.buttonElement.disabled = ($value) ? 0 : 1;
    }

    get minimal() {
        return (this.buttonElement.classList.contains("minimal")) ? 1 : 0;
    }

    set minimal($value) {
        if ($value) {
            this.buttonElement.classList.add("minimal");
        } else {
            this.buttonElement.classList.remove("minimal");
        }
    }

    get spaceX() {
        return parseInt(this.elem.style.paddingLeft) || 0;
    }

    set spaceX($value) {
        this.elem.style.paddingLeft = $value + "px";
        this.elem.style.paddingRight = $value + "px";
    }

    onClick($func) {
        this.clickable = 1;
        this._addEventListener("click", $func, this.buttonElement);
    }

    remove_onClick($func) {
        this._removeEventListener("click", $func, this.buttonElement);
    }

    add($obj) {
        println("basic.js: add(): Insertion cannot be made inside the Button object.", "error");
    }

}
//window.Button = Button;

// Alternatif kullanım1
const createButton = function ($left, $top, $width, $height) {
    return new BButton($left, $top, $width, $height);
};
window.createButton = createButton;

// Alternatif kullanım 2
/*
window.cbtn = function ($left, $top, $width, $height) {
    return new BButton($left, $top, $width, $height);
}
*/

/* TEXTBOX COMPONENT */
class BTextBox extends Basic_UIComponent {

    /*
    _titleElement;
    _mainElement;
    */

    constructor($left = -1000, $top = -1000, $width = basic.TEXTBOX_WIDTH, $height = basic.TEXTBOX_HEIGHT) {

        super("textbox");

        // renk
        this._backgroundColor = "white";

        // kenarlık
        this._border = 1;
        this._borderColor = "#4A4A4A";
        this._round = 4;
        
        // Text
        this._fontSize = 20;
        this._textColor = "#4A4A4A";
        this._textAlign = "left";

        this._clickable = 1;

        const mainElement = document.createElement("DIV");
        mainElement.classList.add("basic_textbox-main");
        this._mainElement = mainElement;

        const titleElement = document.createElement("DIV");
        titleElement.classList.add("basic_textbox-title");
        titleElement.innerHTML = "";
        this._titleElement = titleElement;

        const element = document.createElement("INPUT");
        element.value = "";
        element.classList.add("basic_textbox");
        element.setAttribute("type", "text");
        element.style.width = "100%";
        element.style.height = "100%";
        this._element = element;

        mainElement.style.left = $left + "px";
        mainElement.style.top = $top + "px";

        mainElement.appendChild(this._titleElement);
        mainElement.appendChild(this._element);

        attachToContainer(this, this._mainElement);

        this.width = $width;
        this.height = $height;

        if (isFlexContainer(defaultContainerBox)) {
            this.position = "relative";
        }

        makeBasicObject(this);

    }

    get elem() {
        return this._mainElement;
    }

    get element() {
        return this._mainElement;
    }
    /*
    get contElement() {
        return this._mainElement;
    }*/

    get inputElement() {
        return this._element;
    }

    set inputElement(elem) {
        this._element = elem;
    }

    get titleElement() {
        return this._titleElement;
    }

    get text() {
        return this.inputElement.value;
    }

    set text($value) {
        // WHY: null / undefined gelir ise hata vermek yerine alanı boşaltsın.
        this.inputElement.value = ($value === null || $value === undefined) ? "" : String($value);
    }

    // ÖZEL: renk, kenarlık, clickable ve metin özellikleri <input>'a gider (base setters use _textElem).
    get _textElem() {
        return this.inputElement || this.elem;
    }

    get title() {
        return this.titleElement.innerHTML;
    }

    set title($value) {
        this.titleElement.innerHTML = $value;
    }

    get enabled() {
        return (this.inputElement.disabled) ? 0 : 1;
    }

    set enabled($value) {
        this.inputElement.disabled = ($value) ? 0 : 1;
    }

    get minimal() {
        return (this.inputElement.classList.contains("minimal")) ? 1 : 0;
    }

    set minimal($value) {
        if ($value) {
            this.inputElement.classList.add("minimal");
        } else {
            this.inputElement.classList.remove("minimal");
        }
    }

    // *** v26.09.18 ADDITIONS (Input / TextBox) ***

    // .value = .text (what most developers expect from an input)
    get value() {
        return this.text;
    }

    set value($value) {
        this.text = $value;
    }

    get plainText() {
        return this.text;
    }

    set plainText($value) {
        this.text = $value;
    }

    get placeholder() {
        return this.inputElement.placeholder;
    }

    set placeholder($value) {
        this.inputElement.placeholder = ($value === null || $value === undefined) ? "" : String($value);
    }

    // "text" (default), "password", "number", "email", "tel", "search", "url"
    get inputType() {
        return this.inputElement.type;
    }

    set inputType($value) {
        this.inputElement.type = $value || "text";
    }

    // 0 -> no limit
    get maxLength() {
        return (this.inputElement.maxLength > 0) ? this.inputElement.maxLength : 0;
    }

    set maxLength($value) {
        if ($value > 0) {
            this.inputElement.maxLength = $value;
        } else {
            this.inputElement.removeAttribute("maxlength");
        }
    }

    get readOnly() {
        return (this.inputElement.readOnly) ? 1 : 0;
    }

    set readOnly($value) {
        this.inputElement.readOnly = ($value) ? true : false;
    }

    focus() {
        this.inputElement.focus();
        return this;
    }

    blur() {
        this.inputElement.blur();
        return this;
    }

    // Selects the whole text.
    select() {
        this.inputElement.select();
        return this;
    }

    // Enter key: input.onEnter(function (self, event) {}). Returns the remover function.
    onEnter($func) {
        const wrapper = function (self, event) {
            if (event.key === "Enter") $func(self, event);
        };
        wrapper._enterFunc = $func;
        return this._addEventListener("keydown", wrapper, this.inputElement);
    }

    remove_onEnter($func) {
        for (let i = this._eventFuncList.length - 1; i >= 0; i--) {
            const item = this._eventFuncList[i];
            if (item.eventName == "keydown" && item.originalFunc._enterFunc === $func) {
                item.elem.removeEventListener("keydown", item.eventFunc);
                this._eventFuncList.splice(i, 1);
            }
        }
    }

    // *** v26.09.18 ADDITIONS END ***

    onChange($func) {
        this._addEventListener("input", $func, this.inputElement);
    }

    remove_onChange($func) {
        this._removeEventListener("input", $func, this.inputElement);
    }

    add($obj) {
        println("basic.js: add(): Insertion cannot be made inside the TextBox object.", "error");
    }

}
//window.TextBox = TextBox;

// Alternatif kullanım
const createTextBox = function ($left, $top, $width, $height) {
    return new BTextBox($left, $top, $width, $height);
};
window.createTextBox = createTextBox;
window.createInput = createTextBox;

// Alternatif kullanım
/*
window.ctxt = function ($left, $top, $width, $height) {
    return new BTextBox($left, $top, $width, $height);
}
*/

/* LABEL COMPONENT */
class BLabel extends Basic_UIComponent {

    constructor($left = -1000, $top = -1000, $width = "auto", $height = "auto") {

        super("label");

        //this._value = "";
        this._backgroundColor = "transparent";

        // Kenarlık
        this._border = 0;
        this._borderColor = "rgba(0, 0, 0, 0.6)";
        this._round = 0;
        
        // Text
        this._fontSize = 20;
        this._textColor = "rgba(0, 0, 0, 0.8)";
        this._textAlign = "left";

        const divElement = document.createElement("DIV");

        //divElement.innerHTML = "";
        divElement.classList.add("basic_label");

        divElement.style.left = $left + "px";
        divElement.style.top = $top + "px";

        this._element = divElement;
        attachToContainer(this, this._element);

        this.width = $width;
        this.height = $height;

        if (isFlexContainer(defaultContainerBox)) {
            this.position = "relative";
        }

        makeBasicObject(this);

    }

    //sample: <b>text</b><br />

    get elem() {
        return this._element;
    }

    get element() {
        return this._element;
    }
    /*
    get contElement() {
        return this._element;
    }*/

    get text() {
        return this.elem.innerHTML;
    }

    set text($value) {
        this.elem.innerHTML = $value;
    }

    // clipContent: 1 (default) -> the text is cut at the edges of the label (basic.css: overflow hidden).
    // 0 -> not cut: the letters that go out of the line box (g, ş, ğ, Ö), text shadows, a text that does not fit.
    // WHY: ellipsis: 1 always cuts ("..." needs it).
    get clipContent() {
        return (this._clipContent === 0) ? 0 : 1;
    }

    set clipContent($value) {
        this._clipContent = ($value) ? 1 : 0;
        if (this._ellipsis) return;
        this.elem.style.overflow = ($value) ? "" : "visible";
    }

    get space() {
        return parseInt(this.elem.style.padding) || 0;
    }

    set space($value) {
        this.elem.style.padding = $value + "px";
    }

    get spaceX() {
        return parseInt(this.elem.style.paddingLeft) || 0;
    }

    set spaceX($value) {
        this.elem.style.paddingLeft = $value + "px";
        this.elem.style.paddingRight = $value + "px";
    }

    get spaceY() {
        return parseInt(this.elem.style.paddingTop) || 0;
    }

    set spaceY($value) {
        this.elem.style.paddingTop = $value + "px";
        this.elem.style.paddingBottom = $value + "px";
    }

    onClick($func) {
        this.clickable = 1;
        this._addEventListener("click", $func, this.elem);
    }

    remove_onClick($func) {
        //this.clickable = 0;
        this._removeEventListener("click", $func, this.elem);
    }

    add($obj) {
        println("basic.js: add(): Insertion cannot be made inside the Label object.", "error");
    }

}
//window.Label = Label;

// Alternatif kullanım
const createLabel = function ($left, $top, $width, $height) {
    return new BLabel($left, $top, $width, $height);
};
window.createLabel = createLabel;

// Alternatif kullanım
/*
window.clbl = function ($left, $top, $width, $height) {
    return new BLabel($left, $top, $width, $height);
}
*/

//window.ImageObj = window.Image;

/* IMAGE COMPONENT */
class BImage extends Basic_UIComponent {

    // Not: CheckBox resim nesnesi ile yapılabilir.
    /*
    _autoSize;
    */

    constructor($left = -1000, $top = -1000, $width = 0, $height = 0) {

        super("image");

        this._autoSize = 1;
        this._space = 0;

        // Renk
        this._backgroundColor = "transparent";

        // kenarlık
        this._border = 0;
        this._borderColor = "rgba(0, 0, 0, 0.6)";
        this._round = 0;

        const imageElement = document.createElement("IMG");
        imageElement.classList.add("basic_image");

        imageElement.style.left = $left + "px";
        imageElement.style.top = $top + "px";

        this._element = imageElement;
        attachToContainer(this, this._element);

        super.width = $width;
        super.height = $height;

        const _that = this;

        if ($width || $height) {
            this.autoSize = 0;
        }

        // Resim yüklendiğinde, Otomatik boyutlandır.
        //if (this.autoSize > 0) {
            
            imageElement.addEventListener('load', function () {

                // if auto size
                if (_that.autoSize > 0) {
                    
                    const _autoSize = _that.autoSize;

                    _that.width = parseInt(_that.naturalWidth / _autoSize) + "px";
                    _that.height = parseInt(_that.naturalHeight / _autoSize) + "px";

                    // WHY: .width ve .height, autoSize değerini 0 yapar.
                    // Geri konmaz ise; aynı nesneye ikinci bir resim yüklendiğinde, eski ölçüde kalır.
                    _that.autoSize = _autoSize;

                }

            });
            
        //}

        if (isFlexContainer(defaultContainerBox)) {
            this.position = "relative";
        }

        makeBasicObject(this);

    }

    get elem() {
        return this._element;
    }

    get element() {
        return this._element;
    }
    /*
    get contElement() {
        return this._element;
    }*/

    get imageElement() {
        return this._element;
    }

    // Özel boyutlandırma komutları
    
    get width() {
        return super.width;
    }

    set width($value) {
        this.autoSize = 0;
        super.width = $value;
    }
    
    get height() {
        return super.height;
    }
    
    set height($value) {
        this.autoSize = 0;
        super.height = $value;
    }

    // *** v26.09.18 ADDITIONS (Icon / Image) ***

    // Alternative text. (Without it, load() writes the file path, as basic.js does.)
    get alt() {
        return this._alt;
    }

    set alt($value) {
        this._alt = $value;
        this.imageElement.setAttribute("alt", ($value === null || $value === undefined) ? "" : String($value));
    }

    // How the image fills its width and height: "cover", "contain", "fill", "none", "scale-down"
    get imageFit() {
        return this._imageFit || "";
    }

    set imageFit($value) {
        this._imageFit = $value || "";
        this.imageElement.style.objectFit = this._imageFit;
    }

    // *** v26.09.18 ADDITIONS END ***

    // Resim yüklendikten sonra, çalışır.
    get naturalWidth() {
        return this.imageElement.naturalWidth;
    }

    get naturalHeight() {
        return this.imageElement.naturalHeight;
    }

    // Resmi orjinal boyutuna ölçekler. 1: orjinal, 2: 2 kat küçült, 3: 3 kat küçült.
    get autoSize() {
        return this._autoSize;
    }

    set autoSize($value) {
        this._autoSize = $value;
    }

    get space() {
        return this._space;
        // return parseInt(this.elem.style.padding) || 0;
    }
    
    set space($value) {

        if ($value > 50) {
            $value = 50;
        }

        if ($value < 0) {
            $value = 0;
        }

        this._space = $value;
        //this.elem.style.padding = String($value + "%");
        const spaceX = parseInt((this.width / 100) * $value);
        const spaceY = parseInt((this.height / 100) * $value);

        this.elem.style.paddingLeft = spaceX + "px";
        this.elem.style.paddingRight = spaceX + "px";
        this.elem.style.paddingTop = spaceY + "px";
        this.elem.style.paddingBottom = spaceY + "px";

    }

    onClick($func) {
        this.clickable = 1;
        this._addEventListener("click", $func, this.elem);
    }

    remove_onClick($func) {
        //this.clickable = 0;
        this._removeEventListener("click", $func, this.elem);
    }

    onLoad($func) {
        this._addEventListener("load", $func, this.imageElement);
    }

    remove_onLoad($func) {
        this._removeEventListener("load", $func, this.imageElement);
    }

    load($imagePath) {
        this.imageElement.setAttribute("src", $imagePath);
        if (this._alt === undefined) this.imageElement.setAttribute("alt", $imagePath);
    }

    add($obj) {
        println("basic.js: add(): Insertion cannot be made inside the Image object.", "error");
    }

}
//window.BImage = BImage;

// Alternatif kullanım
const createImage = function ($left, $top, $width, $height) {
    return new BImage($left, $top, $width, $height);
};
window.createImage = createImage;
window.createIcon = createImage;

// Alternatif kullanım
/*
window.cimg = function ($left, $top, $width, $height) {
    return new BImage($left, $top, $width, $height);
}
*/

class BSound {

    /*
    _element;
    */

    constructor() {

        const element = document.createElement("AUDIO");
        const source = document.createElement("SOURCE");

        element.appendChild(source);

        this._element = element;
        document.body.appendChild(this._element);

        makeBasicObject(this);

    }

    get elem() {
        return this._element;
    }

    get element() {
        return this._element;
    }
    /*
    get contElement() {
        return this._element;
    }*/

    get soundElement() {
        return this._element;
    }

    // Sesin toplam süresi (saniye). Dosya hazır değil ise 0 döner.
    get time() {
        return (isNaN(this.elem.duration)) ? 0 : this.elem.duration;
    }

    // Sesin kalan süresi (saniye).
    get timeLeft() {
        return (isNaN(this.elem.duration)) ? 0 : (this.elem.duration - this.elem.currentTime);
    }

    get currentTime() {
        return this.elem.currentTime;
    }

    get paused() {
        return this.elem.paused;
    }

    get playing() {
        return !this.elem.paused;
    }

    get loop() {
        return (this.elem.getAttribute("loop") == "loop") ? 1 : 0;
    }

    set loop($value) {
        if ($value == 1) {
            this.elem.setAttribute("loop", "loop");
        } else {
            // WHY: loop bir "boolean attribute" tur. Boş değer verilir ise bile açık sayılır, silinmeli.
            this.elem.removeAttribute("loop");
        }
    }

    play() {
        if (this.paused) {
            this.elem.play();
        }
    }

    pause($value) {
        if (!this.paused) {
            this.elem.pause();
        }
    }

    stop() {
        if (!this.paused) {
            this.elem.pause();
            this.elem.currentTime = 0;
        }
    }
    
    onLoad($func) {
        let _that = this;
        this.elem.addEventListener("canplaythrough", function () {
            $func(_that);
        });
    }

    load($path) {

        let fileType = "audio/wav";

        if ($path.substr(-3).toLowerCase() == "mp3") {
            fileType = "audio/mpeg";
        }

        this.elem.children[0].setAttribute("src", $path);
        this.elem.children[0].setAttribute("type", fileType);

    }

    remove() {
        this.elem.remove();
    }

};
// WHY: Kütüphane bir IIFE içinde. Dışarı açılmaz ise new BSound() çalışmaz.
window.BSound = BSound;


/* ### FUNCTIONS ### */

// - bir elementin verilen yöne doğru ekran sınırına olan uzaklığını hesaplar.
// elem: box.elem, lbl.elem
// dir: "Left", "Top"
const calcSpace = function(elem, dir) {

    const _firstDiv = elem;

    let _space = 0;
    let _currentDiv = _firstDiv;

    while (_currentDiv.offsetParent) {
        _space += _currentDiv["offset" + dir];
        _currentDiv = _currentDiv.offsetParent;
    }

    return _space;

};

// Merges the sources into a new object, the first source wins.
const mergeLayers = function (...sources) {
    const out = {};
    for (const source of sources) {
        if (source) mergeIntoIfMissing(out, source);
    }
    return out;
};

// Set styles with style object.
const setProparties = function ($this, $defaultParams, $params, $props) {

    // Tüm özellikleri bu değişkende topla.
    const _params = mergeLayers($props, $params, $defaultParams);

    // Tüm özellikleri tek seferde nesneye uygula.
    for (let propName in _params) {
        $this[propName] = _params[propName];
    }

};


// Centering one object to box.
const moveToCenter = function ($this, $position) {

    if ($position == "left" || !$position) {
        const _w = $this.containerBox.width - (($this.containerBox.border || 0) * 2);
        $this.left = parseInt((_w - $this.width) / 2);

    }

    if ($position == "top" || !$position) {
        const _h = $this.containerBox.height - (($this.containerBox.border || 0) * 2);
        $this.top = parseInt((_h - $this.height) / 2);

    }

    // Her zaman tam sayı olarak ortala, yoksa bulanıklık yapabilir.
    // NOT: Eğer, kenarlık kalınlıkları, aynı olmaz ise, hesaba katılmaz.

};

// Centering one object to an other object.
const moveToCenterBy = function ($this, $obj, $position) {

    if ($position == "left" || !$position) {
        const _w = $obj.width;
        $this.left = parseInt((_w - $this.width) / 2) + $obj.left;

        if ($position) {
            $this.top = $obj.top;
        }

    }

    if ($position == "top" || !$position) {
        const _h = $obj.height;
        $this.top = parseInt((_h - $this.height) / 2) + $obj.top;

        if ($position) {
            $this.left = $obj.left;
        }

    }

};

// Alignment of one object with respect to another object.
const moveToAline = function ($this, $obj, $position, $space, $secondPosition) {

    if ($position == "left") {
        if (!isNaN($obj.left)) {
            $this.left = parseInt($obj.left - $this.width - $space);

        } else if (!isNaN($obj.right)) {
            $this.right = parseInt($obj.right + $obj.width + $space);

        }

        if (!isNaN($obj.top)) {
            $this.top = parseInt($obj.top);

        } else {
            $this.bottom = parseInt($obj.bottom);

        }

    } else if ($position == "top") {
        if (!isNaN($obj.top)) {
            $this.top = parseInt($obj.top - $this.height - $space);

        } else if (!isNaN($obj.bottom)) {
            $this.bottom = parseInt($obj.bottom + $obj.height + $space);

        }

        if (!isNaN($obj.left)) {
            $this.left = parseInt($obj.left);

        } else {
            $this.right = parseInt($obj.right);

        }


    } else if ($position == "right") {
        if (!isNaN($obj.left)) {
            $this.left = parseInt($obj.left + $obj.width + $space);

        } else if (!isNaN($obj.right)) {
            $this.right = parseInt($obj.right - $this.width - $space);

        }

        if (!isNaN($obj.top)) {
            $this.top = parseInt($obj.top);

        } else {
            $this.bottom = parseInt($obj.bottom);

        }

    } else if ($position == "bottom") {
        if (!isNaN($obj.top)) {
            $this.top = parseInt($obj.top + $obj.height + $space);

        } else if (!isNaN($obj.bottom)) {
            $this.bottom = parseInt($obj.bottom - $this.height - $space);

        }

        if (!isNaN($obj.left)) {
            $this.left = parseInt($obj.left);

        } else {
            $this.right = parseInt($obj.right);

        }


    } else {

        if (!isNaN($obj.top)) {
            $this.top = parseInt($obj.top);

        } else if (!isNaN($obj.bottom)) {
            $this.bottom = parseInt($obj.bottom);

        }

        if (!isNaN($obj.left)) {
            $this.left = parseInt($obj.left);

        } else if (!isNaN($obj.right)) {
            $this.right = parseInt($obj.right);

        }

    }

    if ($position == "left" || $position == "right") {

        const _difference = $obj.height - $this.height;

        switch ($secondPosition) {
            case "top":
                if (!isNaN($obj.top)) {
                    //$this.top += parseInt($obj.top);
        
                } else if (!isNaN($obj.bottom)) {
                    $this.bottom += parseInt(_difference);
        
                }
                break;
            case "bottom":
                if (!isNaN($obj.top)) {
                    $this.top += parseInt(_difference);
        
                } else if (!isNaN($obj.bottom)) {
                    //$this.bottom = parseInt($obj.bottom);
        
                }
                break;
            case "center":
                if (!isNaN($obj.top)) {
                    $this.top += parseInt(_difference / 2);
        
                } else if (!isNaN($obj.bottom)) {
                    $this.bottom += parseInt(_difference / 2);
        
                }
                break;
        }

    } else if ($position == "top" || $position == "bottom") {

        const _difference = $obj.width - $this.width;

        switch ($secondPosition) {
            case "left":
                if (!isNaN($obj.left)) {
                    //$this.left = parseInt($obj.left);
        
                } else if (!isNaN($obj.right)) {
                    $this.right = parseInt($obj.right + _difference);
        
                }
                break;
            case "right":
                if (!isNaN($obj.left)) {
                    $this.left += parseInt(_difference);
        
                } else if (!isNaN($obj.right)) {
                    //$this.right = parseInt($obj.right);
        
                }
                break;
            case "center":
                if (!isNaN($obj.left)) {
                    $this.left += parseInt(_difference / 2);
        
                } else if (!isNaN($obj.right)) {
                    $this.right += parseInt(_difference / 2);
        
                }
                break;
        }

    }
    
};

const withPageZoom = function ($value) {
    return parseFloat($value * (1 / page.zoom));
};
window.withPageZoom = withPageZoom;

const setLoopTimer = function ($time) {
    
    if (typeof loop === "function") {

        // Daha önceden oluşturulmuş ise temizle.
        if (loopTimer) { 
            loopTimer = clearInterval(loopTimer);
        }

        // Yenisini oluştur.
        if ($time == 0) {
            // Eğer tekrarlama zamanı 0 ise yenisini oluşturma.
        } else {
            loopTimer = setInterval(loop, $time);
        }
        
    }

};
window.setLoopTimer = setLoopTimer;

// Yeni eklenen nesneler, seçili box nesnesinin içinde oluşturulur.
const setDefaultContainerBox = function ($box) {

    previousDefaultContainerBox = defaultContainerBox || page;
    defaultContainerBox = $box;

};
window.setDefaultContainerBox = setDefaultContainerBox;

window.restoreDefaultContainerBox = function() {
    defaultContainerBox = previousDefaultContainerBox || page;
};
//window.restoreDefaultContainerBox = basic.restoreDefaultContainerBox;

// Nesne hangi kutu nesnesinin içine eklendiği.
const getDefaultContainerBox = function () {
    return defaultContainerBox;
};
window.getDefaultContainerBox = getDefaultContainerBox;

// Creates objects inside an existing container and then restores the default container.
// For example, adding rows to a component's list box after the component is created:
// createIn(box.list, function () { Label({ text: "Row" }); });
// NOTE: setDefaultContainerBox() alone is not part of the start/end stack; this function puts it back for you,
//       also when $func throws.
const createIn = function ($container, $func) {

    const previous = getDefaultContainerBox();
    // WHY: $func has its own start stack, so a group started and ended in it goes back to $container.
    // With the stack of the caller (createIn called between a startBox and its endBox), endGroup() went back
    // to the caller's box and the next objects were created there (the 2nd row of a list went to the page).
    const previousStartedBoxList = startedBoxList;
    startedBoxList = [];
    setDefaultContainerBox($container);

    try {
        $func($container);
    } finally {
        startedBoxList = previousStartedBoxList;
        setDefaultContainerBox(previous);
    }

};
window.createIn = createIn;

// Add your custom object to basic.js ecosystem.
const makeBasicObject = function($newObject) {

    // Element -> object link.
    // WHY: remove() finds the basic.js objects inside a removed object with it, to clean them too.
    if ($newObject && $newObject.elem) $newObject.elem._basicObject = $newObject;

    // Object can be called as that.
    previousThat = that;
    prevThat = previousThat;
    that = $newObject;

};
window.makeBasicObject = makeBasicObject;

const mergeIntoIfMissing = function (target, source, depth = 1, maxDepth = 4) {

    if (depth > maxDepth) return; // Maksimum derinlik sınırı

    for (let key in source) {
        const sourceVal = source[key];
        const targetVal = target[key];

        if (
            typeof sourceVal === 'object' &&
            sourceVal !== null &&
            !Array.isArray(sourceVal)
        ) {
            // Eğer class instance ise → doğrudan referansla ata
            const isPlainObject = Object.getPrototypeOf(sourceVal)?.constructor?.name === 'Object';

            if (!isPlainObject) {
                if (!(key in target)) {
                    target[key] = sourceVal; // referansla ekle
                }
                continue;
            }

            // Sıradan obje ise → katmanlı birleştir
            if (
                typeof targetVal !== 'object' ||
                targetVal === null ||
                Array.isArray(targetVal)
            ) {
                target[key] = {};
            }

            mergeIntoIfMissing(target[key], sourceVal, depth + 1, maxDepth);

        } else {
            if (!(key in target)) {
                target[key] = sourceVal;
            }
        }
    }

};

window.mergeIntoIfMissing = mergeIntoIfMissing;

// Sadece 1 kat derine inerek objeyi birleştirir.
/*
window.mergeInto = function (target, source) {

        for (let key in source) {
            if (
                typeof source[key] === 'object' &&
                source[key] !== null &&
                !Array.isArray(source[key]) &&
                typeof target[key] === 'object' &&
                target[key] !== null &&
                !Array.isArray(target[key])
            ) {
                // Sadece bir seviye derine inerek birleştir
                target[key] = { ...target[key], ...source[key] };
            } else {
                target[key] = source[key];
            }
        }       

};
*/

/*
window.mergeObject = function ($target, $source) {

    let result = {};
    
    const mergeShallow = function(target, source) {
        for (let key in source) {
            if (
                typeof source[key] === 'object' &&
                source[key] !== null &&
                !Array.isArray(source[key]) &&
                typeof target[key] === 'object' &&
                target[key] !== null &&
                !Array.isArray(target[key])
            ) {
                // Sadece bir seviye derine inerek birleştir
                target[key] = { ...target[key], ...source[key] };
            } else {
                target[key] = source[key];
            }
        }           
    }

    mergeShallow(result, $target);
    mergeShallow(result, $source);

    return result;

};
*/

// v26.09.18: one list per element (Map) instead of one flat list for all elements.
// WHY: The ResizeObserver callback looked at every registration for every resized element.
resizeDetection.map = new Map(); // elem -> [{ obj, func }]

resizeDetection.onResize = function($object, $func) {

    const list = resizeDetection.map.get($object.elem) || [];
    list.push({ obj: $object, func: $func });
    resizeDetection.map.set($object.elem, list);
    resizeDetection.whenDetected.observe($object.elem);

};

resizeDetection.remove_onResize = function($element, $func) {

    const list = resizeDetection.map.get($element);
    if (!list) return;

    // null -> every function of the element.
    const rest = ($func) ? list.filter(function (item) { return item.func != $func; }) : [];

    // Aynı nesnede başka dinleyici kalmış ise izlemeyi bırakma.
    if (rest.length) {
        resizeDetection.map.set($element, rest);
    } else {
        resizeDetection.map.delete($element);
        resizeDetection.whenDetected.unobserve($element);
    }

};

resizeDetection.whenDetected = new ResizeObserver(function(entries) {

    for (let i = 0; i < entries.length; i++) {
        const list = resizeDetection.map.get(entries[i].target);
        if (!list) continue;
        const copy = list.slice(); // WHY: A function may remove itself while we loop.
        for (let j = 0; j < copy.length; j++) {
            copy[j].func(copy[j].obj);
        }
    }

});

let startedBoxList = [];
let startedBoxAlertTimeout = null;
const checkStartedBox = function() {

    if (startedBoxAlertTimeout) {
        clearTimeout(startedBoxAlertTimeout);
    }

    startedBoxAlertTimeout = setTimeout(function() {

        const startedBoxCount = startedBoxList.length - 1;

        if (startedBoxCount > 0) {
            println("basic.js: Some started boxes were not ended. Count: " + startedBoxCount, "warn");
        }

    }, 100);

}
// Starts a box: it becomes the default container until its end call.
const pushStartedBox = function(box) {

    if (startedBoxList.length == 0) {
        startedBoxList.push(getDefaultContainerBox());
    }

    setDefaultContainerBox(box);
    startedBoxList.push(box);

    checkStartedBox();

    return box;

};

// AutoLayout helpers (shared by every group, created once).

const FLEX_DEFAULTS = {
    color: "transparent",
};

const FLEX_STYLES = {
    flexDirection: "row", // row, column
    flexWrap: "nowrap", // wrap, nowrap
    alignContent: "center",
    justifyContent: "center", // flex-start, center, flex-end (row)
    alignItems: "center", // flex-start, center, flex-end (column)
    gap: "0px",
    flexBasis: "auto", // Öğenin doğal boyutuna göre yer kaplamasını sağlar.
    flexGrow: 0, // Öğenin büyümesini engeller.
    flexShrink: 0, // Öğenin küçülmesini engeller.
};

// JUSTIFY: "left" / "start", "center", "right" / "end", "space-between", "space-around", "space-evenly"
const getJustifyContent = function(justify) {
    switch (justify) {
        case "left":
        case "top":
        case "start":
            return "flex-start";
        case "right":
        case "bottom":
        case "end":
            return "flex-end";
        case "center":
            return "center";
        default:
            return justify; // space-between, space-around, space-evenly
    }
};

const getFlexDirection = function(flow) {
    return (flow == "vertical") ? "column" : "row";
};

// align -> [justifyContent, alignItems] for flexDirection "row". (alignContent is always "center")
const FLEX_ALIGN = {
    "left top": ["flex-start", "flex-start"],
    "center top": ["center", "flex-start"],
    "right top": ["flex-end", "flex-start"],
    "left center": ["flex-start", "center"],
    "center center": ["center", "center"],
    "right center": ["flex-end", "center"],
    "left bottom": ["flex-start", "flex-end"],
    "center bottom": ["center", "flex-end"],
    "right bottom": ["flex-end", "flex-end"],
};
FLEX_ALIGN["center"] = FLEX_ALIGN["center center"];
for (const key of Object.keys(FLEX_ALIGN)) {
    const words = key.split(" ");
    if (words.length == 2) FLEX_ALIGN[words[1] + " " + words[0]] = FLEX_ALIGN[key];
}

// Writes the align styles into a style object (props or elem.style).
// NOTE: The list is for flexDirection "row", if it is not row, justifyContent and alignItems change places.
const applyFlexAlign = function($style, align, isRow) {
    const alignList = FLEX_ALIGN[align] || FLEX_ALIGN["center"];
    $style.alignContent = "center";
    $style.justifyContent = (isRow) ? alignList[0] : alignList[1];
    $style.alignItems = (isRow) ? alignList[1] : alignList[0];
};

const checkGap = function(gap) {
    return (Number.isInteger(gap)) ? gap + "px" : gap;
};

// .flow, .align, .gap, .wrap, .justify of every group.
const FLEX_ACCESSORS = {
    flow: {
        get: function() {
            return this._flow;
        },
        set: function(flow) {
            this._flow = flow;
            this.elem.style.flexDirection = getFlexDirection(flow);
            this.align = this.align;
        }
    },
    align: {
        get: function() {
            return this._align;
        },
        set: function(align) {
            this._align = align;
            applyFlexAlign(this.elem.style, align, this.elem.style.flexDirection == "row");
            if (this._justify) this.elem.style.justifyContent = getJustifyContent(this._justify); // v26.09.18: justify wins
        }
    },
    gap: {
        get: function() {
            return this._gap;
        },
        set: function(gap) {
            this._gap = checkGap(gap);
            this.elem.style.gap = this._gap;
        }
    },
    // (v26.09.18)
    wrap: {
        get: function() {
            return this._wrap || 0;
        },
        set: function(wrap) {
            this._wrap = (wrap) ? 1 : 0;
            this.elem.style.flexWrap = (wrap) ? "wrap" : "nowrap";
        }
    },
    // (v26.09.18)
    justify: {
        get: function() {
            return this._justify || "";
        },
        set: function(justify) {
            this._justify = justify;
            this.elem.style.justifyContent = getJustifyContent(justify);
        }
    },
};

const startFlexBox = function(p1 = {}, p2, p3, p4, p5) {

    // - Hiç bir parametre girilmez ise boş obje girilmiş gibi işlem yapar.
    // - The first object parameter is the props, the missing positions before it are 0, 0, "100%", "100%".

    const args = [p1, p2, p3, p4, p5];
    const propsIndex = args.findIndex(arg => typeof arg == "object");
    let props = {};
    let box = null;

    if (propsIndex == -1) {
        box = createBox(p1, p2, p3, p4);
    } else {
        props = args[propsIndex];
        box = createBox(...[0, 0, "100%", "100%"].map((value, i) => (i < propsIndex) ? args[i] : value));
    }

    // Eğer fit:1 ise, objeyi otomatik olarak sar (shrink-to-fit).
    // hug: fit ile aynıdır, alternatif kullanım. (Figma'daki "hug contents")
    if (props.fit || props.hug) {
        props.fit = 1;
        props.hug = 1; // WHY: İkisi de aynı anlamda; box.fit ve box.hug aynı değeri versin.
        props.width = "auto";
        props.height = "auto";
    };

    // align; flow a ihtiyaç duyuyor. Eğer align verilmiş ama flow boş geçilmiş ise; default flow is "horizontal".
    if (props.align) {
        if (!props.flow) {
            props.flow = "horizontal";
        }
    }

    // FLOW:
    if (props.flow) {
        box._flow = props.flow;
        props.flexDirection = getFlexDirection(props.flow);
    }

    // ALIGN:
    if (props.align) {
        box._align = props.align;
        applyFlexAlign(props, props.align, props.flexDirection == "row");
    };

    // WRAP (v26.09.18): wrap: 1 -> the items continue on the next line / column when there is no space.
    if (props.wrap !== undefined) {
        box._wrap = (props.wrap) ? 1 : 0;
        props.flexWrap = (props.wrap) ? "wrap" : "nowrap";
    }

    // JUSTIFY (v26.09.18): the main axis placement, overrides the one from align.
    if (props.justify) {
        box._justify = props.justify;
        props.justifyContent = getJustifyContent(props.justify);
    }

    if (Number.isInteger(props.gap)) {
        props.gap = checkGap(props.gap);
    }

    that.elem.style.display = "flex";
    box._isFlex = 1; // WHY: isFlexContainer() - the children stay flex items even when the group is hidden.
    box.props(FLEX_DEFAULTS, FLEX_STYLES, props);

    for (let parameterName in FLEX_STYLES) {
        box.elem.style[parameterName] = box[parameterName];
    }

    // GAP:
    if (box.gap) {
        box._gap = box.gap;
    };

    Object.defineProperties(box, FLEX_ACCESSORS);

    return pushStartedBox(box);

};
window.startFlexBox = startFlexBox;
window.AutoLayout = startFlexBox;

window.HGroup = function(...args) {
    const group = startFlexBox(...args);
    //group.flow = "horizontal"; // WHY: It is default value "horizontal"
    return group;
};

window.VGroup = function(...args) {
    const group = startFlexBox(...args);
    group.flow = "vertical";
    return group;
};

const startBox = function(...args) {
    return pushStartedBox(Box(...args));
};
window.startBox = startBox;

const endBox = function() {

    // Açılmış kutu yok ise (fazladan end çağrısı) hiçbir şey yapma.
    // WHY: Aksi halde defaultContainerBox boşalıyor ve sonradan hiçbir nesne oluşturulamıyordu.
    if (startedBoxList.length == 0) {
        println("basic.js: There is no started box to end. (Extra end call)", "warn");
        return;
    }

    if (startedBoxList.length > 1) {
        startedBoxList.pop();
    }

    setDefaultContainerBox(startedBoxList[startedBoxList.length - 1]);

    if (startedBoxList.length == 1) {
        startedBoxList = [];
    }

};

window.endBox = endBox;
window.endFlexBox = endBox;
window.endAutoLayout = endBox;
window.endGroup = endBox;

let savedThat = null;
let savedExThat = null;

const saveCurrentThat = function() {

    savedThat = that;
    savedExThat = previousThat;

};
window.saveCurrentThat = saveCurrentThat;

const restoreThatFromSaved = function() {

    that = savedThat;
    previousThat = savedExThat;
    prevThat = previousThat;

};
window.restoreThatFromSaved = restoreThatFromSaved;

// Objects: Label, Input, Icon, Box, Button
// Shorts: lbl, inp, ico, box, btn

// Positional parameters, then an optional props object as the last parameter.
const withProps = function($create) {
    return function(...args) {

        let props = {};
        if (args.length && typeof args[args.length - 1] === "object") {
            props = args.pop();
        }

        const obj = $create(...args);
        obj.props(props);

        return obj;

    };
};

window.Label = withProps(createLabel);
window.Input = withProps(createTextBox);
window.Icon = withProps(createImage);
const Box = withProps(createBox);
window.Box = Box;
window.Button = withProps(createButton);

window.startObject = function($defaults, $params) {

    const _params = mergeLayers($params, $defaults);

    // Defaults values
    if (!_params.color) {
        _params.color = "transparent";
    }
    /*
    mergeIntoIfMissing(_params, {
        color: "transparent",
    });
    */

    saveCurrentThat();
    return startBox(_params);

};

window.endObject = function(box) {

    endBox();
    restoreThatFromSaved();
    makeBasicObject(box);
    return box;

};

// Başka bir Basic Object ten miras alarak yeni bir Basic Object oluşturma.
window.startExtendedObject = function(uiComponent, defaults, params) {

    const _params = mergeLayers(params, defaults);

    const _box = uiComponent(_params);
    saveCurrentThat();

    return _box;

};

window.endExtendedObject = function(box) {

    restoreThatFromSaved();
    makeBasicObject(box);
    return box;

};

window.Black = function(percent = 1) {
    if (percent == 0) return "transparent";
    if (percent == 1) return "black";
    return `rgba(0,0,0,${percent})`;
};

window.White = function(percent = 1) {
    if (percent == 0) return "transparent";
    if (percent == 1) return "white";
    return `rgba(255,255,255,${percent})`;
};

// Çok fazla arka arkaya çağırılan fonksiyonların daha verimli çalışmasını sağlar. 
window.waitAndRun = function (timer, callback, delay = 3) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(callback, delay);
    return timer;
};


// When content is loaded,
window.addEventListener("load", function () {
    basic.start();
});

})();