# basic.js — Using Components

A component is a ready part of a page made with basic.js: a button with an icon, a text field with a title, a list, a dialog. The components of OzdenUI are in its `comp/` folder, one `.js` file each, and its catalog shows them all: https://bug7a.github.io/js-components/

This chapter is what all of them share. The params of one component are at the top of its file and on its sample page. To write a component of your own: `15-making-a-component.md`.

---

## Loading a Component

```html
<!-- LIBRARY FILES -->
<link rel="stylesheet" type="text/css" href="basic/basic.css">
<script src="basic/basic.js" type="text/javascript" charset="utf-8"></script>

<!-- COMPONENT FILES -->
<script src="comp/smart-button.js" type="text/javascript" charset="utf-8"></script>
<script src="comp/tooltip.js" type="text/javascript" charset="utf-8"></script>
<script src="comp/text-field.js" type="text/javascript" charset="utf-8"></script>
<script src="comp/dialog.js" type="text/javascript" charset="utf-8"></script>
<script src="comp/select-box.js" type="text/javascript" charset="utf-8"></script>
```

- **The order:** `basic.css` and `basic.js` first, then the components, then the code of your page.
- **A component may need another one**, and that file is loaded before it: the buttons of a `Dialog` are `SmartButton`s. A component made from another one comes after it (`email-field.js` after `text-field.js`). The sure list is the `<script>` lines of its sample page: copy them.
- **Some files are used only when they are there:** `TextField` shows the hint of its warning in a bubble when `tooltip.js` is loaded before it; `SelectBox` makes its search box a `SearchInput` when `search-input.js` is, and gives its list a `ScrollBar` when `scroll-bar.js` is.
- **A component is written for a version of basic.js:** copy it with a `basic.js` at least as new as the one it came with.

---

## Creating a Component

A component takes one object of params, like the basic objects, and gives back its box: a `Box` that holds its parts. So it is placed like any object, with `left` and `top` or in a group, and `that` is the component after it is made.

```javascript
const start = function () {

    page.color = "whitesmoke";

    VGroup({ gap: 16 });

        const fldName = TextField({
            styleName: "ozden",
            titleText: "Name",
            placeholder: "Your name",
            onChange: function (self) {
                btnSave.setEnabled(self.value !== "");
            },
        });

        const btnSave = SmartButton({
            labelText: "Save",
            tone: "cyan",
            enabled: 0,
            onClick: async function (self) {
                const isSure = await Dialog.confirm({
                    titleText: "Save the name?",
                    messageText: fldName.value,
                    confirmText: "Save",
                });
                if (isSure) self.setLabelText("Saved");
            },
        });

    endGroup();

};
```

The button opens when a name is typed, and it asks before it saves. A param that is not given keeps its default value: the defaults are at the top of the file of the component (`TextFieldDefaults`), each one with a comment, and every one of them is also a property of the component (`fldName.titleText`).

---

## Its Look: styleName and style

- **`styleName`** chooses a style package of the component (`TextField.styles`). A new component has `light` (the default) and `dark`; many have more: `minimal` / `minimalDark` (small, made of lines), `ozden` / `ozdenDark`. A dark page takes the dark package.
- **`style`** changes only some keys of the package; the others stay.
- **`tone`** is the color of a `SmartButton`: `"cyan"` for the main action, `"orange"` for a delete...

```javascript
SmartButton({ labelText: "Send", tone: "cyan", style: { box: { round: 22 } } });
TextField({ styleName: "ozdenDark", titleText: "E-mail" });
```

---

## The Names of the Params

The components use the same name for the same thing, so a page moves from one component to another without looking for a name:

| What | Name |
|---|---|
| The value of a control | `value` (a check box: `checked`; a range: `minValue`, `maxValue`, `step`) |
| A text that is shown | `...Text`: `labelText`, `titleText`, `messageText`, `descriptionText` |
| The hint in an empty field | `placeholder` |
| The name a screen reader reads | `ariaLabel` (an icon button needs it) |
| On / off (`1` / `0`) | `enabled`, `required`, `selected`, `animated` |
| A part that can be shown | `show...`: `showDescription`, `showSearch` |
| A picture, an icon | `...IconFile`: `iconFile` |
| The look | `styleName`, `style` |
| The value changed | `onChange(self)` |
| Another event | `onClick(self)`, `onOpen(self)`: the component itself comes first |
| Your name for the object | `key`: read it in an event (`self.key`) |
| An item of a list | `key`, `text`, `description`, `iconFile`, `enabled: 0` |
| An option of a form control (`SelectBox`) | `value`, `label`, `disabled`: the names of the HTML `<option>` |

