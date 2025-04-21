/*!
 * moyal.js.test - A lightweight JavaScript testing framework.
 *
 * File: moyal.test.js* 
 * Repository: https://github.com/IlanMoyal/moyal.js.test
 * Author: Ilan Moyal (https://www.moyal.es)
 * Contact: ilan.amoyal[guess...what]gmail.com
 *
 * Description:
 * A minimalist, zero-dependency testing library for JavaScript,
 * designed to be embeddable, expressive, and suitable for both
 * browser and Node.js environments.
 *
 * License:
 * MIT License – Permission is granted for free use, modification, and distribution,
 * provided that the copyright notice and license appear in all copies.
 * Full license text: https://opensource.org/licenses/MIT
 *
 * © 2000–present Ilan Moyal. All rights reserved.
 */

// Ensure moyal global namespace exists
(function (global) {global.moyal = global.moyal || {};})(globalThis);

import build_info from "../build/generated/build-info.js";

/**
 * @class moyal.test
 *
 * The main static interface for the moyal.js.test framework.
 * 
 * Provides assertion utilities for test development and a central entry point to define and run tests.
 * Also contains type utilities to assist in dynamic validation.
 *
 * Example usage:
 * ```js
 * moyal.test.isTrue("Test if value is true", myValue);
 * moyal.test.areEqual("Value check", expected, actual);
 * ```
 */
