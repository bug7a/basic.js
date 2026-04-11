# basic.js — Button (Button Object)

In the `basic.js` library, the `Button()` object is used to interact with the user and detect clicks.

---

## Creating a Button

Standard creation process:
```javascript
window.onload = function() {

    const btnOk = Button({ 
        left: 20, 
        top: 20, 
        text: "Accept" 
    });

}
```

Alternative (Fast) Parameter Format:
`Button(left, top, width, height, settings)`

---

## Parameters and Properties

### Appearance
- `text` (string) — The text on the button.
- `color` (string) — Button background color (Default: `basic.ACTION_COLOR`).
- `textColor` (string) — Button text color.
- `fontSize` (number) — Button text size (Default: `20`).
- `minimal` (boolean) — Deletes the button's background and borders to provide a plain (text link-like) appearance (Takes a value of `1` or `0`).

### Behavior
- `enabled` (boolean) — Whether the button is clickable (Takes a value of `1` or `0`, default: `1`).
- `value` (string) — A property that can be used for hidden/invisible data intended to be carried in the background along with the button.

### For Alignment
- Like other basic objects, it supports the `left`, `top`, `width`, `height`, `right`, `bottom` parameters. Its default width is `130px` and height is `50px`.

---

## Button Events

The use of `.on("click", function)` is standardized in buttons.

```javascript
window.onload = function() {

    const btn = Button(40, 40, 180, 50, { 
        text: "HELLO",
        color: "orangered",
    });

    btn.on("click", function() {
        println("Button Clicked!");
    });

};
```

---

## Examples

### Example 1: Minimal Buttons

The minimal property is generally useful in menu navigations, or dialog buttons like warning or cancel.

```javascript
window.onload = function() {
    
    HGroup({ align: "center", gap: 10 });
    
        Button({ text: "OK", color: basic.ACTION2_COLOR });

        Button({ 
            text: "Cancel", 
            color: "transparent", 
            border: 1, 
            borderColor: Black(0.05), 
            minimal: 1 
        }); // It will look just like clickable plain text

    endGroup();
    
};
```

---

## Summary
- `Button()` → Creates clickable interface elements.
- Click events are listened to with `.on("click", ...)`.
- With the `.minimal` parameter, it can transform into a pure text button with a transparent background.
- Different objects SHOULD NOT be added inside it with `.add()`. Although the `.add()` function is structurally supported, its usage is not valid for buttons.
