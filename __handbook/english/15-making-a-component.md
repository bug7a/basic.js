# basic.js — Making a Component

A component is a function that makes a `Box`, puts its parts in it and gives the box back. A page then uses it like any object of basic.js (`14-using-components.md`). This chapter makes one: `StarRating`, a row of stars that the user clicks to give a rating. The components of OzdenUI are written the same way; the full starting point of the kit is its `_component-template.js`.

---

## The Whole Component

```javascript
"use strict";

// Default values:
const StarRatingDefaults = {
    key: "0", // Your name for this object: read it in a callback (self.key)
    width: "auto",
    height: "auto", // It grows with its group of stars.
    value: 0, // 0 ... maxValue
    maxValue: 5,
    enabled: 1,
    ariaLabel: "Rating",
    onChange: function (self) { }, // Not at create time, not with setValue(value, 1)
    styleName: "light", // "light", "dark" or a name added to StarRating.styles
    style: { // The light style package (the default)
        layout: { gap: 4 },
        star: { fontSize: 28, textColor: Black(0.2) },
        on: { textColor: "#F2B01E" },
        disabled: { opacity: 0.45 },
        focus: { ringColor: "rgba(95, 158, 160, 0.6)" },
    },
};

const StarRating = function (params = {}) {

    // Merge the style package: params.style > StarRating.styles[styleName] > StarRatingDefaults.style
    basic.applyStylePackage(params, StarRating.styles, StarRatingDefaults);

    // Merge the params:
    mergeIntoIfMissing(params, StarRatingDefaults);

    // BOX: the container of the component
    let box = startObject(params);

    // *** PRIVATE VARIABLES:
    const _s = box.style;

    // *** PUBLIC VARIABLES:
    box.stars = []; // The Labels of the stars
    // NOTE: The defaults are public variables too: box.value, box.maxValue, box.enabled...

    // *** PRIVATE FUNCTIONS:

    // PAINT: the look of the value and of the state
    const paint = function () {
        box.stars.forEach(function (star, index) {
            star.textColor = (index < box.value) ? _s.on.textColor : _s.star.textColor;
            star.cursor = (box.enabled == 1) ? "pointer" : "default";
        });
        box.opacity = (box.enabled == 1) ? 1 : _s.disabled.opacity;
        box.tabIndex = (box.enabled == 1) ? 0 : -1;
        box.aria = { valuenow: box.value, disabled: (box.enabled != 1) };
    };

    // *** PUBLIC FUNCTIONS:

    // silent: 1 -> onChange is not called.
    box.setValue = function (value, silent = 0) {
        value = Math.max(0, Math.min(box.maxValue, Math.round(value)));
        if (value === box.value) return;
        box.value = value;
        paint();
        if (!silent) box.onChange(box);
    };
    // USAGE: get: rating.value, set: rating.setValue(4)

    box.setEnabled = function (value) {
        box.enabled = basic.isOn(value) ? 1 : 0;
        paint();
    };
    // USAGE: rating.setEnabled(0)

    // *** OBJECT VIEW:

    box.role = "slider";
    box.aria = { label: box.ariaLabel, valuemin: 0, valuemax: box.maxValue };

    // GROUP: the stars in a row
    box.layout = HGroup({ hug: 1, position: "relative", align: "left center", ..._s.layout });

        for (let number = 1; number <= box.maxValue; number++) {
            const star = Label({ text: "★", ..._s.star });
            star.on("click", function () {
                if (box.enabled != 1) return;
                box.setValue(number);
            });
            box.stars.push(star);
        }

    endGroup();

    // *** OBJECT INIT CODE:

    // KEYBOARD: the arrows change the value. The ring is shown only for the keyboard.
    box.setFocusRing(_s.focus.ringColor);
    box.on("keydown", function (self, event) {
        if (box.enabled != 1) return;
        const isUp = (event.key === "ArrowRight" || event.key === "ArrowUp");
        const isDown = (event.key === "ArrowLeft" || event.key === "ArrowDown");
        if (!isUp && !isDown) return;
        event.preventDefault(); // WHY: the arrows must not scroll the page
        box.setValue((isUp) ? box.value + 1 : box.value - 1);
    });

    paint();

    return endObject(box);

};

// *** STYLE PACKAGES:
// NOTE: A package has only the keys that differ from the default (light) style.
StarRating.styles = {
    light: StarRatingDefaults.style,
    dark: {
        star: { fontSize: 28, textColor: White(0.25) },
        focus: { ringColor: "rgba(95, 179, 181, 0.7)" },
    },
};
```

Using it:

