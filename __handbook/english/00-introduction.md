# basic.js — Getting Started and Philosophy (Introduction)

`basic.js` is a lightweight JavaScript library that makes developing web applications **simple, fast, and understandable**. You build the whole interface in plain JavaScript.

Its Goal:
**To make coding an enjoyable and fluent experience.**

- Project Site: https://bug7a.github.io/basic.js/

---

## Why basic.js?

- **Highly Readable Code:** It offers a fluent, self-explanatory syntax that is understood at a glance, as if you were reading a story. Building an interface feels like putting lego pieces together.

`Code is written not just for the machine, but for humans too.`

- **Small Learning Curve:** A few concepts and the flow of the code are enough to start, so you can turn your ideas into working interfaces quickly.

`There are a small number of basic concepts.`

- **Lightweight:** It has no external dependencies and works directly on the DOM, with one small script and one small stylesheet.

`No extra dependencies.`

- **Full Control and Flexibility:** The interface and its layout are written in JavaScript, so you manage every detail from one place, and a color or a width is a variable you can calculate and change at run time.

`Everything about a screen is in one place.`

- **Rapid Prototyping:** It is especially efficient for solo developers and for small to medium-scale projects, where one person writes both the interface and the logic.

`Keeps simple things simple.`

---

## Working Logic and Example

You can better see how this system is no different from a lego set with a simple click Counter example:

```javascript
// Variables
let lblText;
let clickedCount = 0;
    
// The first (main) function to be triggered when the application runs
const start = function () {

    // We change the color of the page where everything resides
    page.color = "whitesmoke";

    // GROUP: Start the auto layout group. 
    // Center all its content horizontally.
    HGroup({
        // flow: "horizontal", // Or "vertical"
        // align: "center", // Or "top left", "center right"
        // gap: 0,
        // padding: 0, // Ex: [0, 0, 0, 0]
    });

        // LABEL: We add a box inside the group intended as a clickable button
        lblText = Label({
            text: "Click Me",
            color: "white",
            padding: [12, 4],
            round: 4,
            border: 1,
            borderColor: "rgba(0, 0, 0, 0.1)",
        });
        
        // The last created element is attached to the variable named "that".
        // Therefore, an event or mouse cursor can be attached without explicitly calling its name.
        that.cursor = "pointer";
        that.on("click", increaseOne);

    // We Close the Group.
    endGroup();

};

// Externally linked function that will run every time the button (.on("click")) is clicked
const increaseOne = function(self, event) {

    // Increase the variable
    clickedCount++;
    
    // Change the text content of our Lego piece (.text)
    lblText.text = "Clicked Count: " + clickedCount;

    // We can also print to the console
    println(clickedCount);

};
```

basic.js calls the function named `start` when the page is ready. (Older pages write `window.onload = function () { ... }`: it works too.)

---

## Handbook File Structure

This handbook exemplifies how you can use the library most efficiently, from basic to advanced levels:

1. **Basic Components:**
   The objects that make up our visual framework (`02-box.md`, `01-label.md`, `03-image.md`, etc.).
2. **Input and Interaction:**
   Objects designed for taking input from the user and processing operations (`06-button.md`, `07-input.md`).
3. **Page and Layout Hierarchy:**
   Controlling the entire screen (`08-page.md`) or attaching objects to each other in a higher-level layout (`05-autolayout.md`).
4. **Common Properties:**
   The standard capabilities that every element possesses unless otherwise specified (`04-common-properties.md`).
5. **Animations and Tools:**
   Animation controls that bring objects to life (`10-motion.md`), internal audio player (`13-sound.md`), and helper functions that power the system (`12-utilities.md` and `11-other-functions.md`).
6. **Practical Information (Tips & Tricks):**
   CSS/interface tactics that might feel complex like casting a shadow on a component or adding a gradient in the UI, but are single-line lifesavers via the library (`09-useful-examples.md`).
7. **Components:**
   Using the ready components of OzdenUI (`14-using-components.md`) and writing a component of your own (`15-making-a-component.md`).

Also, to quickly look at the latest developments and fresh methods added to the library, you can review the **`00-what-is-new.md`** release notes.

I wish you to see its benefits.


## LICENSE

Copyright 2020-2026 Bugra Ozden <bugra.ozden@gmail.com>
- https://github.com/bug7a

Licensed under the Apache License, Version 2.0

