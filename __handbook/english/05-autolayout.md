# basic.js — Autolayout

In the `basic.js` library, the **`HGroup()`** and **`VGroup()`** functions are used to automatically align objects on the screen. These functions use the CSS Flexbox infrastructure to line up objects horizontally or vertically.

---

## Basic Objects

- `Box()` — Box object (div)
- `Label()` — Text label
- `Button()` — Button
- `Icon()` — Image / Icon
- `Input()` — Text input field

---

## Position Behavior (Very Important!)

The default `.position` value of basic objects is **`"absolute"`**.

- **Absolute (Default):** The object **is not displayed** on the screen unless position values like `top` and `left` are given (the object is created off-screen).
- **Relative (Inside a group):** If an object is created inside `HGroup()` or `VGroup()`, its `.position` value automatically becomes **`"relative"`**. In this way, the object **automatically gets in line** without specifying a position.

```javascript
// ❌ Outside a group: position = "absolute" (invisible if no position is given)
Label({ text: "Hello" });  // No position → invisible on screen

// ✅ Inside a group: position = "relative" (automatic alignment)
HGroup();
    Label({ text: "Hello" });  // Automatically gets in line
endGroup();
```

---

## HGroup() — Horizontal Grouping

Aligns the objects inside it side by side **horizontally**.

```javascript
HGroup({ /* parameters */ });

    // Objects are added here...

endGroup();
```

## VGroup() — Vertical Grouping

Aligns the objects inside it one under another **vertically**.

```javascript
VGroup({ /* parameters */ });

    // Objects are added here...

endGroup();
```

> **Note:** After every `HGroup()` or `VGroup()` call, it **must be closed with `endGroup()`**. The same `endGroup()` function is used for both.

> **Default Size:** HGroup and VGroup objects are created with the values `left: 0`, `top: 0`, `width: "100%"`, `height: "100%"` by default. Meaning, if no parameters are given, it completely fills its container. If the `fit: 1` parameter is given, the group object strictly wraps the objects inside it (`width: "auto"`, `height: "auto"`).

---

## Parameters

The `HGroup()` and `VGroup()` functions take a parameter object. Available parameters:

### Layout Parameters

- `align` (string, default: `"center"`) — Alignment direction of contents.
- `gap` (number / string, default: `"0px"`) — Spacing between objects (pixels).
- `padding` (number / array) — Inner margin. A single value or an array like `[horizontal, vertical]`.
- `fit` (boolean) — If `true`, the size is automatically adjusted according to the content (`width/height: "auto"`).
- `flow` (string) — Flow direction. HGroup: `"horizontal"`, VGroup: `"vertical"`. Set automatically.

### align Values

The `align` parameter provides two-way alignment:

- `"top left"` — Top left
- `"top center"` — Top center
- `"top right"` — Top right
- `"center left"` — Center left
- `"center"` — Exact center (default)
- `"center right"` — Center right
- `"bottom left"` — Bottom left
- `"bottom center"` — Bottom center
- `"bottom right"` — Bottom right

> **Tip:** The direction order can be changed. `"left top"` and `"top left"` give the same result.

### Appearance Parameters (Common with Box)

- `width` (number / string) — Width (e.g.: `200`, `"100%"`, `"auto"`, `"calc(100% - 20px)"`).
- `height` (number / string) — Height.
- `color` (string, default: `"transparent"`) — Background color.
- `border` (number) — Border thickness.
- `borderColor` (string) — Border color.
- `round` (number) — Corner roundness.

---

## Adding Objects to a Group Later (.add)

Objects created outside can be added later to a group that has been closed with `endGroup()` using the `.add()` method.

**Important:** The `.position` value of an object created outside a group is `"absolute"` by default. In this case, there are two options:

1. Create it with `position: "relative"` and include it in the automatic alignment.
2. Manually position it inside the group box by giving position values like `top` / `left`.

