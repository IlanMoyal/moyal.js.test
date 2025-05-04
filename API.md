## Classes

<dl>
<dt><a href="#TestBase">TestBase</a></dt>
<dd><p>BaseTest</p>
<p>Abstract base class for all test types.</p>
<p>Provides a unified interface for managing test name, success/failure status, timing, and output.
Subclasses must override the <code>runImpl()</code> method to implement test logic.</p>
</dd>
<dt><a href="#Assert">Assert</a></dt>
<dd><p>Assert</p>
<p>A generic assertion test class that evaluates either a boolean or a function returning boolean.</p>
<p>Inherits from <a href="#TestBase">TestBase</a>.
Typically used for boolean tests or custom logic.</p>
</dd>
<dt><a href="#ThrowsBase">ThrowsBase</a></dt>
<dd><p>ThrowsBase</p>
<p>Base class for tests that evaluate whether a function throws or not.</p>
<p>Supports optional error validation via predicate functions.</p>
<p>Inherits from <a href="#Assert">Assert</a>.
Not used directly — use <a href="#Throws">Throws</a> or <a href="#NoThrows">NoThrows</a> instead.</p>
</dd>
<dt><a href="#Test">Test</a></dt>
<dd><p>Test</p>
<p>The main static interface for the moyal.js.test framework.</p>
<p>Provides assertion utilities for test development and a central entry point to define and run tests.
Also contains type utilities to assist in dynamic validation.</p>
<p>Example usage:</p>
<pre><code class="language-js">Test.isTrue(&quot;Test if value is true&quot;, myValue);
Test.areEqual(&quot;Value check&quot;, expected, actual);
</code></pre>
</dd>
<dt><a href="#BrowserLogger">BrowserLogger</a></dt>
<dd><p>BrowserLogger</p>
<p>A simple implementation of browser console logger.</p>
</dd>
<dt><a href="#LoggerBase">LoggerBase</a></dt>
<dd><p>Base class for logger.</p>
</dd>
<dt><a href="#NodeLogger">NodeLogger</a></dt>
<dd><p>NodeLogger</p>
<p>A simple implementation of NodeJS Logger</p>
</dd>
<dt><a href="#SimpleLogger">SimpleLogger</a></dt>
<dd><p>SimpleLogger</p>
<p>A basic implementation of simple logger.</p>
</dd>
<dt><a href="#AreEqual">AreEqual</a></dt>
<dd><p>AreEqual</p>
<p>A test that compares two values using strict equality (<code>===</code>) or a custom comparer function.</p>
<p>Inherits from <a href="#Assert">Assert</a>.</p>
</dd>
<dt><a href="#AreNotEqual">AreNotEqual</a></dt>
<dd><p>AreNotEqual</p>
<p>A test that verifies two values are <strong>not equal</strong> using strict inequality (<code>!==</code>)
or a custom comparer function that is expected to return <code>false</code>.</p>
<p>This test passes when <code>actual !== not_expected</code>, or when the <code>comparer</code> returns <code>false</code>.</p>
<p>Inherits from <a href="#Assert">Assert</a>.</p>
<p>Example:</p>
<pre><code class="language-js">new AreNotEqual(&quot;Should be different&quot;, 42, value);
new AreNotEqual(&quot;Custom inequality&quot;, a, b, (a, b) =&gt; deepCompare(a, b));
</code></pre>
</dd>
<dt><a href="#IsDefined">IsDefined</a></dt>
<dd><p>IsDefined</p>
<p>A test that asserts the actual value is <strong>not</strong> <code>undefined</code>.</p>
<p>Inherits from <a href="#Assert">Assert</a>.</p>
<p>Example:</p>
<pre><code class="language-js">isDefined(&quot;Value should be defined&quot;, myValue);
</code></pre>
</dd>
<dt><a href="#IsFalse">IsFalse</a></dt>
<dd><p>IsFalse</p>
<p>A test that asserts the actual value is strictly <code>false</code>.</p>
<p>Can accept a boolean value or a function returning boolean.</p>
<p>Inherits from <a href="#Assert">Assert</a>.</p>
</dd>
<dt><a href="#IsNotNull">IsNotNull</a></dt>
<dd><p>IsNotNull</p>
<p>A test that asserts the actual value is <strong>not</strong> <code>null</code>.</p>
<p>Inherits from <a href="#Assert">Assert</a>.</p>
<p>Example:</p>
<pre><code class="language-js">isNotNull(&quot;Should not be null&quot;, myValue);
</code></pre>
</dd>
<dt><a href="#IsNull">IsNull</a></dt>
<dd><p>IsNull</p>
<p>A test that asserts the actual value is strictly <code>null</code>.</p>
<p>Inherits from <a href="#Assert">Assert</a>.</p>
<p>Example:</p>
<pre><code class="language-js">isNull(&quot;Should be null&quot;, myValue);
</code></pre>
</dd>
<dt><a href="#IsTrue">IsTrue</a></dt>
<dd><p>IsTrue</p>
<p>A test that asserts the actual value is strictly <code>true</code>.</p>
<p>Can accept a boolean value or a function returning boolean.</p>
<p>Inherits from <a href="#Assert">Assert</a>.</p>
</dd>
<dt><a href="#IsUndefined">IsUndefined</a></dt>
<dd><p>IsUndefined</p>
<p>A test that asserts the actual value is strictly <code>undefined</code>.</p>
<p>Inherits from <a href="#Assert">Assert</a>.</p>
<p>Example:</p>
<pre><code class="language-js">isUndefined(&quot;Should be undefined&quot;, maybeMissing);
</code></pre>
</dd>
<dt><a href="#NoThrows">NoThrows</a></dt>
<dd><p>NoThrows</p>
<p>A test that verifies a function does not throw any error.</p>
<p>Inherits from <a href="#ThrowsBase">ThrowsBase</a>.</p>
</dd>
<dt><a href="#SequencesAreEqual">SequencesAreEqual</a></dt>
<dd><p>SequencesAreEqual</p>
<p>A test that compares two iterable sequences element-by-element for equality.</p>
<p>You can supply a custom item comparison function. Results include index mismatches.</p>
<p>Inherits from <a href="#TestBase">TestBase</a>.</p>
</dd>
<dt><a href="#TestGroup">TestGroup</a></dt>
<dd><p>TestGroup</p>
<p>A container for managing and executing multiple tests (or nested groups of tests).</p>
<p>Automatically aggregates success/failure counts and outputs structured logs.</p>
<p>Supports fluent-style chaining:</p>
<pre><code class="language-js">group.isTrue(&quot;A&quot;, true)
     .areEqual(&quot;Compare&quot;, 1, 1)
     .throws(&quot;Expect error&quot;, () =&gt; { throw new Error(); });
     .groupStart(&quot;another group&quot;)
             .areEqual(&quot;Compare&quot;, 3, 3)
             .throws(&quot;Expect error&quot;, () =&gt; { throw new Error(); });
     .groupClose()
     .run();
