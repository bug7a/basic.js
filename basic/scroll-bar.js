/* Bismillah */

/*

Scroll Bar - v26.09

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
        bar_minLength: 16,
        neverHide: 1,
        showDots: 1,
    };

    box.props(defaults, params);

    // --- Private state ---
    const DRAG_LAYER_Z_INDEX = 2147483000; // Sürükleme katmanı: her şeyin üstünde.
    let _fullscreenBox = null;
    let _autoHideTimer = null;
    let _observer = null;
    let _destroyed = false;
    let _eventRemovers = []; // scrollableBox üzerine bağlanan olayların silicileri.

    // Mouse drag state
    let _mouseX = 0;
    let _mouseY = 0;
    let _hasDragOrigin = false; // WHY: clientX/clientY gerçekten 0 olabilir, 0 kontrolü güvenilir değil.
    let _mouseMoving = false;
    let _dragScrollBar = null; // "top" | "left" | null

    // --- Helpers ---

    const _cancelAutoHide = function () {
        if (_autoHideTimer) {
            clearTimeout(_autoHideTimer);
            _autoHideTimer = null;
        }
    };

    const _scheduleAutoHide = function () {

        _cancelAutoHide();

        // Gizlenmeyecek ise, boşuna zamanlayıcı kurma.
        // WHY: neverHide = 1 iken her scroll olayında 2 sn lik bir timer kuruluyordu.
        if (_destroyed || box.neverHide) return;

        _autoHideTimer = setTimeout(function () {

            _autoHideTimer = null;
            if (_destroyed) return;

            if (_mouseMoving) {
                _mouseMoving = false;
                _scheduleAutoHide();
                return;
            }

            box.boxScrollBarTop.opacity = 0;
            box.boxScrollBarLeft.opacity = 0;
            box.topRightDot.visible = 0;
            box.bottomLeftDot.visible = 0;
            box.bottomRightDot.visible = 0;

        }, 2000);

    };

    // --- Bar highlight / lowlight ---

    const _setBarState = function (isTop, highlight) {

        if (_destroyed) return;

        const bar = isTop ? box.boxScrollBarTop : box.boxScrollBarLeft;
        const prop = isTop ? "width" : "height"; // Barın kalınlığı (uzunluğu değil).

        bar[prop] = highlight ? box.bar_mouseOverWidth : box.bar_width;
        bar.color = highlight ? box.bar_mouseOverColor : box.bar_color;
        bar.opacity = highlight ? box.bar_mouseOverOpacity : box.bar_opacity;

    };

    // --- Placement ---

    const _syncPlacement = function () {

        const parent = box.scrollableBox.containerBox;

        // Sadece üst nesne gerçekten değişmiş ise yeniden ekle.
        // WHY: add() her çağrıldığında appendChild yapıyor. Bu her scroll olayında
        //      DOM düğümünü taşıyor, motion (transition) ları sıfırlıyor ve
        //      kutuyu kardeşlerinin en sonuna atarak z-order u bozuyordu.
        if (parent && box.containerBox != parent) {
            parent.add(box);
        }

        const elem = box.scrollableBox.elem;

        // Overlay, kutunun dış ölçüsüne değil, içerik alanına oturtulur.
        // WHY: basic.js kutuları border-box. Dış ölçü (offsetHeight) kenarlığı da
        //      kapsıyor, ama içerik kenarlık kadar içeride başlıyor. Yol ise
        //      clientHeight ile hesaplanıyordu; aradaki (2 x kenarlık) farkın
        //      tamamı alt boşluğa biniyor, bar yukarıdan 8 px, aşağıdan 10 px
        //      boşluk bırakıyordu. Ayrıca clientWidth/clientHeight, tarayıcının
        //      kendi kaydırma çubuğu payını da dışarıda bırakır.
        box.width = elem.clientWidth;
        box.height = elem.clientHeight;

        box.aline(box.scrollableBox);

        // aline dış kenara hizalar, kenarlık kadar içeri al.
        // NOT: basic.js kenarlığı dört kenara aynı kalınlıkta verir.
        const _borderLeft = elem.clientLeft;
        const _borderTop = elem.clientTop;

        if (!isNaN(box.left)) {
            box.left = box.left + _borderLeft;
        } else if (!isNaN(box.right)) {
            box.right = box.right + _borderLeft;
        }

        if (!isNaN(box.top)) {
            box.top = box.top + _borderTop;
        } else if (!isNaN(box.bottom)) {
            box.bottom = box.bottom + _borderTop;
        }

    };

    // --- Bar geometry ---

    // Bir barın uzunluğunu ve konumunu hesapla. Görünür olduysa 1 döner.
    const _layoutBar = function (isVertical) {

        const elem = box.scrollableBox.elem;
        const bar = isVertical ? box.boxScrollBarTop : box.boxScrollBarLeft;

        const clientLen = isVertical ? elem.clientHeight : elem.clientWidth;
        const scrollLen = isVertical ? elem.scrollHeight : elem.scrollWidth;
        const scrollPos = isVertical ? elem.scrollTop : elem.scrollLeft;
        const canScroll = isVertical ? (box.scrollableBox.scrollY == 1) : (box.scrollableBox.scrollX == 1);

        const inset = box.bar_width * 2;             // Yolun iki uçtaki boşluğu.
        const trackLen = clientLen - inset * 2;      // Barın hareket edebileceği yolun uzunluğu.
        const maxScroll = scrollLen - clientLen;

        // Kaydırma yok ise gizle.
        // WHY: clientLen / scrollLen 0 olabiliyor (görünmeyen kutu). Bölme NaN üretip
        //      style e "NaNpx" yazıyordu.
        if (!canScroll || clientLen <= 0 || scrollLen <= 0 || maxScroll <= 0 || trackLen < box.bar_minLength) {
            bar.visible = 0;
            return 0;
        }

        let thumbLen = trackLen * (clientLen / scrollLen);

        // En küçük bar uzunluğu.
        // WHY: Çok uzun içeriklerde hesap eksiye düşüyor ve geçersiz bir boyut yazılıyordu.
        if (thumbLen < box.bar_minLength) thumbLen = box.bar_minLength;
        if (thumbLen > trackLen) thumbLen = trackLen;

        // Bar, yolun sonuna tam olarak ulaşmalı.
        const pos = inset + (trackLen - thumbLen) * (scrollPos / maxScroll);

        if (isVertical) {
            bar.height = Math.round(thumbLen);
            bar.top = Math.round(pos);
        } else {
            bar.width = Math.round(thumbLen);
            bar.left = Math.round(pos);
        }

        bar.visible = 1;
        return 1;

    };

    // Barın 1 piksel hareketi, içeriği kaç piksel kaydırır?
    const _dragRatio = function (isVertical) {

        const elem = box.scrollableBox.elem;

        const clientLen = isVertical ? elem.clientHeight : elem.clientWidth;
        const scrollLen = isVertical ? elem.scrollHeight : elem.scrollWidth;
        const thumbLen = isVertical ? box.boxScrollBarTop.height : box.boxScrollBarLeft.width;

        const trackLen = clientLen - box.bar_width * 4;
        const maxScroll = scrollLen - clientLen;
        const travel = trackLen - thumbLen; // Barın gidebileceği toplam yol.

        if (travel <= 0 || maxScroll <= 0) return 0;

        return maxScroll / travel;

    };

    // --- Scroll refresh ---

    box.refreshScroll = function () {

        if (_destroyed || !box.scrollableBox) return;

        _syncPlacement();

        if (!box.neverHide) {
            box.boxScrollBarTop.opacity = box.bar_opacity;
            box.boxScrollBarLeft.opacity = box.bar_opacity;
        }

        _layoutBar(true);  // Dikey
        _layoutBar(false); // Yatay

        box.refreshDotButtons();
        _scheduleAutoHide();

    };

    box.refreshDotButtons = function () {

        if (_destroyed) return;

        // boxScrollBarTop  = dikey (vertical) scrollbar
        // boxScrollBarLeft = yatay (horizontal) scrollbar
        // WHY: showDots kapalı iken eskiden return ediliyordu, açıkken gösterilen
        //      noktalar ekranda kalıyordu. Artık kapalı ise hepsi gizleniyor.
        const vVisible = (box.showDots == 1) && (box.boxScrollBarTop.visible == 1);
        const hVisible = (box.showDots == 1) && (box.boxScrollBarLeft.visible == 1);

        box.topRightDot.visible = vVisible ? 1 : 0;                  // dikey barın üst ucu
        box.bottomLeftDot.visible = hVisible ? 1 : 0;                // yatay barın sol ucu
        box.bottomRightDot.visible = (vVisible || hVisible) ? 1 : 0; // dikey barın alt / yatay barın sağ ucu

    };

    // --- Drag scrolling ---

    const _onDragMove = function (self, event) {

        if (_destroyed || !_dragScrollBar) return;

        _mouseMoving = true;

        const elem = box.scrollableBox.elem;

        if (_hasDragOrigin) {

            if (_dragScrollBar == "left") {
                elem.scrollLeft += (event.clientX - _mouseX) * _dragRatio(false);
            }

            if (_dragScrollBar == "top") {
                elem.scrollTop += (event.clientY - _mouseY) * _dragRatio(true);
            }

        }

        _mouseX = event.clientX;
        _mouseY = event.clientY;
        _hasDragOrigin = true;

        _scheduleAutoHide();

    };

    const _exitDragging = function () {

        _mouseMoving = false;
        _hasDragOrigin = false;
        _dragScrollBar = null;

        if (_fullscreenBox) {
            _fullscreenBox.remove();
            _fullscreenBox = null;
        }

        if (_destroyed) return;

        _setBarState(true, false);
        _setBarState(false, false);
        _scheduleAutoHide();

    };

    const _enterDragging = function () {

        // Önceki sürükleme katmanı kaldıysa temizle.
        // WHY: Arka arkaya mousedown gelirse, eski tam ekran kutusu sayfanın üstünde
        //      kalıp bütün tıklamaları engelliyordu.
        if (_fullscreenBox) {
            _fullscreenBox.remove();
            _fullscreenBox = null;
        }

        _mouseX = 0;
        _mouseY = 0;
        _hasDragOrigin = false;

        _fullscreenBox = Box(0, 0, "100%", "100%", {
            color: "transparent",
            clickable: 1,
        });

        page.add(_fullscreenBox);
        _fullscreenBox.position = "absolute"; // WHY: flex bir kutu içinde oluşturulmuş ise relative kalıyor.
        _fullscreenBox.left = 0;
        _fullscreenBox.top = 0;

        // Sürükleme katmanı her şeyin üstünde olmalı.
        // WHY: ScrollBar, z-index verilmiş bir kutunun (dialog, menü, açılır liste) içinde ise
        //      katman onun altında kalıyor, mousemove kutuya gidiyor ve bar sürüklenemiyordu.
        //      Katman yalnızca sürükleme boyunca yaşıyor, saydam ve mouseup ta siliniyor.
        _fullscreenBox.elem.style.zIndex = String(DRAG_LAYER_Z_INDEX);

        _fullscreenBox.on("mousemove", _onDragMove);
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
        visible: 0,
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
        visible: 0,
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

    // Kaydırılacak kutu verilmemiş ise, hiçbir şey bağlama.
    // WHY: Eskiden "Cannot read properties of null" hatası veriyordu.
    if (!box.scrollableBox) {
        println("ScrollBar: scrollableBox is required. ScrollBar({ scrollableBox: myBox })", "error");
        box.refreshScroll = function () {};
        box.refreshDotButtons = function () {};
        box.destroy = function () { box.remove(); };
        makeBasicObject(box);
        return box;
    }

    box.refreshScroll();

    box.scrollableBox.onResize(box.refreshScroll);
    page.onResize(box.refreshScroll);

    // Olay silicilerini sakla. WHY: box.remove() sırasında geri alınmaları gerekiyor.
    _eventRemovers.push(box.scrollableBox.on("scroll", box.refreshScroll));
    _eventRemovers.push(box.scrollableBox.on("wheel", box.refreshScroll));

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

    box.boxScrollBarTop.on("mousedown", function (self, event) {
        if (event && event.preventDefault) event.preventDefault(); // WHY: sürüklerken metin seçilmesin.
        _dragScrollBar = "top";
        _setBarState(true, true);
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

    box.boxScrollBarLeft.on("mousedown", function (self, event) {
        if (event && event.preventDefault) event.preventDefault();
        _dragScrollBar = "left";
        _setBarState(false, true);
        _enterDragging();
    });

    // Scroll alanı hover
    _eventRemovers.push(box.scrollableBox.on("mouseover", function () {
        box.boxScrollBarTop.opacity = box.bar_opacity;
        box.boxScrollBarLeft.opacity = box.bar_opacity;
        box.refreshDotButtons();
        _scheduleAutoHide();
    }));

    _eventRemovers.push(box.scrollableBox.on("mouseleave", function () {
        // Sürükleme sürüyor ise iptal etme.
        // WHY: mousedown da açılan tam ekran katman, scrollableBox a mouseleave
        //      attırıyor ve sürükleme daha ilk harekette kesiliyordu.
        if (!_fullscreenBox) _dragScrollBar = null;
        _scheduleAutoHide();
    }));

    // --- MutationObserver ---

    const _contentElem = box.scrollableBox.elem;
    let _lastScrollHeight = _contentElem.scrollHeight;
    let _lastScrollWidth = _contentElem.scrollWidth;

    _observer = new MutationObserver(function (mutations) {

        // Yatay değişim de izlenmeli.
        // WHY: Sadece scrollHeight kontrol ediliyordu, içerik yana büyüyünce
        //      yatay bar güncellenmiyordu.
        if (_contentElem.scrollHeight != _lastScrollHeight || _contentElem.scrollWidth != _lastScrollWidth) {
            _lastScrollHeight = _contentElem.scrollHeight;
            _lastScrollWidth = _contentElem.scrollWidth;
            box.refreshScroll();
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

        if (_destroyed) return; // WHY: iki kez silinince hata veriyordu.
        _destroyed = true;

        _cancelAutoHide();
        _exitDragging();

        if (_observer) {
            _observer.disconnect();
            _observer = null;
        }

        // scrollableBox a bağlanan olayları geri al.
        // WHY: Bunlar kalınca, ScrollBar silindikten sonraki her scroll / wheel / hover
        //      olayı silinmiş nesneye dokunup hata veriyordu.
        for (let i = 0; i < _eventRemovers.length; i++) {
            _eventRemovers[i]();
        }
        _eventRemovers = [];

        box.scrollableBox.remove_onResize(box.refreshScroll);
        page.remove_onResize(box.refreshScroll);

        _superRemove();

        // NOT: box = null yapılmıyor. WHY: Bütün closure lar box a bakıyor,
        //      null yapılınca kalan olaylar hata veriyordu. _destroyed yeterli.

    };

    box.destroy = function () {
        box.remove();
    };

    makeBasicObject(box);
    return box;
};
