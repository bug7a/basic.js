/* Bismillah */

/*

basic.js Website - Code Samples - v26.09

- Sitede gösterilen ve çalıştırılan kod örnekleri. (Kodlar iki dilde de aynıdır.)
- The code samples shown and run on the site. (The same in both languages.)

NOTE: Canlı örnekler, basic.js yüklü küçük bir sayfada çalışır (js/live-code.js).
      start() veya window.onload içermeyen kod, bir start() fonksiyonunun içine konur.

Developer: Bugra Ozden
Email: bugra.ozden@gmail.com

*/

"use strict";

const SAMPLES = {};

// *** HERO: (Giriş bölümündeki canlı örnek)
SAMPLES.hero = [
    "let count = 0;",
    "",
    "const start = function () {",
    "",
    "    page.color = \"#F6F4EF\";",
    "",
    "    // GROUP: In the middle, one under the other",
    "    VGroup({ align: \"center\", gap: 18 });",
    "",
    "        const title = Label({ text: \"Hello, basic.js\", fontSize: 30, bold: 1 });",
    "",
    "        const btn = Button({",
    "            text: \"Click me\", width: 180, height: 50,",
    "            minimal: 1, round: 25, color: \"#141414\",",
    "            textColor: \"white\", fontSize: 17,",
    "        });",
    "",
    "        btn.on(\"click\", function () {",
    "            count++;",
    "            title.text = \"Clicked \" + count + (count == 1 ? \" time\" : \" times\");",
    "            btn.color = (count % 2) ? \"#E0663A\" : \"#141414\";",
    "        });",
    "",
    "    endGroup();",
    "",
    "};",
].join("\n");

// *** COMPARE: (Aynı kart, iki yol)
SAMPLES.compareHtml = [
    "<div class=\"card\">",
    "  <h2>Ada Lovelace</h2>",
    "  <p>First programmer</p>",
    "  <button class=\"follow\">Follow</button>",
    "</div>",
].join("\n");

SAMPLES.compareCss = [
    "body {",
    "  display: flex; align-items: center; justify-content: center;",
    "  height: 100vh; margin: 0; background: #F6F4EF;",
    "}",
    ".card {",
    "  display: flex; flex-direction: column; align-items: center;",
    "  gap: 14px; padding: 28px; border-radius: 18px; background: white;",
    "}",
    ".card h2 { margin: 0; font-size: 22px; }",
    ".card p { margin: 0; font-size: 14px; color: gray; }",
    ".follow {",
    "  width: 130px; height: 42px; border: 0; border-radius: 21px;",
    "  background: #141414; color: white; font-size: 15px; cursor: pointer;",
    "}",
].join("\n");

SAMPLES.compareScript = [
    "const button = document.querySelector(\".follow\");",
    "button.addEventListener(\"click\", () => {",
    "  button.textContent = \"Following\";",
    "});",
].join("\n");

SAMPLES.compareBasic = [
    "const start = function () {",
    "",
    "    page.color = \"#F6F4EF\";",
    "",
    "    VGroup({ align: \"center\" });",
    "",
    "        // GROUP: Card",
    "        VGroup({ hug: 1, align: \"center\", gap: 14, padding: 28, round: 18, color: \"white\" });",
    "",
    "            Label({ text: \"Ada Lovelace\", fontSize: 22, bold: 1 });",
    "            Label({ text: \"First programmer\", fontSize: 14, textColor: \"gray\" });",
    "",
    "            Button({",
    "                text: \"Follow\", width: 130, height: 42,",
    "                minimal: 1, round: 21, color: \"#141414\",",
    "                textColor: \"white\", fontSize: 15,",
    "            });",
    "            that.on(\"click\", (self) => self.text = \"Following\");",
    "",
    "        endGroup();",
    "",
    "    endGroup();",
    "",
    "};",
].join("\n");

// *** CONCEPTS: (Altı temel fikir; sıra js/texts.js -> concepts ile aynı)
SAMPLES.concepts = [

    // Objects
    [
        "Box({ width: 120, height: 80, color: \"tomato\" });",
        "Label({ text: \"Hello\", fontSize: 20 });",
        "Button({ text: \"OK\" });",
        "Input({ placeholder: \"Your name\" });",
        "Icon({ width: 48, height: 48 });",
        "that.load(\"logo.png\");",
    ].join("\n"),

    // that
    [
        "Label({ text: \"Title\" });",
        "",
        "// \"that\" is the object created last",
        "that.fontSize = 24;",
        "that.textColor = \"navy\";",
    ].join("\n"),

    // Containers
    [
        "startBox({ width: 300, height: 200, color: \"white\" });",
        "",
        "    // Created inside the box",
        "    Label({ left: 20, top: 20, text: \"Inside\" });",
        "",
        "endBox();",
    ].join("\n"),

    // AutoLayout
    [
        "HGroup({ gap: 12, align: \"center\" });",
        "",
        "    Button({ text: \"Cancel\" });",
        "    Button({ text: \"Save\" });",
        "",
        "endGroup();",
    ].join("\n"),

    // Events
    [
        "const btn = Button({ text: \"Save\" });",
        "",
        "btn.on(\"click\", function (self, event) {",
        "    self.text = \"Saved\";",
        "});",
    ].join("\n"),

    // Motion
    [
        "box.setMotion(\"left 0.3s, opacity 0.3s\");",
        "",
        "box.left = 200;     // It slides,",
        "box.opacity = 0.5;  // and fades.",
    ].join("\n"),

];

