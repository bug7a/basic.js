# basic.js — Getting Started and Philosophy (Introduction)

`basic.js` is a lightweight JavaScript library built to make developing web applications as **simple, fast, and understandable** as possible. No need to write HTML or CSS!

Its Goal:
Not to make coding harder, but **to turn it into an enjoyable and fluent experience**.

- Project Site: https://bug7a.github.io/basic.js/

---

## Why basic.js?

- **Highly Readable Code:** Instead of getting lost among complex structures, it focuses on offering a fluent, self-explanatory syntax that is immediately understood at a glance, as if you were reading a story. It aims to make software development as simple and enjoyable as putting together lego pieces.

`Code is written not just for the machine, but for humans too.`

- **Zero Learning Curve:** Instead of endless documents or heavy theoretical concepts, it builds a natural and effortless learning path where you can go into production in minutes just by looking at the flow of the code. It aims to help you quickly grasp the core concepts and instantly transform your ideas into working interfaces.

`There are a small number of basic concepts.`

- **Lightweight and High Performance:** With its structure free from unnecessary burdens and external dependencies, it aims to deliver the highest response speed with the lowest resource consumption directly on the DOM. Thanks to its lean structure that prioritizes performance, it offers a fluent experience, especially in projects where speed and flexibility are critical.

`No extra dependencies.`

- **Full Control and Flexibility:** Instead of splitting between HTML and CSS files, it tries to create a limitless space for you to move by transferring all UI processes and layouts to a fully JavaScript-based structure. It provides a development infrastructure where you can manage every detail from a single center with full control.

`Provides a more flexible structure.`

- **Rapid Prototyping and Agile Development:** Instead of overly complex structures where tasks are heavily divided, it endeavors to make the process much more efficient for solo developers, especially in small to medium-scale projects where interface flexibility and logic speed are in the foreground.

`No over-engineering.`
`Keeps simple things simple.`

---

## Working Logic and Example

You can better see how this system is no different from a lego set with a simple click Counter example:

```javascript
// Variables
let lblText;
let clickedCount = 0;
    
// The first (main) function to be triggered when the application runs
window.onload = function() {

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
        that.elem.style.cursor = "pointer";
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

Also, to quickly look at the latest developments and fresh methods added to the library, you can review the **`00-what-is-new.md`** release notes.

I wish you to see its benefits.


## LICENSE

Copyright 2020-2026 Bugra Ozden <bugra.ozden@gmail.com>
- https://github.com/bug7a

Licensed under the Apache License, Version 2.0