```javascript
const start = function () {

    page.color = "whitesmoke";

    VGroup({ gap: 16 });

        const lblInfo = Label({ text: "Rate this page", fontSize: 18 });

        const rating = StarRating({
            value: 3,
            onChange: function (self) {
                lblInfo.text = "Rating: " + self.value;
            },
        });

    endGroup();

};
```

The parts of it, one by one:

---

## 1. The Defaults

- **`StarRatingDefaults`** holds every param with its default value and a comment. `mergeIntoIfMissing(params, StarRatingDefaults)` fills the params that were not given (it changes `params`).
- **After `startObject()` every param is a property of the box:** `box.value`, `box.maxValue`, `box.onChange`. A page reads them the same way: `rating.value`.
- **The names** come from the table of `14-using-components.md` ("The Names of the Params"): `value`, `maxValue`, `enabled`, `ariaLabel`, `onChange(self)`.
- **A default is never named like a setter of basic.js:** `text`, `color`, `title`, `html`, `visible`, `zoom`... The box has these setters already: `text` would write on the box, `html` would wipe its parts. Use `labelText`, `htmlText`, `scale`.
- **Read `"auto"` and `"100%"` from `params`, before `startObject()`:** after it, `box.width` and `box.height` are the measured numbers.

```javascript
const isAutoHeight = (String(params.height) === "auto");
let box = startObject(params);
```

---

## 2. The Box and Its Parts

- **`startObject(params)`** makes the box of the component. The objects made until `endObject(box)` go into it, and `endObject(box)` gives the box back and makes `that` the component.
- **Keep the parts on the box with a name** (`box.layout`, `box.stars`): the functions of the component, a page and a component made from it reach them there.
- **A group places the parts** (`box.layout`). A box with `height: "auto"` grows only with what is in the flow: the group gets `position: "relative"` (`hug: 1` makes its width and height `"auto"`).
- **One component, one file**, named like it (`star-rating.js`), with a header comment at the top: its name and version, what it does, its `USAGE` lines.
- **The sections** are in the same order in every component: `// *** PRIVATE VARIABLES:`, `// *** PUBLIC VARIABLES:`, `// *** PRIVATE FUNCTIONS:`, `// *** PUBLIC FUNCTIONS:`, `// *** OBJECT VIEW:`, `// *** OBJECT INIT CODE:`, then `// *** STYLE PACKAGES:` after the function.
- **A default icon is an SVG in the file** (`"data:image/svg+xml;utf8," + encodeURIComponent('<svg ...>')`), so a copy of the file works alone. Other files go into a folder with the same name (`star-rating/`).
- **A text goes in with `plainText`** (`Label.text` is HTML). When the texts of the component may be HTML of the page, it has an `allowHtml: 0` param and one `setText(label, text)` that writes `text` or `plainText` (`comp/dialog.js`). `test/components-test.htm` checks every `...Text` param.

---

## 3. Drawing the State

- **One function draws the look of the state:** `paint()`. Every change calls it, so no setter can forget a part.
- **A bigger component splits its drawing by job:** `applyContent()` (the texts, the icon), `paint()` (the colors of the state), `refreshLayout()` (what depends on the sizes), `drawAll()` (all of them). A change calls only the one it needs: the mouse over it only paints.
- **The state is decided in one place:** a `getState()` that gives `"normal"`, `"hover"`, `"selected"` or `"disabled"`, read by `paint()`.

---

## 4. setX() Functions

A value that can change after the component is made gets a setter with its name: `setValue()`, `setEnabled()`. It checks, saves, draws and tells, in this order:

```javascript
box.setValue = function (value, silent = 0) {
    value = Math.max(0, Math.min(box.maxValue, Math.round(value)));
    if (value === box.value) return;   // nothing changed: no drawing, no event
    box.value = value;                 // save
    paint();                           // draw
    if (!silent) box.onChange(box);    // tell
};
```

A param is a plain property with a `setX()`, never a JavaScript getter / setter (`get value()`).

---

## 5. Events

- **An event is a default that holds a function:** `onChange: function (self) { }`. The component calls it with itself first: `box.onChange(box)`.
- **`onChange` is called only when the value really changed:** not at create time, not with `silent: 1`.
- **The events of the parts:** `star.on("click", ...)`. `on()` makes the object clickable.

---

## 6. Style Packages

- **`basic.applyStylePackage(params, StarRating.styles, StarRatingDefaults)` is the first line.** The style of the box is then: `params.style` over the package of `styleName` over the default style. The package is copied, never changed.
- **`StarRating.styles.light` is the default style;** another package has only the keys that differ (`dark`).
- **The component reads its style through `_s`** (`const _s = box.style`).
- **A page can add its own package:**

