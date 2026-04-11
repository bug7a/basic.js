# basic.js — Input / TextBox (Text Input Object)

In the `basic.js` library, the `Input()` object is used to get text or number entries (input) from users via the keyboard.

---

## Creating an Input

Creating with a default text box and title:

```javascript
window.onload = function() {

    const inpName = Input({ 
        left: 30, 
        top: 50, 
        title: "Username:",
        minimal: 1,
        color: "whitesmoke"
    });

}
```

Alternative (Fast) Format:
`Input(left, top, width, height, settings)`

---

## Parameters and Properties

### Appearance and State
- `title` (string) — An additional information title that will be located at the top section of the input box.
- `text` (string) — Used to get the value the user has entered / present in the text box, or to write/assign a value externally.
- `minimal` (boolean) — Removes corners and shadows, providing a fairly flat and plain HTML input appearance.
- `enabled` (boolean) — The active (writable) or deactivated (locked) state of the text box (Default: `1`). 

### Typographic Structure (Inside Input)
- `fontSize` / `textSize` — The text size of the text the user will write.
- `textColor` — The color of the text entered by the user.
- `textAlign` — The alignment of the text inside the box (left, center, right).

---

## Events

To detect live (instantly) even if the user adds or removes a single letter to the value in the text box, `.on("input", ...)` is used.

```javascript
window.onload = function() {
    
    const inpCity = Input({
        left: 50,
        top: 50,
        title: "City:",
        color: "white"
    });
    
    // The "input" event is triggered every time the user presses a key on the keyboard
    inpCity.on("input", function(self, event) {
        println("Currently written value: " + inpCity.text);
    });

    // The "change" event is triggered when the user leaves the input field and clicks somewhere else
    inpCity.on("change", function(self, event) {
        println("Value changed: " + inpCity.text);
    });

};
```
_Supported Standard HTML Events:_ `input`, `change`, `focus`, `paste`

---

## Summary
- `Input()` → It is a field that allows manual data entry by the user.
- With the `.text` parameter, the string (text) inside it can be retrieved or changed programmatically.
- Clickability and interaction properties share common base properties with other basic.js objects (Box, Button, etc.).
