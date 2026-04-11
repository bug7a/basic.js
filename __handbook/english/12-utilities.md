# basic.js — Utility Functions (Utilities)

The basic.js library includes global utility functions that facilitate rapid development beyond interface (GUI) elements, covering mathematical, logical, data, and date features that typically require more lines in standard JavaScript.

These functions are accessible at any time within your application without the need for prefixes (objects or plugins). You can think of it as writing a JavaScript file without library overhead.

---

## 1. Console and Output

Simplifies the console log mechanism.

- `println(message)` — Shortcut for `console.log()`.
- `println(message, type)` — If an error method is added to the type field, it becomes `console.error()`; if log is used, it becomes `console.log()`. For example: `println("Something is wrong!", "error")` or type extensions like `warn`, `info`, `table`, `dir` can be passed.

## 2. Type Conversion

- `num(value_string, type_option)` — Converts a string to a number.
    - default: `type_option = float` uses the default format. (`3.14` float)
    - `type_option = integer/int` — supports only integer format.
- `str(number_value)` — Converts a numeric object to a simple String variable while maintaining its format. Equivalent to `String($num)`.
- `twoDigitFormat(number_value)` — If the provided number is a single digit (between `0` and `9`), it prepends a `'0'` and returns it as a 2-digit string (especially useful for Date and Time formats).

## 3. Mathematical Enhancements

- `random(start, end)` — Produces random numbers between the first and last parameters defined by the user (the start and end parameters can also be included in the possibilities).

```javascript
// Generates a number between 0 and 100.
let randomNumber = random(0, 100);
```

## 4. Device Detection

- `isMobile()` — Scans whether the screen is currently being accessed from Mobile (Touch Device - Tablet, Smartphone) mode. It returns `1` (True) if accessed from a browser-supported mobile or mobile app structure; otherwise, it returns `0`.

```javascript
if ( isMobile() ) {
    println("Accessed from a mobile device.");
}
```

## 5. Browser Actions

- `go(url_address, target)` — An interface for the `window.open` mechanism.
    - `target = "_self"` (Default) changes the site in the same tab.
    - `target = "_blank"` opens it in a different tab or another window name.

## 6. Date Data

Provides instant findings in a quick property logic without any object obsession (like `new`, etc.).
Functions attached to the `basic.date` variable:

- `basic.date.now` — Returns the instant time in milliseconds (equal to `Date.now()`).
- `basic.date.year` — Returns the current year (e.g., `2026`).
- `basic.date.monthNumber` — Returns the month number. While the normal JavaScript API starts with `January=0`, our library simplified this to start with `January=1`.
- `basic.date.monthName` — The name of the month returned as a string in English (e.g., `"February"`).
- `basic.date.dayOfWeek` — Finds the day of the week number (`0-6`).
- `basic.date.dayOfMonth` — Measures the day of the month value (historical number between `1-31`).
- `basic.date.dayName` — Retrieves the day of the week as a unit name (e.g., `"Wednesday"`).

## 7. Time Data

- `basic.time.hour` — Retrieves the hour of the day (in 24-hour system) between 0-23 as a number.
- `basic.time.minute` — Returns the valid minute between 0-59.
- `basic.time.second` — Returns the valid second between 0-59.
- `basic.time.millisecond` — Reads the instant millisecond.

> Note: If you need to add a "0" prefix to these values, you can easily integrate your helper like `twoDigitFormat(basic.time.minute)`.

## 8. Memory / Data Storage Persistence

Writes data to the Browser Cache so that it is not deleted when your application or browser is closed, allowing it to persist for the next session. It automatically detects JSON/Array objects without needing string conversion. In short, it makes data persistent.

Usage:
- `basic.storage.save(key_code, value_content)` — Saves data in the browser.
- `basic.storage.load(key_code)` — Returns the previously saved data to you in its de-compiled object/value form.
- `basic.storage.has(key_code)` — Checks if the value exists (whether it is Null/Undefined) and returns `True`/`False`.
- `basic.storage.remove(key_code)` — Only cleans/removes the key, making it no longer exist.
- `basic.storage.clear()` — Clears all logs and persistent objects in the Storage belonging to that system/application.

```javascript
// Save data.
basic.storage.save("UserID", "US1991A5B");

// Find if it still exists after reopening...
let doesDataExist = basic.storage.has("UserID");

// Assign the found content to a variable and log it..
if (doesDataExist) {
    let _savedID = basic.storage.load("UserID");
    println("Retrieved ID Info: " + _savedID);
}
```

---

## Summary
- The utilities section of basic.js aims to minimize arranged tasks for the programmer and prevent code waste.
- It is designed particularly for frequent use in `page` or page management functions.
