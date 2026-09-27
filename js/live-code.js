/* Bismillah */

/*

LiveCode - v26.09 (basic.js Website)

- Bir kod düzenleyici ve yanında (veya altında) kodun çalışan hali.
- Kod, basic.js yüklü küçük bir sayfa olarak WebView (iframe, srcdoc) içinde çalışır.
  start() veya window.onload içermeyen kod, bir start() fonksiyonunun içine konur.
- Yazmayı bırakınca (CONFIG.autoRunDelay) kod yeniden renklendirilir ve çalıştırılır. Ctrl (Cmd) + Enter hemen çalıştırır.
  Tab 4 boşluk ekler, Enter satırın girintisini korur. Sıfırla, ilk koda döner.
- console.log / println / hatalar, sonucun altında gösterilir (son 4 satır).
- lazy: 1 -> Kutu ekrana gelince ilk kez çalışır.
- A code editor with the running result next to it (or under it).

USAGE:
LiveCode({ width: "100%", height: 420, code: SAMPLES.hero, fileName: "app.js" });
LiveCode({ split: 0, editorHeight: 300, resultHeight: 260, code: "..." });
live.setCode(code, 1); // 1: run
live.run();

Developer: Bugra Ozden
Email: bugra.ozden@gmail.com

*/

"use strict";

// Default values:
const LiveCodeDefaults = {
    width: "100%",
    height: 440, // split: 1 iken toplam yükseklik
    code: "",
    fileName: "app.js", // NOTE: "title" değil: basic.js nesnelerinde title bir özellik.
    split: 1, // 1: Kod solda, sonuç sağda. 0: Kod üstte, sonuç altta.
    editorRatio: 0.56, // split: 1 iken kodun genişliği
    editorHeight: 300, // split: 0 iken
    resultHeight: 280, // split: 0 iken
    fontSize: 13,
    showHint: 1,
    runOnEdit: 1,
    lazy: 0,
    onRun: function (self) { },
};

