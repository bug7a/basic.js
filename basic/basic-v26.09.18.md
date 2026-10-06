# basic.js v26.09.18 — what changed

`basic/basic.js` (v26.09.18) is the previous `basic.js` (v26.09.17, now kept as `basic/basic-bugra.js` and `basic-bugra.min.js`) plus the fixes and additions below. Every page and component written for the previous versions runs unchanged, with the same globals, the same defaults and the same DOM output. Nothing to change in pages: they already load `basic/basic.js` or `basic/basic.min.js`.

Files: `basic/basic.js` (source), `basic/basic.min.js` (minified with terser), `test/basic-test.htm` (self-checking test page: every feature below has a green/red line; the tab title says `ALL PASS`).

Naming rule for the additions: no new globals. New things are properties/methods on the objects, or live under `basic.*`. Names that existing components already use for their own values (`scale`, `hint`, `parent`, `shadow`, `image`) were deliberately **not** added, so component defaults keep their meaning.

---

## Fixes

| v26.09.17 | v26.09.18 |
|---|---|
| `box.left = "50%"` became `50px`; `box.width = "100"` was ignored. | Strings work everywhere: `"100"` → `100px`, `"50%"`, `"calc(100% - 10px)"`, `"auto"` are used as is. Numbers behave exactly as before. |
| Children created inside a hidden group (`VGroup({ visible: 0 })`) were absolutely positioned, not flex items. | Groups remember that they are flex (`_isFlex`); children are flex items even when the group is hidden. |
| An object created before the page was ready printed an error and then threw a `TypeError`. | Throws `Error("basic.js: The library is not ready yet. Create objects in start() or window.onload.")`. |
| A page variable named like a library helper (`const createButton = ...`) broke `Button()` with infinite recursion. | The library calls its own functions; page-level names cannot shadow them. |
| `remove()` left the `setMotion()` / `withMotion()` / `dontMotion()` timers running. | Pending timers of a removed object are cleared. |
| `ResizeObserver` callback scanned every registration for every resized element. | One list per element (`Map`). Same API: `onResize()`, `remove_onResize()`. |
| `VGroup({ justify })` — see Groups below. | `justify` wins over the main-axis part of `align`, also after `flow` changes. |

`obj.props({...})` now returns the object (chaining); before it returned `undefined`.

---

## New properties (every object: Box, Label, Button, Input, Icon)

All of them work in the props object and as setters after creation.

```js
Label({
    text: "Title",
    bold: 1,                    // opensans-bold (the bundled bold font). With another fontFamily: font-weight bold.
    italic: 1,
    fontFamily: "opensans",     // "opensans" (default), "opensans-bold", or any font name
    lineHeight: 24,             // number -> px, string as is ("1.4" = 1.4 x font size)
    ellipsis: 1,                // one line, "..." when the text does not fit the width
    selectable: 1,              // the user can select and copy the text (basic.css turns this off)
    cursor: "pointer",
    zIndex: 10,                 // getter returns 0 when not set
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    css: { whiteSpace: "nowrap", letterSpacing: "1px" },   // raw CSS without touching .elem
});

that.css.textTransform = "uppercase";   // .css is the style object
that.css = "text-decoration: underline"; // a CSS string is appended

// Inside an HGroup / VGroup: fill the free space
Box({ width: 10, height: "100%", grow: 1 });   // flex-grow
Box({ width: 300, height: "100%", shrink: 1 }); // flex-shrink

// User data: .text is innerHTML, .plainText is textContent
lbl.plainText = userName;                 // "<b>x</b>" is shown literally
lbl.text = basic.escapeHtml(userName);    // the same, when you need .text

box.children;    // [basic.js objects directly inside box]
box.isRemoved;   // 1 after remove()
```

## New methods (every object)

```js
box.show();  box.hide();  box.toggle();          // visible = 1 / 0 / flip. They return the object (chaining).
box.setSize(200, "50%");  box.setPosition(10, 20);
box.bringToFront();                               // zIndex = highest sibling + 1 (DOM order unchanged)
box.contains(otherObj);                           // otherObj is inside box (any depth)
box.once("click", (self, event) => {});           // like on(), runs one time. Returns the remover.

// animate(): a Promise. The transition set by setMotion() is restored when it ends.
await box.animate({ left: 100, opacity: 0.5 }, 300);           // duration ms, easing "ease" (default)
box.animate({ width: 200 }, 500, "ease-out").then(self => {});
```

## Input

```js
const inp = Input(0, 0, 240, 44, {
    placeholder: "E-mail",
    inputType: "email",     // "text", "password", "number", "email", "tel", "search", "url"
    maxLength: 64,          // 0 = no limit
    readOnly: 0,
});
inp.value = "a@b.com";      // = .text
inp.focus();  inp.blur();  inp.select();
const remove = inp.onEnter((self, event) => send(self.value));   // Enter key only
inp.remove_onEnter(fn);     // or call the returned remover
```