moyal.test = class {
    static _version = build_info.version;

     /**
     * Returns the version of the test library.
     * This is a read-only property used for diagnostics or compatibility checks.
     * @returns {string} Semantic version string.
     */
    static get Version() {return this._version;}

    /**
     * Returns the version of the test library.
     * This is a read-only property used for diagnostics or compatibility checks.
     * @returns {string} Semantic version string.
     */
    get Version() { return this.constructor._version; }

    /* 
     * Independent type checking ability 
     */

    /**
     * Checks if an object is a string.
     * @param {*} obj - The object to test.
     * @returns {boolean} True if the object is a string.
     */
    static isString(obj) { return typeof obj === "string" || Object.prototype.toString.call(obj) === "[object String]"; }

    /**
     * Checks if an object is iterable (i.e., supports Symbol.iterator).
     * @param {*} obj - The object to check.
     * @returns {boolean} True if it's iterable.
     */
    static isIterable(obj) { return this.isFunctionOrGeneratorFunction(obj?.[Symbol.iterator]); }

    /**
     * Checks if an object is a function.
     * @param {*} obj - The object to check.
     * @returns {boolean} True if the object is a function.
     */
    static isFunction(obj) {
        let too = typeof obj;
        return (too === "object" || too === "function") && Object.prototype.toString.call(obj) === "[object Function]";
    }

    /**
     * Checks if an object is either a normal function or a generator function.
     * @param {*} obj - The object to check.
     * @returns {boolean} True if the object is a function or generator function.
     */
    static isFunctionOrGeneratorFunction(obj) {
        let too = typeof obj;
        let name = Object.prototype.toString.call(obj);
        return (too === "object" || too === "function") && (name === "[object Function]" || name === "[object GeneratorFunction]");
    }

    /* 
     * Direct test functions 
     */

    /**
     * Asserts strict equality - checks if `actual === expected`, or uses a custom comparer if provided.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} expected - Expected value.
     * @param {*} actual - Actual value to compare.
     * @param {(a: any, b: any) => boolean} [comparer] - Optional custom comparison function.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static areEqual(testName, expected, actual, comparer = null) { return new moyal.test.AreEqual(testName, expected, actual, comparer).run();}

    /**
     * Asserts strict inequality - checks if `actual !== not_expected`, or uses a custom comparer if provided.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} not_expected - The value we not expecting.
     * @param {*} actual - Actual value to compare.
     * @param {(a: any, b: any) => boolean} [comparer] - Optional custom comparison function.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static areNotEqual(testName, not_expected, actual, comparer = null) { return new moyal.test.AreNotEqual(testName, not_expected, actual, comparer).run();}

    /**
     * Asserts that specified value is strictly `true`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `true`.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static isTrue(testName, actual) { return new moyal.test.IsTrue(testName, actual).run(); }

    /**
     * Asserts that specified value is strictly `false`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `false`.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static isFalse(testName, actual) { return new moyal.test.IsFalse(testName, actual).run(); }

    /**
     * Assets that the specfied value is strictly `null`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `null`.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static isNull(testName, actual) { return new moyal.test.IsNull(testName, actual).run(); }
    
    /**
     * Asserts that the specified value is **not** `null`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is not `null`.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static isNotNull(testName, actual) {return new moyal.test.IsNotNull(testName, actual).run();}

    /**
     * Asserts that specified value is **not** `undefined`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is defined.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static isDefined(testName, actual) { return new moyal.test.IsDefined(testName, actual).run(); }

    /**
     * Asserts that specified value is strictly `undefined`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `undefined`.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static isUndefined(testName, actual) { return new moyal.test.IsUndefined(testName, actual).run(); }

    /**
     * Adds an assertion that verifies a function throws an error.
     * Optionally verifies the error with a predicate.
     *
     * @param {string} testName - Descriptive test title.
     * @param {Function} fn - Function expected to throw.
     * @param {(err: any) => boolean} [checkErrorFn] - Optional predicate to inspect the thrown error.
     * @param {object} [thisArg] - Optional `this` binding for `fn` and `checkErrorFn`.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static throws(testName, fn, checkErrorFn, thisArg) { return new moyal.test.Throws(testName, fn, checkErrorFn, thisArg).run(); }

    /**
     * Adds an assertion that verifies a function does NOT throw.
     *
     * @param {string} testName - Descriptive test title.
     * @param {Function} fn - Function expected to execute without throwing.
     * @param {object} [thisArg] - Optional `this` binding for `fn`.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static noThrows(testName, fn, thisArg) { return new moyal.test.NoThrows(testName, fn, thisArg).run();}

    /**
     * Adds a sequence equality assertion to the group.
     * Compares two iterable sequences element-by-element.
     *
     * @param {string} testName - Descriptive test title.
     * @param {Iterable} expected - The expected iterable sequence.
     * @param {Iterable} actual - The actual iterable sequence.
     * @param {(a: any, b: any) => boolean} [itemComparer] - Optional element-level comparison function.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static sequencesAreEqual(testName, expected, actual, itemComparer) { return new moyal.test.SequencesAreEqual(testName, expected, actual, itemComparer).run(); }
}

/**
 * @class moyal.test.SequentialText
 *
 * A utility class that generates a sequence of formatted strings like `"1"`, `"2"`, etc., using a
 * text template such as `"{0}"` or `"Step {0}"`.
 * 
 * Supports resetting and iteration with `for...of`.
 *
 * Example:
 * ```js
 * const st = new moyal.test.SequentialText("Item {0}", 1);
 * st.next(); // "Item 1"
 * st.next(); // "Item 2"
 * ```
 */
moyal.test.SequentialText = class {
    /**
     * Generator that produces an infinite sequence of formatted strings using a number.
     * Example: "{0}" → "1", "2", "3", ...
     * @param {string} textFormat - A string template, e.g., "{0}" or "Step {0}".
     * @param {number} startValue - The initial numeric value.
     * @yields {string} Formatted strings.
     * @private
     */
    static *#_sequentialTextGen(textFormat, startValue) {
        while (true) {
            yield textFormat.replace("{0}", startValue++)
        };
    }

    #_textFormat = null;
    #_startValue = null;
    #_gen = null;

    /**
     * Constructs a sequential text generator instance.
     * @param {string} textFormat - The format string, default is "{0}".
     * @param {number} startValue - The starting number, default is 1.
     */
    constructor(textFormat, startValue) {
        if (startValue != null && (!Number.isInteger(startValue) || startValue < 1)) {
            throw new Error("startValue must be a positive integer");
        }
        this.#_textFormat = textFormat ?? "{0}";
        this.#_startValue = startValue ?? 1;
    }

    /**
     * Resets the generator state so iteration starts over from startValue.
     */
    reset() {
        this.#_gen = moyal.test.SequentialText.#_sequentialTextGen(this.#_textFormat, this.#_startValue);
    }

    /**
     * Returns the next generated formatted string.
     * @returns {string}
     */
    next() {
        if (this.#_gen == null) {
            this.reset();
		}
        return this.#_gen.next().value;
    }

    /**
     * Closes the generator and cleans up internal state.
     */
    close() {
        if (this.#_gen?.return) this.#_gen.return();
        this.#_gen = null;
	}

    /**
     * Enables iteration using for...of syntax on the class.
     * Each call to the iterator returns a fresh generator.
     */
    *[Symbol.iterator]() {
        let gen = moyal.test.SequentialText.#_sequentialTextGen(this.#_textFormat, this.#_startValue);
        for (let item of gen) {
            yield item;
        }
    }
}

/**
 * @class moyal.test.AutoNumbering
 *
 * Extends {@link moyal.test.SequentialText} to support formatted auto-numbered items like `"1. Step A"`.
 * 
 * Useful for numbering tests, documentation sections, or steps in a procedure.
 *
 * Example:
 * ```js
 * const an = new moyal.test.AutoNumbering();
 * an.next("Initialize DB"); // "1. Initialize DB"
 * an.next("Check Schema");  // "2. Check Schema"
 * ```
 */
moyal.test.AutoNumbering = class extends moyal.test.SequentialText {
    /**
     * Constructs an auto-numbering generator that prefixes a number to each item.
     * 
     * This is a convenience wrapper around `SequentialText` for cases where you want
     * numbered outputs like "1. Item A", "2. Item B", etc.
     * 
     * @param {number} [startValue=1] - Starting number for the sequence.
     * @param {string} [numberingTextFormat="{0}. "] - Format for the numeric prefix.
     *        The string must contain "{0}" as a placeholder.
     */
    constructor(startValue, numberingTextFormat) {
        numberingTextFormat ??= "{0}. ";
        if(!moyal.test.isString(numberingTextFormat) || numberingTextFormat.indexOf("{0}") < 0) {
            throw new Error("Automatic numbering format must include {0}");
        }
        super(numberingTextFormat, startValue ?? 1);
    }

    /**
     * Generates the next string in the sequence by prefixing a number to the given text.
     * 
     * This method calls the base `next()` to get the current number
     * and appends the optional string after it.
     * 
     * @param {string} [text=""] - Optional content to append after the number.
     * @returns {string} Numbered string like "1. Hello"
     */
    next(text) { return super.next() + (text ?? ""); }
}

/**
 * @class moyal.test.MultiLevelAutoNumbering
 *
 * A hierarchical auto-numbering utility supporting nested sequences like:
 * ```
 * 1.
 * 1.1.
 * 1.2.
 * 2.
 * 2.1.1.
 * ```
 * 
 * Internally uses a stack of {@link moyal.test.AutoNumbering} instances, one for each level.
 * Supports `nest()` to go deeper and `unnest()` to go back.
 *
 * Example:
 * ```js
 * const ml = new moyal.test.MultiLevelAutoNumbering();
 * ml.next("Root A");           // "1. Root A"
 * ml.nest().next("Child A");   // "1.1. Child A"
 * ml.next("Child B");         // "1.2. Child B"
 * ml.unnest().next("Root B");  // "2. Root B"
 * ml.next("Root C");           // "3. Root B"
 * ```
 */
moyal.test.MultiLevelAutoNumbering = class {
    /** @private {string} Stores the most recent result to calculate the nested prefix */
    #_current = "";

    /** @private {moyal.test.AutoNumbering[]} Stack of AutoNumbering generators, one per nesting level */
    #_an = [];

    /** @private {number} The start value of the auto numbering */
    #_startValue = 1;

    /**
     * Creates a new multi-level auto-numbering generator.
     * 
     * Only the default format `"{0}. "` is supported — other formats are not allowed.
     *
     * @param {number} [startValue=1] - The starting number for the top-level counter.
     * 
     * @throws {Error} If a custom numbering format is provided.
     */
    constructor(startValue) {
        this.#_startValue = startValue ?? 1;
        this.reset();
    }

    /**
     * Resets this instance of {@link moyal.test.MultiLevelAutoNumbering}.
     */ 
    reset(){
        this.#_current = "";
        this.#_an.length = 0;
        this.#_an.push(new moyal.test.AutoNumbering(this.#_startValue, null));
    }

    /**
     *  Gets the current nesting level (1 = root).
     * 
     * @returns {number} Current nesting level (1 = root) 
     * */
    get level() { return this.#_an.length; }

    /**
     * Returns the next string in the current nesting level.
     * 
     * @param {string} [text] - Optional content to append after the number (e.g., a title).
     * @returns {string} Formatted numbered string like `1. Title` or `2.3. Another`.
     */
    next(text) {
        this.#_current = this.#_an[this.#_an.length - 1].next();
        return this.#_current + (text ?? "");
    }

    /**
     * Increases the nesting level (e.g., goes from `2.` to `2.1.`, or from `1.2.` to `1.2.1.`).
     * 
     * The new level resets its own counter, while prefixing the last generated parent string.
     * 
     * @param {number} [startValue=1] - Starting number for the new level.
     * @returns {moyal.test.MultiLevelAutoNumbering} The current instance (for chaining).
     */
    nest(startValue) {
        let nxtFormat = this.#_current.trim();
        nxtFormat += "{0}. ";
        this.#_an.push(new moyal.test.AutoNumbering(startValue ?? 1, nxtFormat));
        return this;
    }

    /**
     * Decreases the nesting level (e.g., goes from `1.1.1.` to `1.1.`).
     * 
     * Does nothing if already at the top-level (level 1).
     *
     * @returns {moyal.test.MultiLevelAutoNumbering} The current instance (for chaining).
     */
    unnest() { 
        if(this.#_an.length > 1)
            this.#_an.pop();
        return this;
    }
}

/**
 * Internal class used by assertions to carry both the result of a test evaluation
 * and any associated metadata (such as expected/actual values) for logging.
 *
 * @private
 * @class
 */
class TestInternalResult{
    /**
     * @type {boolean} Indicates if the test passed or failed.
     */
    _result = null;

    /**
     * @type {any} Additional context (e.g., expected/actual values) to display with the result.
     */
    _additionalData = null;

    /**
     * Constructs a new result object for use in lazy assertions.
     *
     * @param {boolean} result - The outcome of the test (true/false).
     * @param {any} additionalData - Extra metadata to assist in diagnostics (optional).
     */
    constructor(result, additionalData) {
        this._result = result;
        this._additionalData = additionalData;
    }
}

/**
 * @class moyal.test.BaseTest
 *
 * Abstract base class for all test types.
 * 
 * Provides a unified interface for managing test name, success/failure status, timing, and output.
 * Subclasses must override the `_run_impl()` method to implement test logic.
 * @abstract
 */
moyal.test.BaseTest = class {
    // Private fields to hold test state and metadata
    #_testName = null;
    #_succeeded = true;
    #_successMessage = null;
    #_failureMessage = null;
    #_additionalData = null;
    #_errors = [];
    #_elapsed = 0;

    /**
     * Base class for all test types.
     * 
     * This class defines the common interface for test name, result summary,
     * success/failure messages, optional data, and a way to log results.
     *
     * @param {string} testName - The name of the test (must be string).
     * @param {string} [successMessage="success"] - Message when the test passes.
     * @param {string} [failureMessage="failure"] - Message when the test fails.
     * @param {any} [additionalData] - Arbitrary data to show with test output.
     */
    constructor(testName, successMessage, failureMessage, additionalData) {
        if (!moyal.test.isString(testName)) { throw new Error("testName must be string"); }
        if (successMessage != null && !moyal.test.isString(successMessage)) { throw new Error("successMessage must be string, null or undefined"); }
        if (failureMessage != null && !moyal.test.isString(failureMessage)) { throw new Error("failureMessage must be string, null or undefined"); }
        this.#_testName = testName;
        this.#_successMessage = successMessage ?? "success";
        this.#_failureMessage = failureMessage ?? "failure";
        this.#_additionalData = additionalData;
	}

    /** @returns {string} The name of the test */
    get name() { return this.#_testName; }

    /** @returns {string} The message to display on test success */
    get successMessage() { return this.#_successMessage; }

    /** @returns {string} The message to display on test failure */
    get failureMessage() { return this.#_failureMessage; }

    /**
     * Gets the duration in milliseconds.
     * 
     * @returns {number} The duration in milliseconds. */
    get elapsed() { return this.#_elapsed; } /* milliseconds*/

    /** 
     * Sets the time elapsed.
     * 
     * @param {number} value - Duration in milliseconds
     */
    set elapsed(value) {  this.#_elapsed = value; } /* milliseconds*/

    /** @returns {boolean} Whether the test passed — overridden in derived classes */
    get succeeded() { return this.#_succeeded;}
    
    /**
     * Sets a value indicating whether the test passed.
     * @param {boolean} value - A value indicating whether the test passed.
     */
    set succeeded(value) { this.#_succeeded = (value === true);}

    /** @returns {boolean} Whether the test failed (inverse of succeeded) */
    get failed() { return this.succeeded !== true; }

    /** @returns {Array<Error>} List of errors associated with the test */
    get errors() { return this.#_errors; }

    /** @returns {number} Count of errors (possibly from child tests) */
    get errorCount() { return this.errors.length; } /* might be the count of inner tests' errors, so in derived class might be positive even though the errors collection is null! */
    
    /** 
     * Gets extra information to log with the test.
     * 
     * @returns {any} Extra information to log with the test  
     */
    get additionalData() { return this.#_additionalData; }

    /** 
     * Sets extra information to log with the test.
     * 
     * @param {any} value The additional data.
     */
    set additionalData(value) { this.#_additionalData = value; }

    /**
     * Runs the test and optionally writes its result.
     * 
     * @param {boolean} write - If true, writes the result to the console; 
     *          If false doesn't write the result to the console; 
     *          Otherwise writes only failures to the console.
     * @returns {boolean} Whether the test passed.
     */
    run(write) { 
        this.succeeded = this._run_impl();
        if (write === true || (write !== false && !this.succeeded)) {
            this.write();
		}
        return this.succeeded;
    }

    /**
     * Runs the test.
     *  
     * @returns {boolean} Whether the test passed.
     * @abstract
     * @protected
     */
    _run_impl() {
        throw new Error("Method 'run_impl()' must be implemented by subclass");
    }

    /**
     * Pushes the specified error to the error list.
     * 
     * @param {Error} e - The error.
     * @protected
     */
    _push_error(e){
        this.#_errors.push(e);
    }

    /**
     * Logs the result of the test to the console.
     * 
     * If the test passes with no errors, it uses a flat `console.log`.
     * If there are errors or additional data, it uses a collapsed group for clarity.
     */
    write() {
        const labelName = this.name?.trim() || "(unnamed test)";
        let label = `%c${labelName}: ${(this.succeeded ? this.successMessage : this.failureMessage)} (${this.elapsed} ms`
        let css = this.succeeded ? "color: green" : "color: red";
        if (this.errorCount === 0) {
            label += ")";
        }
        else {
            let errorStr = (this.succeeded ? "" : "un") + "expected " + (this.errorCount > 1 ? "errors" : "error");
            label += `, ${this.errorCount} ${errorStr})`;
        }

        if (this.errorCount == 0 && this.additionalData == null) {
            // Simple success case
            console.log(label, css);
            return;
        }
        
        // Grouped output with errors or extra info
        console.groupCollapsed(label, css);

        // Show errors if available
        if (this.errorCount > 0) {
            if (this.additionalData != null) {
                console.groupCollapsed("errors");
            }
            for (let err of this.errors) {
                console.error(err);
            }
            if (this.additionalData != null) {
                console.groupEnd();
            }
        }

        // Show additional data if available
        if (this.additionalData != null) {
            if (this.errorCount > 0) {
                console.groupCollapsed("additional data");
            }
            console.log(this.additionalData);
            if (this.errorCount > 0) {
                console.groupEnd();
            }
        }

        console.groupEnd();
    }
}

/**
 * @class moyal.test.Assert
 *
 * A generic assertion test class that evaluates either a boolean or a function returning boolean.
 * 
 * Inherits from {@link moyal.test.BaseTest}.
 * Typically used for boolean tests or custom logic.
 */
moyal.test.Assert = class extends moyal.test.BaseTest {
    // Holds the test logic, result, context, error and timing info
    #_test = null;
    #_thisArg = null;

    /**
     * A test that evaluates a function or boolean and tracks its result.
     * 
     * If the test value is a function, it's called and timed.
     * If the function throws, it fails and captures the error.
     * 
     * @param {string} testName - Name of the test.
     * @param {Function|boolean} test - Test logic (function or static boolean).
     * @param {string} [successMessage] - Custom message on success.
     * @param {string} [failureMessage] - Custom message on failure.
     * @param {any} [additionalData] - Extra data to log.
     * @param {any} [thisArg=globalThis] - `this` context to bind when calling the function.
     */
    constructor(testName, test, successMessage, failureMessage, additionalData, thisArg) {
        super(testName, successMessage, failureMessage, additionalData);
        this.#_test = test;
        this.#_thisArg = thisArg ?? globalThis;
    }

    /**
     * Runs the test.
     * 
     * @returns {boolean} Whether the test passed.
     * @override
     * @protected
     */
    _run_impl() {
        if (this.#_test === true) 
            return true;

        if (!moyal.test.isFunction(this.#_test))
            return false; // Test is neither true nor a function

        let res;
        const t0 = performance.now();
        try {
            let tmp =  this.#_test.call(this.#_thisArg);
            if(tmp instanceof TestInternalResult){
                this.additionalData = tmp._additionalData;
                res = tmp._result === true;
            }
            else {
                res = tmp;
            }
        }
        catch (e) {
            this._push_error(e);
            res = false;
        }
        const t1 = performance.now();
        this.elapsed = t1 - t0;        

        return res;
    }
};

/**
 * @class moyal.test.AreEqual
 *
 * A test that compares two values using strict equality (`===`) or a custom comparer function.
 *
 * Inherits from {@link moyal.test.Assert}.
 */
moyal.test.AreEqual = class extends moyal.test.Assert {
    /**
     * Compares two values using `===` or a custom comparer function.
     * Values can be passed directly or as functions for deferred evaluation.
     *
     * @param {string} testName - Name of the test.
     * @param {any|Function} expected - Expected value or function returning it.
     * @param {any|Function} actual - Actual value or function returning it.
     * @param {Function} [comparer] - Optional custom equality function (expected, actual) => boolean.
     * @param {any} [thisArg] - Optional context for invoking deferred or comparison functions.
     */
    constructor(testName, expected, actual, comparer, thisArg) {
        // Use the comparer if provided, otherwise compare using strict equality
        let needsDelayedExecution = moyal.test.isFunction(expected) || moyal.test.isFunction(actual) || moyal.test.isFunction(comparer);        
        let test;
        let ad = null;
        if(needsDelayedExecution){
            test = () => {
                let expectedVal = moyal.test.isFunction(expected) ? expected.call(thisArg ?? globalThis) : expected;
                let actualVal   = moyal.test.isFunction(actual)   ? actual.call(thisArg ?? globalThis)   : actual;

                return new TestInternalResult(
                    moyal.test.isFunction(comparer)  ? comparer.call(thisArg ?? globalThis, expectedVal, actualVal) : expectedVal === actualVal,
                    { "expected": expectedVal, "actual": actualVal }
                );
            }
        }
        else {
            test = expected === actual;
            ad = { "expected": expected, "actual": actual };
        }
        super(testName, 
            test, 
            "Expected and actual values matched", 
            "Expected and actual values did not match", 
            ad,
            thisArg);
    }
}

/**
 * @class moyal.test.AreNotEqual
 *
 * A test that verifies two values are **not equal** using strict inequality (`!==`)
 * or a custom comparer function that is expected to return `false`.
 *
 * This test passes when `actual !== not_expected`, or when the `comparer` returns `false`.
 *
 * Inherits from {@link moyal.test.Assert}.
 *
 * Example:
 * ```js
 * new moyal.test.AreNotEqual("Should be different", 42, value);
 * new moyal.test.AreNotEqual("Custom inequality", a, b, (a, b) => deepCompare(a, b));
 * ```
 */
moyal.test.AreNotEqual = class extends moyal.test.Assert {
    /**
     * Constructs a new inequality assertion.
     *
     * @param {string} testName - Name of the test.
     * @param {any|Function} not_expected - Value the actual result must NOT match.
     * @param {any|Function} actual - Actual value or function returning it.
     * @param {Function} [comparer] - Optional function for comparing (not_expected, actual).
     * @param {any} [thisArg] - Optional context for invoking deferred or comparison functions.
     */
    constructor(testName, not_expected, actual, comparer, thisArg) {
        // Use the comparer if provided, otherwise compare using strict equality
        let needsDelayedExecution = moyal.test.isFunction(not_expected) || moyal.test.isFunction(actual) || moyal.test.isFunction(comparer);        
        let test;
        let ad = null;
        if(needsDelayedExecution){
            test = () => {
                let not_expectedVal = moyal.test.isFunction(not_expected) ? not_expected.call(thisArg ?? globalThis) : not_expected;
                let actualVal   = moyal.test.isFunction(actual)   ? actual.call(thisArg ?? globalThis)   : actual;

                return new TestInternalResult(
                    moyal.test.isFunction(comparer) ? !comparer.call(thisArg ?? globalThis, not_expectedVal, actualVal) : not_expectedVal !== actualVal,
                    { "not_expected": not_expectedVal, "actual": actualVal }
                );
            }
        }
        else {
            test = not_expected !== actual;
            ad = { "not_expected": not_expected, "actual": actual };
        }

        super(testName, 
            test, 
            "Actual value did not match the disallowed value (as expected!)",
            "Actual value matched the disallowed value (not as expected!)",
            ad,
            thisArg);
    }
}

/**
 * @class moyal.test.IsTrue
 *
 * A test that asserts the actual value is strictly `true`.
 * 
 * Can accept a boolean value or a function returning boolean.
 *
 * Inherits from {@link moyal.test.Assert}.
 */
moyal.test.IsTrue = class extends moyal.test.AreEqual {
    /**
     * Asserts that a value is strictly `true`.
     *
     * @param {string} testName - The name of the test.
     * @param {any|Function} actual - The value or function to evaluate.
     * @param {any} [thisArg] - Optional context in which to invoke deferred evaluation.
     */
    constructor(testName, actual, thisArg) {
        super(testName, true, actual, null, thisArg);
    }
}

/**
 * @class moyal.test.IsFalse
 *
 * A test that asserts the actual value is strictly `false`.
 * 
 * Can accept a boolean value or a function returning boolean.
 *
 * Inherits from {@link moyal.test.Assert}.
 */
moyal.test.IsFalse = class extends moyal.test.AreEqual {
    /**
     * Asserts that a value is strictly `false`.
     *
     * @param {string} testName - The name of the test.
     * @param {any|Function} actual - The value or function to evaluate.
     * @param {any} [thisArg] - Optional context for evaluation.
     */
    constructor(testName, actual, thisArg) {
        super(testName, false, actual, null, thisArg);
    }
}

/**
 * @class moyal.test.IsNull
 *
 * A test that asserts the actual value is strictly `null`.
 *
 * Inherits from {@link moyal.test.Assert}.
 *
 * Example:
 * ```js
 * moyal.test.isNull("Should be null", myValue);
 * ```
 */
moyal.test.IsNull = class extends moyal.test.AreEqual {
    /**
     * Constructs a null-check assertion.
     *
     * @param {string} testName - Descriptive name of the test.
     * @param {any|Function} actual - Value to test or function that returns it.
     * @param {any} [thisArg] - Optional context for function calls.
     */
    constructor(testName, actual, thisArg) {
        super(testName, null, actual, null, thisArg);
    }
}

/**
 * @class moyal.test.IsNotNull
 *
 * A test that asserts the actual value is **not** `null`.
 *
 * Inherits from {@link moyal.test.Assert}.
 *
 * Example:
 * ```js
 * moyal.test.isNotNull("Should not be null", myValue);
 * ```
 */
moyal.test.IsNotNull = class extends moyal.test.AreNotEqual {
    /**
     * Constructs a not-null assertion.
     *
     * @param {string} testName - Descriptive name of the test.
     * @param {any|Function} actual - Value to check.
     * @param {any} [thisArg] - Optional context for invocation.
     */
    constructor(testName, actual, thisArg) {
        super(testName, null, actual, null, thisArg);
    }
}

/**
 * @class moyal.test.IsDefined
 *
 * A test that asserts the actual value is **not** `undefined`.
 *
 * Inherits from {@link moyal.test.Assert}.
 *
 * Example:
 * ```js
 * moyal.test.isDefined("Value should be defined", myValue);
 * ```
 */
moyal.test.IsDefined = class extends moyal.test.AreNotEqual {
    /**
     * Constructs a defined-check assertion.
     *
     * @param {string} testName - Descriptive name of the test.
     * @param {any|Function} actual - Value to evaluate or function to call.
     * @param {any} [thisArg] - Optional context for evaluation.
     */
    constructor(testName, actual, thisArg) {
        super(testName, undefined, actual, null, thisArg);
    }
}

/**
 * @class moyal.test.IsUndefined
 *
 * A test that asserts the actual value is strictly `undefined`.
 *
 * Inherits from {@link moyal.test.Assert}.
 *
 * Example:
 * ```js
 * moyal.test.isUndefined("Should be undefined", maybeMissing);
 * ```
 */
moyal.test.IsUndefined = class extends moyal.test.AreEqual {
     /**
     * Constructs an undefined-check assertion.
     *
     * @param {string} testName - Descriptive name of the test.
     * @param {any|Function} actual - Value to test or a function that returns it.
     * @param {any} [thisArg] - Optional context for deferred invocation.
     */
    constructor(testName, actual, thisArg) {
        super(testName, undefined, actual, null, thisArg);
    }
}

/**
 * @class moyal.test.ThrowsBase
 *
 * Base class for tests that evaluate whether a function throws or not.
 * 
 * Supports optional error validation via predicate functions.
 *
 * Inherits from {@link moyal.test.Assert}.
 * Not used directly — use {@link moyal.test.Throws} or {@link moyal.test.NoThrows} instead.
 */
moyal.test.ThrowsBase = class extends moyal.test.Assert {
    #_checkErrorFn = null;
    #_thisArg = null;
    #_expected = true;

    /**
     * Base class to test whether a function throws (or not), and optionally validate the error thrown.
     *
     * @param {string} testName - Name of the test.
     * @param {boolean} expectingError - Whether an error is expected (`true` = should throw).
     * @param {Function} fn - Function to test.
     * @param {Function} [checkErrorFn] - Optional error predicate to validate the thrown error.
     * @param {any} [thisArg] - Optional `this` context for invoking the test/check function.
     */
    constructor(testName, expectingError, fn, checkErrorFn, thisArg) {
        expectingError = (expectingError === true);
        const errWasThrownAsExpected = "An error was thrown (as expected)!"; 
        const errWasNotThrownAsExpected = "An error was NOT thrown (as expected)."; 
        const errExpectedFail = "Expected an error, but none was thrown or it did not satisfy the predicate."; 
        const errWasThrownAsUnexpectedly = "An error was not thrown (unexpectedly)."; 

        super(testName, fn, 
            expectingError ? errWasThrownAsExpected : errWasNotThrownAsExpected, 
            expectingError ? errExpectedFail : errWasThrownAsUnexpectedly, 
            thisArg);
        if (!moyal.test.isFunction(fn)) { throw new Error("fn parameter must be a function"); }
        if (expectingError && checkErrorFn != null && !moyal.test.isFunction(checkErrorFn)) { throw new Error("checkErrorFn parameter must be a function, null or undefined"); }
        this.#_expected = expectingError;
        this.#_thisArg = thisArg;
        this.#_checkErrorFn = checkErrorFn;
    }

    /**
     * Executes the test, checking if an error was thrown and optionally applying a predicate on the error.
     * 
     * @override
     * @protected
     */
    _run_impl() {
        const basePassed = super._run_impl();

        if (!basePassed && this.errors.length === 1) {
            return this.#_expected && (this.#_checkErrorFn == null || this.#_checkErrorFn.call(this.#_thisArg, this.errors[0]) === true);
        }
        return !this.#_expected; 
    }
}

/**
 * @class moyal.test.Throws
 *
 * A test that expects a function to throw an exception.
 * 
 * You may optionally provide a predicate to verify the thrown error.
 *
 * Inherits from {@link moyal.test.ThrowsBase}.
 */
moyal.test.Throws = class extends moyal.test.ThrowsBase {
    /**
     * Tests that a function throws, and optionally that the thrown error satisfies a condition.
     *
     * @param {string} testName - Name of the test.
     * @param {Function} fn - The function that should throw.
     * @param {Function} [checkErrorFn] - Optional error predicate.
     * @param {any} [thisArg] - Optional `this` context.
     */
    constructor(testName, fn, checkErrorFn, thisArg) {
        super(testName, true, fn, checkErrorFn, thisArg);
    }
}

/**
 * @class moyal.test.NoThrows
 *
 * A test that verifies a function does not throw any error.
 *
 * Inherits from {@link moyal.test.ThrowsBase}.
 */
moyal.test.NoThrows = class extends moyal.test.ThrowsBase {
    /**
     * Tests that a function does NOT throw.
     *
     * @param {string} testName - Name of the test.
     * @param {Function} fn - The function to test.
     * @param {any} [thisArg] - Optional `this` context.
     */
    constructor(testName, fn, thisArg) {
        super(testName, false, fn, null, thisArg);
    }
}

/**
 * @class moyal.test.SequencesAreEqual
 *
 * A test that compares two iterable sequences element-by-element for equality.
 * 
 * You can supply a custom item comparison function. Results include index mismatches.
 *
 * Inherits from {@link moyal.test.BaseTest}.
 */
moyal.test.SequencesAreEqual = class extends moyal.test.BaseTest {
    #_expected = null;
    #_actual = null;
    #_itemComparer = null;
    #_validIterables = true;
    #_thisArg = null;

    /**
     * Compares two iterable sequences element by element.
     * 
     * @param {string} testName - Name of the test.
     * @param {Iterable<any>} expected - Expected sequence.
     * @param {Iterable<any>} actual - Actual sequence.
     * @param {Function} [itemComparer] - Optional function to compare individual items.
     * @param {any} [thisArg] - Optional `this` binding for the itemComparer.
     */
    constructor(testName, expected, actual, itemComparer, thisArg) {
        // Call Assert constructor with all info
        super(testName, `Actual sequence equals to the expected sequence`, `Actual sequence does not equal to the expected sequence)`, null, thisArg);
        this.additionalData = {};

        this.#_expected = expected;
        this.#_actual = actual;
        this.#_itemComparer = itemComparer;
        this.#_thisArg = thisArg;

        // Validate that expected is iterable
        if (!moyal.test.isIterable(expected)) {
            this.additionalData["expected"] = "ERROR: 'expected' argument is not iterable!"
            this.#_validIterables = false;
        }

        // Validate that actual is iterable
        if (!moyal.test.isIterable(actual)) {
            this.additionalData["actual"] = "ERROR: 'actual' argument is not iterable!"
            this.#_validIterables = false;
        }
    }

    /**
     * Runs the test.
     * 
     * @returns {boolean} - True if the test passed.
     * @override
     * @protected
     */
    _run_impl() {
        if(!this.#_validIterables) 
            return false;
        
        const t0 = performance.now();

        let expectedArr = this.additionalData["expected"] = Array.from(this.#_expected);
        let actualArr = this.additionalData["actual"] = Array.from(this.#_actual);
        let res;

        // Check lengths
        if (expectedArr.length === actualArr.length) {
            // Check individual items
            let indicesDifferent = [];
            for (var i = 0; i < expectedArr.length; i++) {
                let res = this.#_itemComparer != null ? this.#_itemComparer.call(this.#_thisArg ?? undefined, expectedArr[i], actualArr[i]) : expectedArr[i] === actualArr[i];
                if (res !== true) {
                    indicesDifferent.push(i);
                }
            }

            if (indicesDifferent.length > 0)
                this.additionalData["Problem found"] = "Different element indices are: {" + indicesDifferent.join(", ") + "}";

            res = indicesDifferent.length === 0;
        }
        else{
            this.additionalData["Problem found"] = "expected.length !== actual.length";
            res = false;
        }

        const t1 = performance.now();
        this.elapsed = t1 - t0;

        return res;
    }
}

/**
 * @class moyal.test.TestGroup
 *
 * A container for managing and executing multiple tests (or nested groups of tests).
 * 
 * Automatically aggregates success/failure counts and outputs structured logs.
 * 
 * Supports fluent-style chaining:
 * ```js
 * group.isTrue("A", true)
 *      .areEqual("Compare", 1, 1)
 *      .throws("Expect error", () => { throw new Error(); });
 *      .groupStart("another group")
 *              .areEqual("Compare", 3, 3)
 *              .throws("Expect error", () => { throw new Error(); });
 *      .groupClose()
 *      .run();
 * ```
 *
 * Inherits from {@link moyal.test.BaseTest}.
 */
moyal.test.TestGroup = class extends moyal.test.BaseTest {
    #_tests = [];
    #_directFailureCount = 0;
    #_totalFailureCount = 0;
    #_totalErrorCount = 0;
    #_unexpectedErrorCount = 0;
    #_parentGroup = null;
    #_write = null; // Controls output policy for child test writes (true, false, or conditional)

    /**
     * Creates a new test group to encapsulate multiple tests or nested groups.
     *
     * @param {string} testName - The name/title of this group.
     * @param {...BaseTest} tests - Optional tests or nested groups to immediately add.
     */
    constructor(testName, ...tests) {
        super(testName);
        this.add(...tests);
    }

    /** 
     * Clears all tests in this group. 
     * 
     * @public
     */
    clear() { 
        this.#_tests.length = 0;
        this.#_directFailureCount = 0;
        this.#_totalFailureCount = 0;
        this.#_totalErrorCount = 0;
        this.#_unexpectedErrorCount = 0;
    }

    /** @returns {number} Total number of errors found (including nested groups). */
    get errorCount() { return this.#_totalErrorCount; }

    /**
     * Runs the test and optionally writes its result.
     * 
     * @param {boolean} write - If true, writes the result to the console; 
     *          If false doesn't write the result to the console; 
     *          Otherwise writes only failures to the console.
     * @returns {boolean} Whether the test passed.
     * @override
     */
    run(write){
        this.#_write = write;
        return super.run(write);
    }
    /**
     * Executes all tests/groups in this group.
     * Aggregates error and timing info, but delays output if `write` is false.
     *
     * @param {boolean} [write] - If true, print test output after execution.
     * @returns {boolean} True if all direct tests succeeded.
     * @override
     * @protected
     */
    _run_impl() {
        this.#_directFailureCount = 0;
        this.#_totalErrorCount = 0;
        this.#_unexpectedErrorCount = 0;
        
        const t0 = performance.now();
        for (let t of this.#_tests) {
            t._run_impl(); 

            this.#_directFailureCount += t.succeeded ? 0 : 1;

            if (t instanceof moyal.test.TestGroup) {
                // Accumulate from nested groups
                this.#_totalFailureCount += t.#_totalFailureCount;
                this.#_unexpectedErrorCount += t.#_unexpectedErrorCount;
            }
            else {
                // Leaf tests
                this.#_totalFailureCount = this.#_directFailureCount;
                this.#_unexpectedErrorCount += t.succeeded ? 0 : t.errorCount;
            }

            this.#_totalErrorCount += t.errorCount;
        }
        const t1 = performance.now();
        this.elapsed = t1 - t0;
        
        return this.#_directFailureCount === 0;
    }

    /**
     * Outputs a summary line and recursively logs all child test results.
     * Uses collapsed group for passed tests and expanded group for failed ones.
     * 
     * @override
     */
    write() {
        let label = `%c${this.name}: (${this.elapsed}ms, `;
        let css;
        if (this.#_directFailureCount === 0) {
            css = "color: green";
            label += "all passed"
        }
        else {
            css = "color: red";
            if (this.#_directFailureCount > 0) {
                label += `${this.#_directFailureCount} direct failure${(this.#_directFailureCount === 1 ? "" : "s")}, ${this.#_totalFailureCount} total failure${(this.#_totalFailureCount === 1 ? "" : "s")}`;
            }
        }

        if (this.#_unexpectedErrorCount> 0) {
            label += `, ${this.#_unexpectedErrorCount} unexpected error${(this.#_unexpectedErrorCount > 1 ? "s" : "")}`;
        }

        label += ")";

        if (this.succeeded) {
            console.groupCollapsed(label, css);
        }
        else {
            console.group(label, css);
		}
        for (let t of this.#_tests) {
            if(this.#_write === true || (this.#_write !== true && !t.succeeded))
                t.write();
        }
        
        console.groupEnd();
    }

    /**
     * Adds tests or groups to this group.
     *
     * @param {...BaseTest} tests - One or more test/group instances.
     */
    add(...tests) {
        this.#_tests.push(...tests);
        for (let t of tests) {
            if (t instanceof moyal.test.TestGroup) {
                t.#_parentGroup = this;
			}
		}
    }

    /**
     * Begins a new nested group and automatically adds it to this group.
     *
     * @param {string} testName - The name of the nested group.
     * @returns {TestGroup} The new nested group.
     */
    groupStart(testName) {
        let grp = new moyal.test.TestGroup(testName);
        this.add(grp);
        return grp;
    }

    /**
     * Ends the current group and returns its parent, if any.
     * Enables fluid chaining of group nesting.
     *
     * @returns {TestGroup} - The parent group or `this` if already root.
     */
    groupClose() {
        return this.#_parentGroup ?? this;
    }

    /**
     * Adds an equality assertion to the group.
     * Checks if `actual === expected`, or uses a custom comparer if provided.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} expected - Expected value.
     * @param {*} actual - Actual value to compare.
     * @param {(a: any, b: any) => boolean} [comparer] - Optional custom comparison function.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    areEqual(testName, expected, actual, comparer, thisArg) { this.add(new moyal.test.AreEqual(testName, expected, actual, comparer, thisArg)); return this; }

     /**
     * Adds an inequality assertion to the group.
     * Checks if `actual !== not_expected`, or uses a custom comparer if provided.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} not_expected - The value we're not expecting.
     * @param {*} actual - Actual value to compare.
     * @param {(a: any, b: any) => boolean} [comparer] - Optional custom comparison function.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
     areNotEqual(testName, not_expected, actual, comparer, thisArg) { this.add(new moyal.test.AreNotEqual(testName, not_expected, actual, comparer, thisArg)); return this; }

    /**
     * Adds an assertion to the group that verifies a value is `true`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `true`.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    isTrue(testName, actual, thisArg) { this.add(new moyal.test.IsTrue(testName, actual, thisArg)); return this; }

    /**
     * Adds an assertion to the group that verifies a value is `false`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `false`.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    isFalse(testName, actual, thisArg) { this.add(new moyal.test.IsFalse(testName, actual, thisArg)); return this; }

    /**
     * Adds an assertion to the group that verifies a value is strictly `null`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `null`.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    isNull(testName, actual, thisArg) { this.add(new moyal.test.IsNull(testName, actual, thisArg)); return this; }
    
    /**
     * Adds an assertion to the group that verifies a value is **not** `null`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is not `null`.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    isNotNull(testName, actual, thisArg) {this.add(new moyal.test.IsNotNull(testName, actual, thisArg)); return this;}

     /**
     * Adds an assertion to the group that verifies a value is **not** `undefined`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is defined.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    isDefined(testName, actual, thisArg) { this.add( new moyal.test.IsDefined(testName, actual, thisArg));  return this;}

    /**
     * Adds an assertion to the group that verifies a value is strictly `undefined`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `undefined`.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    isUndefined(testName, actual, thisArg) { this.add( new moyal.test.IsUndefined(testName, actual, thisArg));  return this;}
    
    /**
     * Adds an assertion that verifies a function throws an error.
     * Optionally verifies the error with a predicate.
     *
     * @param {string} testName - Descriptive test title.
     * @param {Function} fn - Function expected to throw.
     * @param {(err: any) => boolean} [checkErrorFn] - Optional predicate to inspect the thrown error.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    throws(testName, fn, checkErrorFn, thisArg) { this.add(new moyal.test.Throws(testName, fn, checkErrorFn, thisArg)); return this; }

    /**
     * Adds an assertion that verifies a function does NOT throw.
     *
     * @param {string} testName - Descriptive test title.
     * @param {Function} fn - Function expected to execute without throwing.
     * @param {object} [thisArg] - Optional `this` binding for `fn`.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    noThrows(testName, fn, thisArg) { this.add(new moyal.test.NoThrows(testName, fn, thisArg)); return this; }

    /**
     * Adds a sequence equality assertion to the group.
     * Compares two iterable sequences element-by-element.
     *
     * @param {string} testName - Descriptive test title.
     * @param {Iterable} expected - The expected iterable sequence.
     * @param {Iterable} actual - The actual iterable sequence.
     * @param {(a: any, b: any) => boolean} [itemComparer] - Optional element-level comparison function.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    sequencesAreEqual(testName, expected, actual, itemComparer) { this.add(new moyal.test.SequencesAreEqual(testName, expected, actual, itemComparer)); return this; }
}

export default moyal.test;