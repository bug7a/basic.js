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

**`createIn(container, func)`** (v26.09.18)
Returns the result of `func` (v26.10.23). Runs `func(container)` with `container` as the default container and then puts the previous container back, also when `func` throws. This is the safe form of `setDefaultContainerBox(container)` ... `setDefaultContainerBox(previous)`: use it to create objects inside a box that already exists (for example a component's list box after the component is created).

```javascript
const listBox = Box(20, 20, 240, 80, { color: "whitesmoke" });

createIn(listBox, function () {
    Label({ text: "New row" });
});
// The default container is the same as before the call.
```

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
- A component is made with `startObject()` / `endObject()`, which do this for you: `15-making-a-component.md`.

---

## 5. Events and Timers Cleaned by remove() (v26.10.23)

These methods are on every object. `remove()` cleans what they start, so a page or a component does not have to remember it.

| Method | What it does |
|---|---|
| `obj.listenTo(target, event, func, capture)` | Listens to an event of `window`, `document` or any element: `func(self, event)`. Returns the remover function. |
| `obj.onPageResize(func)` | The resize of the window: `func(self, event)`. Returns the remover function. |
| `obj.after(ms, func)` | Runs `func(self)` once. Returns the cancel function. |
| `obj.every(ms, func)` | Runs `func(self)` again and again. Returns the stop function. |
| `obj.own(other)` | An object made somewhere else (a menu on `page`) is removed with `obj`. Returns `other`. |

```javascript
const lblTime = Label({ text: "Waiting", fontSize: 20 });

// It stops by itself when lblTime is removed.
lblTime.every(1000, function (self) {
    self.text = new Date().toLocaleTimeString();
});

lblTime.listenTo(window, "keydown", function (self, event) {
    if (event.key === "Escape") self.textColor = "tomato";
});

// After 5 seconds the label is removed: the timer and the key listener go with it.
lblTime.after(5000, function (self) {
    self.remove();
});
```

**`obj.setFocusRing(color)`**
Draws a ring only when the object is reached with the keyboard, not after a mouse click. `""` removes it.
