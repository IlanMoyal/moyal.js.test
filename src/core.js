// eslint-disable-next-line no-unused-vars
import { LoggerBase } from "./logClasses/LoggerBase.js";
import { InternalUtils } from "./utilClasses/_InternalUtils.js";
import { MultiLevelAutoNumbering } from "./utilClasses/textAutomation.js";

/**
 * Internal class used by assertions to carry both the result of a test evaluation
 * and any associated metadata (such as expected/actual values) for logging.
 *
 * @private
 * @class
 */
class TestInternalResult{
    /**
     * Indicates if the test passed or failed.
     * 
     * @type {boolean} 
     */
    _result = null;

    /**
     * Additional context (e.g., expected/actual values) to display with the result.
     * 
     * @type {any} 
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
 * @class BaseTest
 *
 * Abstract base class for all test types.
 * 
 * Provides a unified interface for managing test name, success/failure status, timing, and output.
 * Subclasses must override the `runImpl()` method to implement test logic.
 * @abstract 
 */
class TestBase {
    /** @type {string} */
    #_testName = null;
    
    /** @type {boolean} */
    #_succeeded = true;

    /** @type {string} */
    #_successMessage = null;

    /** @type {string} */
    #_failureMessage = null;

    /** @type {any} */
    #_additionalData = null;

    /** @type {Array<Error>} */
    #_errors = [];

    /** @type {number} */
    #_elapsed = 0;

    /** @type {{logger: LoggerBase}} */
    static #_test = null;

    /**  
     * @param {{{logger: LoggerBase}}} test 
     * @ignore
     */
    static __setup(test) {
        this.#_test = test;
    }

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
        if (!InternalUtils.isString(testName)) { throw new Error("testName must be string"); }
        if (successMessage != null && !InternalUtils.isString(successMessage)) { throw new Error("successMessage must be string, null or undefined"); }
        if (failureMessage != null && !InternalUtils.isString(failureMessage)) { throw new Error("failureMessage must be string, null or undefined"); }
        this.#_testName = testName;
        this.#_successMessage = successMessage ?? "success";
        this.#_failureMessage = failureMessage ?? "failure";
        this.#_additionalData = additionalData;
	}