---

## After It Is Made: setX()

- **Read** a value from the component: `fldName.value`, `btnSave.labelText`.
- **Change** it with a `setX()` function: `fldName.setValue("Ada")`, `btnSave.setEnabled(0)`, `btnSave.setLabelText("Saved")`. The function saves the value and draws it. A property written directly (`btnSave.labelText = "Saved"`) is only saved: the component does not see it.
- A setter takes the whole name of its param: `setValue()`, `setLabelText()`, `setTitleText()`. The setters of a component are in the `USAGE` lines of its file.
- A setter that takes `silent` changes the value without calling `onChange`: `selLanguage.setValue("tr", 1)`.

---

## Events

An event is a param that holds a function, and its first argument is the component itself:

```javascript
const selLanguage = SelectBox({
    options: [{ value: "tr", label: "Türkçe" }, { value: "en", label: "English" }],
    value: "en",
    onChange: function (self) {
        println("The language: " + self.value);
    },
});
```

- **`onChange` is called when the value changes**, also by a plain `setValue()`. It is not called while the component is made, nor by a setter with `silent: 1`. Three older components never call it from `setValue()` and say so in the comment of their `onChange`: `TextField` (and the fields made from it), `Slider` and `JsonEditor`.
- An event can also be given later: `btnSave.onClick = function (self) { ... };`

---

## Removing a Component

`fldName.remove()` removes the component with all its parts: its objects, its events, its timers, and the lists and menus it opened on the page. A component has no `destroy()`.

---

## Good to Know

- **A group cuts what goes out of it** (`clipContent: 1`): a shadow, the ring of the keyboard focus, a button that grows. Give such a group `clipContent: 0`.
- **On a page fitted with `page.fit()`** the components made for screen pixels get smaller with the zoom: `basic.uiScale` keeps their size (`08-page.md`).
- **`animated: 0`** stops the motion of a component that moves. Its motion also stops when the system asks for less motion.
- **The keyboard:** the components work with Tab, Enter, Space and the arrows. An icon button (no `labelText`) needs an `ariaLabel`.
- A list or a menu that opens from a field goes over a `Dialog` by itself.
- **Texts are shown as they are written:** a `labelText` or a `titleText` with `<b>` shows `<b>`, so a name a user typed can not run as HTML. For HTML of your own page, give the component `allowHtml: 1`.

---

## Which Component for Which Job

The components of the kit for a new page, and their look on a light page and on a dark page. A component that is not for new pages says so at the top of its file (`NOT FOR NEW PROJECTS`) and in the catalog.

| Need | Component (file) | Light page | Dark page |
|---|---|---|---|
| A button | `SmartButton` (`smart-button.js`) | `ozden` (the default); `tone: "cyan"` for the main action | `ozdenDark`; `tone: "cyanDark"` |
| A search box | `SearchInput` (`search-input.js`) | `ozden` | `ozdenDark` |
| A check box, a radio button | `CheckBox` (`check-box.js`), `RadioButton` (`radio-button.js`) | `light` | `dark` |
| A text field | `TextField` (`text-field.js`) and the fields made from it: `EmailField`, `PasswordField`, `PhoneField`, `NumberField`, `CurrencyField`, `UrlField`, `TextAreaField` (a file each) | `light` | `dark` |
| A list | `ItemList` (`item-list.js`) | `ozden` (the default) | `ozdenDark` |
| A dropdown | `SelectBox` (`select-box.js`) | `light` | `dark` |
| A big table | `SmartTable` (`smart-table.js`) | `light` | `dark` |
| A chart | `GraphBox` (`graph-box.js`) | the default | `theme: "dark"` |
| A slider | `Slider` (`slider.js`) | `round` | `roundDark` |
| A bubble, a popover | `Tooltip` (`tooltip.js`) | | |
| A dialog | `Dialog` (`dialog.js`) | `ozden` (the default) | `ozdenDark` |
| A loading screen | `LoadingScreen` (`loading-screen.js`) | | |
| A page or a part that scrolls | `ScrollArea` (`scroll-area.js`): `ScrollArea({ gap: 20, padding: 40 })` ... `endGroup()`; in a group it takes the room the other objects leave | `light` | `dark` |

---

## Learning a Component

- **The top of its file:** what it does, its defaults (a comment for each one), and the `USAGE` lines of its functions.
- **Its sample pages** (`02-comp-examples/`): every look of it, ready to copy.
- **The catalog:** https://bug7a.github.io/js-components/
