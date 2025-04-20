# moyal.js.test

> A lightweight, dependency-free JavaScript testing utility. This project is framework-agnostic and usable in both browser and Node.js environments.

**Version:** 1.0.0  
**Author:** Ilan Moyal  
**Website:** [https://www.moyal.es](https://www.moyal.es)  
**Repository:** [GitHub](https://github.com/IlanMoyal/moyal.js.test)  
**License:** MIT

---

## ✨ Features

- Minimalistic test runner with zero dependencies.
- Works in both browser and Node.js environments.
- Global `moyal.test` namespace (avoids polluting global scope).
- Fluent-style test groups for structured assertions.
- Rich console output with color-coded results and grouping.
- Lazy evaluation support for async/deferred scenarios.
- Built-in assertion types: equality, throws, null/undefined checks, and sequence comparison.
- Utilities for test numbering and hierarchical auto-numbering.

---

## 🚀 Quick Start

### In Browser
```html
<script type="module">
  import './src/moyal.test.js';
  moyal.test.isTrue("1 + 1 === 2", 1 + 1 === 2);
</script>
```

### In Node.js
```bash
node test.moyal.assertions.js
```

---

## ✅ Basic Usage

```js
moyal.test.isTrue("Boolean check", true);
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

---

## 🔧 Assertion Methods

### Direct Static Assertions
```js
moyal.test.areEqual(name, expected, actual, comparer?);
moyal.test.areNotEqual(name, notExpected, actual, comparer?);
moyal.test.isTrue(name, actual);
moyal.test.isFalse(name, actual);
moyal.test.isNull(name, actual);
moyal.test.isNotNull(name, actual);
moyal.test.isDefined(name, actual);
moyal.test.isUndefined(name, actual);
moyal.test.throws(name, fn, errorPredicate?, thisArg?);
moyal.test.noThrows(name, fn, thisArg?);
moyal.test.sequencesAreEqual(name, expectedIterable, actualIterable, itemComparer?);
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

---

## 🧰 Utility Types

### Type Checks
```js
moyal.test.isString(value);
moyal.test.isFunction(value);
moyal.test.isFunctionOrGeneratorFunction(value);
moyal.test.isIterable(value);
```

### SequentialText
```js
const seq = new moyal.test.SequentialText("Test {0}", 1);
seq.next(); // "Test 1"
seq.next(); // "Test 2"
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
ml.unnest().next("Root2"); // "2. Root2"
```

---

## 📂 Example Test Files

- `test.moyal.types.js`
- `test.moyal.assertions.js`
- `test.moyal.exceptions.js`
- `test.moyal.sequences.js`
- `test.moyal.testGroup.js`
- `test.moyal.sequentialText.js`
- `test.moyal.autoNumbering.js`
- `test.moyal.multiLevelAutoNumbering.js`

Run them individually using Node or load them in the browser.

---

## 🛠️ License

MIT License – free to use, modify, and distribute.

---

## 🧠 Author

**Ilan Moyal**  
Website: [https://www.moyal.es](https://www.moyal.es)  
GitHub: [IlanMoyal](https://github.com/IlanMoyal)

