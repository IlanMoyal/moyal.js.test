/*
 * moyal.js.test - A tiny javascript testing framework.
 *
 * Version: 1.0.0
 * 
 * File: moyal.test.js
 * 
 * GitHub repository: https://github.com/IlanMoyal/moyal.js.test
 *
 * Copyright (C) 2021 Ilan Moyal (http://www.moyal.es) (C) All rights reserved.
 *
 * Email: ilan.amoyal[guess...what]gmail.com
 *
 * This project is licensed under the MIT License (see below).
 * The text of license can also be found here: https://opensource.org/licenses/MIT
 *
 * MIT license
 * ***********
 * Begin license text->
 *
 * Copyright 2021, Ilan Moyal © All Rights Reserved
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * -> End license text.
 */

/* The following guarantees moyal will be available globally (browser, Node, etc.) without double-defining. */
if (typeof globalThis === 'undefined') {
    (function() {
        if (typeof self !== 'undefined') {
        self.globalThis = self;
        } else if (typeof window !== 'undefined') {
        window.globalThis = window;
        } else if (typeof global !== 'undefined') {
        global.globalThis = global;
        } else {
        this.globalThis = this;
        }
    })();
}

// Ensure moyal global namespace exists
(function (global) {global.moyal = global.moyal || {};})(globalThis);


import _libVersion from '../version.js';

moyal.test = class {
    static _version = _libVersion;

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
    get Version() { return _version; }

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

    /* direct test functions */

    /**
     * Adds an equality assertion to the group.
     * Checks if `actual === expected`, or uses a custom comparer if provided.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} expected - Expected value.
     * @param {*} actual - Actual value to compare.
     * @param {(a: any, b: any) => boolean} [comparer] - Optional custom comparison function.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static areEqual(testName, expected, actual, comparer = null) { return new moyal.test.AreEqual(testName, expected, actual, comparer).run();}

    /**
     * Adds an assertion to the group that verifies a value is `true`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `true`.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static isTrue(testName, actual) { return new moyal.test.IsTrue(testName, actual).run(); }

    /**
     * Adds an assertion to the group that verifies a value is `false`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `false`.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static isFalse(testName, actual) { return new moyal.test.IsFalse(testName, actual).run(); }

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
        this.#_gen.return();
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
        super(numberingTextFormat?? "{0}. ", startValue ?? 1);
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
    next(text) {
        return super.next() + (text ?? "");
    }
}

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
        throw new Error("Method 'runImpl()' must be implemented by subclass");
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
        let label = `%c${this.name}: ${(this.succeeded ? this.successMessage : this.failureMessage)} (${this.elapsed} ms`
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
                console.groupCollapsed("errors");
            }
            console.log(this.additionalData);
            if (this.errorCount > 0) {
                console.groupEnd();
            }
        }

        console.groupEnd();
    }
}

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
            return false; /* not strict comparison */

        let res;
        const t0 = performance.now();
        try {
            res = this.#_test.call(this.#_thisArg) === true;
        }
        catch (e) {
            res = this._push_error(e);                
        }
        const t1 = performance.now();
        this.elapsed = t1 - t0;        

        return res;
    }
};

moyal.test.AreEqual = class extends moyal.test.Assert {
    /**
     * Compares two values using `===` or a custom comparer function.
     *
     * @param {string} testName - Name of the test.
     * @param {any} expected - Expected value.
     * @param {any} actual - Actual value.
     * @param {Function} [comparer] - Optional function (expected, actual) => boolean.
     */
    constructor(testName, expected, actual, comparer) {
        // Use the comparer if provided, otherwise compare using strict equality
        super(testName, comparer != null ? comparer(expected, actual) : expected === actual, `Actual value equals to the expected (${actual} === ${expected})`, `Actual value (${actual}) does not equal to the expected (${expected})`, { "expected": expected, "actual": actual });
    }
}

moyal.test.IsTrue = class extends moyal.test.Assert {
    /**
     * Asserts that a value is strictly `true`.
     *
     * @param {string} testName - The name of the test.
     * @param {any} actual - The actual value to test.
     */
    constructor(testName, actual) {
        super(testName, true === actual, `Actual value is true as expected`, `Actual value (${actual}) is not true (which is the expected value)`);
    }
}

