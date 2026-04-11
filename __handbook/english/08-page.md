# basic.js — Page (Page Object)

The `page` object is the core object that provides the management of the application and the screen, and is created automatically. It is derived from the `MainBox` class. 

> **Note:** It only represents the visible area of the screen and does not support Scrollbars. If you want the page to expand and scroll, you should create a child `Box` object with flexible dimensions.

---

## HTML Connection

**`page.bodyElement`**
Establishes the bridge between the object directly and the DOM (HTML).
- Uses the `<body>` element found inside the HTML.
- On the pure JavaScript (Vanilla JS) side, its exact equivalent is the statement `document.getElementsByTagName("BODY")[0]`.

---

## Size and Appearance

**`page.color`**
Sets the background color of the page (Ex: `"white"`, `"#141414"`).

**`page.width`** and **`page.height`**
Used to read (fetch) the current page/window width and height.
- **Attention:** This value CANNOT be changed from the outside with direct assignment. It is only for information retrieval (Read-only) purposes. Resizings are CSS/Window based.

---

## Scaling and Placement on Page (Fit & Zoom)

**`page.zoom`** (Float)
The scale ratio of how much the page will grow or shrink.
- Default value: `1` (expresses 100% original size). 
- If `0.5` is entered, it sizes to half; if `1.5` is entered, it sizes by 150%. The `.fit()` functions in page properties also base themselves internally on this `.zoom` variable (CSS: `transform scale`). 

**`page.fit(originalWidth, maxWidth)`**
A dynamic sizing function that allows the interface (content) to fit perfectly within the screen based on width.
- `originalWidth`: The original content width you aim to be displayed on the screen.
- `maxWidth`: The maximum distance limit the content can expand to (Not mandatory to enter, if not entered it is assumed to be the same value as `originalWidth`). 

**`page.autoFit(contentWidth, contentHeight)`**
This is a slightly more practical form of the command above. It smartly fits the page without disrupting the specified content dimensions (with aspect ratio).

```javascript
window.onload = function() {

    // Fit the page to the screen once at the beginning.
    page.autoFit(1280, 720);

    // Main Background (Black Background)
    HGroup({ color: "#141414" });
    
        // Room Content (Inner White Workspace, always 1280x720)
        startBox({ width: 1280, height: 720, color: "white" });

            Label({ text: "Your content dimensions will now always protect their form." }).center();

        endBox();

    endGroup();

    // Trigger the rescaling event when the size changes
    page.onResize(pageResized);
    
};

const pageResized = function() {
    // Reapply the smart scale when the browser size changes
    page.autoFit(1280, 720);
};
```

---

## Actions and Events

**`page.onClick(function)`**
Every time the page is clicked (on an empty direction within the **body**), the function inside it is triggered.
- Since other basic objects (Button, etc.) added / derived onto the page are actually a part of the `page`, clicking on them can also automatically trigger the `page` onClick action. 
- A solution to only detect empty background actions is to create a transparent `Box` right under the `page` and behind everything, and read the `.onClick()` property over it.
- To remove the effect, `page.remove_onClick(function_name)` can be used.

**`page.onResize(function)`**
The function to be executed every time the window size changes.
- It is **NOT TRIGGERED AT THE FIRST MOMENT** the page opens (window.onload)! The programmer must manually call the sizing at startup exactly 1 time.
- To remove the effect, `page.remove_onResize(function_name)` is used.

---

## Operational Commands

**`page.add(object)`**
Used when you want to load/move the core objects you've created (especially those called later after doing a .remove, etc.) back into the top heart of the page.
- Under normal circumstances, newly created objects automatically fall into the `page` as if `.add` had been performed (If the Container choice has not been changed).