```javascript
StarRating.styles.red = { on: { textColor: "tomato" } };
StarRating({ styleName: "red", value: 4 });
```

- **Keep the style flat:** a part and its keys (`star: { fontSize, textColor }`). `mergeIntoIfMissing` copies 4 levels; deeper objects are shared.

---

## 7. The Keyboard and the Screen Reader

- **`box.role` and `box.aria`** tell a screen reader what the component is: `role: "slider"`, `aria-valuenow`, `aria-valuemax`. `box.aria = { ... }` sets only the keys it is given.
- **`box.tabIndex = 0`:** the Tab key reaches it; `-1` while it is disabled.
- **`box.setFocusRing(color)`:** a ring for the keyboard focus, not after a click.
- **Enter and Space** act like a click on a component that is pressed; **the arrows** change a value. `event.preventDefault()` keeps the page from scrolling.

---

## 8. Motion

- **A component that moves gets an `animated` param** (`1` / `0`) and a `setAnimated()`. `animated: 0` leaves it exactly still.
- **Small and quiet:** one duration and one curve, `0.25s cubic-bezier(0.2, 0.8, 0.2, 1)`; only `transform`, `opacity` and `box-shadow` move; nothing moves at the first view. The motion is set with `setMotion()` (`10-motion.md`).
- **Less motion:** when the system asks for it, the component does not move:

```javascript
const isMotionOn = function () {
    if (box.animated != 1) return false;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};
```

---

## 9. Cleaning Up

`remove()` of basic.js removes the box with its parts and their events. A global thing registered through the box goes with it too, so most components need no `remove()` of their own:

```javascript
box.listenTo(window, "keydown", function (self, event) { ... }); // not window.addEventListener
box.onPageResize(function () { ... });                            // not page.onResize
box.after(300, function () { ... });                              // not setTimeout
box.every(1000, function () { ... });                             // not setInterval
```

- **A list or a menu over everything** is made on `page` and kept with `box.own()`: it is removed with the component. When it opens from a field in a `Dialog`, `basic.zIndexAbove(box, minimum)` gives a z-index over the layer of the field.

```javascript
box.menu = box.own(createIn(page, function () {
    return Box({ width: 200, height: 120, color: "white", visible: 0 });
}));
box.menu.zIndex = basic.zIndexAbove(box, 100);
```

- **Override `remove()` only for what basic.js can not know** (a list of all the components, an observer):

```javascript
// WHY the local copy: a component made from this one writes its own box.superRemove.
const superRemove = box.remove;
box.superRemove = superRemove;
box.remove = function () {
    if (!box) return;                 // WHY: remove() can be called twice (also by the parent's remove())
    StarRating.all = StarRating.all.filter(function (other) { return other !== box; });
    superRemove.call(box);            // the remove() of basic.js: the parts and their events
    box = null;                       // so the box is declared with let
};
```

- **A component never has a `destroy()`:** everything goes with `remove()`.

---

## 10. A Component Made from Another

`startExtendedObject(StarRating, params)` makes a `StarRating` and gives its box; the new code adds to it, and `endExtendedObject(box)` makes `that` the new component. Its file loads after the file of `StarRating`.

```javascript
// A StarRating that also writes its value: "3 / 5".
const StarRatingWithText = function (params = {}) {

    // BOX: the box of a StarRating, with its stars
    const box = startExtendedObject(StarRating, params);

    // *** PUBLIC FUNCTIONS:
    // WHY the saved function: the new setValue() calls the one of StarRating, then writes the text.
    const superSetValue = box.setValue;
    box.setValue = function (value, silent = 0) {
        superSetValue(value, silent);
        box.lblValue.text = box.value + " / " + box.maxValue;
    };

    // *** OBJECT VIEW:
    // WHY createIn(): the objects made here would go into the container of the page, not into the box.
    box.lblValue = createIn(box.layout, function () {
        return Label({ text: box.value + " / " + box.maxValue, fontSize: 16, textColor: Black(0.5) });
    });

    return endExtendedObject(box);

};
```

The clicks and the arrows of `StarRating` call `box.setValue()`, so they reach the new one too.

---

## A Short Check

1. Every param is in `XxxDefaults`, with a comment, under a name of the table.
2. No default is named like a setter of basic.js (`text`, `color`, `title`, `html`, `visible`, `zoom`).
3. A value that changes has a `setX()`; `onChange(self)` is called only when it really changed.
4. It has a `light` and a `dark` package.
5. The keyboard reaches it and uses it; it has a `role`, its `aria` keys and a focus ring.
6. A global thing is registered through the box, so `remove()` alone cleans it.
7. A copy of its file works alone: its icons are in it.
