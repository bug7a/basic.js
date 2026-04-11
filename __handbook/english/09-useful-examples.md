# basic.js — Useful Examples

The useful code snippets below demonstrate how to practically manipulate CSS properties through JavaScript while using basic.js, and how common GUI (interface) needs can be solved using library objects.

---

## Box Shadow
To add depth (shadow) to objects, standard CSS shadow definitions can be used through the element (`elem`) properties of the object.

```javascript
window.onload = function() {

    page.color = "whitesmoke";

    VGroup({ gap: 20 });

        // Example 1: Sharp shadow towards bottom-right
        Box({ color: "white" });
        that.elem.style.boxShadow = "2px 3px 6px rgba(0, 0, 0, 0.6)";

        // Example 2: Soft glowing shadow around center
        Box({ color: "white" });
        that.elem.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.2)";

    endGroup();

};
```

---

## Inner and Outer Borders (Spaceless)
Using the object's own `border` property may shift dimensions. Instead, you can create inner or outer borders without affecting layout using the box-shadow trick.

```javascript
window.onload = function() {

    VGroup({ gap: 20 });

        // Inner border
        Box({ color: "white", round: 20 });
        that.elem.style.boxShadow = "inset 0px 0px 0px 1px rgba(0, 0, 0, 1)";

        // Outer border
        Box({ color: "white", round: 20 });
        that.elem.style.boxShadow = "0px 0px 0px 1px rgba(0, 0, 0, 1)";

    endGroup();

};
```

---

## Nowrap & Ellipsis Text
To prevent long text from wrapping or to truncate it with ellipsis (`...`) when it overflows, CSS white-space rules are used.

```javascript
window.onload = function() {

    // Prevent wrapping only (overflow allowed)
    Label(20, 80, 200, {
        text: "A label that stays on a single line no matter how long it is.",
        color: "peru",
    });
    that.elem.style.whiteSpace = "nowrap";

    // Prevent wrapping and truncate with ellipsis
    Label(20, {
        text: "A label that is too long to fit in the box",
        color: "peru",
        bottom: 80,
        width: 200,
    });
    that.elem.style.whiteSpace = "nowrap";
    that.elem.style.textOverflow = "ellipsis";

};
```

---

## Pointer Cursor
Changing the mouse cursor to a pointer (hand) when hovering over an object/text gives a strong indication that it is clickable.

```javascript
window.onload = function() {

    Label({
        text: "Click Me",
        border: 1, 
        padding: [12, 4], 
        round: 3, 
        clickable: 1,
    }).center();

    that.elem.style.cursor = "pointer";

};
```

---

## Mouse Events
Besides `.on("click")`, you can also listen to native DOM events like `mouseover` and `mouseout`.

```javascript
window.onload = function() {

    const lbl = Label(20, 20, {
        text: "Hover over me!",
        round: 12, 
        padding: [12, 6], 
        clickable: 1,
    });

    lbl.on("mouseover", function() {
        lbl.color = "indianred";
    });

    lbl.on("mouseout", function() {
        lbl.color = "transparent";
    });

};
```

---

## Overflowing Content (clipContent)
By default, objects use `clipContent: 1` (overflow: hidden). If child elements need to overflow outside the container, use `clipContent: 0` (overflow: visible).

```javascript
window.onload = function() {

    HGroup();

        const box = Box({ 
            color: "orange", 
            clipContent: 0 
        });

    endGroup();

    Label({
        text: "A text that extends far beyond the container boundaries.",
        left: 10, 
        top: 10, 
        width: "auto", 
        color: "yellow",
    });
    box.add(that);
    that.elem.style.whiteSpace = "nowrap";

};
```

---

## Gradients
Enhance UI with linear, radial, or conic gradients using CSS background.

```javascript
window.onload = function() {

    VGroup({ gap: 8 });

        Box({ width: 200 });
        that.elem.style.background = "linear-gradient(to right, #FFFFFF00, seagreen)";

        Box({ width: 200 });
        that.elem.style.background = "linear-gradient(to bottom, pink, purple, indianred)";

        Box({ width: 200 });
        that.elem.style.background = "radial-gradient(gold, indianred, black)";

        Box({ width: 200 });
        that.elem.style.background = "conic-gradient(red, yellow, green, blue, black)";

    endGroup();

};
```

---

## CSS Filters
You can quickly adjust color, blur, and contrast of an `Icon` or any object.

```javascript
window.onload = function() {

    Icon(10, 10, 100, 100, { border: 1 }).load("test.png");

    that.elem.style.filter = "grayscale(100%)";

    Icon(10, 118, 100, 100, { border: 1 }).load("test.png");
    that.elem.style.filter = "invert(100%)";

};
```

---

## Custom Fonts
You can assign custom fonts (Google Fonts or external fonts) directly.

```javascript
window.onload = function() {

    Label(20, 20, { text: "Custom Font Example" });

    that.elem.style.fontFamily = "opensans-bold";

};
```

---

## Transform & Scale
You can scale elements and add animations using CSS transform.

```javascript
window.onload = function() {

    HGroup();

        const lbl = Label({ 
            text: "Hover Effect", 
            color: "white", 
            padding: 10, 
            clickable: 1,
            round: 13,
        });

        lbl.elem.style.transform = "scale(1)";
        lbl.elem.style.transformOrigin = "50% 50%";

        lbl.setMotion("transform 0.5s, background-color 0.5s");

        lbl.on("mouseover", function(self) {
            self.color = "indianred";
            self.element.style.transform = "scale(1.2)";
        });

        lbl.on("mouseout", function(self) {
            self.color = "white";
            self.element.style.transform = "scale(1)";
        });

    endGroup();

};
```

---

## Selectable Text
Text selection is disabled by default. You can enable it if needed.

```javascript
window.onload = function() {

    Label(10, 10, { text: "Selectable text..." });

    that.elem.style.userSelect = "text";
    that.elem.style.pointerEvents = "auto";

};
```

---

## Adding CSS Classes
You can attach predefined CSS classes.

```javascript
window.onload = function() {

    Box(10, 10, 50, 50, { color: "red" });

    that.elem.classList.add("highlight");

};
```

---

## Custom Borders
You can define borders individually per side.

```javascript
window.onload = function() {

    page.color = "whitesmoke";

    Box({ 
        right: 40,
        bottom: 40,
        width: 300, 
        height: 300, 
        color: "rgba(255, 255, 255, 0.7)" 
    });

    that.elem.style.borderTop = "2px dotted rgba(0, 0, 0, 0.9)";
    that.elem.style.borderBottom = "5px solid rgba(0, 0, 0, 0.9)";

};
```
