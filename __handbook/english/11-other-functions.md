# basic.js — Other Functions

These are global helper functions that work in the background to manage the basic.js library ecosystem and manipulate default behaviors.

---

## 1. Loop Timer

**`setLoopTimer(milisecond)`**
If you have defined a general-purpose `loop()` function in your page/project, this method determines how often (repeat interval) this function should be run.
- The duration is given as a parameter in milliseconds (`Integer`).
- The standard (default) value is `1000` (meaning it runs once per second).

---

## 2. Default Container Management (Container Box)

When a new interface element is created (e.g., `Box()`, `Button()`), the primary frame into which this object is added by default is the `page` (Page / MainBox) object. This structure can be externally manipulated through the following functions.

**`setDefaultContainerBox(boxObject)`**
Determines which object the created elements will be automatically moved/added to (without the need to explicitly write `.add()`).
- When a `Box` or parent element other than `page` is provided, new buttons or labels created in the code hierarchy automatically flow into that object.
- To return to the beginning and reset the default structure, `setDefaultContainerBox(page)` can be used.

**`getDefaultContainerBox()`**
Returns / reads the parent object (`Box` or `MainBox`) where currently created objects are added.

**`restoreDefaultContainerBox()`**
Provides a practical way to return to the previous container box defined in the default list/hierarchy.

---

## 3. Zoom Calculation (Page Zoom)

**`withPageZoom(length)`**
If you have changed the screen dimensions (scaling/zooming) with the `page.zoom` setting, this is a smart calculation helper that calculates a `length` unit proportional to the page's current zoom value and returns it as a `Float`.

---

## 4. Connecting Custom Objects to the System

**`makeBasicObject(object)`**
Allows you to seamlessly integrate and introduce a custom-designed/advanced object you've created in the application into the basic.js ecosystem.
- The object passed through the function can be accessed via the global `that` variable until a new basic.js object is created.
- If the custom object you want to develop consists of multiple basic components (Label, Button, etc.), it is recommended to use a `Box` element as the main carrier housing all of them and pass that box into `makeBasicObject`.