</code></pre>
<p>Inherits from <a href="#TestBase">TestBase</a>.</p>
</dd>
<dt><a href="#Throws">Throws</a></dt>
<dd><p>Throws</p>
<p>A test that expects a function to throw an exception.</p>
<p>You may optionally provide a predicate to verify the thrown error.</p>
<p>Inherits from <a href="#ThrowsBase">ThrowsBase</a>.</p>
</dd>
<dt><a href="#AutoNumbering">AutoNumbering</a></dt>
<dd><p>AutoNumbering</p>
<p>Extends <a href="#SequentialText">SequentialText</a> to support formatted auto-numbered items like <code>&quot;1. Step A&quot;</code>.</p>
<p>Useful for numbering tests, documentation sections, or steps in a procedure.</p>
<p>Example:</p>
<pre><code class="language-js">const an = new AutoNumbering();
an.next(&quot;Initialize DB&quot;); // &quot;1. Initialize DB&quot;
an.next(&quot;Check Schema&quot;);  // &quot;2. Check Schema&quot;
</code></pre>
</dd>
<dt><a href="#MultiLevelAutoNumbering">MultiLevelAutoNumbering</a></dt>
<dd><p>MultiLevelAutoNumbering</p>
<p>A hierarchical auto-numbering utility supporting nested sequences like:</p>
<pre><code>1.
1.1.
1.2.
2.
2.1.1.
</code></pre>
<p>Internally uses a stack of <a href="#AutoNumbering">AutoNumbering</a> instances, one for each level.
Supports <code>nest()</code> to go deeper and <code>unnest()</code> to go back.</p>
<p>Example:</p>
<pre><code class="language-js">const ml = new MultiLevelAutoNumbering();
ml.next(&quot;Root A&quot;);           // &quot;1. Root A&quot;
ml.nest().next(&quot;Child A&quot;);   // &quot;1.1. Child A&quot;
ml.next(&quot;Child B&quot;);         // &quot;1.2. Child B&quot;
ml.unnest().next(&quot;Root B&quot;);  // &quot;2. Root B&quot;
ml.next(&quot;Root C&quot;);           // &quot;3. Root B&quot;
</code></pre>
</dd>
<dt><a href="#SequentialText">SequentialText</a></dt>
<dd><p>SequentialText</p>
<p>A utility class that generates a sequence of formatted strings like <code>&quot;1&quot;</code>, <code>&quot;2&quot;</code>, etc., using a
text template such as <code>&quot;{0}&quot;</code> or <code>&quot;Step {0}&quot;</code>.</p>
<p>Supports resetting and iteration with <code>for...of</code>.</p>
<p>Example:</p>
<pre><code class="language-js">const st = new SequentialText(&quot;Item {0}&quot;, 1);
st.next(); // &quot;Item 1&quot;
st.next(); // &quot;Item 2&quot;
</code></pre>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#SequentialText.">SequentialText.(textFormat, startValue)</a></dt>
<dd><p>Generator that produces an infinite sequence of formatted strings using a number.
Example: &quot;{0}&quot; → &quot;1&quot;, &quot;2&quot;, &quot;3&quot;, ...</p>
</dd>
</dl>

<a name="TestBase"></a>

## *TestBase*
BaseTestAbstract base class for all test types.Provides a unified interface for managing test name, success/failure status, timing, and output.Subclasses must override the `runImpl()` method to implement test logic.

**Kind**: global abstract class  

