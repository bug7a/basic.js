/* Bismillah */

/*

basic.js (v25.07.17) A lightweight JavaScript library for building web-based applications with simple code. No need to write HTML or CSS — just use basic JavaScript.
- Project Site: https://bug7a.github.io/basic.js/

The Art of Fun Coding — With basic.js


Copyright 2020-2025 Bugra Ozden <bugra.ozden@gmail.com>
- https://github.com/bug7a

Licensed under the Apache License, Version 2.0

*/

(function() {
"use strict";
const basic = {};

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
resizeDetection.objectAndFunctionList = [];

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
window.println = function ($message, $type = "log") {
    // type: "error", "warn", "info", "table", "dir", ""
    const _console = console;
    _console[$type]($message);
};
//window.println = basic.println;

window.random = function ($first, $second) {

    let result = 0;

    if ($second != undefined) {

        if ($second < $first) {
            println("basic.js: random(): The second parameter (number) must be greater than the first.", "error");
        
        } else {
            result = $first + Math.round(Math.random() * ($second - $first));
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
//window.storage = basic.storage;

window.clock = {

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
    get milisecond() {
        let dt = new Date();
        return dt.getMilliseconds();
    }

};
//window.clock = basic.clock;

window.date = {

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
    get dayNumber() {
        let dt = new Date();
        return dt.getDay();
    },
    get gunAdi() {
        return basic.gunler[this.dayNumber];
    },
    get dayName() {
        return basic.days[this.dayNumber];
    },
    get today() {
        let dt = new Date();
        return dt.getDate();
    },
    get now() {
        return Date.now();
    }

};
//window.date = basic.date;

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
        this.elem.style.left = parseFloat($value) + "px";
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
        this.elem.style.top = parseFloat($value) + "px";
    }

    get right() {
        return parseFloat(this.elem.style.right);
    }

    set right($value) {
        this.elem.style.left = "";
        this.elem.style.right = parseFloat($value) + "px";
    }

    get bottom() {
        return parseFloat(this.elem.style.bottom);
    }

    set bottom($value) {
        this.elem.style.top = "";
        this.elem.style.bottom = parseFloat($value) + "px";
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
        
        this._width = $value;

        if (typeof $value != "string") {
            this.elem.style.width = parseFloat($value) + "px";
        } else {
            this.elem.style.width = $value;
        }
        
    }

    get height() {

        if (typeof this._height != "string") {
            return this._height || 0;
        } else {
            return this.elem.offsetHeight;
        }
        
    }

    set height($value) {
        
        this._height = $value;

        if (typeof $value != "string") {
            this.elem.style.height = parseFloat($value) + "px";
        } else {
            this.elem.style.height = $value;
        }

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
        this.elem.style.pointerEvents = ($value == 1) ? "auto" : "none";
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
        this.elem.style.backgroundColor = $value;
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
            else if (len === 2) {
                paddingLeft  = paddingRight  = $value[0];
                paddingTop   = paddingBottom = $value[1];
            }
            else if (len === 3) {
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
        this.elem.style.borderWidth = $value + "px";
    }

    get borderColor() {
        return this._borderColor;
    }

    set borderColor($value) {
        this._borderColor = $value;
        this.elem.style.borderColor = $value;
    }

    get round() {
        return this._round;
    }

    set round($value) {
        this._round = $value;
        this.elem.style.borderRadius = $value + "px";
    }

    // -- Kenarlık SONU
    
    // Metin özellikleri
    
    get fontSize() {
        return this._fontSize;
    }

    set fontSize($value) {
        this._fontSize = $value;
        this.elem.style.fontSize = $value + "px";
    }

    // fontSize Alternatif kullanım.
    get textSize() {
        return this._fontSize;
    }

    set textSize($value) {
        this._fontSize = $value;
        this.elem.style.fontSize = $value + "px";
    }
    
    get textColor() {
        return this._textColor;
    }

    set textColor($value) {
        this._textColor = $value;
        this.elem.style.color = $value;
    }

    get textAlign() {
        return this._textAlign;
    }

    set textAlign($value) {
        this._textAlign = $value;
        this.elem.style.textAlign = $value;
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
    
    // Nesneyi sil.
    remove() {

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

        const _elem = (this._type == "textbox") ? this.inputElement : this.elem; // WHY: textbox için olayları input elementine bağla.
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
        const _elem = (this._type == "textbox") ? this.inputElement : this.elem;
        
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
        this._containerBox = defaultContainerBox;
        if (defaultContainerBox != null) {
            defaultContainerBox.elem.appendChild(this._element);
        } else {
            println("basic.js: The library is not yet ready for use. Put your code in window.onload", "error");
        }

        this.width = $width;
        this.height = $height;

        if (defaultContainerBox.elem.style.display == "flex") {
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
        const _selectedBox = getDefaultContainerBox();
        setDefaultContainerBox(this);
        $func(this);
        setDefaultContainerBox(_selectedBox);
    }

}
//window.Box = Box;

// Alternatif kullanım
window.createBox = function ($left, $top, $width, $height) {
    return new BBox($left, $top, $width, $height);
}

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
        this._containerBox = defaultContainerBox;
        defaultContainerBox.elem.appendChild(this._element);

        this.width = $width;
        this.height = $height;

        if (defaultContainerBox.elem.style.display == "flex") {
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
window.createButton = function ($left, $top, $width, $height) {
    return new BButton($left, $top, $width, $height);
}

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

        this._containerBox = defaultContainerBox;
        defaultContainerBox.elem.appendChild(this._mainElement);

        this.width = $width;
        this.height = $height;

        if (defaultContainerBox.elem.style.display == "flex") {
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
        this.inputElement.value = $value.toString();
    }

    // ÖZEL: Renk özelliği
    get color() {
        return super.color;
    }

    set color($value) {
        this._backgroundColor = $value;
        this.inputElement.style.backgroundColor = $value;
    }
    // ÖZEL SONU

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

    // ÖZEL: Kenarlık
    set border($value) {
        this._border = $value;
        this.inputElement.style.borderWidth = $value + "px";
    }

    get border() {
        return super.border;
    }

    get borderColor() {
        return super.borderColor;
    }

    set borderColor($value) {
        this._borderColor = $value;
        this.inputElement.style.borderColor = $value;
    }

    set round($value) {
        this._round = $value;
        this.inputElement.style.borderRadius = $value + "px";
    }

    get round() {
        return super.round;
    }
    // Özel kenarlık SONU

    // ÖZEL

    get clickable() {
        return super.clickable;
    }

    set clickable($value) {
        this._clickable = $value;
        this.inputElement.style.pointerEvents = ($value == 1) ? "auto" : "none";
    }
    
    get fontSize() {
        return super.fontSize;
    }

    set fontSize($value) {
        this._fontSize = $value;
        this.inputElement.style.fontSize = $value + "px";
    }

    get textSize() {
        return super.textSize;
    }

    set textSize($value) {
        this._fontSize = $value;
        this.inputElement.style.fontSize = $value + "px";
    }
    
    get textColor() {
        return super.textColor;
    }

    set textColor($value) {
        this._textColor = $value;
        this.inputElement.style.color = $value;
    }

    get textAlign() {
        return super.textAlign;
    }

    set textAlign($value) {
        this._textAlign = $value;
        this.inputElement.style.textAlign = $value;
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
window.createTextBox = function ($left, $top, $width, $height) {
    return new BTextBox($left, $top, $width, $height);
}

window.createInput = function ($left, $top, $width, $height) {
    return new BTextBox($left, $top, $width, $height);
}

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
        this._containerBox = defaultContainerBox;
        defaultContainerBox.elem.appendChild(this._element);

        this.width = $width;
        this.height = $height;

        if (defaultContainerBox.elem.style.display == "flex") {
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
window.createLabel = function ($left, $top, $width, $height) {
    return new BLabel($left, $top, $width, $height);
}

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
        this._containerBox = defaultContainerBox;
        defaultContainerBox.elem.appendChild(this._element);

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

                }

            });
            
        //}

        if (defaultContainerBox.elem.style.display == "flex") {
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
        this.imageElement.setAttribute("alt", $imagePath);
    }

    add($obj) {
        println("basic.js: add(): Insertion cannot be made inside the Image object.", "error");
    }

}
//window.BImage = BImage;

// Alternatif kullanım
window.createImage = function ($left, $top, $width, $height) {

    return new BImage($left, $top, $width, $height);

}

window.createIcon = function ($left, $top, $width, $height) {

    return new BImage($left, $top, $width, $height);

}

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

    get time() {
        return this.elem.time;
    }

    get timeLeft() {
        return this.elem.timeLeft;
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
            this.elem.setAttribute("loop", "");
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

// Set styles with style object.
const setProparties = function ($this, $defaultParams, $params, $props) {

    // Tüm özellikleri bu değişkende topla.
    const _params = {};

    if ($props) {
        mergeIntoIfMissing(_params, $props);
    }
    if ($params) {
        mergeIntoIfMissing(_params, $params);
    }
    if ($defaultParams) {
        mergeIntoIfMissing(_params, $defaultParams);
    }

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

window.withPageZoom = function ($value) {
    return parseFloat($value * (1 / page.zoom));
};
//window.withPageZoom = basic.withPageZoom;

window.setLoopTimer = function ($time) {
    
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
//window.setLoopTimer = basic.setLoopTimer;

// Yeni eklenen nesneler, seçili box nesnesinin içinde oluşturulur.
window.setDefaultContainerBox = function ($box) {

    previousDefaultContainerBox = defaultContainerBox || page;
    defaultContainerBox = $box;

};
//window.setDefaultContainerBox = basic.setDefaultContainerBox;

window.restoreDefaultContainerBox = function() {
    defaultContainerBox = previousDefaultContainerBox || page;
};
//window.restoreDefaultContainerBox = basic.restoreDefaultContainerBox;

// Nesne hangi kutu nesnesinin içine eklendiği.
window.getDefaultContainerBox = function () {
    return defaultContainerBox;
};
//window.getDefaultContainerBox = basic.getDefaultContainerBox;

// Add your custom object to basic.js ecosystem.
window.makeBasicObject = function($newObject) {

    // Object can be called as that.
    previousThat = that;
    prevThat = previousThat;
    that = $newObject;

};
//window.makeBasicObject = basic.makeBasicObject;

window.mergeIntoIfMissing = function (target, source, depth = 1, maxDepth = 4) {

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

            window.mergeIntoIfMissing(target[key], sourceVal, depth + 1, maxDepth);

        } else {
            if (!(key in target)) {
                target[key] = sourceVal;
            }
        }
    }

};

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

resizeDetection.onResize = function($object, $func) {

    const object = {};
    object.obj = $object;
    object.elem = $object.elem;
    object.func = $func;

    resizeDetection.objectAndFunctionList.push(object);
    resizeDetection.whenDetected.observe($object.elem);

};

resizeDetection.remove_onResize = function($element, $func) {
    for(let j = resizeDetection.objectAndFunctionList.length - 1; j >= 0; j--) {
        if (resizeDetection.objectAndFunctionList[j].elem == $element) {
            if (!$func || resizeDetection.objectAndFunctionList[j].func == $func) {
                resizeDetection.objectAndFunctionList.splice(j, 1);
            }
        }
    }
    resizeDetection.whenDetected.unobserve($element);
};

resizeDetection.whenDetected = new ResizeObserver(function(entries) {

    const detection = resizeDetection;

	for (let i = 0; i < entries.length; i++) {
        for(let j = 0; j < detection.objectAndFunctionList.length; j++) {

            if (entries[i].target == detection.objectAndFunctionList[j].elem) {
                detection.objectAndFunctionList[j].func(detection.objectAndFunctionList[j].obj);
            }

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
window.startFlexBox = function(p1 = {}, p2, p3, p4, p5) {

    // - Hiç bir parametre girilmez ise boş obje girilmiş gibi işlem yapar.

    let props = {};
    let box = null;

    if (typeof p1 == "object") {
        box = createBox(0, 0, "100%", "100%");
        props = p1;

    } else if (typeof p2 == "object") {
        box = createBox(p1, 0, "100%", "100%");
        props = p2;

    } else if (typeof p3 == "object") {
        box = createBox(p1, p2, "100%", "100%");
        props = p3;
        
    } else if (typeof p4 == "object") {
        box = createBox(p1, p2, p3, "100%");
        props = p4;
        
    } else if (typeof p5 == "object") {
        box = createBox(p1, p2, p3, p4);
        props = p5;
    } else {
        box = createBox(p1, p2, p3, p4);
    }

    const defaults = {
        color: "transparent",
    }

    const defaultFlexStyles = {
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

    // align; flow a ihtiyaç duyuyor. Eğer align verilmiş ama flow boş geçilmiş ise; default flow is "horizontal".
    if (props.align) {
        if (!props.flow) {
            props.flow = "horizontal";
        }
    }

    const getFlexDirection = function(flow) {
        let flexDirection = defaultFlexStyles.flexDirection;
        switch(flow) {
            case "horizontal":
                flexDirection = "row";
                break;
            case "vertical":
                flexDirection = "column";
                break;
        }
        return flexDirection;
    };

    // FLOW:
    if (props.flow) {
        box._flow = props.flow;
        props.flexDirection = getFlexDirection(props.flow);
    }

    const getAlignList = function(align = "center") {

        // NOTE: Bu flexDirection = "row" için, eğer row değil ise justifyContent, alignItems yer değiştir.

        // else: set as default
        let alignContent = "center";
        let justifyContent = "center";
        let alignItems = "center";

        switch(align) {
            case "top left":
            case "left top":
                alignContent = "center";
                justifyContent = "flex-start";
                alignItems = "flex-start";
                break;
            case "top center":
            case "center top":
                alignContent = "center";
                justifyContent = "center";
                alignItems = "flex-start";
                break;
            case "top right":
            case "right top":
                alignContent = "center";
                justifyContent = "flex-end";
                alignItems = "flex-start";
                break;
            
            case "center left":
            case "left center":
                alignContent = "center";
                justifyContent = "flex-start";
                alignItems = "center";
                break;
            case "center":
            case "center center":
                alignContent = "center";
                justifyContent = "center";
                alignItems = "center";
                break;
            case "center right":
            case "right center":
                alignContent = "center";
                justifyContent = "flex-end";
                alignItems = "center";
                break;

            case "bottom left":
            case "left bottom":
                alignContent = "center";
                justifyContent = "flex-start";
                alignItems = "flex-end";
                break;
            case "bottom center":
            case "center bottom":
                alignContent = "center";
                justifyContent = "center";
                alignItems = "flex-end";
                break;
            case "bottom right":
            case "right bottom":
                alignContent = "center";
                justifyContent = "flex-end";
                alignItems = "flex-end";
                break;
            
        }

        return [alignContent, justifyContent, alignItems];
    }

    // ALIGN:
    if (props.align) {

        box._align = props.align;
        const alignList = getAlignList(props.align);
        
        // else: set as default
        props.alignContent = alignList[0];
        if (props.flexDirection == "row") {
            props.justifyContent = alignList[1];
            props.alignItems = alignList[2];
        } else {
            props.justifyContent = alignList[2];
            props.alignItems = alignList[1];
        }
        

    };

    const checkGap = function(gap) {
        if (Number.isInteger(gap)) {
            return gap = gap + "px";
        } else {
            return gap;
        }
    }

    if (Number.isInteger(props.gap)) {
        props.gap = checkGap(props.gap);
    }

    that.elem.style.display = "flex";
    box.props(defaults, defaultFlexStyles, props);

    /*
    Object.defineProperty(box, 'gap', {
        get: function() {
            return this._gap;
        },
        set: function(value) {
            this._gap = value;
            this.elem.style.gap = value + "px";
        }
    });
    */

    //const box = createBox(0, 0, "100%", "100%");
    //that.color = "transparent";

    for (let parameterName in defaultFlexStyles) {
        box.elem.style[parameterName] = box[parameterName];
    }

    // .flow: getter, setter
    Object.defineProperty(box, 'flow', {
        get: function() {
            return this._flow;
        },
        set: function(flow) {
            this._flow = flow;
            this.elem.style.flexDirection = getFlexDirection(flow);
            this.align = this.align;
        }
    });

    // .align: 
    Object.defineProperty(box, 'align', {
        get: function() {
            return this._align;
        },
        set: function(align) {
            this._align = align;
            const alignList = getAlignList(align);

            this.elem.style.alignContent = alignList[0];
            if (box.elem.style.flexDirection == "row") {
                this.elem.style.justifyContent = alignList[1];
                this.elem.style.alignItems = alignList[2];
            } else {
                this.elem.style.justifyContent = alignList[2];
                this.elem.style.alignItems = alignList[1];
            }
            
        }
    });

    // GAP:
    if (box.gap) {
        box._gap = box.gap;
    };

    // .gap: 
    Object.defineProperty(box, 'gap', {
        get: function() {
            return this._gap;
        },
        set: function(gap) {
            this._gap = checkGap(gap);
            this.elem.style.gap = this._gap;
        }
    });

    if (startedBoxList.length == 0) {
        startedBoxList.push(getDefaultContainerBox());
    }

    setDefaultContainerBox(box);
    startedBoxList.push(box);

    checkStartedBox();

    return box;

};
//window.startFlexBox = basic.startFlexBox;
window.AutoLayout = window.startFlexBox;

window.HGroup = function(...args) {
    const group = AutoLayout(...args);
    //group.flow = "horizontal"; // WHY: It is default value "horizontal"
    return group;
};

window.VGroup = function(...args) {
    const group = AutoLayout(...args);
    group.flow = "vertical";
    return group;
};

window.startBox = function(...args) {

    //let props = {};
    console.log(args.length);
    const box = Box(...args);

    if (startedBoxList.length == 0) {
        startedBoxList.push(getDefaultContainerBox());
    }

    setDefaultContainerBox(box);
    startedBoxList.push(box);

    checkStartedBox();

    return box;

};
//window.startBox = basic.startBox;

window.endBox = function() {

    if (startedBoxList.length > 1) {
        startedBoxList.pop();
    }

    setDefaultContainerBox(startedBoxList[startedBoxList.length - 1]);

    if (startedBoxList.length == 1) {
        startedBoxList = [];
    }

};

window.endFlexBox = window.endBox;
window.endAutoLayout = window.endBox;
window.endGroup = window.endBox;

let savedThat = null;
let savedExThat = null;

window.saveCurrentThat = function() {

    savedThat = that;
    savedExThat = previousThat;

};
//window.saveCurrentThat = basic.saveCurrentThat;

window.restoreThatFromSaved = function() {

    that = savedThat;
    previousThat = savedExThat;
    prevThat = previousThat;

};
//window.restoreThatFromSaved = basic.restoreThatFromSaved;

// Objects: Label, Input, Icon, Box, Button
// Shorts: lbl, inp, ico, box, btn

window.Label = function(...args) {

  let props = {};
  if (args.length && typeof args[args.length - 1] === "object") {
    props = args.pop();
  }

  const label = createLabel(...args);
  label.props(props);

  return label;

};

window.Input = function(...args) {

    let props = {};
    if (args.length && typeof args[args.length - 1] === "object") {
        props = args.pop();
    }

    const obj = createTextBox(...args);
    obj.props(props);

    return obj;

};

window.Icon = function(...args) {

    let props = {};
    if (args.length && typeof args[args.length - 1] === "object") {
        props = args.pop();
    }

    const obj = createImage(...args);
    obj.props(props);

    return obj;

};

window.Box = function(...args) {

    let props = {};
        if (args.length && typeof args[args.length - 1] === "object") {
        props = args.pop();
    }

    const obj = createBox(...args);
    obj.props(props);

    return obj;

};

window.Button = function(...args) {

    let props = {};
    if (args.length && typeof args[args.length - 1] === "object") {
        props = args.pop();
    }

    const obj = createButton(...args);
    obj.props(props);

    return obj;

};

window.startObject = function($defaults, $params) {

    const _params = {};

    if ($params) {
        mergeIntoIfMissing(_params, $params);
    }
    if ($defaults) {
        mergeIntoIfMissing(_params, $defaults);
    }

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

window.startExtendedObject = function(uiComponent, defaults, params) {

    const _params = {};
    if (params) {
        mergeIntoIfMissing(_params, params);
    }
    if (defaults) {
        mergeIntoIfMissing(_params, defaults);
    }

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


// When content is loaded,
window.addEventListener("load", function () {
    basic.start();
});

})();