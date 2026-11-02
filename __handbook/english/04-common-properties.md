# basic.js — Common Properties and Methods

The five core interface elements (**Box, Label, Button, Input** and **Icon**) in the `basic.js` library are common because they are derived from the same core object (`Basic_UIComponent`). This situation ensures that position, sizing, style assignment, and event listening actions can be performed with the same commands across all objects.

---

## Definition Cycle (that and prevThat)
When an object is created, it is automatically assigned to the global variable **`that`** to preserve its validity until a different object is created. The previously created object can be accessed via the **`prevThat`** variable.

```javascript
window.onload = function() {
    
    // 1st Object: RED BOX
    Box(10, 10, 100, 100, { color: "red" });

    // 2nd Object: BLUE BOX (This object became "that", while red became "prevThat")
    Box({ color: "blue" });

    // Make the blue box half the size of the Red box
    that.width = prevThat.width / 2;
    that.height = prevThat.height / 2;

    // Align the blue box to the right of the Red box
    that.aline(prevThat, "right", 5, "center");

};
```

---

## Positioning

### `object.left` and `object.top`
All dimensions and positions are pixel (`px`) based Float numbers, and a number is assigned directly (Ex: `15.5`). Since the default value is `"-1000"` (off-screen), objects are invisible until an assignment is made.
- `left` : specifies the distance of the object to the left screen edge.
- `top` : specifies the distance of the object to the top screen edge.

### `object.right` and `object.bottom`
Used to create objects aligned (attached) to the right or bottom. When `right` is used, the `left` rule is cancelled. Even if the window is resized, the distance (margin) in between is maintained.
- `right` : The distance of the object inwards from the right barrier.
- `bottom` : The distance of the object upwards from the bottom edge.

---

## Dimensioning

### `object.width` and `object.height`
Determines the width and height of the object in Float type, respectively.
Many objects support the `width: "auto"` parameter. Furthermore, it supports percentage like `width: "100%"` or calculated CSS variables like `"calc(100% - 10px)"`.

- Standard Box (`Box`) — Starts from `100x100` value.
- Standard Button (`Button`) — Starts from `130x50` value.

**Reading a size is a measurement.** When `width` / `height` is a string (`"100%"`, `"auto"`, `"calc(...)"`), or `left` / `top` of an object in a group, reading it asks the browser to lay out the page first. In a loop, do not mix writing and reading (write, `center()`, write again...): read all the values first, then write. Numbers that you gave yourself cost nothing to read.

---

## Visuals and Style

- `color` (String) — Sets the background color of the object (Ex: `"red"`, `"#FFFFFF"`, `"rgba(0,0,0,0.5)"`).
- `visible` (Boolean) — If `1`, it appears on the screen (CSS block); if `0`, it completely disappears and makes room for others (CSS none).
- `opacity` (Float) — Transparency level (Max: `1` visible, Min: `0` invisible).
- `round` (Integer) — The roundness radius degree of the corners. If the number exceeds half of the box, the object becomes oval (circle).
- `border` (Integer) — The border thickness defining the inner area boundaries (if `0` it's hidden, if `1` it's a thin black line). It does not overflow the object outward. It draws inwardly.
- `borderColor` (String) — Determines the color of the line if a border is assigned.
- `fontSize` / `textColor` / `textAlign` — If the object contains text, its style is modified. The standard font size is `20` px. Alignment (textAlign) can be `"center"`, `"right"`, etc.
- `rotate` (Integer) — Rotates the object (in degrees: `90`, `360`, etc.). It changes only the `rotate()` part of the CSS `transform`: a `translateY()` or `scale()` there stays. Animate it with `setMotion("transform 0.3s")`.

---

## Text: `text` and `plainText`

- `text` is HTML: `Label({ text: "<b>Total</b>: 12" })`. Use it for your own texts.
- `plainText` is never read as HTML. **Use it for every text that comes from a user or a server** (a name, a message, a file name): `lblName.plainText = user.name;`. A text like `<img onerror=...>` given to `text` would run as code.

### An icon that follows the text color

Write `stroke="currentColor"` (or `fill="currentColor"`) in an SVG inside a Label: the icon takes the `textColor` of the Label. Then a hover changes only `textColor`, the SVG is not written again:

```javascript
const btnClose = Label({
    text: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    textColor: "#999",
    lineHeight: "0",
    cursor: "pointer",
});
btnClose.onHoverChange(function (self, isOver) {
    self.textColor = (isOver) ? "tomato" : "#999";
});
```

