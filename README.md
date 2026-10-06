# basic.js

A small JavaScript library for building web applications with plain JavaScript. You don't write HTML or CSS: you create the objects on the screen (boxes, labels, buttons, inputs, images) directly in code.

- **Version:** v26.09.18
- **Size:** 38 KB minified, about 12 KB gzipped
- **Dependencies:** none
- **Build step:** none (no npm, no bundler)
- **License:** Apache 2.0

**[Project site](https://bug7a.github.io/basic.js/)** · **[Handbook](https://bug7a.github.io/basic.js-handbook/)** · **[Components](https://bug7a.github.io/js-components/)**

---

## Quick start

1. Download the [`basic/`](https://github.com/bug7a/js-components/tree/main/basic) folder and put it next to your page.
2. Save the code below as `index.htm`.
3. Open it in a browser.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My first basic.js page</title>

    <link rel="stylesheet" href="basic/basic.min.css">
    <script src="basic/basic.min.js"></script>

    <script>

    let count = 0;

    // basic.js calls start() when the page is ready.
    const start = function () {

        page.color = "whitesmoke";

        // A group places its content. This one centers it.
        VGroup({ align: "center", gap: 12 });

            const lblCount = Label({ text: "Clicked: 0", fontSize: 24 });

            Button({ text: "Click me", width: 160 });
            that.on("click", function () {
                count++;
                lblCount.text = "Clicked: " + count;
            });

        endGroup();

    };

    </script>
</head>
<body></body>
</html>
```

The result:

![A label that says "Clicked: 2" over a "Click me" button, centered on the page](counter-example.png)

The page needs three things from the `basic/` folder: `basic.min.js`, `basic.min.css` and `font/` (Open Sans, loaded by the CSS).

---

## The concepts

There are only a few, and the example above uses most of them.

| Concept | What it is |
|---|---|
| `page` | The screen. basic.js creates it for you. Everything else goes inside it. |
| `start()` | Your first function. basic.js calls it when the page is ready. |
| `Box`, `Label`, `Button`, `Input`, `Icon` | The five objects everything is made of. Each one takes a props object: `Label({ text: "Hi", fontSize: 16 })`. |
| `HGroup`, `VGroup` … `endGroup()` | Auto layout. Objects created between the two calls are placed in a row or a column (`align`, `gap`, `padding`). |
| `startBox()` … `endBox()` | The same idea for a plain box: objects created in between go inside it. |
| `that` | The object you created last, so you can keep working on it without giving it a name. |
| `obj.on("click", fn)` | Events. |
| `obj.elem` | The real DOM element, when you need it. |

Properties are changed by assigning them: `lblCount.text = "Hello"`, `box.color = "tomato"`, `box.left = 40`. There is no template, no state system and no render step. The object on the screen changes when you change it.

---

## Why basic.js?

**Readable code.** A page reads from top to bottom in the order it appears on the screen. The indentation of the code is the structure of the interface.

**Little to learn.** Five objects, groups, events and a list of properties. If you know basic JavaScript, you can read a basic.js page on the first day.

**Light.** One script and one small stylesheet. It works directly on the DOM: no virtual DOM, no compiler, nothing to install.

**One language, one place.** Layout, style and logic are in the same JavaScript file, so a value like a color or a width is an ordinary variable you can calculate, share and change at run time.

**Made for one developer.** It keeps simple things simple. It suits small and medium projects where one person writes both the interface and the logic.

---

## When to use it

**A good fit:**

- Admin panels, dashboards and internal tools
- Forms, small apps and prototypes
- Kiosk and device screens, PWAs
- Learning and teaching programming

**Not a good fit:**

- Content sites that depend on search engines. The page is drawn by JavaScript, so there is no HTML for a crawler to read unless you add it yourself.
- Large teams that need the tooling and conventions of a big framework.
- Server-side rendering.

---

## More than the core

basic.js is the base of the [JS-Component Suite](https://github.com/bug7a/js-components):

- **Components:** more than 50 ready-made components written with basic.js, such as tabs, tables, date and color pickers, charts, modals, a rich text editor and a sortable list. See them live in the [component catalog](https://bug7a.github.io/js-components/).
- **Templates:** an [admin panel](https://github.com/bug7a/js-components/tree/main/04-template-m2/js-admin-panel), ready-made [web forms](https://github.com/bug7a/js-components/tree/main/04-template-m2/web-forms) and a [PWA tool](https://github.com/bug7a/js-components/tree/main/04-template-m2/easy-pwa).
- **VS Code extensions:** a code completer, an object navigator and a view inspector for basic.js ([`__developer-toolkit/`](https://github.com/bug7a/js-components/tree/main/__developer-toolkit)).
- **AI context files:** short documents that teach an AI assistant how to write basic.js code ([`context/`](https://github.com/bug7a/js-components/tree/main/context)).

---

## Documentation

- **[Handbook](https://bug7a.github.io/basic.js-handbook/):** every object, property and function with examples, in English and Turkish. It also works offline as an installable app.
- **[What is new](https://github.com/bug7a/js-components/blob/main/__handbook/english/00-what-is-new.md):** release notes.
- **[Tutorial pages](https://github.com/bug7a/js-components/tree/main/01-basic-samples-m1):** numbered sample pages for the core library.

---

## License

Copyright 2020-2026 Bugra Ozden <bugra.ozden@gmail.com>
- https://github.com/bug7a

Licensed under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).
