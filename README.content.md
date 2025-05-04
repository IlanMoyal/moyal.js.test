<!-- TOC -->
- [⬇️ Installation](#-installation)
- [🚀 Quick Start](#-quick-start)
- [✨ Features](#-features)
- [📦 Exported Modules and Classes](#-exported-modules-and-classes)
- [✅ Simple Usage](#-simple-usage)
- [🔧 Available Assertion Methods](#-available-assertion-methods)
- [🧰 Utility Types](#-utility-types)
- [🖨️ Custom Logger Support](#-custom-logger-support)

<!-- CONTENT -->
## ⬇️ Installation

> npm i @moyal/js-test




## 🚀 Quick Start

See also quick-start folder for the source code of the examples.

```js
import {MultiLevelAutoNumbering, TestGroup} from '@moyal/js-test';

new TestGroup("MLA Numbered Tests")
   .areNotEqual("Validate inequality", 1, 2)
	 .areEqual("Test strings", "foo", "foo")
   .groupStart("Nested test group")
	   .isFalse("This is lie", () => 1 == 2)
	   .areEqual("Test B2", "Hello World!", () => "Hello World!") 
	 .groupClose();
	 .areEqual("Test booleans", true, true)
	 .areEqual("Test C", 123, 123)
	 .run(true, new MultiLevelAutoNumbering());
```
In this quick start example:

- Test group enable chaining test calls, as well as creating nested test groups.
- Values, functions and lambda expressions are supported for both expected and actual.
- Test is delayed until run is called.
- Passing true to run, print results to the the console; false prints nothing; null or undefined prints only errors.
- Passing an instance of MultiLevelAutoNumbering auto enumerate the tests.


### In Browser (from your project)
```html
<script type="module">
  import {Test as tst} from '@moyal/js-test';
  tst.isTrue("1 + 1 === 2", 1 + 1 === 2);
</script>
```

### From CDN
Use the library directly from a CDN like [jsDelivr](https://www.jsdelivr.com/) or [unpkg](https://unpkg.com/):

```html
<!-- Minified version -->
<script type="module">
  import "https://cdn.jsdelivr.net/npm/@moyal/js-test@{{version}}/dist/moyal.test.umd.min.js";
  MoyalTest.Test.isTrue("CDN test", true);
</script>

<!-- Full version (non-minified) -->
<script type="module">
  import "https://cdn.jsdelivr.net/npm/@moyal/js-test@{{version}}/dist/moyal.test.umd.js";
</script>
```

Or using **unpkg**:
```html
<script type="module">
  import "https://unpkg.com/@moyal/js-test@{{version}}/dist/moyal.test.umd.min.js";
</script>
```
Note: When using CDN import, `MoyalTest` exposes all types globally, including `Test`, `TestGroup`, `SequentialText`, `AutoNumbering`, and `MultiLevelAutoNumbering` (full list below).

## ✅ Simple Usage

```js
import {Test as tst} from '@moyal/js-test';
tst.isTrue("Boolean check", 7 === 6 + 1);
tst.areEqual("Compare values", 10, 5 + 5);
tst.throws("Expect error", () => { throw new Error("Oops") });
```

### Fluent Test Group
```js
import {TestGroup} from '@moyal/js-test';
const group = new TestGroup("My Test Group");
group
  .isTrue("Truthy check", true)
  .areEqual("Math", 2, 1 + 1)
  .throws("Throw check", () => { throw new Error(); })
  .run(true);
```

## 🔧 Available Assertion Methods

### Direct Static Assertions
```js
import {Test as tst} from '@moyal/js-test';
tst.areEqual(name, expected, actual, comparer?, write?);
tst.areNotEqual(name, notExpected, actual, comparer?, write?);
tst.isTrue(name, actual, write?);
tst.isFalse(name, actual, write?);
tst.isNull(name, actual, write?);
tst.isNotNull(name, actual, write?);
tst.isDefined(name, actual, write?);
tst.isUndefined(name, actual, write?);
tst.throws(name, fn, errorPredicate?, thisArg?, write?);
tst.noThrows(name, fn, thisArg?, write?);
tst.sequencesAreEqual(name, expectedIterable, actualIterable, itemComparer?, write?);
```

### TestGroup API (Fluent Chaining)
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
import {SequentialText} from '@moyal/js-test';
const seq = new SequentialText("Test {0}", 1);
seq.next(); // "Test 1"
seq.next(); // "Test 2"
```
or start with different value:
```js
import {SequentialText} from '@moyal/js-test';
const seq = new SequentialText("Test {0}", 8);
seq.next(); // "Test 8"
seq.next(); // "Test 9"
```

### AutoNumbering
```js
import {AutoNumbering} from '@moyal/js-test';
const an = new AutoNumbering();
an.next("Step A"); // "1. Step A"
an.next("Step B"); // "2. Step B"
```

### MultiLevelAutoNumbering
```js
import {MultiLevelAutoNumbering} from '@moyal/js-test';
const ml = new MultiLevelAutoNumbering();
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
import {MultiLevelAutoNumbering, TestGroup} from '@moyal/js-test';
const ml = new MultiLevelAutoNumbering();
const group = new TestGroup("MLA Numbered Tests");
group.areEqual(ml.next("Test A"), 1, 1)
	 .areEqual(ml.nest().next("Test B1"), "foo", "foo")
	 .areEqual(ml.next("Test B2"), true, true)
	 .unnest().areEqual(ml.next("Test C"), 123, 123)
	 .run(true);
```
Usually you'll call nest() and unnest() when starting or closing a nested test group.

Or even simpler:
```js
import {MultiLevelAutoNumbering, TestGroup} from '@moyal/js-test';
const group = new TestGroup("MLA Numbered Tests");
group.areEqual("Test A", 1, 1)
	 .areEqual("Test B1", "foo", "foo")
	 .areEqual("Test B2", true, true)
	 .areEqual("Test C", 123, 123)
	 .run(true, new MultiLevelAutoNumbering());
```

💡 **new MultiLevelAutoNumbering()** creates a fresh auto-numbering context for the test group and its descendents.

## 🖨️ Custom Logger Support

Override console output with your custom logger:
```js
import {Test, LoggerBase} from '@moyal/js-test';
class MyLogger extends LoggerBase {
  /* implement logger methods */
  log(message, color, ...args) { /* ... */}
  info(message, color, ...args) { /* ... */ }
  warn(message, color, ...args) { /* ... */ }
  error(message, color, ...args) { /* ... */ }
  group(label, color) { /* ... */ }
  groupCollapsed(label, color) { /* ... */ }
  groupEnd() { /* ... */ }
}

Test.logger = new MyLogger();  
```

**Note**
The logger methods are chainable. 





## ✨ Features

- Minimalistic test runner with zero dependencies.
- Works in both browser and Node.js environments.
- Fluent-style test groups for structured assertions.
- Rich console output with color-coded results and grouping.
- Lazy evaluation support for deferred execution (note: not true async test execution).
- Built-in assertion types: equality, throws, null/undefined checks, and sequence comparison.
- Utilities for test numbering and hierarchical auto-numbering.
- Pluggable logger interface with default support for:
  - Browser `console`
  - Node.js `console` with indentation and ANSI coloring
  - Fallback printer for unknown environments







## 📦 Exported Modules and Classes
### Testing types

- `Test` - Contains static method for testing.
- `TestBase` - Derive your class from TestBase to create custom test.
- `Assert` - Base class for assertions.
- `IsDefined` - Asserts that the specified evaluates to defined value.
- `IsUndefined` - Asserts that the specified evaluates to undefined value.
- `IsFalse` - Asserts that the specified evaluates to `false`.
- `IsTrue` - Asserts that the specified evaluates to `false`.
- `IsNull` - Asserts that the specified evaluates to `null`.
- `IsNotNull` - Asserts that the specified evaluates to non `null` value.
- `AreEqual` - Asserts that the specified values evaluations are equal.
- `AreNotEqual` - Asserts that the specified values evaluations are not equal.
- `ThrowsBase` - Base class to test error throwing.
- `Throws` - Asserts that the specified throws error.
- `NoThrows` - Asserts that the specified does not throw error.
- `SequencesAreEqual` - Asserts that the specified sequences are equal.
- `TestGroup` - Groups and enables chaining of multiple tests.

### Utility types:
- `SequentialText` - Utility class to generate sequential text.
- `AutoNumbering` - Utility class to generate automatic incremented number.
- `MultiLevelAutoNumbering` - Utility class to generate automatic incremented number.

### Logging types:
- `LoggerBase` - Base class for logger.
- `SimpleLogger` - Simple logger for unknown environments.
- `BrowserLogger` - Console logger for browser.
- `NodeLogger` - Console logger for NodeJS.

The namespace `MoyalTest` is also exported which wrapping all these types.