moyal.test.IsFalse = class extends moyal.test.Assert {
    /**
     * Asserts that a value is strictly `false`.
     *
     * @param {string} testName - The name of the test.
     * @param {any} actual - The actual value to test.
     */
    constructor(testName, actual) {
        super(testName, false === actual, `Actual value is false as expected`, `Actual value (${actual}) is not false (which is the expected value)`);
    }
}

moyal.test.ThrowsBase = class extends moyal.test.Assert {
    #_checkErrorFn = null;
    #_thisArg = null;
    #_expected = true;

    /**
     * Base class to test whether a function throws (or not), and optionally validate the error thrown.
     *
     * @param {string} testName - Name of the test.
     * @param {boolean} expected - Whether an error is expected (`true` = should throw).
     * @param {Function} fn - Function to test.
     * @param {Function} [checkErrorFn] - Optional error predicate to validate the thrown error.
     * @param {any} [thisArg] - Optional `this` context for invoking the test/check function.
     */
    constructor(testName, expected, fn, checkErrorFn, thisArg) {
        expected = (expected === true);
        const msg1 = "An error WAS NOT thrown, or it was thrown but WAS NOT PASSED the error predicate.";
        const msg2 = "An error WAS NOT thrown.";
        const msg3 = "An error WAS thrown.";
        super(testName, fn, expected ? msg3 : msg2, expected ? msg1 : msg3, thisArg);
        if (!moyal.test.isFunction(fn)) { throw new Error("fn parameter must be a function"); }
        if (expected && checkErrorFn != null && !moyal.test.isFunction(checkErrorFn)) { throw new Error("checkErrorFn parameter must be a function, null or undefined"); }
        this.#_expected = expected;
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
        super._run_impl();

        if (this.errors.length === 1) {
            return this.#_expected && (this.#_checkErrorFn == null || this.#_checkErrorFn.call(this.#_thisArg, this.errors[0]) === true);
        }
        return !this.#_expected; 
    }
}

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

moyal.test.NoThrows = class extends moyal.test.ThrowsBase {
    /**
     * Tests that a function does NOT throw.
     *
     * @param {string} testName - Name of the test.
     * @param {Function} fn - The function to test.
     * @param {any} [thisArg] - Optional `this` context.
     */
    constructor(testName, fn, checkErrorFn, thisArg) {
        super(testName, false, fn, null, thisArg);
    }
}

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
            let indecesDifferent = [];
            for (var i = 0; i < expectedArr.length; i++) {
                let res = this.#_itemComparer != null ? this.#_itemComparer.call(this.#_thisArg ?? undefined, expectedArr[i], actualArr[i]) : expectedArr[i] === actualArr[i];
                if (res !== true) {
                    indecesDifferent.push(i);
                }
            }

            if (indecesDifferent.length > 0)
                this.additionalData["Problem found"] = "Different element indeces are: {" + indecesDifferent.join(", ") + "}";

            res = indecesDifferent.length === 0;
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
        super.run(write);
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
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    areEqual(testName, expected, actual, comparer) { this.add(new moyal.test.AreEqual(testName, expected, actual, comparer)); return this; }

    /**
     * Adds an assertion to the group that verifies a value is `true`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `true`.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    isTrue(testName, actual) { this.add(new moyal.test.IsTrue(testName, actual)); return this; }

    /**
     * Adds an assertion to the group that verifies a value is `false`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `false`.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    isFalse(testName, actual) { this.add(new moyal.test.IsFalse(testName, actual)); return this; }

    /**
     * Adds an assertion that verifies a function throws an error.
     * Optionally verifies the error with a predicate.
     *
     * @param {string} testName - Descriptive test title.
     * @param {Function} fn - Function expected to throw.
     * @param {(err: any) => boolean} [checkErrorFn] - Optional predicate to inspect the thrown error.
     * @param {object} [thisArg] - Optional `this` binding for `fn` and `checkErrorFn`.
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