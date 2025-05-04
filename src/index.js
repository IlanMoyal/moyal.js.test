import { Assert, TestBase, ThrowsBase } from "./core.js";
import { AreEqual } from "./testClasses/AreEqual.js"
import { AreNotEqual } from "./testClasses/AreNotEqual.js"
import { IsDefined } from "./testClasses/IsDefined.js"
import { IsFalse } from "./testClasses/IsFalse.js"
import { IsNotNull } from "./testClasses/IsNotNull.js"
import { IsNull } from "./testClasses/IsNull.js"
import { IsTrue } from "./testClasses/IsTrue.js"
import { IsUndefined } from "./testClasses/IsUndefined.js"
import { NoThrows } from "./testClasses/NoThrows.js"
import { SequencesAreEqual } from "./testClasses/SequencesAreEqual.js"
import { TestGroup } from "./testClasses/TestGroup.js"
import { Throws } from "./testClasses/Throws.js"
import { SequentialText, AutoNumbering, MultiLevelAutoNumbering } from "./utilClasses/textAutomation.js";
import { LoggerBase, SimpleLogger, BrowserLogger, NodeLogger } from "./logClasses/logger.js";

import BuildInfo from "./auto-generated/build-info.js";

/**
 * @class Test
 *
 * The main static interface for the moyal.js.test framework.
 * 
 * Provides assertion utilities for test development and a central entry point to define and run tests.
 * Also contains type utilities to assist in dynamic validation.
 *
 * Example usage:
 * ```js
 * Test.isTrue("Test if value is true", myValue);
 * Test.areEqual("Value check", expected, actual);
 * ```
 */

class Test {
    /** @type {LoggerBase} */
    static #_logger = null;

     /**
     * Returns the version of the test library.
     * This is a read-only property used for diagnostics or compatibility checks.
     * @returns {string} Semantic version string.
     */
    static get Version() {
        return BuildInfo.version;
    }

    static get logger() {
        if(this.#_logger == null)
            this.#_logger = LoggerBase.getDefaultLogger();

        return this.#_logger;
    }

    static set logger(logger) {
        if(logger == null)
            this.#_logger  = LoggerBase.getDefaultLogger();

        else if(LoggerBase.isLogger(logger)) 
            this.#_logger = logger;
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
     * @param {function(any, any):boolean} [comparer] - Optional custom comparison function ((expected, actual) => boolean).
     * @param {?boolean} [write] - The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static areEqual(testName, expected, actual, comparer, write) { return new AreEqual(testName, expected, actual, comparer).run(write);}

    /**
     * Asserts strict inequality - checks if `actual !== not_expected`, or uses a custom comparer if provided.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} not_expected - The value we not expecting.
     * @param {*} actual - Actual value to compare.
     * @param {function(any, any):boolean} [comparer] - Optional custom comparison function ((not_expected, actual) => boolean).
     * @param {?boolean} [write] - The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static areNotEqual(testName, not_expected, actual, comparer, write) { return new AreNotEqual(testName, not_expected, actual, comparer).run(write);}

    /**
     * Asserts that specified value is strictly `true`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `true`.
     * @param {?boolean} [write] - The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static isTrue(testName, actual, write) { return new IsTrue(testName, actual).run(write); }

    /**
     * Asserts that specified value is strictly `false`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `false`.
     * @param {?boolean} [write] - The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static isFalse(testName, actual, write) { return new IsFalse(testName, actual).run(write); }

    /**
     * Asserts that the specfied value is strictly `null`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `null`.
     * @param {?boolean} [write] - The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static isNull(testName, actual, write) { return new IsNull(testName, actual).run(write); }
    
    /**
     * Asserts that the specified value is **not** `null`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is not `null`.
     * @param {?boolean} [write] - The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static isNotNull(testName, actual, write) {return new IsNotNull(testName, actual).run(write);}

    /**
     * Asserts that specified value is **not** `undefined`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is defined.
     * @param {?boolean} [write] - The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static isDefined(testName, actual, write) { return new IsDefined(testName, actual).run(write); }

    /**
     * Asserts that specified value is strictly `undefined`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `undefined`.
     * @param {?boolean} [write] - The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static isUndefined(testName, actual, write) { return new IsUndefined(testName, actual).run(write); }

    /**
     * Adds an assertion that verifies a function throws an error.
     * Optionally verifies the error with a predicate.
     *
     * @param {string} testName - Descriptive test title.
     * @param {function} fn - Function expected to throw.
     * @param {function(any):boolean} [checkErrorFn] - Optional predicate to inspect the thrown error.
     * @param {object} [thisArg] - Optional `this` binding for `fn` and `checkErrorFn`.
     * @param {?boolean} [write] - The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static throws(testName, fn, checkErrorFn, thisArg, write) { return new Throws(testName, fn, checkErrorFn, thisArg).run(write); }

    /**
     * Adds an assertion that verifies a function does NOT throw.
     *
     * @param {string} testName - Descriptive test title.
     * @param {function} fn - Function expected to execute without throwing.
     * @param {object} [thisArg] - Optional `this` binding for `fn`.
     * @param {?boolean} [write] - The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static noThrows(testName, fn, thisArg, write) { return new NoThrows(testName, fn, thisArg).run(write);}

    /**
     * Adds a sequence equality assertion to the group.
     * Compares two iterable sequences element-by-element.
     *
     * @param {string} testName - Descriptive test title.
     * @param {Iterable} expected - The expected iterable sequence.
     * @param {Iterable} actual - The actual iterable sequence.
     * @param {function(any, any):boolean} [itemComparer] - Optional custom item-level comparison function ((expected, actual) => boolean).
     * @param {?boolean} [write] - The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static sequencesAreEqual(testName, expected, actual, itemComparer, write) { return new SequencesAreEqual(testName, expected, actual, itemComparer).run(write); }
}

TestBase.__setup(Test);

export {
    Test,
    TestBase,
    Assert,
    IsDefined,
    IsUndefined,
    IsFalse,
    IsTrue,
    IsNull,
    IsNotNull,
    AreEqual,
    AreNotEqual,
    ThrowsBase,
    Throws,
    NoThrows,
    SequencesAreEqual,
    TestGroup,
    
    /* numerators */
    SequentialText,
    AutoNumbering,
    MultiLevelAutoNumbering,

    /* logging */
    LoggerBase,
    SimpleLogger,
    BrowserLogger,
    NodeLogger
};