* *[TestBase](#TestBase)*
    * *[new TestBase(testName, [successMessage], [failureMessage], [additionalData])](#new_TestBase_new)*
    * *[.name](#TestBase+name) ⇒ <code>string</code>*
    * *[.successMessage](#TestBase+successMessage) ⇒ <code>string</code>*
    * *[.failureMessage](#TestBase+failureMessage) ⇒ <code>string</code>*
    * *[.elapsed](#TestBase+elapsed) ⇒ <code>number</code>*
    * *[.elapsed](#TestBase+elapsed)*
    * *[.succeeded](#TestBase+succeeded) ⇒ <code>boolean</code>*
    * *[.succeeded](#TestBase+succeeded)*
    * *[.failed](#TestBase+failed) ⇒ <code>boolean</code>*
    * *[.errors](#TestBase+errors) ⇒ <code>Array.&lt;Error&gt;</code>*
    * *[.errorCount](#TestBase+errorCount) ⇒ <code>number</code>*
    * *[.additionalData](#TestBase+additionalData) ⇒ <code>any</code>*
    * *[.additionalData](#TestBase+additionalData)*
    * *[.logger](#TestBase+logger) ⇒ [<code>LoggerBase</code>](#LoggerBase)*
    * *[.run(write, [mlAutoNumber])](#TestBase+run) ⇒ <code>boolean</code>*
    * **[.runImpl()](#TestBase+runImpl)**
    * *[.write([mlAutoNumber])](#TestBase+write)*

<a name="new_TestBase_new"></a>

### *new TestBase(testName, [successMessage], [failureMessage], [additionalData])*
Base class for all test types.This class defines the common interface for test name, result summary,success/failure messages, optional data, and a way to log results.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| testName | <code>string</code> |  | The name of the test (must be string). |
| [successMessage] | <code>string</code> | <code>&quot;\&quot;success\&quot;&quot;</code> | Message when the test passes. |
| [failureMessage] | <code>string</code> | <code>&quot;\&quot;failure\&quot;&quot;</code> | Message when the test fails. |
| [additionalData] | <code>any</code> |  | Arbitrary data to show with test output. |

<a name="TestBase+name"></a>

### *testBase.name ⇒ <code>string</code>*
Returns the name of the test.

**Kind**: instance property of [<code>TestBase</code>](#TestBase)  
**Returns**: <code>string</code> - - The name of the test.  
<a name="TestBase+successMessage"></a>

### *testBase.successMessage ⇒ <code>string</code>*
Returns the message to display on test success.

**Kind**: instance property of [<code>TestBase</code>](#TestBase)  
**Returns**: <code>string</code> - - The message to display on test success.  
<a name="TestBase+failureMessage"></a>

### *testBase.failureMessage ⇒ <code>string</code>*
Returns the message to display on test failure.

**Kind**: instance property of [<code>TestBase</code>](#TestBase)  
**Returns**: <code>string</code> - - The message to display on test failure.  
<a name="TestBase+elapsed"></a>

### *testBase.elapsed ⇒ <code>number</code>*
Gets the duration in milliseconds.

**Kind**: instance property of [<code>TestBase</code>](#TestBase)  
**Returns**: <code>number</code> - The duration in milliseconds.  
<a name="TestBase+elapsed"></a>

### *testBase.elapsed*
Sets the time elapsed.

**Kind**: instance property of [<code>TestBase</code>](#TestBase)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Duration in milliseconds |

<a name="TestBase+succeeded"></a>

### *testBase.succeeded ⇒ <code>boolean</code>*
Returns whether the test passed — overridden in derived classes.

**Kind**: instance property of [<code>TestBase</code>](#TestBase)  
**Returns**: <code>boolean</code> - - Whether the test passed — overridden in derived classes.  
<a name="TestBase+succeeded"></a>

### *testBase.succeeded*
Sets a value indicating whether the test passed.

**Kind**: instance property of [<code>TestBase</code>](#TestBase)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>boolean</code> | A value indicating whether the test passed. |

<a name="TestBase+failed"></a>

### *testBase.failed ⇒ <code>boolean</code>*
Returns whether the test failed (inverse of succeeded).

**Kind**: instance property of [<code>TestBase</code>](#TestBase)  
**Returns**: <code>boolean</code> - - Whether the test failed (inverse of succeeded).  
<a name="TestBase+errors"></a>

### *testBase.errors ⇒ <code>Array.&lt;Error&gt;</code>*
Returns the list of errors associated with the test.

**Kind**: instance property of [<code>TestBase</code>](#TestBase)  
**Returns**: <code>Array.&lt;Error&gt;</code> - - The list of errors associated with the test.  
<a name="TestBase+errorCount"></a>

### *testBase.errorCount ⇒ <code>number</code>*
Returns the count of errors (possibly from child tests)

**Kind**: instance property of [<code>TestBase</code>](#TestBase)  
**Returns**: <code>number</code> - - The count of errors (possibly from child tests).  
<a name="TestBase+additionalData"></a>

### *testBase.additionalData ⇒ <code>any</code>*
Gets extra information to log with the test.

**Kind**: instance property of [<code>TestBase</code>](#TestBase)  
**Returns**: <code>any</code> - Extra information to log with the test  
<a name="TestBase+additionalData"></a>

### *testBase.additionalData*
Sets extra information to log with the test.

**Kind**: instance property of [<code>TestBase</code>](#TestBase)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The additional data. |

<a name="TestBase+logger"></a>

### *testBase.logger ⇒ [<code>LoggerBase</code>](#LoggerBase)*
Returns the logger used to log test results.

**Kind**: instance property of [<code>TestBase</code>](#TestBase)  
**Returns**: [<code>LoggerBase</code>](#LoggerBase) - - The logger used to log test results.  
<a name="TestBase+run"></a>

### *testBase.run(write, [mlAutoNumber]) ⇒ <code>boolean</code>*
Runs the test and optionally writes its result.

**Kind**: instance method of [<code>TestBase</code>](#TestBase)  
**Returns**: <code>boolean</code> - Whether the test passed.  

| Param | Type | Description |
| --- | --- | --- |
| write | <code>boolean</code> | If true, writes the result to the console;           If false doesn't write the result to the console;           Otherwise writes only failures to the console. |
| [mlAutoNumber] | [<code>MultiLevelAutoNumbering</code>](#MultiLevelAutoNumbering) | Optional multi-level automatic numbering to automatically prefix messages with numbers. |

<a name="TestBase+runImpl"></a>

### **testBase.runImpl()**
Runs the test without printing, just settings succeeded to the test result.

**Kind**: instance abstract method of [<code>TestBase</code>](#TestBase)  
<a name="TestBase+write"></a>

### *testBase.write([mlAutoNumber])*
Logs the result of the test to the console.If the test passes with no errors, it uses a flat `console.log`.If there are errors or additional data, it uses a collapsed group for clarity.

**Kind**: instance method of [<code>TestBase</code>](#TestBase)  

| Param | Type | Description |
| --- | --- | --- |
| [mlAutoNumber] | [<code>MultiLevelAutoNumbering</code>](#MultiLevelAutoNumbering) | Optional multi-level automatic numbering to automatically prefix messages with numbers. |

<a name="Assert"></a>

## Assert
AssertA generic assertion test class that evaluates either a boolean or a function returning boolean.Inherits from [TestBase](#TestBase).Typically used for boolean tests or custom logic.

**Kind**: global class  
<a name="new_Assert_new"></a>

### new Assert(testName, test, [successMessage], [failureMessage], [additionalData], [thisArg])
A test that evaluates a function or boolean and tracks its result.If the test value is a function, it's called and timed.If the function throws, it fails and captures the error.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| testName | <code>string</code> |  | Name of the test. |
| test | <code>function</code> \| <code>boolean</code> |  | Test logic (function or static boolean). |
| [successMessage] | <code>string</code> |  | Custom message on success. |
| [failureMessage] | <code>string</code> |  | Custom message on failure. |
| [additionalData] | <code>any</code> |  | Extra data to log. |
| [thisArg] | <code>any</code> | <code>globalThis</code> | `this` context to bind when calling the function. |

<a name="ThrowsBase"></a>

## ThrowsBase
ThrowsBaseBase class for tests that evaluate whether a function throws or not.Supports optional error validation via predicate functions.Inherits from [Assert](#Assert).Not used directly — use [Throws](#Throws) or [NoThrows](#NoThrows) instead.

**Kind**: global class  

* [ThrowsBase](#ThrowsBase)
    * [new ThrowsBase(testName, expectingError, fn, [checkErrorFn], [thisArg])](#new_ThrowsBase_new)
    * [.runImpl()](#ThrowsBase+runImpl)

<a name="new_ThrowsBase_new"></a>

### new ThrowsBase(testName, expectingError, fn, [checkErrorFn], [thisArg])
Base class to test whether a function throws (or not), and optionally validate the error thrown.


| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Name of the test. |
| expectingError | <code>boolean</code> | Whether an error is expected (`true` = should throw). |
| fn | <code>function</code> | Function to test. |
| [checkErrorFn] | <code>function</code> | Optional error predicate to validate the thrown error. |
| [thisArg] | <code>any</code> | Optional `this` context for invoking the test/check function. |

<a name="ThrowsBase+runImpl"></a>

### throwsBase.runImpl()
Executes the test, checking if an error was thrown and optionally applying a predicate on the error.

**Kind**: instance method of [<code>ThrowsBase</code>](#ThrowsBase)  
<a name="Test"></a>

## Test
TestThe main static interface for the moyal.js.test framework.Provides assertion utilities for test development and a central entry point to define and run tests.Also contains type utilities to assist in dynamic validation.Example usage:```jsTest.isTrue("Test if value is true", myValue);Test.areEqual("Value check", expected, actual);```

**Kind**: global class  

* [Test](#Test)
    * [.Version](#Test.Version) ⇒ <code>string</code>
    * [.areEqual(testName, expected, actual, [comparer], [write])](#Test.areEqual) ⇒ <code>boolean</code>
    * [.areNotEqual(testName, not_expected, actual, [comparer], [write])](#Test.areNotEqual) ⇒ <code>boolean</code>
    * [.isTrue(testName, actual, [write])](#Test.isTrue) ⇒ <code>boolean</code>
    * [.isFalse(testName, actual, [write])](#Test.isFalse) ⇒ <code>boolean</code>
    * [.isNull(testName, actual, [write])](#Test.isNull) ⇒ <code>boolean</code>
    * [.isNotNull(testName, actual, [write])](#Test.isNotNull) ⇒ <code>boolean</code>
    * [.isDefined(testName, actual, [write])](#Test.isDefined) ⇒ <code>boolean</code>
    * [.isUndefined(testName, actual, [write])](#Test.isUndefined) ⇒ <code>boolean</code>
    * [.throws(testName, fn, [checkErrorFn], [thisArg], [write])](#Test.throws) ⇒ <code>boolean</code>
    * [.noThrows(testName, fn, [thisArg], [write])](#Test.noThrows) ⇒ <code>boolean</code>
    * [.sequencesAreEqual(testName, expected, actual, [itemComparer], [write])](#Test.sequencesAreEqual) ⇒ <code>boolean</code>

<a name="Test.Version"></a>

### Test.Version ⇒ <code>string</code>
Returns the version of the test library.This is a read-only property used for diagnostics or compatibility checks.

**Kind**: static property of [<code>Test</code>](#Test)  
**Returns**: <code>string</code> - Semantic version string.  
<a name="Test.areEqual"></a>

### Test.areEqual(testName, expected, actual, [comparer], [write]) ⇒ <code>boolean</code>
Asserts strict equality - checks if `actual === expected`, or uses a custom comparer if provided.

**Kind**: static method of [<code>Test</code>](#Test)  
**Returns**: <code>boolean</code> - True if the test succeeded; otherwise, false.  

| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Descriptive test title. |
| expected | <code>\*</code> | Expected value. |
| actual | <code>\*</code> | Actual value to compare. |
| [comparer] | <code>function</code> | Optional custom comparison function ((expected, actual) => boolean). |
| [write] | <code>boolean</code> | The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors. |

<a name="Test.areNotEqual"></a>

### Test.areNotEqual(testName, not_expected, actual, [comparer], [write]) ⇒ <code>boolean</code>
Asserts strict inequality - checks if `actual !== not_expected`, or uses a custom comparer if provided.

**Kind**: static method of [<code>Test</code>](#Test)  
**Returns**: <code>boolean</code> - True if the test succeeded; otherwise, false.  

| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Descriptive test title. |
| not_expected | <code>\*</code> | The value we not expecting. |
| actual | <code>\*</code> | Actual value to compare. |
| [comparer] | <code>function</code> | Optional custom comparison function ((not_expected, actual) => boolean). |
| [write] | <code>boolean</code> | The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors. |

<a name="Test.isTrue"></a>

### Test.isTrue(testName, actual, [write]) ⇒ <code>boolean</code>
Asserts that specified value is strictly `true`.

**Kind**: static method of [<code>Test</code>](#Test)  
**Returns**: <code>boolean</code> - True if the test succeeded; otherwise, false.  

| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Descriptive test title. |
| actual | <code>\*</code> | Value to assert is `true`. |
| [write] | <code>boolean</code> | The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors. |

<a name="Test.isFalse"></a>

### Test.isFalse(testName, actual, [write]) ⇒ <code>boolean</code>
Asserts that specified value is strictly `false`.

**Kind**: static method of [<code>Test</code>](#Test)  
**Returns**: <code>boolean</code> - True if the test succeeded; otherwise, false.  

| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Descriptive test title. |
| actual | <code>\*</code> | Value to assert is `false`. |
| [write] | <code>boolean</code> | The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors. |

<a name="Test.isNull"></a>

### Test.isNull(testName, actual, [write]) ⇒ <code>boolean</code>
Asserts that the specfied value is strictly `null`.

**Kind**: static method of [<code>Test</code>](#Test)  
**Returns**: <code>boolean</code> - True if the test succeeded; otherwise, false.  

| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Descriptive test title. |
| actual | <code>\*</code> | Value to assert is `null`. |
| [write] | <code>boolean</code> | The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors. |

<a name="Test.isNotNull"></a>

### Test.isNotNull(testName, actual, [write]) ⇒ <code>boolean</code>
Asserts that the specified value is **not** `null`.

**Kind**: static method of [<code>Test</code>](#Test)  
**Returns**: <code>boolean</code> - True if the test succeeded; otherwise, false.  

| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Descriptive test title. |
| actual | <code>\*</code> | Value to assert is not `null`. |
| [write] | <code>boolean</code> | The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors. |

<a name="Test.isDefined"></a>

### Test.isDefined(testName, actual, [write]) ⇒ <code>boolean</code>
Asserts that specified value is **not** `undefined`.

**Kind**: static method of [<code>Test</code>](#Test)  
**Returns**: <code>boolean</code> - True if the test succeeded; otherwise, false.  

| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Descriptive test title. |
| actual | <code>\*</code> | Value to assert is defined. |
| [write] | <code>boolean</code> | The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors. |

<a name="Test.isUndefined"></a>

### Test.isUndefined(testName, actual, [write]) ⇒ <code>boolean</code>
Asserts that specified value is strictly `undefined`.

**Kind**: static method of [<code>Test</code>](#Test)  
**Returns**: <code>boolean</code> - True if the test succeeded; otherwise, false.  

| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Descriptive test title. |
| actual | <code>\*</code> | Value to assert is `undefined`. |
| [write] | <code>boolean</code> | The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors. |

<a name="Test.throws"></a>

### Test.throws(testName, fn, [checkErrorFn], [thisArg], [write]) ⇒ <code>boolean</code>
Adds an assertion that verifies a function throws an error.Optionally verifies the error with a predicate.

**Kind**: static method of [<code>Test</code>](#Test)  
**Returns**: <code>boolean</code> - True if the test succeeded; otherwise, false.  

| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Descriptive test title. |
| fn | <code>function</code> | Function expected to throw. |
| [checkErrorFn] | <code>function</code> | Optional predicate to inspect the thrown error. |
| [thisArg] | <code>object</code> | Optional `this` binding for `fn` and `checkErrorFn`. |
| [write] | <code>boolean</code> | The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors. |

<a name="Test.noThrows"></a>

### Test.noThrows(testName, fn, [thisArg], [write]) ⇒ <code>boolean</code>
Adds an assertion that verifies a function does NOT throw.

**Kind**: static method of [<code>Test</code>](#Test)  
**Returns**: <code>boolean</code> - True if the test succeeded; otherwise, false.  

| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Descriptive test title. |
| fn | <code>function</code> | Function expected to execute without throwing. |
| [thisArg] | <code>object</code> | Optional `this` binding for `fn`. |
| [write] | <code>boolean</code> | The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors. |

<a name="Test.sequencesAreEqual"></a>

### Test.sequencesAreEqual(testName, expected, actual, [itemComparer], [write]) ⇒ <code>boolean</code>
Adds a sequence equality assertion to the group.Compares two iterable sequences element-by-element.

**Kind**: static method of [<code>Test</code>](#Test)  
**Returns**: <code>boolean</code> - True if the test succeeded; otherwise, false.  

| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Descriptive test title. |
| expected | <code>Iterable</code> | The expected iterable sequence. |
| actual | <code>Iterable</code> | The actual iterable sequence. |
| [itemComparer] | <code>function</code> | Optional custom item-level comparison function ((expected, actual) => boolean). |
| [write] | <code>boolean</code> | The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors. |

<a name="BrowserLogger"></a>

## BrowserLogger
BrowserLoggerA simple implementation of browser console logger.

**Kind**: global class  

* [BrowserLogger](#BrowserLogger)
    * [.log(message, [color], ...args)](#BrowserLogger+log) ⇒ <code>this</code>
    * [.info(message, [color], ...args)](#BrowserLogger+info) ⇒ <code>this</code>
    * [.warn(message, [color], ...args)](#BrowserLogger+warn) ⇒ <code>this</code>
    * [.error(message, [color], ...args)](#BrowserLogger+error) ⇒ <code>this</code>
    * [.group(label, [color])](#BrowserLogger+group) ⇒ <code>this</code>
    * [.groupCollapsed(label, [color])](#BrowserLogger+groupCollapsed) ⇒ <code>this</code>
    * [.groupEnd()](#BrowserLogger+groupEnd) ⇒ <code>this</code>

<a name="BrowserLogger+log"></a>

### browserLogger.log(message, [color], ...args) ⇒ <code>this</code>
Logs a message.

**Kind**: instance method of [<code>BrowserLogger</code>](#BrowserLogger)  
**Returns**: <code>this</code> - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message. |
| [color] | <code>string</code> | The color to be used. |
| ...args | <code>any</code> | Additional arguments. |

<a name="BrowserLogger+info"></a>

### browserLogger.info(message, [color], ...args) ⇒ <code>this</code>
Logs information message.

**Kind**: instance method of [<code>BrowserLogger</code>](#BrowserLogger)  
**Returns**: <code>this</code> - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message. |
| [color] | <code>string</code> | The color to be used. |
| ...args | <code>any</code> | Additional arguments. |

<a name="BrowserLogger+warn"></a>

### browserLogger.warn(message, [color], ...args) ⇒ <code>this</code>
Logs warning message.

**Kind**: instance method of [<code>BrowserLogger</code>](#BrowserLogger)  
**Returns**: <code>this</code> - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message. |
| [color] | <code>string</code> | The color to be used. |
| ...args | <code>any</code> | Additional arguments. |

<a name="BrowserLogger+error"></a>

### browserLogger.error(message, [color], ...args) ⇒ <code>this</code>
Logs error message.

**Kind**: instance method of [<code>BrowserLogger</code>](#BrowserLogger)  
**Returns**: <code>this</code> - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message. |
| [color] | <code>string</code> | The color to be used. |
| ...args | <code>any</code> | Additional arguments. |

<a name="BrowserLogger+group"></a>

### browserLogger.group(label, [color]) ⇒ <code>this</code>
Starts grouped output.

**Kind**: instance method of [<code>BrowserLogger</code>](#BrowserLogger)  
**Returns**: <code>this</code> - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>string</code> | The group label. |
| [color] | <code>string</code> | The color to be used. |

<a name="BrowserLogger+groupCollapsed"></a>

### browserLogger.groupCollapsed(label, [color]) ⇒ <code>this</code>
Starts grouped output (collapsed by default).

**Kind**: instance method of [<code>BrowserLogger</code>](#BrowserLogger)  
**Returns**: <code>this</code> - The current instance for chaining.*  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>string</code> | The group label. |
| [color] | <code>string</code> | The color to be used. |

<a name="BrowserLogger+groupEnd"></a>

### browserLogger.groupEnd() ⇒ <code>this</code>
Ends group output.

**Kind**: instance method of [<code>BrowserLogger</code>](#BrowserLogger)  
**Returns**: <code>this</code> - The current instance for chaining.  
<a name="LoggerBase"></a>

## *LoggerBase*
Base class for logger.

**Kind**: global abstract class  

* *[LoggerBase](#LoggerBase)*
    * _instance_
        * *[.isSupportedColor(color)](#LoggerBase+isSupportedColor) ⇒ <code>boolean</code>*
        * *[.normalizeColor(color)](#LoggerBase+normalizeColor) ⇒ <code>string</code>*
        * **[.log(message, [color], ...args)](#LoggerBase+log) ⇒ <code>this</code>**
        * **[.info(message, [color], ...args)](#LoggerBase+info) ⇒ <code>this</code>**
        * **[.warn(message, [color], ...args)](#LoggerBase+warn) ⇒ <code>this</code>**
        * **[.error(message, [color], ...args)](#LoggerBase+error) ⇒ <code>this</code>**
        * **[.group(label, [color])](#LoggerBase+group) ⇒ <code>this</code>**
        * **[.groupCollapsed(label, [color])](#LoggerBase+groupCollapsed) ⇒ <code>this</code>**
        * **[.groupEnd()](#LoggerBase+groupEnd) ⇒ <code>this</code>**
    * _static_
        * *[.getDefaultLogger()](#LoggerBase.getDefaultLogger) ⇒ [<code>LoggerBase</code>](#LoggerBase)*
        * *[.isLogger(logger)](#LoggerBase.isLogger) ⇒ <code>boolean</code>*

<a name="LoggerBase+isSupportedColor"></a>

### *loggerBase.isSupportedColor(color) ⇒ <code>boolean</code>*
Returns true if the specified color is supported by the logger.

**Kind**: instance method of [<code>LoggerBase</code>](#LoggerBase)  
**Returns**: <code>boolean</code> - - true if the specified color is supported by the logger; otherwise, flase.  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | The color. |

<a name="LoggerBase+normalizeColor"></a>

### *loggerBase.normalizeColor(color) ⇒ <code>string</code>*
Normalizes the specified color name, or return an empty string if it is not supported.

**Kind**: instance method of [<code>LoggerBase</code>](#LoggerBase)  
**Returns**: <code>string</code> - - The normalized color.  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | The color. |

<a name="LoggerBase+log"></a>

### **loggerBase.log(message, [color], ...args) ⇒ <code>this</code>**
Logs a message.

**Kind**: instance abstract method of [<code>LoggerBase</code>](#LoggerBase)  
**Returns**: <code>this</code> - - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message. |
| [color] | <code>string</code> | The color to be used. |
| ...args | <code>any</code> | Additional arguments. |

<a name="LoggerBase+info"></a>

### **loggerBase.info(message, [color], ...args) ⇒ <code>this</code>**
Logs information message.

**Kind**: instance abstract method of [<code>LoggerBase</code>](#LoggerBase)  
**Returns**: <code>this</code> - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message. |
| [color] | <code>string</code> | The color to be used. |
| ...args | <code>any</code> | Additional arguments. |

<a name="LoggerBase+warn"></a>

### **loggerBase.warn(message, [color], ...args) ⇒ <code>this</code>**
Logs warning message.

**Kind**: instance abstract method of [<code>LoggerBase</code>](#LoggerBase)  
**Returns**: <code>this</code> - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message. |
| [color] | <code>string</code> | The color to be used. |
| ...args | <code>any</code> | Additional arguments. |

<a name="LoggerBase+error"></a>

### **loggerBase.error(message, [color], ...args) ⇒ <code>this</code>**
Logs error message.

**Kind**: instance abstract method of [<code>LoggerBase</code>](#LoggerBase)  
**Returns**: <code>this</code> - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message. |
| [color] | <code>string</code> | The color to be used. |
| ...args | <code>any</code> | Additional arguments. |

<a name="LoggerBase+group"></a>

### **loggerBase.group(label, [color]) ⇒ <code>this</code>**
Starts grouped output.

**Kind**: instance abstract method of [<code>LoggerBase</code>](#LoggerBase)  
**Returns**: <code>this</code> - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>string</code> | The group label. |
| [color] | <code>string</code> | The color to be used. |

<a name="LoggerBase+groupCollapsed"></a>

### **loggerBase.groupCollapsed(label, [color]) ⇒ <code>this</code>**
Starts grouped output (collapsed by default).

**Kind**: instance abstract method of [<code>LoggerBase</code>](#LoggerBase)  
**Returns**: <code>this</code> - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>string</code> | The group label. |
| [color] | <code>string</code> | The color to be used. |

<a name="LoggerBase+groupEnd"></a>

### **loggerBase.groupEnd() ⇒ <code>this</code>**
Ends group output.

**Kind**: instance abstract method of [<code>LoggerBase</code>](#LoggerBase)  
**Returns**: <code>this</code> - The current instance for chaining.  
<a name="LoggerBase.getDefaultLogger"></a>

### *LoggerBase.getDefaultLogger() ⇒ [<code>LoggerBase</code>](#LoggerBase)*
Detects the current environment and returns the appropriate console printer adapter.

**Kind**: static method of [<code>LoggerBase</code>](#LoggerBase)  
<a name="LoggerBase.isLogger"></a>

### *LoggerBase.isLogger(logger) ⇒ <code>boolean</code>*
Checks if obj is an instance of a subclass of LoggerBase.

**Kind**: static method of [<code>LoggerBase</code>](#LoggerBase)  
**Returns**: <code>boolean</code> - True if obj is derived from LoggerBase.  

| Param | Type | Description |
| --- | --- | --- |
| logger | <code>any</code> | Object to test. |

<a name="NodeLogger"></a>

## NodeLogger
NodeLoggerA simple implementation of NodeJS Logger

**Kind**: global class  
<a name="NodeLogger+colorfy"></a>

### nodeLogger.colorfy(message, [color], [defaultColor]) ⇒ <code>string</code>
Wrap the specified message with color codes.

**Kind**: instance method of [<code>NodeLogger</code>](#NodeLogger)  
**Returns**: <code>string</code> - The message sourounded with color codes.  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message |
| [color] | <code>string</code> | The color |
| [defaultColor] | <code>string</code> | default color to be use if the specified color is nnot aplicable. |

<a name="SimpleLogger"></a>

## SimpleLogger
SimpleLoggerA basic implementation of simple logger.

**Kind**: global class  

* [SimpleLogger](#SimpleLogger)
    * [.prefixMessage(message)](#SimpleLogger+prefixMessage) ⇒ <code>string</code>
    * [.colorfy(message, [color], [defaultColor])](#SimpleLogger+colorfy) ⇒ <code>string</code>
    * [.log(message, [color], ...args)](#SimpleLogger+log) ⇒ <code>this</code>
    * [.info(message, [color], ...args)](#SimpleLogger+info) ⇒ <code>this</code>
    * [.warn(message, [color], ...args)](#SimpleLogger+warn) ⇒ <code>this</code>
    * [.error(message, [color], ...args)](#SimpleLogger+error) ⇒ <code>this</code>
    * [.group(label, [color])](#SimpleLogger+group) ⇒ <code>this</code>
    * [.groupCollapsed(label, [color])](#SimpleLogger+groupCollapsed) ⇒ <code>this</code>
    * [.groupEnd()](#SimpleLogger+groupEnd) ⇒ <code>this</code>

<a name="SimpleLogger+prefixMessage"></a>

### simpleLogger.prefixMessage(message) ⇒ <code>string</code>
Prefix the specified message with the necessary indentation.

**Kind**: instance method of [<code>SimpleLogger</code>](#SimpleLogger)  
**Returns**: <code>string</code> - - The indented message.  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message. |

<a name="SimpleLogger+colorfy"></a>

### simpleLogger.colorfy(message, [color], [defaultColor]) ⇒ <code>string</code>
Wrap the specified message with color codes.

**Kind**: instance method of [<code>SimpleLogger</code>](#SimpleLogger)  
**Returns**: <code>string</code> - The message surrounded with color codes.  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message |
| [color] | <code>string</code> | The color |
| [defaultColor] | <code>string</code> | default color to be use if the specified color is not applicable. |

<a name="SimpleLogger+log"></a>

### simpleLogger.log(message, [color], ...args) ⇒ <code>this</code>
Logs a message.

**Kind**: instance method of [<code>SimpleLogger</code>](#SimpleLogger)  
**Returns**: <code>this</code> - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message. |
| [color] | <code>string</code> | The color to be used. |
| ...args | <code>any</code> | Additional arguments. |

<a name="SimpleLogger+info"></a>

### simpleLogger.info(message, [color], ...args) ⇒ <code>this</code>
Logs information message.

**Kind**: instance method of [<code>SimpleLogger</code>](#SimpleLogger)  
**Returns**: <code>this</code> - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message. |
| [color] | <code>string</code> | The color to be used. |
| ...args | <code>any</code> | Additional arguments. |

<a name="SimpleLogger+warn"></a>

### simpleLogger.warn(message, [color], ...args) ⇒ <code>this</code>
Logs warning message.

**Kind**: instance method of [<code>SimpleLogger</code>](#SimpleLogger)  
**Returns**: <code>this</code> - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message. |
| [color] | <code>string</code> | The color to be used. |
| ...args | <code>any</code> | Additional arguments. |

<a name="SimpleLogger+error"></a>

### simpleLogger.error(message, [color], ...args) ⇒ <code>this</code>
Logs error message.

**Kind**: instance method of [<code>SimpleLogger</code>](#SimpleLogger)  
**Returns**: <code>this</code> - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message. |
| [color] | <code>string</code> | The color to be used. |
| ...args | <code>any</code> | Additional arguments. |

<a name="SimpleLogger+group"></a>

### simpleLogger.group(label, [color]) ⇒ <code>this</code>
Starts grouped output.

**Kind**: instance method of [<code>SimpleLogger</code>](#SimpleLogger)  
**Returns**: <code>this</code> - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>string</code> | The group label. |
| [color] | <code>string</code> | The color to be used. |

<a name="SimpleLogger+groupCollapsed"></a>

### simpleLogger.groupCollapsed(label, [color]) ⇒ <code>this</code>
Starts grouped output (collapsed by default).

**Kind**: instance method of [<code>SimpleLogger</code>](#SimpleLogger)  
**Returns**: <code>this</code> - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>string</code> | The group label. |
| [color] | <code>string</code> | The color to be used. |

<a name="SimpleLogger+groupEnd"></a>

### simpleLogger.groupEnd() ⇒ <code>this</code>
Ends group output.

**Kind**: instance method of [<code>SimpleLogger</code>](#SimpleLogger)  
**Returns**: <code>this</code> - The current instance for chaining.  
<a name="SequentialText."></a>

## SequentialText.(textFormat, startValue)
Generator that produces an infinite sequence of formatted strings using a number.Example: "{0}" → "1", "2", "3", ...

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| textFormat | <code>string</code> | A string template, e.g., "{0}" or "Step {0}". |
| startValue | <code>number</code> | The initial numeric value. |

