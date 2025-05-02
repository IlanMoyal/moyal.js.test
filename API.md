## Classes

<dl>
<dt><a href="#LoggerBase">LoggerBase</a></dt>
<dd><p>Base class for logger.</p>
</dd>
<dt><a href="#SimpleLogger">SimpleLogger</a></dt>
<dd><p>SimpleLogger</p>
<p>A basic implementation of simple logger.</p>
</dd>
<dt><a href="#BrowserLogger">BrowserLogger</a></dt>
<dd><p>BrowserLogger</p>
<p>A simple implementation of browser console logger.</p>
</dd>
<dt><a href="#NodeLogger">NodeLogger</a></dt>
<dd><p>NodeLogger</p>
<p>A simple implementation of NodeJS Logger</p>
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
<dt><a href="#IsTrue">IsTrue</a></dt>
<dd><p>IsTrue</p>
<p>A test that asserts the actual value is strictly <code>true</code>.</p>
<p>Can accept a boolean value or a function returning boolean.</p>
<p>Inherits from <a href="#Assert">Assert</a>.</p>
</dd>
<dt><a href="#IsFalse">IsFalse</a></dt>
<dd><p>IsFalse</p>
<p>A test that asserts the actual value is strictly <code>false</code>.</p>
<p>Can accept a boolean value or a function returning boolean.</p>
<p>Inherits from <a href="#Assert">Assert</a>.</p>
</dd>
<dt><a href="#IsNull">IsNull</a></dt>
<dd><p>IsNull</p>
<p>A test that asserts the actual value is strictly <code>null</code>.</p>
<p>Inherits from <a href="#Assert">Assert</a>.</p>
<p>Example:</p>
<pre><code class="language-js">isNull(&quot;Should be null&quot;, myValue);
</code></pre>
</dd>
<dt><a href="#IsNotNull">IsNotNull</a></dt>
<dd><p>IsNotNull</p>
<p>A test that asserts the actual value is <strong>not</strong> <code>null</code>.</p>
<p>Inherits from <a href="#Assert">Assert</a>.</p>
<p>Example:</p>
<pre><code class="language-js">isNotNull(&quot;Should not be null&quot;, myValue);
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
<dt><a href="#IsUndefined">IsUndefined</a></dt>
<dd><p>IsUndefined</p>
<p>A test that asserts the actual value is strictly <code>undefined</code>.</p>
<p>Inherits from <a href="#Assert">Assert</a>.</p>
<p>Example:</p>
<pre><code class="language-js">isUndefined(&quot;Should be undefined&quot;, maybeMissing);
</code></pre>
</dd>
<dt><a href="#ThrowsBase">ThrowsBase</a></dt>
<dd><p>ThrowsBase</p>
<p>Base class for tests that evaluate whether a function throws or not.</p>
<p>Supports optional error validation via predicate functions.</p>
<p>Inherits from <a href="#Assert">Assert</a>.
Not used directly — use <a href="#Throws">Throws</a> or <a href="#NoThrows">NoThrows</a> instead.</p>
</dd>
<dt><a href="#Throws">Throws</a></dt>
<dd><p>Throws</p>
<p>A test that expects a function to throw an exception.</p>
<p>You may optionally provide a predicate to verify the thrown error.</p>
<p>Inherits from <a href="#ThrowsBase">ThrowsBase</a>.</p>
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
</dl>

## Functions