`bold`, `italic`, `fontFamily`, `lineHeight`, `ellipsis`, `cursor` of an Input go to its `<input>` element (like `fontSize`, `textColor`).

## Label

```js
Label({ text: "Çığ gibi", fontSize: 40, height: 44, clipContent: 0 });  // the letters out of the line box (g, ş, ğ) are not cut
that.clipContent = 1;          // default: the text is cut at the edges of the label (basic.css: overflow hidden)
```

`clipContent: 0` also shows a text that does not fit (it goes out of the label). `ellipsis: 1` always cuts, `"..."` needs it.
Only Label (and Box, as before) has it: a Button's lift or shadow is cut by the Box it is in, so give that Box `clipContent: 0`.

## Icon

```js
Icon(0, 0, 80, 80, { alt: "Product photo", imageFit: "cover" });   // object-fit: cover | contain | fill | none | scale-down
that.load("img/photo.png");   // without alt, load() writes the path as alt (previous behaviour)
```

## Groups (HGroup, VGroup, AutoLayout)

```js
HGroup({ hug: 1, gap: 8 });                    // the group wraps its content (width/height "auto")
                                               // "hug" is the new name of "fit"; fit: 1 still works and
                                               // group.hug / group.fit both read 1 afterwards
HGroup({ wrap: 1, gap: 8 });                   // items continue on the next line when there is no space
HGroup({ justify: "space-between" });          // main axis: "space-between", "space-around", "space-evenly",
VGroup({ justify: "bottom" });                 //            "left" / "top" / "start", "center", "right" / "bottom" / "end"
group.wrap = 0;  group.justify = "center";     // setters, like .flow / .align / .gap
```

`justify` overrides the main-axis part of `align`; `align` keeps controlling the cross axis.

## createIn() — create objects inside an existing box

```js
// After a component is created, add rows to its list box:
createIn(box.list, function (container) {      // container === box.list
    Label({ text: "Row 1" });
    Label({ text: "Row 2" });
});
// The default container is restored afterwards (also when the function throws).
```

Safe replacement for the `setDefaultContainerBox(container)` ... `setDefaultContainerBox(previous)` pattern (the comp-m4 components had their own local `createIn`; it is now in the library).

The function has its own start/end stack: a group started and ended inside it goes back to `container`, also when `createIn()` is called while a box of the caller is still open (between a `startBox()` and its `endBox()`). Fixed on 2026-10-05: before, the first `endGroup()` inside went back to the caller's open box and the next objects were created there (the second row of a list landed on the page).

## page

```js
page.title = "My App";                                  // document.title
const remove = page.on("keydown", (self, event) => {}); // window events, returns the remover
page.off("keydown", fn);
page.onKeyDown(fn);  page.remove_onKeyDown(fn);
```

## basic.*

```js
basic.version      // "26.09.18"
basic.library      // "basic.js"
basic.isReady      // 1 after the page object exists (before start() runs)
await basic.sleep(300);
await basic.nextFrame();                    // the browser painted once
basic.clamp(value, min, max);
basic.lerp(a, b, t);                        // t = 0 -> a, t = 1 -> b
basic.objectOf(element);                    // the basic.js object of a DOM element (or of its nearest parent)
basic.escapeHtml(text);
basic.storage.loadOr("settings", { theme: "light" });
```

---

## Compatibility check

- 137 sample and template pages of this repository were loaded in headless Chrome with v26.09.17 and with v26.09.18. The normalized DOM (tags, classes, inline styles, texts) was **identical on all 137 pages**; there was no new console error.
- `test/basic-test.htm` runs 87 checks (old API, fixes, every new feature) with the source and with the min file: all pass.

## Maintenance

- `basic/basic.js` is the maintained source. After editing it, rebuild the min file:
  ```
  npx terser basic/basic.js --compress --mangle --comments "/Bismillah|basic\.js \(v/" -o basic/basic.min.js
  ```
  then open `test/basic-test.htm` in a browser (or with Live Server): the tab title must say `ALL PASS`.
- `basic/basic-bugra.js` is frozen at v26.09.17 for reference; do not edit it.
- `experimental/_make_basic_ai.py` is the script that derived v26.09.18 from v26.09.17 (anchored text edits). It is kept as a record of the changes; it writes to `basic/basic-regenerated.js` by default and must not overwrite `basic.js`.
- Template folders that keep their own copy of the library (`04-template-m1/todo-app/library/`) still have the old version until you copy the new files there.
