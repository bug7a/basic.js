# basic.js — what is new

All the changes of `basic/basic.js`, the newest version first. A version is the date of its release: **vYY.MM.DD** (v26.10.23 = 2026-10-23). A change is added under a new version with the date of that day (or under today's version, when it already exists). The version is also in the header of `basic/basic.js` and in `basic.version`. The release notes for the users of the library are in `__handbook/english/00-what-is-new.md` (and `turkce/`).

Every version is compatible with the ones before it (one exception: **v26.10.25** moved 5 helpers under `basic.*` and removed the 7 old `create*` globals, the user's choice): every page and component written for an older version runs unchanged, with the same globals, the same defaults and the same DOM output (a fix of something that did not work is noted in its version).

Files: `basic/basic.js` (source), `basic/basic.min.js` (minified with terser), `test/basic-test.htm` (self-checking test page: every feature below has a green/red line; the tab title says `ALL PASS`).

Naming rule for the additions: no new globals (one exception, the user's choice on 2026-10-25: the color helper `Alpha()`, next to `Black()` and `White()`). New things are properties/methods on the objects, or live under `basic.*`. Names that existing components already use for their own values (`scale`, `hint`, `parent`, `shadow`, `image`, `listen`, `onHover`) are deliberately **not** added, so component defaults keep their meaning.

---

## v26.11.01 (2026-11-01)

### `basic.uiScale`, `basic.scaleStyle()`, `basic.scaleSize()`, `basic.scaleCssText()`: the components keep their size on a fitted page

A page fitted with `page.fit(600, 800)` (a 600 px design, Ex: the mobile template `04-templates/mobile-app-template/classic`) is zoomed: 0.65 on a 390 px phone. A component made for screen px (Tabs, Dialog, Toast, Tooltip, SelectBox, SelectDate) was then 0.65 as big, its texts too small to read. Now:

```javascript
page.fit(600, 800);
basic.uiScale = 1 / page.zoom;      // once (and again after a resize that changes the zoom)
Dialog.confirm({ titleText: "Delete?" });   // as big as on a normal page
Tabs({ tabs: ["A", "B"], scale: 1 });       // one object can still choose its own scale
```

- `basic.uiScale` (1 by default): the default of the `scale` param of these components.
- `basic.scaleStyle(style, factor)`: a copy of a style package with its sizes multiplied (the package is not changed). The size keys end with size, width, height, gap, space, spacing, padding, margin, round, radius, offset, thickness, top, left, right, bottom or border (`basic.isSizeKey()`; `lineHeight` is not one: it is often a ratio). Numbers and arrays of numbers (`[12, 4]`) are multiplied; text values (`"100%"`, `"auto"`) stay.
- `basic.scaleSize(value, factor)`: one size (a number or an array).
- `basic.scaleCssText(text, factor)`: the px of a CSS text (a shadow, a border): `"0 8px 24px rgba(0, 0, 0, 0.12)"` x 2 -> `"0 16px 48px rgba(0, 0, 0, 0.12)"`. `basic.scaleStyle()` leaves texts as they are, so a component multiplies its shadows with it.
- With the default 1 nothing changes: fully compatible.

## v26.10.27 (2026-10-27)

### `basic.applyStylePackage`: a package of params

A style package can now change a param outside the style too (an icon file, a size, a text). The user's idea (2026-10-27): a package with its own `style` key is a **package of params**: its `style` goes into `params.style` as before, its other keys fill the params that were not given. A package without a `style` key is the style itself, as before, so every existing package works unchanged. Fully compatible.

```javascript
Tabs.styles.dark = {
    style: { tab: { textColor: "white" } },   // into params.style
    closeIconFile: "tabs/close-white.svg",    // into params (when the page did not give it)
};
```

- The order is the same on both levels: the params of the page > the package > the defaults; `params.style` > the package's `style` > `Defaults.style`.
- The package is copied (`mergeIntoIfMissing`; its arrays with `slice()`, because the merge gives an array as it is), so it is never changed.
- A component whose look is all in flat params (comp-m2 `InputB`) marks its packages with `style: {}`: `InputB.styles.dark = { style: {}, backgroundColor: "#232322", ... }`. Without the mark the keys would go into `params.style`.
- `comp/input-b.js` uses it now (its own `InputB.applyStylePackage` of 2026-10-26 is gone): it needs v26.10.27.
- `comp/label-editor.js`: its `dark` package gives `newLabel` a light text color and its own `colorPalette` (a new label was not seen on the dark list): it needs v26.10.27.
- `test/basic-test.htm`: four checks (the keys fill the params / the style; given params win; the package is not changed; its arrays are copied), 158/158.

---

## v26.10.25 (2026-10-25)

### `minimal`: `border` reads 0

basic.css gives a `minimal` Button / Input no border, but `border` still read 1 (the value of a normal one). Now `minimal` sets it to the border of basic.css: 0 when on, 1 when off. A border written on the object (`border: 2`, also before `minimal`) is stronger than the CSS: it stays. Nothing changes on the screen; only the value that is read (found in basic-designer: its panel showed 1, and a change to 1 was "no change").

- `test/basic-test.htm`: five checks (minimal Button / Input read 0, off again reads 1, a given border stays, minimal then border 1 writes 1px), 163/163.

### NOT COMPATIBLE: the helpers under `basic.*`, the old `create*` globals removed

The user's choice (2026-10-25), the plan of `basic/improvement-ideas.md` §9 done in one step (without a warning version): fewer global names, and names like `createButton` are free for the helpers of pages and components.

| Before (global) | Now |
|---|---|
| `num(value, "int")` | `basic.num(value, "int")` |
| `str(value)` | `basic.str(value)` |
| `isMobile()` | `basic.isMobile()` |
| `go(url, "_blank")` | `basic.go(url, "_blank")` |
| `twoDigitFormat(5)` | `basic.twoDigitFormat(5)` |
| `createBox(l, t, w, h)` | `Box(l, t, w, h)` |
| `createLabel(...)` | `Label(...)` |
| `createButton(...)` | `Button(...)` |
| `createTextBox(...)`, `createInput(...)` | `Input(...)` |
| `createImage(...)`, `createIcon(...)` | `Icon(...)` |

- `Box = withProps(createBox)`: without a props object the two are the same, so the change of a page is only the name.
- The old functions are kept as `basic.createBox()`, `basic.createLabel()`... (no props).
- Every page, component and template of the repository was moved (comp-m1 to comp-m4, the samples, `js-data-table`, `js-admin-panel`, the handbook). Not moved: the places with their own basic.js copy (`04-template-m1/todo-app/library/`, the standalone sites, `__projects/`): their copy is the old one, so they keep working.
- A file that defines its own `createButton` / `createInput` / `createLabel` (the admin panel modules and pages, `stepper.js`, `label-editor.js`, `check-box.js`, `radio-button.js`, `bottom-bar.js`, `modal.js`) was not changed: those calls are its own helper.
- A component copied out of the repository that calls `basic.num()`... needs this basic.js (v26.10.25).

### `basic.resolveTheme(themes, name)`

The colors of a theme for the components with a `theme` param ("light", "dark", "auto"): `Modal`, `Toast`, `ChartBox`. The same five lines were in four places.

```js
const colors = basic.resolveTheme(Modal.THEMES, "auto"); // "auto": the system setting (light or dark)
Modal.THEMES.ocean = { background: "#0B2239", title: "#FFFFFF" }; // only the keys that differ
Modal.alert({ title: "Hi", theme: "ocean" });                 // the other keys come from the light theme
```

- The result is a new object: `themes[name]`, then the missing keys from `themes.light` (like a style package).
- A name that is not in `themes` writes a warning and gives the light theme (before: the light theme without a warning).
- `ChartBox` now takes any name in `ChartBox.THEMES` (before: only "light" and "dark").

### `Alpha(color, percent)`

`Black(0.5)` and `White(0.5)` for any color:

```js
Box({ color: Alpha("#456789", 0.5) });            // "rgba(69,103,137,0.5)"
Label({ textColor: Alpha("#4A7", 0.8) });         // #RGB works too: "rgba(68,170,119,0.8)"
Box({ border: 1, borderColor: Alpha("tomato", 0.3) });
Box({ color: Alpha(UI.COLOR_PRIMARY, 0.15) });    // a var(--token) follows the theme (color-mix)
```

- A hex color (`#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`) becomes `rgba(...)`, which works in every browser.
- Any other color (a name, `rgb()`, `hsl()`, `var(--token)`) becomes `color-mix(in srgb, <color> 50%, transparent)`.
- An alpha the color already has is multiplied: `Alpha("#00000080", 0.5)` is about 25%.
- `percent` is 0 to 1, like `Black()`: `0` gives `"transparent"`, `1` (the default) gives the color as it is.

`UI.alpha()` of `comp/ui-standards.js` stays (it always writes `color-mix`). It is a new global, so a page that has its own `Alpha` gets the library's one written over by its own (a `function Alpha` or `window.Alpha`) or a SyntaxError (a `const Alpha` / `let Alpha` at the top of a page script); no page of the repository has one.

---

## v26.10.24 (2026-10-24)

### `basic.applyStylePackage(params, packages, defaults)`

Every component with style packages (`styleName: "dark"`) began with the same three lines. Now one line does it:

```js
// before
const _stylePackage = Tabs.styles[params.styleName || TabsDefaults.styleName];
if (!_stylePackage) console.warn("Tabs: Style package not found: " + params.styleName);
mergeIntoIfMissing(params, { style: _stylePackage || {} });

// now
basic.applyStylePackage(params, Tabs.styles, TabsDefaults);
mergeIntoIfMissing(params, TabsDefaults); // as before: the rest of the defaults (and Defaults.style)
```

The order is the same: `params.style` > `packages[params.styleName]` (or `defaults.styleName`) > `defaults.style`. A name that is not in `packages` still writes a warning.

One thing is new: `params.style` becomes a new object. A package can be given as it is, `Tabs({ style: Tabs.styles.dark })`, and the package is never changed. Before, the merges wrote the missing keys into that object (the package of every Tabs on the page), and a page that changed it (`const myStyle = Tabs.styles.dark; myStyle.indicator.color = "red"`) changed every dark Tabs. To change a few keys of a package, keep writing `styleName: "dark", style: { indicator: { color: "red" } }`.

Moved to it: `comp/tabs.js` and `_component-template.js`. The other components keep their three lines (they work the same) and are moved when they are touched. A component that uses it needs basic.js v26.10.24.

---

## v26.10.23 (2026-10-23)

For simpler components: the global things of an object are cleaned by its `remove()`, so most components do not override `remove()` any more (42 of 63 components did it only for this). `listen` (the `box.listen` of `PropertyPanel`) and `onHover` (a parameter of `TreeView`) are used by components, so the new methods are `listenTo` and `onHoverChange`.

### Fix: `grow`, `shrink` and `css` in the props of a group

A group (`HGroup`, `VGroup`, `AutoLayout`) wrote its flex styles (`alignItems`, `flexGrow`, `flexShrink`...) again after its props, and `VGroup()` wrote `alignItems` once more when it set its flow. So these props were lost without a word:

```js
VGroup({ align: "left top", css: { alignItems: "stretch" } }); // before: alignItems stayed "flex-start"
HGroup({ width: "auto", grow: 1 });                             // before: flexGrow stayed 0
```

Now `grow`, `shrink` and `css` are applied after the flex styles. A page that gave them to a group gets what it wrote: in this repository only `comp/time-line.js` (`grow: 1` on the texts) changed, its texts now take the rest of the row (the same place on the screen). `group.css.alignItems = "stretch"` after the group still works.

### Fix: `rotate` keeps the other parts of the transform

`obj.rotate = 45` wrote `transform: rotate(45deg)` and threw away a `translateY()` or `scale()` that was in the transform. Now only the `rotate()` part changes, in its place (the order of a transform matters); it is added at the end when it is not there. Alone, the value is the same as before (`rotate(45deg)`), so an animation with `setMotion("transform 0.3s")` still works (the arrows of `TinySelect`, `SmartTable`).

A component that writes `elem.style.transform = "..."` itself still replaces the whole value, the rotation too: write the rotation after it, or put both in that string.

### The additions



For simpler components: the global things of an object are cleaned by its `remove()`, so most components do not
override `remove()` any more (42 of 63 components did it only for this). `test/basic-test.htm`: 137 checks.

| What | Use |
|---|---|
| `obj.listenTo(target, event, func, capture)` | an event of `window` / `document` / any element: `func(self, event)`. Returns the remover. Removed by `remove()`. |
| `obj.onPageResize(func)` | the resize of the window, `func(self, event)`. Removed by `remove()` (`page.onResize` is not). |
| `obj.after(ms, func)` | `func(self)` once. Returns the cancel function. Stopped by `remove()` (never runs on a removed object). |
| `obj.every(ms, func)` | `func(self)` again and again. Returns the stop function. Stopped by `remove()`. |
| `obj.own(other)` | an object made somewhere else (a menu, a popup on `page`) is removed with `obj`. Returns `other`. |
| `obj.onHoverChange(func)` | `func(self, isOver, event)`: 1 on `mouseenter`, 0 on `mouseleave`. Returns the remover. |
| `obj.setFocusRing(color)` | a ring only for the keyboard (CSS `:focus-visible`, not after a mouse click). `""`: none. |
| `basic.isOn(value)` | `1`, `"1"`, `true` -> true. (the `v == 1 \|\| v === true` of the components) |
| `basic.addCss(id, css, replace)` | a `<style>` once (the same id: nothing, unless `replace`). For `:hover`, `::-webkit-scrollbar`, `@keyframes`... |
| `createIn(container, func)` | now returns the result of `func`: `const menu = obj.own(createIn(page, function () { return Box(...); }));` |
| `obj.role` | `"button"`, `"tab"`, `"tree"`... (`""` removes it). On the element that takes the focus (the `<input>` of an Input). |
| `obj.aria` | `{ label: "Close", selected: true, level: 2 }` -> `aria-label`, `aria-selected`, `aria-level`. Only the given keys change; `true` / `false` -> `"true"` / `"false"`; `null` removes. The getter returns the `aria-*` attributes as an object. |
| `obj.tabIndex` | `0`: the Tab key reaches it, `-1`: only `focus()` of the code, `null`: the default of the element. |

```js
const MyComp = function (params = {}) {
    let box = startObject(params);
    box.listenTo(document, "keydown", function (self, event) { if (event.key === "Escape") box.close(); });
    box.onPageResize(function () { box.layout.gap = (page.width < 480) ? 6 : 10; });
    const stop = box.every(1000, function () { box.lblTime.text = new Date().toLocaleTimeString(); });
    box.menu = box.own(createIn(page, function () { return Box(0, 0, 200, 100, { visible: 0 }); }));
    // No remove() override: basic.js removes the listeners, stops the timers and removes box.menu.
    return endObject(box);
};
```

### In the components

- `_component-template.js` is written with them (`onPageResize`, `after`, `onHoverChange`, `setFocusRing`, `basic.isOn`; its `remove()` block stays only for what basic.js does not know).
- comp-m4 was converted on 2026-10-23: 20 of its 31 components have no `remove()` of their own any more. comp-m2 / comp-m3 are converted when they are touched, not all at once.
- The copies of basic.js in the other folders (`03-webpages/webpage-handbook/basic/` (`_update-copies.sh`), `03-webpages/webpage-basicjs/basic/`, the game, the admin panel demo) do not get these until they are copied again: a component that uses them needs the new basic.js.

---

## v26.09.18 (2026-09-18)

`basic/basic.js` v26.09.18 is v26.09.17 (kept as `basic/backup/v26.09.17/basic-bugra.js` and `basic-bugra.min.js`) plus the fixes and additions below.


### Fixes

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

Fixed in October 2026 (a bug report; `test/basic-test.htm` checks them):

| Before | Now |
|---|---|
| `mergeIntoIfMissing({}, JSON.parse('{"__proto__": {...}}'))` wrote into `Object.prototype` (every object of the page). | `__proto__`, `constructor` and `prototype` keys are skipped. |
| A listener added with capture (`on("click", fn, true)` or `{ capture: true }`) stayed after its remover or `remove()`. | The capture value is kept and given to `removeEventListener()`. |
| The same function on two events: `off("keydown", fn)` removed the click entry and left keydown working. | `off()` matches the event name and the element too; the remover of `on()` removes its own listener. |
| `animate()` cut by a second `animate()`, or by `remove()`: its Promise never resolved (`await` waited forever). | It resolves (with the object) when it is cut or removed. |
| `Box("50%", "calc(100% - 20px)", 40, 40)`: the constructor wrote `"50%px"`, so left/top were empty. | The constructors use the same CSS length rule as the setters. |
| `gap: 2.5` was not applied (only integers got `px`). | Every number gets `px`. |
| `sound.stop()` on a paused sound did not go back to the start. | `stop()` always sets `currentTime = 0`. |
| A component created inside another one (nested `startObject`) left `prevThat === that` after the outer one. | The saved `that` is a stack: `prevThat` is the object before the outer component. |
| `mergeIntoIfMissing` (and `props()`, `startObject()`) replaced an object at the depth limit (the 5th level) with an empty `{}`: the keys under it were lost. | The object is added as it is (by reference). |
| `basic.storage.save()` / `has()` / `remove()` threw where `localStorage` can not be used (a sandboxed iframe, blocked site data, a full quota) and stopped the calling code. | They do not throw; `save()` returns 1 or 0. |
| `Sound.load()` a second time kept playing the first file (a changed `<source>` is not read again). Every file but `.mp3` got the type `audio/wav`. | `load()` calls `audio.load()`; the type comes from the extension (`mp3`, `wav`, `ogg`, `m4a`, `aac`, `webm`), none for an unknown one. |

---

### New properties (every object: Box, Label, Button, Input, Icon)

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

### New methods (every object)

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

### Input

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

### Label

```js
Label({ text: "Çığ gibi", fontSize: 40, height: 44, clipContent: 0 });  // the letters out of the line box (g, ş, ğ) are not cut
that.clipContent = 1;          // default: the text is cut at the edges of the label (basic.css: overflow hidden)
```

`clipContent: 0` also shows a text that does not fit (it goes out of the label). `ellipsis: 1` always cuts, `"..."` needs it.
Only Label (and Box, as before) has it: a Button's lift or shadow is cut by the Box it is in, so give that Box `clipContent: 0`.

**Every Box and every group (HGroup / VGroup / AutoLayout) cuts by default** (`clipContent: 1`, `overflow: hidden`). Anything that goes past the edge is cut: a button or a picture that lifts / grows under the mouse (`translateY`, `scale`), a `boxShadow`, a glow, a focus outline, an object that slides in. A group as high as its content (`height: "auto"`, `hug: 1`) cuts a lifted button at once. Give the groups around moving objects `clipContent: 0`, and check every box up to the page (one that cuts is enough). Keep `1` only where cutting is the point (round picture frames, a background picture, a scrolling list).

### Icon

```js
Icon(0, 0, 80, 80, { alt: "Product photo", imageFit: "cover" });   // object-fit: cover | contain | fill | none | scale-down
that.load("img/photo.png");   // without alt, load() writes the path as alt (previous behaviour)
```

### Groups (HGroup, VGroup, AutoLayout)

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

### createIn() — create objects inside an existing box

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

### page

```js
page.title = "My App";                                  // document.title
const remove = page.on("keydown", (self, event) => {}); // window events, returns the remover
page.off("keydown", fn);
page.onKeyDown(fn);  page.remove_onKeyDown(fn);
```

### basic.*

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

### Compatibility check

- 137 sample and template pages of this repository were loaded in headless Chrome with v26.09.17 and with v26.09.18. The normalized DOM (tags, classes, inline styles, texts) was **identical on all 137 pages**; there was no new console error.
- `test/basic-test.htm` runs 87 checks (old API, fixes, every new feature) with the source and with the min file: all pass.

---

## Maintenance

- `basic/basic.js` is the maintained source. After editing it, rebuild the min file:
  ```
  npx terser basic/basic.js --compress --mangle --comments "/Bismillah|basic\.js \(v/" -o basic/basic.min.js
  ```
  then open `test/basic-test.htm` (the source) and the same page with `basic.min.js`: the tab title must say `ALL PASS`.
- A new change: the version in the header of `basic/basic.js` and in `basic.version` (and the check of `basic.version` in `test/basic-test.htm`), a section here, a line in `__handbook/*/00-what-is-new.md`.
- The timer checks of the test wait for their result (up to 4 s), not for a fixed time: Chrome slows the timers of a tab in the background down to about 1 s.
- `basic/backup/v26.09.17/basic-bugra.js` is frozen at v26.09.17 for reference; do not edit it.
- `experimental/_make_basic_ai.py` is the script that derived v26.09.18 from v26.09.17 (anchored text edits). It is kept as a record of the changes; it writes to `basic/basic-regenerated.js` by default and must not overwrite `basic.js`.
- Template folders that keep their own copy of the library (`04-template-m1/todo-app/library/`) keep their old version on purpose.
