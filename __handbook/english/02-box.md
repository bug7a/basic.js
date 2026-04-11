# basic.js — Box (Box Object)

In the `basic.js` library, the `Box()` object is used to create basic rectangular or square views on the screen. It generally functions as a background, structural container, or to group other objects.

---

## Creating a Box

The standard way to create a `Box` is with a parameter object:

```javascript
window.onload = function() {

    const myBox = Box({ 
        left: 20, 
        top: 20, 
        width: 100, 
        height: 100, 
        color: "orangered" 
    });

}
```

Alternatively, it can also be created by directly providing coordinates and dimensions:
`Box(left, top, width, height, settings)`

---

## Basic Behavior

- Every object added inside a `Box` (`.add()`) references the coordinate system of the box.
- The default `position` value is `"absolute"`. If position (`left`, `top`) is not given, `-1000` is assigned as the starting point and it will not be on the screen (in the visible area).
- However, it can be automatically positioned with a function like `center()` found in the core feature set.

---

## Parameters and Properties

The main properties that can be assigned to a `Box()` object are:

### Appearance and Size
- `left` (number) — Horizontal (X-axis) position of the object.
- `top` (number) — Vertical (Y-axis) position of the object.
- `width` (number / string) — Width (e.g.: `200`, `"100%"`, `"auto"`, `"calc(100% - 20px)"`).
- `height` (number / string) — Height.
- `color` (string) — Background color (Default: `"whitesmoke"`).

### Border
- `border` (number) — Border thickness (Default: `0`).
- `borderColor` (string) — Border color (Default: `"rgba(0, 0, 0, 0.6)"`).
- `round` (number) — Corner roundness (Default: `0`).

### Scroll and Clip
- `clipContent` (boolean) — Whether content exceeding the dimensions will overflow outside the box boundaries (Default: `1`, meaning it hides overflow).
- `scrollX` (boolean) — Horizontal scrollbar active state.
- `scrollY` (boolean) — Vertical scrollbar active state.

---

## Adding Objects to the Box (.add() and .in())

### Adding with .add()
To add a created box inside another box or the page (`page`) (or to add an object to a box), `.add()` is used.

```javascript
const box1 = Box({ left: 10, top: 10, width: 200, height: 200, color: "lightgray" });
const box2 = Box({ left: 20, top: 20, width: 50, height: 50, color: "tomato" });

box1.add(box2); // box2 is added inside box1. Its coordinates are relative to box1.
```

### Creating Blocks with startBox() and endBox()
To create code blocks in a more readable tree format, you can use the `startBox()` and `endBox()` functions. When `startBox()` is called, the created box becomes the default container, and objects added inside it are directly placed into this box. When `endBox()` is called, this block is terminated and the default container returns to its previous state.

```javascript
startBox({ left: 0, top: 40, width: "100%", height: 100 });
    
    // Objects created between this block are directly added inside the box above.
    Label({ left: 10, top: 10, text: "This title is inside the box" });

endBox();
```

---

## Examples

### Example 1: Adding an Event Listener
Adding code to run when the box is clicked:

```javascript
window.onload = function() {

    const myBox = Box({ 
        width: 100, 
        height: 100, 
        color: "orangered" 
    });
    
    // Auto align the box to the center of the screen
    myBox.center();
    
    // Increase size when the box is clicked
    myBox.on("click", function() {
        myBox.width += 20;
        myBox.height += 20;
        myBox.center(); // Center again after growing
    });

}
```

---

## Summary
- `Box()` → Creates a basic rectangular or invisible container object.
- It is a core object where data can automatically be added inside (`.add()` or `startBox()`/`endBox()`).
- It has support for various appearances (color, corner, border), alignment, and scrolling.
