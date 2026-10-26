# Brutalist Digital Clock — Project Explanation

## 1. Project Overview

The **Brutalist Digital Clock** is a simple web project that displays the current local time and date in a bold, minimalist design.

It uses three core web technologies:

- **HTML** — creates the structure of the clock.
- **CSS** — controls the layout, colors, typography, and responsive design.
- **JavaScript** — gets the current time and date and updates the display.

## 2. Project Features

- Displays hours, minutes, and seconds.
- Uses a 24-hour clock.
- Displays the current date, including the weekday, month, day, and year.
- Updates the time automatically every second.
- Uses a brutalist visual style with strong contrast, bold text, and geometric blocks.

## 3. Project Structure

Keep the project files in the same folder:

```text
digital-clock/
├── index.html
├── style.css
└── script.js
```

- `index.html`: contains the clock elements.
- `style.css`: contains the visual design.
- `script.js`: contains the clock logic.

## 4. How the HTML Works

HTML provides the elements where JavaScript displays the time.

The important IDs are:

```html
<span id="hours">00</span>
<span id="minutes">00</span>
<span id="seconds">00</span>
<h2 id="date">MON, JAN 01, 2026</h2>
```

JavaScript uses these IDs to find the correct elements and update their text.

At the end of `index.html`, load the JavaScript file before the closing `</body>` tag:

```html
<script src="script.js"></script>
```

## 5. How the JavaScript Works

### Step 1: Select the HTML elements

```javascript
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const date = document.getElementById("date");
```

`document.getElementById()` finds an HTML element using its ID. The variables store references to the elements that need updating.

### Step 2: Create the `updateClock()` function

```javascript
function updateClock() {
    const now = new Date();

    hours.innerText = String(now.getHours()).padStart(2, "0");
    minutes.innerText = String(now.getMinutes()).padStart(2, "0");
    seconds.innerText = String(now.getSeconds()).padStart(2, "0");

    date.innerText = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric"
    }).toUpperCase();
}
```

This function gets the current date and time and updates the HTML elements.

- `new Date()` creates a date object containing the current local date and time.
- `getHours()` returns the hour in 24-hour format.
- `getMinutes()` returns the current minute.
- `getSeconds()` returns the current second.
- `String(...)` converts a number into text.
- `.padStart(2, "0")` adds a leading zero when needed. For example, `7` becomes `"07"`.
- `toLocaleDateString()` formats the date into a readable form.
- `.toUpperCase()` converts the date text to uppercase.

### Step 3: Run the function once

```javascript
updateClock();
```

This immediately displays the current time and date when the script runs. Without this line, the page could initially show the placeholder values until the first scheduled update.

## 6. What Is `setInterval()`?

`setInterval()` is a JavaScript function that runs another function repeatedly after a specified time interval.

### Syntax

```javascript
setInterval(function, delay);
```

- `function` is the function to run repeatedly.
- `delay` is the time between scheduled executions, measured in milliseconds.
- `1000` milliseconds equals `1` second.

### Example

```javascript
setInterval(() => {
    console.log("JavaScript");
}, 3000);
```

This prints `"JavaScript"` approximately every 3 seconds until the interval is stopped or the page's JavaScript execution ends.

### Why does this project use `setInterval()`?

A clock must keep changing as time passes. Calling `updateClock()` once would show the time only once. To refresh it automatically, the project uses:

```javascript
setInterval(updateClock, 1000);
```

This schedules `updateClock()` to run approximately every 1,000 milliseconds (one second), so the displayed seconds continue to change.

### `setInterval()` vs `setTimeout()`

| Function | Purpose |
|---|---|
| `setInterval()` | Repeats a function at a specified interval. |
| `setTimeout()` | Runs a function once after a specified delay. |

**Memory trick:**
- **Interval = repeat**
- **Timeout = wait, then run once**

> Note: Timer delays are approximate. Browser scheduling and background-tab throttling can cause updates to happen later than the requested interval. The clock remains accurate because each update reads the current time from `new Date()` rather than simply adding one to the seconds.

## 7. Complete JavaScript File

Save this as `script.js`:

```javascript
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const date = document.getElementById("date");

function updateClock() {
    const now = new Date();

    hours.innerText = String(now.getHours()).padStart(2, "0");
    minutes.innerText = String(now.getMinutes()).padStart(2, "0");
    seconds.innerText = String(now.getSeconds()).padStart(2, "0");

    date.innerText = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric"
    }).toUpperCase();
}

updateClock();
setInterval(updateClock, 1000);
```

## 8. What I Learned

By building this project, I practised:

- Selecting HTML elements with JavaScript.
- Using `const` to store element references.
- Creating and calling functions.
- Working with the JavaScript `Date` object.
- Converting numbers to strings and formatting them.
- Updating webpage content with `innerText`.
- Using `setInterval()` to schedule repeated updates.
- Connecting HTML, CSS, and JavaScript in a small web project.