```javascript
// Create and close the group
const grp = HGroup({ align: "center", gap: 10 });

    Box({ width: 40, height: 40, color: "tomato" });

endGroup();

// Create a new object outside
const lbl = Label({ text: "Added Later" });

// Move to the group (position is still "absolute")
grp.add(lbl);

// Option 1: Change position for automatic alignment
lbl.position = "relative";

// Option 2: Position manually inside the group by giving coordinates (remains absolute)
// lbl.top = 10;
// lbl.left = 50;
```

---

## Examples

### Example 1: Simple Horizontal Alignment

Aligns three boxes side by side:

```javascript
window.onload = function() {

    const BOX_SIZE = 50;

    HGroup({ align: "center", gap: 10 });

        Box({ width: BOX_SIZE, height: BOX_SIZE, color: "tomato" });
        Box({ width: BOX_SIZE, height: BOX_SIZE, color: "gold" });
        Box({ width: BOX_SIZE, height: BOX_SIZE, color: "dodgerblue" });

    endGroup();

};
```

### Example 2: Vertical Label List

Aligns labels one under the other:

```javascript
window.onload = function() {

    VGroup({ align: "top left", gap: 4, padding: 20 });

        Label({ text: "Row 1" });
        Label({ text: "Row 2" });
        Label({ text: "Row 3" });

    endGroup();

};
```

### Example 3: Nested Groups

A horizontal row inside a vertical group:

```javascript
window.onload = function() {

    VGroup({ align: "top center", gap: 15, padding: 20 });

        Label({ text: "Title", fontSize: 24 });

        // Buttons side by side
        HGroup({ gap: 10, fit: 1 });

            Button(0, 0, 100, 40, { text: "Yes", color: "dodgerblue", textColor: "white" });
            Button(0, 0, 100, 40, { text: "No", color: "lightgray" });

        endGroup();

    endGroup();

};
```

### Example 4: Information Card

A card-like structure — containing an icon, title, and description:

```javascript
window.onload = function() {

    page.color = "#F0F2F5";

    // Center the card on the page
    HGroup();

        initCard({
            title: "Welcome",
            description: "Develop easy interfaces with basic.js.",
            button1: "Yes",
            button2: "No",
        });

    endGroup();

};

const initCard = function(params = {}) {

    const defaults = {
        title: "title-text",
        description: "description-text",
        button1: "button1-text",
        button2: "button2-text",
        button1Color: "dodgerblue",
        button2Color: "lightgray",
    };

    // Merge params:
    mergeIntoIfMissing(params, defaults);

    const initView = function(params) {

        const { title, description } = params;

        VGroup({
            align: "top center",
            width: "auto",
            height: "auto",
            color: "white",
            padding: 30,
            gap: 10,
            border: 1,
            round: 8,
            borderColor: "lightgray",
        });

            Label({ text: params.title, fontSize: 22 });
            Label({ text: params.description, fontSize: 14, textColor: "gray" });

            initButtons(params);

        endGroup();

    };

    const initButtons = function(params) {

        const { button1, button2, button1Color, button2Color } = params;

        HGroup({ gap: 10, align: "center" });

            Button(0, 0, 120, 40, { 
                text: button1, 
                color: button1Color, 
                textColor: "white", 
                round: 6 
            });

            Button(0, 0, 120, 40, { 
                text: button2, 
                color: button2Color, 
                textColor: "white", 
                round: 6 
            });

        endGroup();

    };

    initView(params);

};


```

### Example 5: Creating Objects Using a Loop

Creating objects over an array via a loop:

```javascript
const ITEMS = ["ID", "Name", "Email"];

window.onload = function() {

    HGroup({ align: "center", gap: 4, padding: 20 });

        ITEMS.forEach(text => {
            Label({
                text: text,
                color: "lightgray",
                round: 6,
                padding: [12, 6],
            });
        });

    endGroup();

};
```

---

## Summary

- `HGroup()` → Horizontal alignment → is closed with `endGroup()`.
- `VGroup()` → Vertical alignment → is closed with `endGroup()`.

- Objects inside the group automatically become `position: "relative"`.
- Objects outside the group remain `position: "absolute"` and position (top, left) must be specified.
- `endGroup()` is the same for both group types.
- Groups can be nested.
