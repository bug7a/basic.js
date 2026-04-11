# basic.js — Label (Text Object)

In the `basic.js` library, the `Label()` object is used to display texts, titles, or descriptions that cannot be directly modified by users (but whose properties can always be updated via JavaScript).

---

## Creating a Label

The standard way to create a `Label`:

```javascript
window.onload = function() {

    Label({ 
        left: 20, 
        top: 20, 
        text: "Hello basic.js",
        fontSize: 24,
        textColor: "#4A4A4A"
    });

}
```

---

## Parameters and Properties

### Appearance and Size
- `text` (string) — The text to be displayed (supports HTML codes).
- `fontSize` / `textSize` (number) — Text size (Default: `20`).
- `textColor` (string) — Text color (Default: `"rgba(0, 0, 0, 0.8)"`).
- `textAlign` (string) — Text alignment (Default: `"left"`, alternatives can be `"center"`, `"right"`).
- `color` (string) — Background color of the Label (Default: `"transparent"`).

### Inner Spacing (Padding)
- `padding` (number / array) — Defines the inner spacing (in pixels) inside the box (Default: `0`).
    - When only a number is given, it is applied from all sides: `padding: 10`
    - Custom definitions can be made with an array as `[vertical, horizontal]` or `[top, right, bottom, left]`: `padding: [10, 20]`, `padding: [5, 10, 15, 20]`

---

## Examples

### Example 1: Multi-Line Title and Text Group

Readable titles and descriptions can be created by lining them up inside HGroup and VGroup.

```javascript
window.onload = function() {

    VGroup({ align: "top left", gap: 10, padding: 20 });

        Label({ 
            text: "User Agreement", 
            fontSize: 24, 
            textColor: "dodgerblue" 
        });

        Label({ 
            text: "Please carefully read and accept the items below.", 
            fontSize: 14, 
            textColor: "gray" 
        });

    endGroup();

};
```

### Example 2: Clickable Texts

Although Button (`Button`) is recommended for this job, the Label element can also act like a button in desired situations. An event trigger can be attached.

```javascript
const labelStyle = {
    textColor: basic.ACTION_COLOR,
    color: "whitesmoke",
    padding: [20, 4],
    round: 13,
    border: 1,
    borderColor: Black(0.1),
};

const lblLink = Label({
    left: 50,
    top: 50,
    text: "Click Here",
    ...labelStyle,
});
// Changing the cursor is a good user experience (UX) practice.
lblLink.elem.style.cursor = "pointer";

lblLink.on("click", function() {
    println("Label element clicked.");
});
```

---

## Summary
- `Label()` → Places HTML-supported texts or titles on the screen.
- Thanks to its box model (width, height, inner spacing), it provides a much more stable and orderly layout compared to plain text when added inside alignment groups like `HGroup` and `VGroup`.
- Visually appealing pill-shaped tag designs can be created using inner spaces (`padding`).
