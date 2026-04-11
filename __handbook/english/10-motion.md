# basic.js — Motion (Movement and Animations)

In the basic.js library, the `Motion` mechanism is used to change the positions, sizes, or colors of any GUI object (Box, Button, Image, etc.) with slow and aesthetic transitions (fluidly) instead of changing them instantly (harshly).

---

## Starting Motion

An animation command first defines which properties will change in "what duration" as a rule and is given to the object with `.setMotion()`.

```javascript
window.onload = function() {

    HGroup();

        const box = Box({ 
            width: 120, 
            height: 120, 
            color: "orangered" 
        });
        
        // Make a fluid (soft) transition in 0.3 seconds whenever any change occurs.
        box.setMotion("left 0.3s, top 0.3s, width 0.3s, height 0.3s");

        box.on("click", function() {
            
            // When width and height are changed harshly via code, .setMotion intervenes and applies an animation.
            box.width += 50;
            box.height += 50;

        });

    endGroup();

}
```

---

## Motion Methods

The main animation controls added to base-level objects are as follows:

### `.setMotion(rule_string)`
Takes the general CSS (transition) command string applied to the object.
- Example: `box.setMotion("all 0.5s")` (All properties change in half a second)
- Example: `box.setMotion("opacity 0.2s, background-color 1s")`

### `.withMotion(function)`
It is a smart function that is run once with a small timestamp to handle animations that usually consist of multiple CSS variables or are added instantly (to prevent browser bugs).

```javascript
window.onload = function() {

    HGroup();

        const box = Box({ 
            width: 120, 
            height: 120, 
            color: "orangered",
            opacity: 0
        });
        
        box.setMotion("opacity 0.2s");
        box.withMotion(function(self) {
            self.opacity = 1;
        });

    endGroup();

}
```

### `.dontMotion()`
It is a function that allows an animated object to temporarily remove the animation when it wants to perform an event instantly/harshly.

```javascript
// These operations will be applied slowly and smoothly (due to previous .setMotion settings)
box.width = 200;

// However, its position needs to CHANGE immediately, jumping instantly without animation
box.dontMotion();
box.left = 10;
```

---

## Examples

### Example 1: Show / Hide Pop-up Box Design
Pulling a structure that was initially created on the screen but is invisible (opacity = 0) from bottom to top and making it visible.

```javascript
let box = null;

window.onload = function() {

    page.color = Black(0.8);

    HGroup();
    
        box = Box({
            width: 300,
            height: 200,
            color: "white"
        });

    endGroup();
        
    // Initial values (Bottom and transparent)
    box.opacity = 0;
    box.elem.style.transform = "translateY(150px)";

    // We specify which properties will change with animation
    box.setMotion("transform 0.3s, opacity 0.3s");
    
    // A small timing interval following its creation
    box.withMotion(function(self) {
        self.opacity = 1;
        self.elem.style.transform = "translateY(0px)";  // Jump up
    });

};
```

---

## Summary
- In basic.js, interface transitions are carried out via CSS `transition` and are most triggered with the `.setMotion` method.
- `.withMotion()` should be used after DOM changes to solve performance and flickering issues in the browser.
- `.dontMotion()` structures are used only on objects that need to jump instantly (e.g., tracking an element when scroll position is detected, etc.).
