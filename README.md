# moyal.js.test

[![npm version](https://img.shields.io/npm/v/@moyal/js-test)](https://www.npmjs.com/package/@moyal/js-test)
[![license](https://img.shields.io/npm/l/@moyal/js-test)](https://github.com/IlanMoyal/moyal.js.test/blob/main/LICENSE)
[![jsDelivr CDN](https://data.jsdelivr.com/v1/package/npm/@moyal/js-test/badge)](https://www.jsdelivr.com/package/npm/@moyal/js-test)
[![minzipped size](https://badgen.net/bundlephobia/minzip/@moyal/js-test)](https://bundlephobia.com/package/@moyal/js-test)

> A lightweight, dependency-free JavaScript testing utility. This project is framework-agnostic and usable in both browser and Node.js environments.

**Version:** 1.1.0  
**Author:** Ilan Moyal  
**Website:** [https://www.moyal.es](https://www.moyal.es)  
**Repository:** [GitHub](https://github.com/IlanMoyal/moyal.js.test)  
**License:** MIT  
**NPM:** [https://www.npmjs.com/package/@moyal/js-test](https://www.npmjs.com/package/@moyal/js-test)


## ✨ Features

- Minimalistic test runner with zero dependencies.
- Works in both browser and Node.js environments.
- Global `moyal.test` namespace (avoids polluting global scope).
- Fluent-style test groups for structured assertions.
- Rich console output with color-coded results and grouping.
- Lazy evaluation support for async/deferred scenarios.
- Built-in assertion types: equality, throws, null/undefined checks, and sequence comparison.
- Utilities for test numbering and hierarchical auto-numbering.
- Pluggable logger interface with default support for:
  - Browser `console`
  - Node.js `console` with indentation and ANSI coloring
  - Fallback printer for unknown environments

## 🚀 Quick Start

### In Browser (from your project)
```html
<script type="module">
  import './src/moyal.test.js';
  moyal.test.isTrue("1 + 1 === 2", 1 + 1 === 2);
</script>
```

### From CDN
Use the library directly from a CDN like [jsDelivr](https://www.jsdelivr.com/) or [unpkg](https://unpkg.com/):

```html
<!-- Minified version -->
<script type="module">
  import "https://cdn.jsdelivr.net/npm/@moyal/js-test@1.1.0/dist/moyal.test.umd.min.js";
  moyal.test.isTrue("CDN test", true);
</script>

<!-- Full version (non-minified) -->
<script type="module">
  import "https://cdn.jsdelivr.net/npm/@moyal/js-test@1.1.0/dist/moyal.test.umd.js";
</script>
```

Or using **unpkg**:
```html
<script type="module">
  import "https://unpkg.com/@moyal/js-test@1.1.0/dist/moyal.test.umd.min.js";
</script>
```

### In Node.js
```bash
node test.moyal.js
```

## ✅ Basic Usage

```js
moyal.test.isTrue("Boolean check", 7 === 6 + 1);
moyal.test.areEqual("Compare values", 10, 5 + 5);
moyal.test.throws("Expect error", () => { throw new Error("Oops") });
```

### Fluent Test Group
```js
const group = new moyal.test.TestGroup("My Test Group");
group
  .isTrue("Truthy check", true)
  .areEqual("Math", 2, 1 + 1)
  .throws("Throw check", () => { throw new Error(); })
  .run(true);
```

## 🔧 Assertion Methods

### Direct Static Assertions
```js
moyal.test.areEqual(name, expected, actual, comparer?, write?);
moyal.test.areNotEqual(name, notExpected, actual, comparer?, write?);
moyal.test.isTrue(name, actual, write?);
moyal.test.isFalse(name, actual, write?);
moyal.test.isNull(name, actual, write?);
moyal.test.isNotNull(name, actual, write?);
moyal.test.isDefined(name, actual, write?);
moyal.test.isUndefined(name, actual, write?);
moyal.test.throws(name, fn, errorPredicate?, thisArg?, write?);
moyal.test.noThrows(name, fn, thisArg?, write?);
moyal.test.sequencesAreEqual(name, expectedIterable, actualIterable, itemComparer?, write?);
```

### Test Group API (Chainable)
```js
group.isTrue(name, actual)
     .areEqual(name, expected, actual)
     .throws(name, fn)
     .groupStart("Nested")
       .isFalse(name, actual)
     .groupClose();
```



## 🧰 Utility Types

### SequentialText
```js
const seq = new moyal.test.SequentialText("Test {0}", 1);
seq.next(); // "Test 1"
seq.next(); // "Test 2"
```
or start with different value:
```js
const seq = new moyal.test.SequentialText("Test {0}", 8);
seq.next(); // "Test 8"
seq.next(); // "Test 9"
```

### AutoNumbering
```js
const an = new moyal.test.AutoNumbering();
an.next("Step A"); // "1. Step A"
an.next("Step B"); // "2. Step B"
```

### MultiLevelAutoNumbering
```js
const ml = new moyal.test.MultiLevelAutoNumbering();
ml.next("Root");        // "1. Root"
ml.nest().next("Child"); // "1.1. Child"
ml.next("Child"); // "1.2. Child"
ml.next("Child"); // "1.3. Child"
ml.nest().next("Child"); // "1.3.1. Child"
ml.next("Child"); // "1.3.2. Child"
ml.unnest().next("Child"); // "1.4. Child"
ml.next("Child"); // "1.5. Child"
ml.unnest().next("Root2"); // "2. Root2"
```

### MultiLevelAutoNumbering with TestGroup
```js
const ml = new moyal.test.MultiLevelAutoNumbering();
const group = new moyal.test.TestGroup("MLA Numbered Tests");
group.areEqual(ml.next("Test A"), 1, 1)
     .areEqual(ml.nest().next("Test B1"), "foo", "foo")
     .areEqual(ml.next("Test B2"), true, true)
     .unnest().areEqual(ml.next("Test C"), 123, 123)
     .run(true);
```
Usually you'll call nest() and unnest() when starting or closing a nested test group.


## 🖨️ Custom Logger Support

Override console output with your custom logger:
```js
class MyLogger extends moyal.test.LoggerBase {
  /* implement logger methods */
  log(message, color, ...args) { /* ... */}
  info(message, color, ...args) { /* ... */ }
  warn(message, color, ...args) { /* ... */ }
  error(message, color, ...args) { /* ... */ }
  group(label, color) { /* ... */ }
  groupCollapsed(label, color) { /* ... */ }
  groupEnd() { /* ... */ }
}

moyal.test.logger = new MyLogger();  
```

## 🔁 Version Access

Access the library version directly:
```js
moyal.test.Version // → e.g., "1.1.0"
```

## 🔁 Version Bumping

We use NPM’s built-in version tools:
```json
"version:patch": "npm version patch && git push && git push --tags"
"version:minor": "npm version minor && git push && git push --tags"
"version:major": "npm version major && git push && git push --tags"
```

These commands:
1. Bump `package.json` version.
2. Commit and tag the version.
3. Push both commits and tags to remote.

## 📂 Example Test Files

Test examples under the `test/` folder:
- `test.moyal.assertions.js`
- `test.moyal.exceptions.js`
- `test.moyal.sequences.js`
- `test.moyal.testGroup.js`
- `test.moyal.sequentialText.js`
- `test.moyal.autoNumbering.js`
- `test.moyal.multiLevelAutoNumbering.js`

You can run these in Node or browser.

## 🛠️ License

MIT License – free to use, modify, and distribute.

## 🧠 Author

**Ilan Moyal**  
Website: [https://www.moyal.es](https://www.moyal.es)  
GitHub: [IlanMoyal](https://github.com/IlanMoyal)