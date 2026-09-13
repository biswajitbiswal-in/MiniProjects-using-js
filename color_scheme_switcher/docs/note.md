# Color Scheme Switcher — Project Notes

A small project: four colored bars on a page. Clicking a bar changes the
whole page's background to that bar's color.

---

## 1. Final Working Code

### `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project 1 | in DOM</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav id="nav">
        <button id="home" class="home">Home</button>
    </nav>

    <h2>Color Scheme Switcher</h2>
    <span class="button" id="green"></span>
    <span class="button" id="blue"></span>
    <span class="button" id="red"></span>
    <span class="button" id="yellow"></span>

</body>
<script src="script.js"></script>
</html>
```

### `style.css`
```css
nav {
    display: flex;
    height: 50px;
    width: 100%;
    background-color: #212121;
    align-items: center;
    justify-content: center;
}

.button {
    display: inline-block;
    height: 100px;
    width: 100px;
}

#green  { background-color: green; }
#blue   { background-color: blue; }
#red    { background-color: red; }
#yellow { background-color: yellow; }
```

### `script.js`
```javascript
const buttons = document.querySelectorAll('.button');
const body = document.querySelector('body');

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        body.style.backgroundColor = e.target.id;
    });
});
```

**How it works, in one sentence:** each span's `id` is already a real color
name (`green`, `blue`, `red`, `yellow`), so when a span is clicked, its `id`
is read and assigned directly as the page's background color — no lookup
or translation needed.

---

## 2. Concepts Learned Along the Way

### `display: inline` vs `inline-block` vs `block`
- **`span` is `inline` by default.** Inline elements ignore `width` and
  `height` entirely — that's why bars didn't show up until this was fixed.
- **`block`** elements take the full width of their parent and force a new
  line before/after themselves (stacked vertically).
- **`inline-block`** is the fix used here: behaves like `inline` for layout
  (sits next to its neighbors, no forced line break) but behaves like
  `block` for sizing (`width`/`height` are respected).

```
block:                 inline-block:
[GREEN]                 [GREEN][BLUE][RED][YELLOW]
[BLUE]
[RED]
[YELLOW]
```

### CSS class names are case-sensitive
`.Green` and `.green` are two different selectors. Keep HTML classes and
CSS selectors matching in case, or styles silently won't apply.

### Why `background-color = someString` can silently fail
`element.style.backgroundColor = value` only works if `value` is a **valid
CSS color** — a named color (`"red"`), a hex code (`"#ff0000"`), or an
`rgb()`/`hsl()` string. Anything else (like `"box1"`) is rejected quietly:
no error, the property is just ignored and nothing visually changes.

You can test this in the console:
```javascript
document.body.style.backgroundColor = "box1";
console.log(document.body.style.backgroundColor); // "" (rejected)

document.body.style.backgroundColor = "green";
console.log(document.body.style.backgroundColor); // "green" (accepted)
```

### `e.target` is an element, not a string
A very common bug in this project was writing:
```javascript
if (e.target == "green") { ... }      // ❌ always false
switch (e.target) { case 'box1': ... } // ❌ never matches
```
`e.target` is the actual DOM element that was clicked (e.g. the `<span>`
itself). Comparing it to a plain string will never match. What you almost
always want is `e.target.id` (or `e.target.className`, etc.) — a real
string pulled off that element.

### `.forEach = fn` vs `.forEach(fn)`
```javascript
buttons.forEach = (btn) => { ... }   // ❌ overwrites the forEach method — nothing runs
buttons.forEach((btn) => { ... })    // ✅ calls forEach, runs fn once per item
```
`=` **assigns** a value. `()` **calls/invokes** a function. Mixing these up
means code silently never executes.

### Ids vs colors — three ways to connect them
Since ids like `box1` aren't valid CSS colors on their own, something has
to translate id → color. Options explored:

| Approach | Example | When to use |
|---|---|---|
| **Rename ids to color names** | `id="green"` → `e.target.id` used directly | Simplest, no extra code, used in the final version above |
| **Object used as a lookup ("map")** | `colorMap = { box1: 'green', ... }` then `colorMap[e.target.id]` | Keeps ids like `box1` but still wants one clean line |
| **`data-*` attribute** | `data-color="green"` then `e.target.dataset.color` | Keeps ids free for other purposes |
| **`getComputedStyle`** | `getComputedStyle(e.target).backgroundColor` | Reads the color straight from CSS — single source of truth, no duplication |
| **`if`/`else if` or `switch`** | explicit branch per id | Most verbose; fine for learning, but repetitive to maintain |

### What is a "map" (as a concept)?
A map connects a **key** to a **value** — like a phone book connects a name
to a number. In JavaScript this is usually done with a plain **object**:
```javascript
const colorMap = {
    box1: 'green',
    box2: 'blue',
    box3: 'red',
    box4: 'yellow'
};

colorMap['box1']; // 'green'  — reading (targeting) a value by its key
```
This is an **object being used as a map** — its type is still "object" in
JS. (JavaScript also has a dedicated `Map` type via `new Map()`, with
methods like `.get()`/`.set()`, but a plain object is enough for small
lookups like this.)

- **Writing** (`box1: 'green'`) happens once, when the object is defined.
- **Reading** (`colorMap[e.target.id]`) happens every time you need to look
  a value up — e.g., once per click.

### Event delegation (a further optimization, not used in the final code but worth knowing)
Instead of attaching a separate click listener to every single button,
attach **one** listener to their shared parent and check what was clicked:
```javascript
document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('button')) {
        body.style.backgroundColor = e.target.id;
    }
});
```
This scales better if there are many buttons, since only one listener
exists no matter how many elements are added later.

---

## 3. Bugs Hit & Fixed (a running log)

1. **Case mismatch**: `.Green` (CSS) vs `class="green"` (HTML expected
   lowercase) → fixed by keeping casing consistent.
2. **Missing `inline-block`**: spans had no visible size → fixed by adding
   `display: inline-block`.
3. **`#21212121`**: an 8-digit hex (has an alpha channel) where a plain
   `#212121` was intended.
4. **`buttons.forEach = (btn) => {...}`**: assignment instead of a call →
   fixed to `buttons.forEach((btn) => {...})`.
5. **`e.target.id` used as a color while ids were `box1`–`box4`**: not
   valid CSS colors → fixed by either renaming ids to color names, or
   translating via a map/data-attribute/getComputedStyle.
6. **`switch(e.target)` / `if (e.target == "green")`**: compared an
   element to a string, never matches → fixed to compare `e.target.id`
   (a string) instead.
7. **Switch statement with only one `case`**: boxes 2–4 had no matching
   case, so clicking them did nothing → either add all cases, or (better)
   remove the switch since a map/direct-id assignment already covers every
   case in one line.

---

## 4. Quick Self-Check Questions (for future you)

- Why does a plain `<span>` need `display: inline-block` to show a set
  width/height?
- Why does `body.style.backgroundColor = "box1"` fail but
  `= "green"` works?
- What's wrong with `if (e.target == "green")`? What should it compare
  instead?
- What's the difference between `.forEach = fn` and `.forEach(fn)`?
- What is `colorMap[e.target.id]` doing, step by step, when `e.target.id`
  is `"box3"`?