    /** 
     * Returns the name of the test.
     * 
     * @returns {string} - The name of the test.
     */
    get name() { return this.#_testName; }

    /** 
     * Returns the message to display on test success.
     * 
     *  @returns {string} - The message to display on test success.
     */
    get successMessage() { return this.#_successMessage; }

    /** 
     * Returns the message to display on test failure.
     * 
     * @returns {string} - The message to display on test failure.
     */
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

    /** 
     * Returns whether the test passed — overridden in derived classes.
     * 
     * @returns {boolean} - Whether the test passed — overridden in derived classes.
     */
    get succeeded() { return this.#_succeeded;}
    
    /**
     * Sets a value indicating whether the test passed.
     * 
     * @param {boolean} value - A value indicating whether the test passed.
     */
    set succeeded(value) { this.#_succeeded = (value === true);}

    /**
     * Returns whether the test failed (inverse of succeeded).
     * 
     * @returns {boolean} - Whether the test failed (inverse of succeeded). 
     */
    get failed() { return this.succeeded !== true; }

    /** 
     * Returns the list of errors associated with the test.
     * 
     * @returns {Array<Error>} - The list of errors associated with the test. 
     */
    get errors() { return this.#_errors; }

    /** 
     * Returns the count of errors (possibly from child tests)
     * 
     * @returns {number} - The count of errors (possibly from child tests).
     */
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
     * Returns the logger used to log test results.
     * 
     * @returns {LoggerBase} - The logger used to log test results.
     */
    get logger() { return TestBase.#_test.logger; }

    /**
     * Runs the test and optionally writes its result.
     * 
     * @param {boolean} write - If true, writes the result to the console; 
     *          If false doesn't write the result to the console; 
     *          Otherwise writes only failures to the console.
     * @param {MultiLevelAutoNumbering} [mlAutoNumber] - Optional multi-level automatic numbering to automatically prefix messages with numbers.
     * @returns {boolean} Whether the test passed.
     */
    run(write, mlAutoNumber) { 
        this.runImpl();
        if (write === true || (write !== false && !this.succeeded)) {
            this.write(mlAutoNumber);
		}
        return this.succeeded;
    }

    /**
     * Runs the test without printing, just settings succeeded to the test result.
     * 
     * @abstract
     */
    runImpl() {
        throw new Error("Method 'runImpl()' must be implemented by subclass");
    }

    /**
     * Pushes the specified error to the error list.
     * 
     * @param {Error} e - The error.
     * @ignore
     */
    _push_error(e){
        this.#_errors.push(e);
    }

    /**
     * Logs the result of the test to the console.
     * 
     * If the test passes with no errors, it uses a flat `console.log`.
     * If there are errors or additional data, it uses a collapsed group for clarity.
     * @param {MultiLevelAutoNumbering} [mlAutoNumber] - Optional multi-level automatic numbering to automatically prefix messages with numbers. 
     */
    write(mlAutoNumber) {        
        if(mlAutoNumber == null || !(mlAutoNumber instanceof MultiLevelAutoNumbering)) 
            mlAutoNumber = null;
        
        const labelName = this.name?.trim() || "(unnamed test)";
        let label = `${(mlAutoNumber?.next() ?? "")}${labelName}: ${(this.succeeded ? this.successMessage : this.failureMessage)} (${this.elapsed} ms`
        let color = this.succeeded ? "green" : "red";
        if (this.errorCount === 0) {
            label += ")";
        }
        else {
            let errorStr = (this.succeeded ? "" : "un") + "expected " + (this.errorCount > 1 ? "errors" : "error");
            label += `, ${this.errorCount} ${errorStr})`;
        }

        if (this.errorCount == 0 && this.additionalData == null) {
            // Simple success case
            this.logger.log(label, color);
            return;
        }
        
        // Grouped output with errors or extra info
        this.logger.groupCollapsed(label, color);

        // Show errors if available
        if (this.errorCount > 0) {
            if (this.additionalData != null) {
                this.logger.groupCollapsed("errors");
            }
            /*
             * Available colors:
             *   "black", "red", "green", "yellow", "blue", "magenta", "cyan", "white", "gray", "lightred", 
             *   "lightgreen", "lightyellow", "lightblue", "lightmagenta", "lightcyan", "lightgray"
             */
            for (let err of this.errors) {
                if(this.succeeded)                    
                    this.logger.error(err, "black");
                else
                this.logger.error(err);
            }
            if (this.additionalData != null) {
                this.logger.groupEnd();
            }
        }

        // Show additional data if available
        if (this.additionalData != null) {
            if (this.errorCount > 0) {
                this.logger.groupCollapsed("additional data");
            }
            this.logger.log(JSON.stringify(this.additionalData));
            if (this.errorCount > 0) {
                this.logger.groupEnd();
            }
        }

        this.logger.groupEnd();
    }
}

/**
 * @class Assert
 *
 * A generic assertion test class that evaluates either a boolean or a function returning boolean.
 * 
 * Inherits from {@link TestBase}.
 * Typically used for boolean tests or custom logic.
 */
class Assert extends TestBase {
    // Holds the test logic, result, context, error and timing info
    /** @type {(function|boolean)} */
    #_test = null;

    /** @type {any} */
    #_thisArg = null;

    /**
     * A test that evaluates a function or boolean and tracks its result.
     * 
     * If the test value is a function, it's called and timed.
     * If the function throws, it fails and captures the error.
     * 
     * @param {string} testName - Name of the test.
     * @param {(function|boolean)} test - Test logic (function or static boolean).
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
     * Runs the test without printing, just set `succeeded` property to the test result.
     * 
     * @override
     * @ignore
     */
    runImpl() {
        if (this.#_test === true) {
            this.succeeded = true;
        }
        else if (!InternalUtils.isFunction(this.#_test)) {
            this.succeeded =  false; // Test is neither true nor a function
        }
        else {
            let res;
            const t0 = InternalUtils.now();
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
            const t1 = InternalUtils.now();
            this.elapsed = t1 - t0;

            this.succeeded = res;
        }
        return this.succeeded;
    }
};

/**
 * @class ThrowsBase
 *
 * Base class for tests that evaluate whether a function throws or not.
 * 
 * Supports optional error validation via predicate functions.
 *
 * Inherits from {@link Assert}.
 * Not used directly — use {@link Throws} or {@link NoThrows} instead.
 */
class ThrowsBase extends Assert {
    /** @type {function} */
    #_checkErrorFn = null;

    /** @type {any} */
    #_thisArg = null;

    /** @type {boolean} */
    #_expected = true;

    /**
     * Base class to test whether a function throws (or not), and optionally validate the error thrown.
     *
     * @param {string} testName - Name of the test.
     * @param {boolean} expectingError - Whether an error is expected (`true` = should throw).
     * @param {function} fn - Function to test.
     * @param {function(any):boolean} [checkErrorFn] - Optional error predicate to validate the thrown error.
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
        if (!InternalUtils.isFunction(fn)) { throw new Error("fn parameter must be a function"); }
        if (expectingError && checkErrorFn != null && !InternalUtils.isFunction(checkErrorFn)) { throw new Error("checkErrorFn parameter must be a function, null or undefined"); }
        this.#_expected = expectingError;
        this.#_thisArg = thisArg;
        this.#_checkErrorFn = checkErrorFn;
    }
    
    /**
     * Executes the test, checking if an error was thrown and optionally applying a predicate on the error.
     * 
     * @override 
     */
    runImpl() {
        super.runImpl();
        const basePassed = super.succeeded;

        if (!basePassed && this.errors.length === 1) {
            this.succeeded = this.#_expected && (this.#_checkErrorFn == null || this.#_checkErrorFn.call(this.#_thisArg, this.errors[0]) === true);
        }
        else {
            this.succeeded = !this.#_expected; 
        }
    }
}

export {
    TestInternalResult,
    TestBase,
    Assert,
    ThrowsBase
};