const LiveCode = function (params = {}) {

    // Merge params:
    mergeIntoIfMissing(params, LiveCodeDefaults);

    // Edit params, if needed:
    params.color = SITE.CODE_BG;
    params.round = 16;
    if (params.split != 1) params.height = "auto";

    // BOX: Component container
    let box = startObject(params);

    // *** PRIVATE VARIABLES:
    const T = SITE.T;
    let pre = null;
    let runTimer = null;
    let observer = null;
    let consoleLines = [];
    let hasRun = 0;

    // *** PRIVATE FUNCTIONS:

    // WHY: Chrome, düzenlenen alana satır sonunu <br> olarak ekler; textContent onu görmez.
    //      <br>'ler satır sonu sayılır. Kodun sonundaki görünmez satır (render) alınmaz.
    const textOf = function (node) {
        node.querySelectorAll("br").forEach(function (br) { br.replaceWith("\n"); });
        return node.textContent.replace(/\u00A0/g, " ");
    };

    const getCode = function () {
        const text = textOf(pre.cloneNode(true));
        return text.endsWith("\n") ? text.slice(0, -1) : text;
    };

    // WHY: Sondaki boş satırın görünmesi ve imlecin oraya gidebilmesi için kodun sonuna bir satır sonu eklenir.
    const render = function (code) {
        pre.innerHTML = SITE.codeHtml(code, "js", 1);
    };

    // İmlecin, kodun başından uzaklığı (karakter).
    const getCaret = function () {
        const selection = window.getSelection();
        if (!selection.rangeCount || !pre.contains(selection.focusNode)) return -1;
        const range = document.createRange();
        range.selectNodeContents(pre);
        range.setEnd(selection.focusNode, selection.focusOffset);
        const holder = document.createElement("div");
        holder.appendChild(range.cloneContents());
        return textOf(holder).length;
    };

    const setCaret = function (offset) {
        if (offset < 0) return;
        const walker = document.createTreeWalker(pre, NodeFilter.SHOW_TEXT);
        let total = 0;
        let node;
        while ((node = walker.nextNode())) {
            if (offset <= total + node.length) {
                const range = document.createRange();
                range.setStart(node, offset - total);
                range.collapse(true);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                return;
            }
            total += node.length;
        }
    };

    // Yeniden renklendirir, imleci yerinde tutar.
    const highlight = function () {
        const caret = (document.activeElement === pre) ? getCaret() : -1;
        render(getCode());
        setCaret(caret);
    };

    const insertText = function (text) {
        // WHY: execCommand, tarayıcının geri alma (Ctrl + Z) geçmişini korur.
        if (!document.execCommand("insertText", false, text)) {
            const selection = window.getSelection();
            if (!selection.rangeCount) return;
            const range = selection.getRangeAt(0);
            range.deleteContents();
            const node = document.createTextNode(text);
            range.insertNode(node);
            range.setStartAfter(node);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };

    const scheduleRun = function () {
        clearTimeout(runTimer);
        runTimer = setTimeout(function () {
            if (!box) return;
            highlight();
            if (box.runOnEdit == 1) box.run();
        }, CONFIG.autoRunDelay);
    };

    const addConsoleLine = function (level, text) {

        const colors = { error: "#FF7B72", warn: "#E3B341", info: "#79C0FF" };

        createIn(box.consoleBox, function () {
            const line = Label({ text: "", width: "100%", fontSize: 12, textColor: colors[level] || SITE.CODE_TEXT });
            line.plainText = String(text);
            line.elem.style.fontFamily = SITE.MONO;
            line.elem.style.whiteSpace = "nowrap";
            line.elem.style.overflow = "hidden";
            line.elem.style.textOverflow = "ellipsis";
            line.elem.title = String(text);
            consoleLines.push(line);
        });

        // Son 4 satır
        while (consoleLines.length > 4) consoleLines.shift().remove();

        box.consoleBox.visible = 1;

    };

    const clearConsole = function () {
        consoleLines.forEach(function (line) { line.remove(); });
        consoleLines = [];
        box.consoleBox.visible = 0;
    };

    // *** PUBLIC FUNCTIONS:

    box.run = function () {
        if (!box) return;
        hasRun = 1;
        clearConsole();
        box.view.loadHtml(LiveCode.buildPage(getCode()));
        box.onRun(box);
    };

    // USAGE: live.setCode(SAMPLES.playground.todo, 1)
    box.setCode = function (code, run = 1) {
        clearTimeout(runTimer);
        box.code = code;
        render(code);
        box.editorScroll.elem.scrollTop = 0;
        if (run) box.run();
    };

    box.getCode = getCode;

    box.reset = function () {
        box.setCode(box.code, 1);
    };

    // WHY: box.superRemove is overwritten by a component that extends this one, so the local copy is called below.
    const superRemove = box.remove;
    box.superRemove = superRemove;
    box.remove = function () {
        if (!box) return; // WHY: remove() can be called twice (also by the parent's remove()).
        clearTimeout(runTimer);
        if (observer) observer.disconnect();
        superRemove.call(box); // NOTE: basic.js remove(). It cleans all the events and the objects inside. (WebView unloads its page.)
        box = null;
    };

    // *** OBJECT VIEW:

    box.clipContent = 1;
    const split = (box.split == 1);

    // GROUP: Kod + sonuç
    const row = (split ? HGroup : VGroup)({ width: "100%", height: split ? "100%" : "auto", align: "left top", gap: 0 });
    row.elem.style.alignItems = "stretch";
    // WHY: Kutu (Box) içindeki grup absolute konumludur; "auto" yükseklikte kutunun büyümesi için relative olmalı.
    if (!split) row.elem.style.position = "relative";

        // GROUP: Kod
        box.editorPane = VGroup({
            width: split ? (box.editorRatio * 100).toFixed(2) + "%" : "100%",
            height: split ? "auto" : box.editorHeight,
            align: "left top",
            gap: 0,
            color: SITE.CODE_BG,
        });
        box.editorPane.elem.style.alignItems = "stretch";
        box.editorPane.elem.style.flexShrink = "0";
        box.editorPane.elem.style.minWidth = "0";

            // GROUP: Başlık çubuğu
            HGroup({ width: "100%", height: 44, align: "left center", gap: 10, padding: [14, 0], color: SITE.CODE_BAR });
            that.elem.style.flexShrink = "0";

                // GROUP: Üç nokta
                HGroup({ width: "auto", height: "auto", align: "left center", gap: 6 });
                that.elem.style.flexShrink = "0";
                    ["#FF5F57", "#FEBC2E", "#28C840"].forEach(function (color) {
                        Box({ width: 10, height: 10, round: 5, color: color });
                    });
                endGroup();

                Label({ text: basic.escapeHtml(box.fileName), fontSize: 12, textColor: SITE.CODE_SOFT });
                that.elem.style.fontFamily = SITE.MONO;
                that.elem.style.whiteSpace = "nowrap";
                that.elem.style.flexShrink = "0";

                box.lblHint = Label({ text: T.editHint, fontSize: 12, textColor: "rgba(255, 255, 255, 0.32)" });
                box.lblHint.elem.style.whiteSpace = "nowrap";
                box.lblHint.elem.style.overflow = "hidden";
                box.lblHint.elem.style.textOverflow = "ellipsis";
                box.lblHint.elem.style.minWidth = "0";
                box.lblHint.elem.style.flex = "0 1 auto";
                if (box.showHint != 1 || SITE.L.mobile) box.lblHint.visible = 0;

                SITE.spacer();

                SITE.button({ icon: "reset", kind: "code", height: 30, fontSize: 13, hint: T.reset, onClick: function () { box.reset(); } });
                SITE.button({ icon: "copy", kind: "code", height: 30, fontSize: 13, hint: T.copy, onClick: function () { SITE.copy(getCode()); } });
                SITE.button({ text: T.run, icon: "play", kind: "run", height: 30, fontSize: 12, hint: T.run, onClick: function () { highlight(); box.run(); } });

            endGroup();

            // BOX: Kod alanı (ScrollBar bu kutunun içine yerleşir)
            box.editorWrap = startBox({ width: "100%", height: 100, color: "transparent" });
            box.editorWrap.elem.style.flex = "1 1 0";
            box.editorWrap.elem.style.minHeight = "0";

                // BOX: Kaydırılan kutu
                box.editorScroll = startBox(0, 0, "100%", "100%", { color: "transparent", scrollY: 1 });

                    // Düzenlenebilir kod (düz HTML)
                    pre = SITE.createPre(box.code, "js", box.fontSize);
                    pre.style.minHeight = "100%";
                    pre.style.boxSizing = "border-box";
                    pre.contentEditable = "plaintext-only";
                    if (pre.contentEditable !== "plaintext-only") pre.contentEditable = "true";
                    box.editorScroll.elem.appendChild(pre);
                    box.pre = pre;
                    render(box.code);

                endBox();

                SITE.addScrollBar(box.editorScroll, {
                    bar_color: "#FFFFFF",
                    bar_mouseOverColor: "#FFFFFF",
                    bar_opacity: 0.2,
                    bar_mouseOverOpacity: 0.45,
                });

            endBox();

        endGroup();

        // GROUP: Sonuç
        box.resultPane = VGroup({
            width: split ? "auto" : "100%",
            height: split ? "auto" : box.resultHeight,
            align: "left top",
            gap: 0,
            color: "#FFFFFF",
        });
        box.resultPane.elem.style.alignItems = "stretch";
        box.resultPane.elem.style.flex = split ? "1 1 0" : "0 0 auto";
        box.resultPane.elem.style.minWidth = "0";
        if (split) box.resultPane.elem.style.borderLeft = "1px solid " + SITE.CODE_LINE;

            // GROUP: Sonuç başlığı
            HGroup({ width: "100%", height: 44, align: "left center", gap: 8, padding: [14, 0], color: "#EFEDE7" });
            that.elem.style.flexShrink = "0";

                Box({ width: 8, height: 8, round: 4, color: SITE.RUN });
                SITE.label(T.result, { bold: 1, fontSize: 12, textColor: SITE.TEXT_SOFT });

            endGroup();

            // WEB VIEW: Çalışan kod
            box.view = WebView({
                width: "100%",
                height: 100,
                title: T.result,
                placeholderText: "",
                style: {
                    box: { color: "#FFFFFF", border: 0, round: 0 },
                    loading: { color: "#FFFFFF", spinnerColor: "rgba(0, 0, 0, 0.3)", spinnerSize: 22 },
                },
                onMessage: function (self, data) {
                    if (data && data.bjs === "console") addConsoleLine(data.level, data.text);
                },
            });
            box.view.elem.style.flex = "1 1 0";
            box.view.elem.style.minHeight = "0";

            // GROUP: Konsol (son satırlar)
            box.consoleBox = VGroup({ width: "100%", height: "auto", align: "left top", gap: 2, padding: [14, 8], color: SITE.CODE_BG });
            box.consoleBox.elem.style.flexShrink = "0";

                SITE.label(T.console, { bold: 1, fontSize: 10, textColor: SITE.CODE_SOFT });
                that.elem.style.letterSpacing = "1px";
                that.elem.style.textTransform = "uppercase";

            endGroup();
            box.consoleBox.visible = 0;

        endGroup();

    endGroup();

    // *** OBJECT INIT CODE:

    pre.addEventListener("keydown", function (event) {

        if (event.key == "Enter" && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            highlight();
            box.run();
        } else if (event.key == "Enter" && !event.isComposing) {
            // Satırın girintisini koru.
            event.preventDefault();
            const caret = getCaret();
            const code = getCode();
            const lineStart = code.lastIndexOf("\n", caret - 1) + 1;
            const indent = /^[ \t]*/.exec(code.slice(lineStart))[0];
            const extra = /[{(\[]\s*$/.test(code.slice(lineStart, caret)) ? "    " : "";
            insertText("\n" + indent + extra);
        } else if (event.key == "Tab" && !event.shiftKey) {
            event.preventDefault();
            insertText("    ");
        } else if (event.key == "Escape") {
            pre.blur();
        }

        // WHY: Sayfanın kısayolları kod yazarken çalışmasın.
        event.stopPropagation();

    });

    pre.addEventListener("input", function (event) {
        if (event.isComposing) return;
        // Eklenen <br>'ler hemen satır sonu metnine çevrilir.
        if (pre.querySelector("br")) highlight();
        scheduleRun();
    });

    // WHY: Yapıştırılan metin biçimsiz olsun ("true" düzenleme modunda HTML de yapıştırılabiliyor).
    pre.addEventListener("paste", function (event) {
        event.preventDefault();
        insertText((event.clipboardData || window.clipboardData).getData("text/plain"));
    });

    if (box.lazy == 1 && typeof IntersectionObserver !== "undefined") {
        observer = new IntersectionObserver(function (entries) {
            if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
            observer.disconnect();
            observer = null;
            if (box && !hasRun) box.run();
        }, { rootMargin: "200px 0px" });
        observer.observe(box.elem);
    } else {
        box.run();
    }

    return endObject(box);

};

// *** STATIC FUNCTIONS:

// Kod, basic.js yüklü küçük bir HTML sayfasına konur (srcdoc).
LiveCode.buildPage = function (code) {

    const rootUrl = SITE.rootUrl();
    const hasStart = /\bwindow\.onload\s*=|\b(?:const|let|var)\s+start\s*=|\bfunction\s+start\s*\(/.test(code);

    let script = hasStart ? code : "var start = function () {\n" + code + "\n};";
    script = script.replace(/<\/script/gi, "<\\/script");

    return "<!DOCTYPE html>\n<html>\n<head>\n"
        + "<meta charset=\"UTF-8\">\n"
        + "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n"
        + "<base href=\"" + rootUrl + "\">\n"
        + "<link rel=\"stylesheet\" href=\"basic/basic.min.css\">\n"
        + "<script>" + LiveCode.CONSOLE_BRIDGE + "</script>\n"
        + "<script src=\"basic/basic.min.js\"></script>\n"
        + "</head>\n<body>\n<script>\n" + script + "\n</script>\n</body>\n</html>";

};

// console.log / warn / error / info ve hatalar, üst sayfaya mesaj olarak gönderilir.
LiveCode.CONSOLE_BRIDGE = "(function () {"
    + "var toText = function (value) {"
    + "  if (typeof value === 'string') return value;"
    + "  if (value && value.elem) return '[basic.js object]';"
    + "  try { var json = JSON.stringify(value); return (json === undefined) ? String(value) : json; } catch (e) { return String(value); }"
    + "};"
    + "var send = function (level, args) {"
    + "  try { parent.postMessage({ bjs: 'console', level: level, text: Array.prototype.map.call(args, toText).join(' ') }, '*'); } catch (e) { }"
    + "};"
    + "['log', 'info', 'warn', 'error'].forEach(function (level) {"
    + "  var original = console[level];"
    + "  console[level] = function () { send(level, arguments); return original.apply(console, arguments); };"
    + "});"
    + "window.addEventListener('error', function (event) { send('error', [event.message]); });"
    + "window.addEventListener('unhandledrejection', function (event) { send('error', [String(event.reason)]); });"
    + "})();";