// *** PLAYGROUND: (Deneme alanının hazır örnekleri; adlar js/texts.js -> playgroundTabs)
SAMPLES.playground = {

    layout: [
        "const colors = [\"#E0663A\", \"#F5B82E\", \"#3BA776\", \"#2F6FEB\", \"#8B5CF6\", \"#141414\"];",
        "",
        "const start = function () {",
        "",
        "    page.color = \"#F6F4EF\";",
        "",
        "    // GROUP: Goes on to the next line when there is no space",
        "    HGroup({ align: \"center\", gap: 14, padding: 20, wrap: 1 });",
        "",
        "        colors.forEach(function (color, index) {",
        "",
        "            VGroup({ width: 100, height: 100, color: color, round: 18, align: \"center\" });",
        "                Label({ text: String(index + 1), fontSize: 34, bold: 1, textColor: \"white\" });",
        "            endGroup();",
        "",
        "        });",
        "",
        "    endGroup();",
        "",
        "};",
    ].join("\n"),

    todo: [
        "const start = function () {",
        "",
        "    page.color = \"#F6F4EF\";",
        "",
        "    VGroup({ align: \"center top\", gap: 12, padding: 24 });",
        "",
        "        // GROUP: Input + button",
        "        HGroup({ hug: 1, gap: 8 });",
        "            const input = Input({ width: 220, height: 44, fontSize: 16, placeholder: \"A new task\" });",
        "            const add = Button({",
        "                text: \"Add\", width: 80, height: 44,",
        "                minimal: 1, round: 8, color: \"#141414\",",
        "                textColor: \"white\", fontSize: 15,",
        "            });",
        "        endGroup();",
        "",
        "        Label({ text: \"Click a task to remove it.\", fontSize: 13, textColor: \"gray\" });",
        "",
        "        // GROUP: Tasks",
        "        const list = VGroup({ width: 308, height: \"auto\", gap: 6 });",
        "        endGroup();",
        "",
        "        const addTask = function () {",
        "            if (!input.value.trim()) return;",
        "            createIn(list, function () {",
        "                const task = Label({ text: \"\", width: \"100%\", fontSize: 16, color: \"white\",",
        "                    round: 8, padding: [14, 10], cursor: \"pointer\" });",
        "                task.plainText = input.value;",
        "                task.on(\"click\", function () { task.remove(); });",
        "            });",
        "            input.value = \"\";",
        "            input.focus();",
        "        };",
        "",
        "        add.on(\"click\", addTask);",
        "        input.onEnter(addTask);",
        "",
        "    endGroup();",
        "",
        "};",
    ].join("\n"),

    motion: [
        "const start = function () {",
        "",
        "    page.color = \"#F6F4EF\";",
        "",
        "    Label({ left: 20, top: 16, text: \"Click anywhere\", fontSize: 15, textColor: \"gray\" });",
        "",
        "    const ball = Box({ left: 40, top: 60, width: 60, height: 60, round: 30, color: \"#E0663A\" });",
        "    ball.setMotion(\"left 0.5s, top 0.5s, background-color 0.5s\");",
        "",
        "    // page.on(): events of the window",
        "    page.on(\"click\", function (self, event) {",
        "        ball.left = event.clientX - 30;",
        "        ball.top = event.clientY - 30;",
        "        ball.color = \"hsl(\" + random(0, 360) + \", 75%, 55%)\";",
        "    });",
        "",
        "};",
    ].join("\n"),

    clock: [
        "let lblTime;",
        "",
        "const start = function () {",
        "",
        "    page.color = \"#141414\";",
        "",
        "    VGroup({ align: \"center\", gap: 6 });",
        "        lblTime = Label({ text: \"\", fontSize: 56, bold: 1, textColor: \"white\" });",
        "        Label({ text: \"loop() runs every second\", fontSize: 14, textColor: White(0.5) });",
        "    endGroup();",
        "",
        "    loop();",
        "",
        "};",
        "",
        "// basic.js calls loop() every 1000 ms. (setLoopTimer(ms) changes it.)",
        "const loop = function () {",
        "    lblTime.text = new Date().toLocaleTimeString();",
        "};",
    ].join("\n"),

};

// *** GET STARTED:
SAMPLES.pageTemplate = [
    "<!DOCTYPE html>",
    "<html>",
    "<head>",
    "    <meta charset=\"UTF-8\">",
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
    "",
    "    <link rel=\"stylesheet\" href=\"basic/basic.min.css\">",
    "    <script src=\"basic/basic.min.js\"></script>",
    "    <script src=\"app.js\"></script>",
    "</head>",
    "<body></body>",
    "</html>",
].join("\n");

SAMPLES.startFunction = [
    "// app.js",
    "const start = function () {",
    "",
    "    VGroup({ align: \"center\", gap: 12 });",
    "        Label({ text: \"My first basic.js page\", fontSize: 24 });",
    "        Button({ text: \"Let's go\" });",
    "    endGroup();",
    "",
    "};",
].join("\n");
