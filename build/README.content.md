<!-- TOC-SECTION-MARKER -->

- [Features](#features)
- [Quick Start](#quick-start)
- [Custom Logger Support](#custom-logger-support)
- [Exported Modules and Classes](#exported-modules-and-classes)


  <!-- CONTENT-SECTION-MARKER -->

## Features

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


## Quick Start

See also quick-start folder for the source code of the examples.

```js
import {MultiLevelAutoNumbering, TestGroup} from '{{scope}}/{{lib}}';

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

More examples can be found in {{examplesFolder}} and {{testFolder}}/units.

## Custom Logger Support

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


## Exported Modules and Classes

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

The namespace `{{outputExposedName}}` is also exported which wrapping all these types.