---

## Accessibility: `role`, `aria`, `tabIndex` (v26.10.23)

A Label or a Box is a `<div>`: a screen reader does not know that it is a button or a tab. Tell it with these properties (they go to the element that takes the focus, the `<input>` of an Input):

- `role` (String) — `"button"`, `"tab"`, `"tree"`, `"dialog"`... `""` removes it.
- `aria` (Object) — `{ label: "Close", selected: true, level: 2 }` writes `aria-label`, `aria-selected`, `aria-level`. Only the given keys change. `true` / `false` become `"true"` / `"false"`; `null` removes the attribute. The keys are the ARIA names without `aria-` (`labelledby`, `activedescendant` are one word, as in ARIA).
- `tabIndex` (Number) — `0`: the Tab key reaches the object; `-1`: only `elem.focus()` of the code; `null`: the default.

```javascript
const btnSave = Label({ text: "Save", role: "button", tabIndex: 0, aria: { label: "Save the form" } });
btnSave.aria = { disabled: true }; // aria-label stays
```

---

## Functions and Events

### `object.props`
To change many variables of the object simultaneously, it is a practical style modification using an Object format.
`box.props({ width: 200, color: "black", round: 10 });`

### `object.clickable`
Determines whether the object will sense clicks (mouse / pointer) with a boolean `1` or `0`.

### `object.on` and `object.off`
All basic HTML DOM events can be listened to. For example: `click`, `mouseover`, `mouseout`. (Note: When `.on("click", ...)` or its formerly used name `.onClick()` is assigned to an object, it automatically switches to clickable mode (cursor) as `clickable = 1`). To stop listening, `.off(EventName, Function)` is used.

### `object.onResize`
Triggered when the dimensions of the created box change smartly (Also called 1 time when the object first exists from scratch to start screen tracking).

```javascript
let lblName = Label({ width: "auto", text: "Name Tag" });
lblName.onResize(function(resizedLabel) {
    // Always align to the center of the screen as the width of Label or Text content changes (auto)
    resizedLabel.center();
});
```

---

## Alignment

- `object.center()` / `object.centerBy(target)` — Centers the object to itself or aligns to the exact center of the targeted "target" object. By passing a parameter (`"top"` or `"left"`), you can have it perform only vertical/horizontal centering.
- `object.aline(target, direction, space, secondDirection)` — A very flexible set of alignment commands. It aligns relative to another UI Object you specified as target. Direction (`"left", "right", "top", "bottom"`) and the (`space`) pixel between objects can be specified.

*(Warning: The `center`, `centerBy`, and `aline` functions calculate when the object is `position = "absolute"` and align instantly for the 1 time they are called).*

---

## Motion / Animation

- `object.setMotion("rule time")` — Allows fluent, animated transition of all changes or assigned CSS string data (Ex: `opacity 0.5s`).
- `object.getMotion()` — Shows the assigned String-based motion command value.
- `object.withMotion(function)` — It is a smart function that sends the motion process to a very short delay (assigning a timestamp) so that the initial values do not jump.
- `object.dontMotion()` — The pause command that allows an object assigned a rule (if setMotion is applied) to skip the animation during an instant change.
- **A change in the same moment as `setMotion()` does not animate** (by design: the first values of a new object must not fly in). Change the value later (a click, a timer), or use `setMotionNow()` when it must animate at once.
- **Many moving objects with a shadow:** the shadows are painted again on every frame (300 cards: ~110 ms per frame, with `left` and with `translate`). Give them `css: { willChange: "transform" }`: each one gets its own layer and they move at 60 fps. Without shadows, `left` is fast enough.

---

## DOM and Parent Tree

- `object.elem` — It is the Element equivalent of the item created by the library directly under Javascript (Document Object Model). Everything can be manipulated with `elem.style`.
- `object.containerBox` or `object.parentBox` — Retrieves the Container variable (originating from the Box class) to which the object is added. (The `page` object is the global default container).
- `object.remove()` — Permanently deletes the object from the screen DOM model, from events, and from the parent tree. The basic.js objects inside it are removed too. Do not use a removed object again.
- **Components are removed with `remove()` too.** A component overrides `remove()` (`const superRemove = box.remove;` … `superRemove.call(box);`) and cleans its own global registrations there: `window` / `document` events, timers, `page.onResize` and the objects it created directly on `page` (menus, popups). So one call is enough: `myComponent.remove();`. (Older components had a separate `destroy()` function. `remove()` still calls a child's `destroy()` first, if it has one.)