<dl>
<dt><a href="#SequentialText.">SequentialText.(textFormat, startValue)</a></dt>
<dd><p>Generator that produces an infinite sequence of formatted strings using a number.
Example: &quot;{0}&quot; → &quot;1&quot;, &quot;2&quot;, &quot;3&quot;, ...</p>
</dd>
</dl>

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
    * *[.run(write, [mlAutoNumber])](#TestBase+run) ⇒ <code>boolean</code>*
    * **[.runImpl()](#TestBase+runImpl) ⇒ <code>boolean</code>**
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
**Kind**: instance property of [<code>TestBase</code>](#TestBase)  
**Returns**: <code>string</code> - The name of the test  
<a name="TestBase+successMessage"></a>

### *testBase.successMessage ⇒ <code>string</code>*
**Kind**: instance property of [<code>TestBase</code>](#TestBase)  
**Returns**: <code>string</code> - The message to display on test success  
<a name="TestBase+failureMessage"></a>

### *testBase.failureMessage ⇒ <code>string</code>*
**Kind**: instance property of [<code>TestBase</code>](#TestBase)  
**Returns**: <code>string</code> - The message to display on test failure  
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
**Kind**: instance property of [<code>TestBase</code>](#TestBase)  
**Returns**: <code>boolean</code> - Whether the test passed — overridden in derived classes  
<a name="TestBase+succeeded"></a>

### *testBase.succeeded*
Sets a value indicating whether the test passed.

**Kind**: instance property of [<code>TestBase</code>](#TestBase)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>boolean</code> | A value indicating whether the test passed. |

<a name="TestBase+failed"></a>

### *testBase.failed ⇒ <code>boolean</code>*
**Kind**: instance property of [<code>TestBase</code>](#TestBase)  
**Returns**: <code>boolean</code> - Whether the test failed (inverse of succeeded)  
<a name="TestBase+errors"></a>

### *testBase.errors ⇒ <code>Array.&lt;Error&gt;</code>*
**Kind**: instance property of [<code>TestBase</code>](#TestBase)  
**Returns**: <code>Array.&lt;Error&gt;</code> - List of errors associated with the test  
<a name="TestBase+errorCount"></a>

### *testBase.errorCount ⇒ <code>number</code>*
**Kind**: instance property of [<code>TestBase</code>](#TestBase)  
**Returns**: <code>number</code> - Count of errors (possibly from child tests)  
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

### **testBase.runImpl() ⇒ <code>boolean</code>**
Runs the test without printing.

**Kind**: instance abstract method of [<code>TestBase</code>](#TestBase)  
**Returns**: <code>boolean</code> - Whether the test passed.  
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

<a name="AreEqual"></a>

## AreEqual
AreEqualA test that compares two values using strict equality (`===`) or a custom comparer function.Inherits from [Assert](#Assert).

**Kind**: global class  
<a name="new_AreEqual_new"></a>

### new AreEqual(testName, expected, actual, [comparer], [thisArg])
Compares two values using `===` or a custom comparer function.Values can be passed directly or as functions for deferred evaluation.


| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Name of the test. |
| expected | <code>any</code> \| <code>function</code> | Expected value or function returning it. |
| actual | <code>any</code> \| <code>function</code> | Actual value or function returning it. |
| [comparer] | <code>function</code> | Optional custom comparison function ((expected, actual) => boolean). |
| [thisArg] | <code>any</code> | Optional context for invoking deferred or comparison functions. |

<a name="AreNotEqual"></a>

## AreNotEqual
AreNotEqualA test that verifies two values are **not equal** using strict inequality (`!==`)or a custom comparer function that is expected to return `false`.This test passes when `actual !== not_expected`, or when the `comparer` returns `false`.Inherits from [Assert](#Assert).Example:```jsnew AreNotEqual("Should be different", 42, value);new AreNotEqual("Custom inequality", a, b, (a, b) => deepCompare(a, b));```

**Kind**: global class  
<a name="new_AreNotEqual_new"></a>

### new AreNotEqual(testName, not_expected, actual, [comparer], [thisArg])
Constructs a new inequality assertion.


| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Name of the test. |
| not_expected | <code>any</code> \| <code>function</code> | Value the actual result must NOT match. |
| actual | <code>any</code> \| <code>function</code> | Actual value or function returning it. |
| [comparer] | <code>function</code> | Optional custom comparison function ((not_expected, actual) => boolean). |
| [thisArg] | <code>any</code> | Optional context for invoking deferred or comparison functions. |

<a name="IsTrue"></a>

## IsTrue
IsTrueA test that asserts the actual value is strictly `true`.Can accept a boolean value or a function returning boolean.Inherits from [Assert](#Assert).

**Kind**: global class  
<a name="new_IsTrue_new"></a>

### new IsTrue(testName, actual, [thisArg])
Asserts that a value is strictly `true`.


| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | The name of the test. |
| actual | <code>any</code> \| <code>function</code> | The value or function to evaluate. |
| [thisArg] | <code>any</code> | Optional context in which to invoke deferred evaluation. |

<a name="IsFalse"></a>

## IsFalse
IsFalseA test that asserts the actual value is strictly `false`.Can accept a boolean value or a function returning boolean.Inherits from [Assert](#Assert).

**Kind**: global class  
<a name="new_IsFalse_new"></a>

### new IsFalse(testName, actual, [thisArg])
Asserts that a value is strictly `false`.


| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | The name of the test. |
| actual | <code>any</code> \| <code>function</code> | The value or function to evaluate. |
| [thisArg] | <code>any</code> | Optional context for evaluation. |

<a name="IsNull"></a>

## IsNull
IsNullA test that asserts the actual value is strictly `null`.Inherits from [Assert](#Assert).Example:```jsisNull("Should be null", myValue);```

**Kind**: global class  
<a name="new_IsNull_new"></a>

### new IsNull(testName, actual, [thisArg])
Constructs a null-check assertion.


| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Descriptive name of the test. |
| actual | <code>any</code> \| <code>function</code> | Value to test or function that returns it. |
| [thisArg] | <code>any</code> | Optional context for function calls. |

<a name="IsNotNull"></a>

## IsNotNull
IsNotNullA test that asserts the actual value is **not** `null`.Inherits from [Assert](#Assert).Example:```jsisNotNull("Should not be null", myValue);```

**Kind**: global class  
<a name="new_IsNotNull_new"></a>

### new IsNotNull(testName, actual, [thisArg])
Constructs a not-null assertion.


| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Descriptive name of the test. |
| actual | <code>any</code> \| <code>function</code> | Value to check. |
| [thisArg] | <code>any</code> | Optional context for invocation. |

<a name="IsDefined"></a>

## IsDefined
IsDefinedA test that asserts the actual value is **not** `undefined`.Inherits from [Assert](#Assert).Example:```jsisDefined("Value should be defined", myValue);```

**Kind**: global class  
<a name="new_IsDefined_new"></a>

### new IsDefined(testName, actual, [thisArg])
Constructs a defined-check assertion.


| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Descriptive name of the test. |
| actual | <code>any</code> \| <code>function</code> | Value to evaluate or function to call. |
| [thisArg] | <code>any</code> | Optional context for evaluation. |

<a name="IsUndefined"></a>

## IsUndefined
IsUndefinedA test that asserts the actual value is strictly `undefined`.Inherits from [Assert](#Assert).Example:```jsisUndefined("Should be undefined", maybeMissing);```

**Kind**: global class  
<a name="new_IsUndefined_new"></a>

### new IsUndefined(testName, actual, [thisArg])
Constructs an undefined-check assertion.


| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Descriptive name of the test. |
| actual | <code>any</code> \| <code>function</code> | Value to test or a function that returns it. |
| [thisArg] | <code>any</code> | Optional context for deferred invocation. |

<a name="ThrowsBase"></a>

## ThrowsBase
ThrowsBaseBase class for tests that evaluate whether a function throws or not.Supports optional error validation via predicate functions.Inherits from [Assert](#Assert).Not used directly — use [Throws](#Throws) or [NoThrows](#NoThrows) instead.

**Kind**: global class  

* [ThrowsBase](#ThrowsBase)
    * [new ThrowsBase(testName, expectingError, fn, [checkErrorFn], [thisArg])](#new_ThrowsBase_new)
    * [.runImpl()](#ThrowsBase+runImpl) ⇒ <code>boolean</code>

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

### throwsBase.runImpl() ⇒ <code>boolean</code>
Executes the test, checking if an error was thrown and optionally applying a predicate on the error.

**Kind**: instance method of [<code>ThrowsBase</code>](#ThrowsBase)  
**Returns**: <code>boolean</code> - Whether the test passed.  
<a name="Throws"></a>

## Throws
ThrowsA test that expects a function to throw an exception.You may optionally provide a predicate to verify the thrown error.Inherits from [ThrowsBase](#ThrowsBase).

**Kind**: global class  
<a name="new_Throws_new"></a>

### new Throws(testName, fn, [checkErrorFn], [thisArg])
Tests that a function throws, and optionally that the thrown error satisfies a condition.


| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Name of the test. |
| fn | <code>function</code> | The function that should throw. |
| [checkErrorFn] | <code>function</code> | Optional error predicate. |
| [thisArg] | <code>any</code> | Optional `this` context. |

<a name="NoThrows"></a>

## NoThrows
NoThrowsA test that verifies a function does not throw any error.Inherits from [ThrowsBase](#ThrowsBase).

**Kind**: global class  
<a name="new_NoThrows_new"></a>

### new NoThrows(testName, fn, [thisArg])
Tests that a function does NOT throw.


| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Name of the test. |
| fn | <code>function</code> | The function to test. |
| [thisArg] | <code>any</code> | Optional `this` context. |

<a name="SequencesAreEqual"></a>

## SequencesAreEqual
SequencesAreEqualA test that compares two iterable sequences element-by-element for equality.You can supply a custom item comparison function. Results include index mismatches.Inherits from [TestBase](#TestBase).

**Kind**: global class  

* [SequencesAreEqual](#SequencesAreEqual)
    * [new SequencesAreEqual(testName, expected, actual, [itemComparer], [thisArg])](#new_SequencesAreEqual_new)
    * [.runImpl()](#SequencesAreEqual+runImpl) ⇒ <code>boolean</code>

<a name="new_SequencesAreEqual_new"></a>

### new SequencesAreEqual(testName, expected, actual, [itemComparer], [thisArg])
Compares two iterable sequences element by element.


| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Name of the test. |
| expected | <code>Iterable.&lt;any&gt;</code> | Expected sequence. |
| actual | <code>Iterable.&lt;any&gt;</code> | Actual sequence. |
| [itemComparer] | <code>function</code> | Optional custom comparison function to compare individual items ((expected, actual) => boolean). |
| [thisArg] | <code>any</code> | Optional `this` binding for the itemComparer. |

<a name="SequencesAreEqual+runImpl"></a>

### sequencesAreEqual.runImpl() ⇒ <code>boolean</code>
Runs the test without printing.

**Kind**: instance method of [<code>SequencesAreEqual</code>](#SequencesAreEqual)  
**Returns**: <code>boolean</code> - Whether the test passed.  
<a name="TestGroup"></a>

## TestGroup
TestGroupA container for managing and executing multiple tests (or nested groups of tests).Automatically aggregates success/failure counts and outputs structured logs.Supports fluent-style chaining:```jsgroup.isTrue("A", true)     .areEqual("Compare", 1, 1)     .throws("Expect error", () => { throw new Error(); });     .groupStart("another group")             .areEqual("Compare", 3, 3)             .throws("Expect error", () => { throw new Error(); });     .groupClose()     .run();```Inherits from [TestBase](#TestBase).

**Kind**: global class  

* [TestGroup](#TestGroup)
    * [new TestGroup(testName, ...tests)](#new_TestGroup_new)
    * [.errorCount](#TestGroup+errorCount) ⇒ <code>number</code>
    * [.clear()](#TestGroup+clear)
    * [.run(write, [mlAutoNumber])](#TestGroup+run) ⇒ <code>boolean</code>
    * [.runImpl()](#TestGroup+runImpl) ⇒ <code>boolean</code>
    * [.write([mlAutoNumber])](#TestGroup+write)
    * [.add(...tests)](#TestGroup+add)
    * [.groupStart(testName)](#TestGroup+groupStart) ⇒ [<code>TestGroup</code>](#TestGroup)
    * [.groupClose()](#TestGroup+groupClose) ⇒ [<code>TestGroup</code>](#TestGroup)
    * [.areEqual(testName, expected, actual, [comparer], [thisArg])](#TestGroup+areEqual) ⇒ [<code>TestGroup</code>](#TestGroup)
    * [.areNotEqual(testName, not_expected, actual, [comparer], [thisArg])](#TestGroup+areNotEqual) ⇒ [<code>TestGroup</code>](#TestGroup)
    * [.isTrue(testName, actual, [thisArg])](#TestGroup+isTrue) ⇒ [<code>TestGroup</code>](#TestGroup)
    * [.isFalse(testName, actual, [thisArg])](#TestGroup+isFalse) ⇒ [<code>TestGroup</code>](#TestGroup)
    * [.isNull(testName, actual, [thisArg])](#TestGroup+isNull) ⇒ [<code>TestGroup</code>](#TestGroup)
    * [.isNotNull(testName, actual, [thisArg])](#TestGroup+isNotNull) ⇒ [<code>TestGroup</code>](#TestGroup)
    * [.isDefined(testName, actual, [thisArg])](#TestGroup+isDefined) ⇒ [<code>TestGroup</code>](#TestGroup)
    * [.isUndefined(testName, actual, [thisArg])](#TestGroup+isUndefined) ⇒ [<code>TestGroup</code>](#TestGroup)
    * [.throws(testName, fn, [checkErrorFn], [thisArg])](#TestGroup+throws) ⇒ [<code>TestGroup</code>](#TestGroup)
    * [.noThrows(testName, fn, [thisArg])](#TestGroup+noThrows) ⇒ [<code>TestGroup</code>](#TestGroup)
    * [.sequencesAreEqual(testName, expected, actual, {function(any,)](#TestGroup+sequencesAreEqual) ⇒ [<code>TestGroup</code>](#TestGroup)

<a name="new_TestGroup_new"></a>

### new TestGroup(testName, ...tests)
Creates a new test group to encapsulate multiple tests or nested groups.


| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | The name/title of this group. |
| ...tests | [<code>TestBase</code>](#TestBase) | Optional tests or nested groups to immediately add. |

<a name="TestGroup+errorCount"></a>

### testGroup.errorCount ⇒ <code>number</code>
**Kind**: instance property of [<code>TestGroup</code>](#TestGroup)  
**Returns**: <code>number</code> - Total number of errors found (including nested groups).  
<a name="TestGroup+clear"></a>

### testGroup.clear()
Clears all tests in this group.

**Kind**: instance method of [<code>TestGroup</code>](#TestGroup)  
**Access**: public  
<a name="TestGroup+run"></a>

### testGroup.run(write, [mlAutoNumber]) ⇒ <code>boolean</code>
Runs the test and optionally writes its result.

**Kind**: instance method of [<code>TestGroup</code>](#TestGroup)  
**Returns**: <code>boolean</code> - Whether the test passed.  

| Param | Type | Description |
| --- | --- | --- |
| write | <code>boolean</code> | If true, writes the result to the console;           If false doesn't write the result to the console;           Otherwise writes only failures to the console. |
| [mlAutoNumber] | [<code>MultiLevelAutoNumbering</code>](#MultiLevelAutoNumbering) | Optional multi-level automatic numbering to automatically prefix messages with numbers. |

<a name="TestGroup+runImpl"></a>

### testGroup.runImpl() ⇒ <code>boolean</code>
Executes all tests/groups in this group without printing.Aggregates error and timing info, but delays output if `write` is false.*

**Kind**: instance method of [<code>TestGroup</code>](#TestGroup)  
**Returns**: <code>boolean</code> - True if all direct tests succeeded.  
<a name="TestGroup+write"></a>

### testGroup.write([mlAutoNumber])
Outputs a summary line and recursively logs all child test results.Uses collapsed group for passed tests and expanded group for failed ones.

**Kind**: instance method of [<code>TestGroup</code>](#TestGroup)  

| Param | Type | Description |
| --- | --- | --- |
| [mlAutoNumber] | [<code>MultiLevelAutoNumbering</code>](#MultiLevelAutoNumbering) | Optional multi-level automatic numbering to automatically prefix messages with numbers. |

<a name="TestGroup+add"></a>

### testGroup.add(...tests)
Adds tests or groups to this group.

**Kind**: instance method of [<code>TestGroup</code>](#TestGroup)  

| Param | Type | Description |
| --- | --- | --- |
| ...tests | [<code>TestBase</code>](#TestBase) | One or more test/group instances. |

<a name="TestGroup+groupStart"></a>

### testGroup.groupStart(testName) ⇒ [<code>TestGroup</code>](#TestGroup)
Begins a new nested group and automatically adds it to this group.

**Kind**: instance method of [<code>TestGroup</code>](#TestGroup)  
**Returns**: [<code>TestGroup</code>](#TestGroup) - The new nested group.  

| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | The name of the nested group. |

<a name="TestGroup+groupClose"></a>

### testGroup.groupClose() ⇒ [<code>TestGroup</code>](#TestGroup)
Ends the current group and returns its parent, if any.Enables fluid chaining of group nesting.

**Kind**: instance method of [<code>TestGroup</code>](#TestGroup)  
**Returns**: [<code>TestGroup</code>](#TestGroup) - - The parent group or `this` if already root.  
<a name="TestGroup+areEqual"></a>

### testGroup.areEqual(testName, expected, actual, [comparer], [thisArg]) ⇒ [<code>TestGroup</code>](#TestGroup)
Adds an equality assertion to the group.Checks if `actual === expected`, or uses a custom comparer if provided.

**Kind**: instance method of [<code>TestGroup</code>](#TestGroup)  
**Returns**: [<code>TestGroup</code>](#TestGroup) - The current test group (for chaining).  

| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Descriptive test title. |
| expected | <code>\*</code> | Expected value. |
| actual | <code>\*</code> | Actual value to compare. |
| [comparer] | <code>function</code> | Optional custom comparison function ((expected, actual) => boolean). |
| [thisArg] | <code>any</code> | Optional context for evaluation. |

<a name="TestGroup+areNotEqual"></a>

### testGroup.areNotEqual(testName, not_expected, actual, [comparer], [thisArg]) ⇒ [<code>TestGroup</code>](#TestGroup)
Adds an inequality assertion to the group.Checks if `actual !== not_expected`, or uses a custom comparer if provided.

**Kind**: instance method of [<code>TestGroup</code>](#TestGroup)  
**Returns**: [<code>TestGroup</code>](#TestGroup) - The current test group (for chaining).  

| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Descriptive test title. |
| not_expected | <code>\*</code> | The value we're not expecting. |
| actual | <code>\*</code> | Actual value to compare. |
| [comparer] | <code>function</code> | Optional custom comparison function ((expected, actual) => boolean). |
| [thisArg] | <code>any</code> | Optional context for evaluation. |

<a name="TestGroup+isTrue"></a>

### testGroup.isTrue(testName, actual, [thisArg]) ⇒ [<code>TestGroup</code>](#TestGroup)
Adds an assertion to the group that verifies a value is `true`.

**Kind**: instance method of [<code>TestGroup</code>](#TestGroup)  
**Returns**: [<code>TestGroup</code>](#TestGroup) - The current test group (for chaining).  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| testName | <code>string</code> |  | Descriptive test title. |
| actual | <code>\*</code> |  | Value to assert is `true`. |
| [thisArg] | <code>any</code> | <code></code> | Optional context for evaluation. |

<a name="TestGroup+isFalse"></a>

### testGroup.isFalse(testName, actual, [thisArg]) ⇒ [<code>TestGroup</code>](#TestGroup)
Adds an assertion to the group that verifies a value is `false`.

**Kind**: instance method of [<code>TestGroup</code>](#TestGroup)  
**Returns**: [<code>TestGroup</code>](#TestGroup) - The current test group (for chaining).  

| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Descriptive test title. |
| actual | <code>\*</code> | Value to assert is `false`. |
| [thisArg] | <code>any</code> | Optional context for evaluation. |

<a name="TestGroup+isNull"></a>

### testGroup.isNull(testName, actual, [thisArg]) ⇒ [<code>TestGroup</code>](#TestGroup)
Adds an assertion to the group that verifies a value is strictly `null`.

**Kind**: instance method of [<code>TestGroup</code>](#TestGroup)  
**Returns**: [<code>TestGroup</code>](#TestGroup) - The current test group (for chaining).  

| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Descriptive test title. |
| actual | <code>\*</code> | Value to assert is `null`. |
| [thisArg] | <code>any</code> | Optional context for evaluation. |

<a name="TestGroup+isNotNull"></a>

### testGroup.isNotNull(testName, actual, [thisArg]) ⇒ [<code>TestGroup</code>](#TestGroup)
Adds an assertion to the group that verifies a value is **not** `null`.

**Kind**: instance method of [<code>TestGroup</code>](#TestGroup)  
**Returns**: [<code>TestGroup</code>](#TestGroup) - The current test group (for chaining).  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| testName | <code>string</code> |  | Descriptive test title. |
| actual | <code>\*</code> |  | Value to assert is not `null`. |
| [thisArg] | <code>any</code> | <code></code> | Optional context for evaluation. |

<a name="TestGroup+isDefined"></a>

### testGroup.isDefined(testName, actual, [thisArg]) ⇒ [<code>TestGroup</code>](#TestGroup)
Adds an assertion to the group that verifies a value is **not** `undefined`.

**Kind**: instance method of [<code>TestGroup</code>](#TestGroup)  
**Returns**: [<code>TestGroup</code>](#TestGroup) - The current test group (for chaining).  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| testName | <code>string</code> |  | Descriptive test title. |
| actual | <code>\*</code> |  | Value to assert is defined. |
| [thisArg] | <code>any</code> | <code></code> | Optional context for evaluation. |

<a name="TestGroup+isUndefined"></a>

### testGroup.isUndefined(testName, actual, [thisArg]) ⇒ [<code>TestGroup</code>](#TestGroup)
Adds an assertion to the group that verifies a value is strictly `undefined`.

**Kind**: instance method of [<code>TestGroup</code>](#TestGroup)  
**Returns**: [<code>TestGroup</code>](#TestGroup) - The current test group (for chaining).  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| testName | <code>string</code> |  | Descriptive test title. |
| actual | <code>\*</code> |  | Value to assert is `undefined`. |
| [thisArg] | <code>any</code> | <code></code> | Optional context for evaluation. |

<a name="TestGroup+throws"></a>

### testGroup.throws(testName, fn, [checkErrorFn], [thisArg]) ⇒ [<code>TestGroup</code>](#TestGroup)
Adds an assertion that verifies a function throws an error.Optionally verifies the error with a predicate.

**Kind**: instance method of [<code>TestGroup</code>](#TestGroup)  
**Returns**: [<code>TestGroup</code>](#TestGroup) - The current test group (for chaining).  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| testName | <code>string</code> |  | Descriptive test title. |
| fn | <code>function</code> |  | Function expected to throw. |
| [checkErrorFn] | <code>function</code> |  | Optional predicate to inspect the thrown error. |
| [thisArg] | <code>any</code> | <code></code> | Optional context for evaluation. |

<a name="TestGroup+noThrows"></a>

### testGroup.noThrows(testName, fn, [thisArg]) ⇒ [<code>TestGroup</code>](#TestGroup)
Adds an assertion that verifies a function does NOT throw.

**Kind**: instance method of [<code>TestGroup</code>](#TestGroup)  
**Returns**: [<code>TestGroup</code>](#TestGroup) - The current test group (for chaining).  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| testName | <code>string</code> |  | Descriptive test title. |
| fn | <code>function</code> |  | Function expected to execute without throwing. |
| [thisArg] | <code>object</code> | <code></code> | Optional `this` binding for `fn`. |

<a name="TestGroup+sequencesAreEqual"></a>

### testGroup.sequencesAreEqual(testName, expected, actual, {function(any,) ⇒ [<code>TestGroup</code>](#TestGroup)
Adds a sequence equality assertion to the group.Compares two iterable sequences element-by-element.

**Kind**: instance method of [<code>TestGroup</code>](#TestGroup)  
**Returns**: [<code>TestGroup</code>](#TestGroup) - The current test group (for chaining).  

| Param | Type | Description |
| --- | --- | --- |
| testName | <code>string</code> | Descriptive test title. |
| expected | <code>Iterable</code> | The expected iterable sequence. |
| actual | <code>Iterable</code> | The actual iterable sequence. |
| {function(any, |  | any):boolean [itemComparer] - Optional custom item-level comparison function ((expected, actual) => boolean). |

<a name="SequentialText"></a>

## SequentialText
SequentialTextA utility class that generates a sequence of formatted strings like `"1"`, `"2"`, etc., using atext template such as `"{0}"` or `"Step {0}"`.Supports resetting and iteration with `for...of`.Example:```jsconst st = new SequentialText("Item {0}", 1);st.next(); // "Item 1"st.next(); // "Item 2"```

**Kind**: global class  

* [SequentialText](#SequentialText)
    * [new SequentialText(textFormat, startValue)](#new_SequentialText_new)
    * [.reset()](#SequentialText+reset)
    * [.next()](#SequentialText+next) ⇒ <code>string</code>
    * [.close()](#SequentialText+close)

<a name="new_SequentialText_new"></a>

### new SequentialText(textFormat, startValue)
Constructs a sequential text generator instance.


| Param | Type | Description |
| --- | --- | --- |
| textFormat | <code>string</code> | The format string, default is "{0}". |
| startValue | <code>number</code> | The starting number, default is 1. |

<a name="SequentialText+reset"></a>

### sequentialText.reset()
Resets the generator state so iteration starts over from startValue.

**Kind**: instance method of [<code>SequentialText</code>](#SequentialText)  
<a name="SequentialText+next"></a>

### sequentialText.next() ⇒ <code>string</code>
Returns the next generated formatted string.

**Kind**: instance method of [<code>SequentialText</code>](#SequentialText)  
<a name="SequentialText+close"></a>

### sequentialText.close()
Closes the generator and cleans up internal state.

**Kind**: instance method of [<code>SequentialText</code>](#SequentialText)  
<a name="AutoNumbering"></a>

## AutoNumbering
AutoNumberingExtends [SequentialText](#SequentialText) to support formatted auto-numbered items like `"1. Step A"`.Useful for numbering tests, documentation sections, or steps in a procedure.Example:```jsconst an = new AutoNumbering();an.next("Initialize DB"); // "1. Initialize DB"an.next("Check Schema");  // "2. Check Schema"```

**Kind**: global class  

* [AutoNumbering](#AutoNumbering)
    * [new AutoNumbering([startValue], [numberingTextFormat])](#new_AutoNumbering_new)
    * [.next([text])](#AutoNumbering+next) ⇒ <code>string</code>

<a name="new_AutoNumbering_new"></a>

### new AutoNumbering([startValue], [numberingTextFormat])
Constructs an auto-numbering generator that prefixes a number to each item.This is a convenience wrapper around `SequentialText` for cases where you wantnumbered outputs like "1. Item A", "2. Item B", etc.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [startValue] | <code>number</code> | <code>1</code> | Starting number for the sequence. |
| [numberingTextFormat] | <code>string</code> | <code>&quot;\&quot;{0}. \&quot;&quot;</code> | Format for the numeric prefix.        The string must contain "{0}" as a placeholder. |

<a name="AutoNumbering+next"></a>

### autoNumbering.next([text]) ⇒ <code>string</code>
Generates the next string in the sequence by prefixing a number to the given text.This method calls the base `next()` to get the current numberand appends the optional string after it.

**Kind**: instance method of [<code>AutoNumbering</code>](#AutoNumbering)  
**Returns**: <code>string</code> - Numbered string like "1. Hello"  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [text] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | Optional content to append after the number. |

<a name="MultiLevelAutoNumbering"></a>

## MultiLevelAutoNumbering
MultiLevelAutoNumberingA hierarchical auto-numbering utility supporting nested sequences like:```1.1.1.1.2.2.2.1.1.```Internally uses a stack of [AutoNumbering](#AutoNumbering) instances, one for each level.Supports `nest()` to go deeper and `unnest()` to go back.Example:```jsconst ml = new MultiLevelAutoNumbering();ml.next("Root A");           // "1. Root A"ml.nest().next("Child A");   // "1.1. Child A"ml.next("Child B");         // "1.2. Child B"ml.unnest().next("Root B");  // "2. Root B"ml.next("Root C");           // "3. Root B"```

**Kind**: global class  

* [MultiLevelAutoNumbering](#MultiLevelAutoNumbering)
    * [new MultiLevelAutoNumbering([startValue])](#new_MultiLevelAutoNumbering_new)
    * [.level](#MultiLevelAutoNumbering+level) ⇒ <code>number</code>
    * [.reset()](#MultiLevelAutoNumbering+reset)
    * [.next([text])](#MultiLevelAutoNumbering+next) ⇒ <code>string</code>
    * [.nest([startValue])](#MultiLevelAutoNumbering+nest) ⇒ [<code>MultiLevelAutoNumbering</code>](#MultiLevelAutoNumbering)
    * [.unnest()](#MultiLevelAutoNumbering+unnest) ⇒ [<code>MultiLevelAutoNumbering</code>](#MultiLevelAutoNumbering)

<a name="new_MultiLevelAutoNumbering_new"></a>

### new MultiLevelAutoNumbering([startValue])
Creates a new multi-level auto-numbering generator.Only the default format `"{0}. "` is supported — other formats are not allowed.

**Throws**:

- <code>Error</code> If a custom numbering format is provided.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [startValue] | <code>number</code> | <code>1</code> | The starting number for the top-level counter. |

<a name="MultiLevelAutoNumbering+level"></a>

### multiLevelAutoNumbering.level ⇒ <code>number</code>
Gets the current nesting level (1 = root).

**Kind**: instance property of [<code>MultiLevelAutoNumbering</code>](#MultiLevelAutoNumbering)  
**Returns**: <code>number</code> - Current nesting level (1 = root)  
<a name="MultiLevelAutoNumbering+reset"></a>

### multiLevelAutoNumbering.reset()
Resets this instance of [MultiLevelAutoNumbering](#MultiLevelAutoNumbering).

**Kind**: instance method of [<code>MultiLevelAutoNumbering</code>](#MultiLevelAutoNumbering)  
<a name="MultiLevelAutoNumbering+next"></a>

### multiLevelAutoNumbering.next([text]) ⇒ <code>string</code>
Returns the next string in the current nesting level.

**Kind**: instance method of [<code>MultiLevelAutoNumbering</code>](#MultiLevelAutoNumbering)  
**Returns**: <code>string</code> - Formatted numbered string like `1. Title` or `2.3. Another`.  

| Param | Type | Description |
| --- | --- | --- |
| [text] | <code>string</code> | Optional content to append after the number (e.g., a title). |

<a name="MultiLevelAutoNumbering+nest"></a>

### multiLevelAutoNumbering.nest([startValue]) ⇒ [<code>MultiLevelAutoNumbering</code>](#MultiLevelAutoNumbering)
Increases the nesting level (e.g., goes from `2.` to `2.1.`, or from `1.2.` to `1.2.1.`).The new level resets its own counter, while prefixing the last generated parent string.

**Kind**: instance method of [<code>MultiLevelAutoNumbering</code>](#MultiLevelAutoNumbering)  
**Returns**: [<code>MultiLevelAutoNumbering</code>](#MultiLevelAutoNumbering) - The current instance (for chaining).  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [startValue] | <code>number</code> | <code>1</code> | Starting number for the new level. |

<a name="MultiLevelAutoNumbering+unnest"></a>

### multiLevelAutoNumbering.unnest() ⇒ [<code>MultiLevelAutoNumbering</code>](#MultiLevelAutoNumbering)
Decreases the nesting level (e.g., goes from `1.1.1.` to `1.1.`).Does nothing if already at the top-level (level 1).

**Kind**: instance method of [<code>MultiLevelAutoNumbering</code>](#MultiLevelAutoNumbering)  
**Returns**: [<code>MultiLevelAutoNumbering</code>](#MultiLevelAutoNumbering) - The current instance (for chaining).  
<a name="SequentialText."></a>

## SequentialText.(textFormat, startValue)
Generator that produces an infinite sequence of formatted strings using a number.Example: "{0}" → "1", "2", "3", ...

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| textFormat | <code>string</code> | A string template, e.g., "{0}" or "Step {0}". |
| startValue | <code>number</code> | The initial numeric value. |

