# basic.js — Image / Icon (Image Object)

In the `basic.js` library, the `Icon()` object is used to display image or icon files (PNG, JPG, SVG, etc.) on the screen. Images are loaded asynchronously (afterward) from external links or the local directory.

---

## Creating an Image or Icon

The fast `Icon` function provides a basic image control.

```javascript
window.onload = function() {

    const myIcon = Icon({ 
        left: 20, 
        top: 20, 
        width: 128, 
        height: 128, 
        padding: 15,
        color: "rgba(0, 0, 0, 0.05)"
    });
    
    // Load the image file with the ".load" method.
    myIcon.load("test.png");

}
```

---

## Parameters and Properties

### Execution and Size
- `load(path_to_image)` — Attaches the image file at the specified file path (url or relative location) to the element.
- If numerical values are assigned to `width` and `height` properties, the image is forced to that size. 

### Auto Sizing (autoSize)
If the image is desired to be placed on the screen with its own actual (original) size, the `autoSize` property can be used.
- If Width (`width`) and Height (`height`) are not explicitly specified (as an explicit value), `autoSize: 1` is set by default. This means the image appears in its original dimensions.
- By assigning larger numbers to the `autoSize` value, you can proportionally reduce the original size. 
    - `autoSize: 2` → Reduces the original size in half / shrinks by 2 times.
    - `autoSize: 3` → Does not shrink the original size to a quarter, but sets it by dividing exactly at a ratio of `(width / 3)` and `(height / 3)`.

### Load Event and True Dimensions
`.onLoad()` is used to detect when the image has been fully fetched/loaded into our document and to act accordingly.

- `naturalWidth` — The original full width of the file.
- `naturalHeight` — The original full height of the file.

---

## Examples

### Example 1: Loading an Image and Printing Dimensions to the Screen

```javascript
window.onload = function() {
    
    const icoLogo = Icon({
        right: 20,
        top: 20
    });
    
    // Initialize the source of the image.
    icoLogo.load("test.png");
    
    // Perform operation when successfully downloaded
    icoLogo.onLoad(function(loadedIcon) {
        println("Original Width: " + loadedIcon.naturalWidth);
        println("Original Height: " + loadedIcon.naturalHeight);
    });

};
```

---

## Summary
- `Icon()` → Reads graphics files from the internet or local directory.
- If dimensions are not specified in the parameter, the original resolution of the image is shown automatically.
- The original image size can be read or automatically processed once the image is completely loaded from the network (`.onLoad`).
