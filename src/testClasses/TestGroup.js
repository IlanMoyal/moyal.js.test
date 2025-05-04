/**
 * File: src/testClasses/TestGroup.js
 */

import { TestBase } from "../core.js";
import { InternalUtils } from "../utilClasses/_InternalUtils.js";
import { MultiLevelAutoNumbering } from "../utilClasses/MultiLevelAutoNumbering.js";
import { AreEqual } from "./AreEqual.js";
import { AreNotEqual } from "./AreNotEqual.js";
import { IsDefined } from "./IsDefined.js";
import { IsFalse } from "./IsFalse.js";
import { IsNotNull } from "./IsNotNull.js";
import { IsNull } from "./IsNull.js";
import { IsTrue } from "./IsTrue.js";
import { IsUndefined } from "./IsUndefined.js";
import { NoThrows } from "./NoThrows.js";
import { SequencesAreEqual } from "./SequencesAreEqual.js";
import { Throws } from "./Throws.js";

/**
 * @class TestGroup
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
 * Inherits from {@link TestBase}.
 */
export class TestGroup extends TestBase {
    /** @type {Array<TestBase>} */
    #_tests = [];

    /** @type {number} */
    #_directFailureCount = 0;

    /** @type {number} */
    #_totalFailureCount = 0;

    /** @type {number} */
    #_totalErrorCount = 0;

    /** @type {number} */
    #_unexpectedErrorCount = 0;

    /** @type {TestGroup|null} */
    #_parentGroup = null;

    /** @type {boolean|null} */
    #_write = null; // Controls output policy for child test writes (true, false, or conditional)

    /**
     * Creates a new test group to encapsulate multiple tests or nested groups.
     *
     * @param {string} testName - The name/title of this group.
     * @param {...TestBase} tests - Optional tests or nested groups to immediately add.
     */
    constructor(testName, ...tests) {
        super(testName);
        this.add(...tests);
    }

    /** 
     * Clears all tests in this group. 
     */
    clear() { 
        this.#_tests.length = 0;
        this.#_directFailureCount = 0;
        this.#_totalFailureCount = 0;
        this.#_totalErrorCount = 0;
        this.#_unexpectedErrorCount = 0;
    }

    /** 
     * The total number of errors found (including in nested groups). 
     * 
     * @returns {number} Total number of errors found (including in nested groups). 
     * */
    get errorCount() { return this.#_totalErrorCount; }

    /**
     * Runs the test and optionally writes its result.
     * 
     * @param {boolean} write - If true, writes the result to the console; 
     *          If false doesn't write the result to the console; 
     *          Otherwise writes only failures to the console.
     * @param {MultiLevelAutoNumbering} [mlAutoNumber] - Optional multi-level automatic numbering to automatically prefix messages with numbers.
     * @returns {boolean} Whether the test passed.
     * @override
     */
    run(write, mlAutoNumber) {
        this.#_write = write;
        return super.run(write, mlAutoNumber);
    }

    /**
     * Executes all tests/groups in this group without printing.
     * Aggregates error and timing info, but delays output if `write` is false.*
     
     * @returns {boolean} True if all direct tests succeeded.
     * @override 
     */
    runImpl() {
        this.#_directFailureCount = 0;
        this.#_totalErrorCount = 0;
        this.#_unexpectedErrorCount = 0;
        
        const t0 = InternalUtils.now();
        for (let t of this.#_tests) {
            t.runImpl(); 

            if (t instanceof TestGroup) {
                // Accumulate from nested groups
                this.#_totalFailureCount += t.totalFailureCount;
                this.#_unexpectedErrorCount += t.unexpectedErrorCount;
            }
            else {
                // Leaf tests
                this.#_directFailureCount += t.succeeded ? 0 : 1;
                this.#_unexpectedErrorCount += t.succeeded ? 0 : t.errorCount;
                this.#_totalFailureCount += t.succeeded ? 0 : 1;
            }

            this.#_totalErrorCount += t.errorCount;
        }
        const t1 = InternalUtils.now();
        this.elapsed = t1 - t0;
        
        return this.#_directFailureCount === 0;
    }

    /**
     * Outputs a summary line and recursively logs all child test results.
     * Uses collapsed group for passed tests and expanded group for failed ones.
     * 
     * @param {MultiLevelAutoNumbering} [mlAutoNumber] - Optional multi-level automatic numbering to automatically prefix messages with numbers.
     * @override
     */
    write(mlAutoNumber, parentWriteMode) {
        if(mlAutoNumber == null || !(mlAutoNumber instanceof MultiLevelAutoNumbering))
            mlAutoNumber = null;

        const writeMode = parentWriteMode == null ? this.#_write : parentWriteMode;

        let label = `${(mlAutoNumber?.next() ?? "")}${this.name}: (${this.elapsed}ms, `;
        let color;
        if (this.succeeded) {
            color = "green";
            label += "all passed"
        }
        else {
            color = "red";
            label += `${(this.#_directFailureCount == 0 ? "no" : this.#_directFailureCount.toString())} direct failure${(this.#_directFailureCount === 1 ? "" : "s")}, ${this.#_totalFailureCount} total failure${(this.#_totalFailureCount === 1 ? "" : "s")}`;
        }

        if (this.#_unexpectedErrorCount> 0) {
            label += `, ${this.#_unexpectedErrorCount} unexpected error${(this.#_unexpectedErrorCount > 1 ? "s" : "")}`;
        }

        label += ")";

        if (this.succeeded) {
            this.logger.groupCollapsed(label, color);
        }
        else {
            this.logger.group(label, color);
		}
        if(this.#_tests?.length > 0) {
            mlAutoNumber?.nest()
            for (let t of this.#_tests) {
                if(writeMode === true || (writeMode == null && !t.succeeded)) {
                    t.write(mlAutoNumber, this.#_write);
                }
            }
            mlAutoNumber?.unnest();
        }
        this.logger.groupEnd();
    }

    /** 
     * Returns the number of unexpected errors that were thrown.
     * 
     * @returns {number} - The number of unexpected errors that were thrown.
     */
    get unexpectedErrorCount() {
        return this.#_unexpectedErrorCount;
    }

    /** 
     * Returns the number of direct failures of tests within the group. Note that a failure of the group itself is not counted. 
     * 
     * @returns {number} - The number of direct failures of tests within the group. Note that a failure of the group itself is not counted. 
     */
    get directFailureCount() {
        return this.#_directFailureCount;
    }

    /** 
     * Returns the number of total failure count, including in inner groups. Note that a failure of the group itself is not counted. 
     * 
     * @returns {number} - The number of total failure count, including in inner groups. Note that a failure of the group itself is not counted. 
     */
    get totalFailureCount() {
        return this.#_totalFailureCount;
    }

    /** 
     * Returns `true` if the test scucceeded (that is the value of `totalFailureCount` equals 0); otherwise, `false`. 
     * 
     * @returns {boolean} - `true` if the test scucceeded (that is the value of `totalFailureCount` equals 0); otherwise, `false`. 
     */
    get succeeded() {
        return this.#_totalFailureCount === 0;
    }

    /**
     * Adds tests or groups to this group.
     *
     * @param {...TestBase} tests - One or more test/group instances.
     */
    add(...tests) {
        this.#_tests.push(...tests);
        for (let t of tests) {
            if (t instanceof TestGroup) {
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
        let grp = new TestGroup(testName);
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
     * @param {function(any, any):boolean} [comparer] - Optional custom comparison function ((expected, actual) => boolean).
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {TestGroup} The current test group (for chaining).
     */
    areEqual(testName, expected, actual, comparer, thisArg) { this.add(new AreEqual(testName, expected, actual, comparer, thisArg)); return this; }

     /**
     * Adds an inequality assertion to the group.
     * Checks if `actual !== not_expected`, or uses a custom comparer if provided.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} not_expected - The value we're not expecting.
     * @param {*} actual - Actual value to compare.
     * @param {function(any, any):boolean} [comparer] - Optional custom comparison function ((expected, actual) => boolean).
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {TestGroup} The current test group (for chaining).
     */
     areNotEqual(testName, not_expected, actual, comparer, thisArg) { this.add(new AreNotEqual(testName, not_expected, actual, comparer, thisArg)); return this; }

    /**
     * Adds an assertion to the group that verifies a value is `true`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `true`.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {TestGroup} The current test group (for chaining).
     */
    isTrue(testName, actual, thisArg = null) { this.add(new IsTrue(testName, actual, thisArg)); return this; }

    /**
     * Adds an assertion to the group that verifies a value is `false`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `false`.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {TestGroup} The current test group (for chaining).
     */
    isFalse(testName, actual, thisArg) { this.add(new IsFalse(testName, actual, thisArg)); return this; }

    /**
     * Adds an assertion to the group that verifies a value is strictly `null`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `null`.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {TestGroup} The current test group (for chaining).
     */
    isNull(testName, actual, thisArg) { this.add(new IsNull(testName, actual, thisArg)); return this; }
    
    /**
     * Adds an assertion to the group that verifies a value is **not** `null`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is not `null`.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {TestGroup} The current test group (for chaining).
     */
    isNotNull(testName, actual, thisArg = null) {this.add(new IsNotNull(testName, actual, thisArg)); return this;}

     /**
     * Adds an assertion to the group that verifies a value is **not** `undefined`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is defined.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {TestGroup} The current test group (for chaining).
     */
    isDefined(testName, actual, thisArg = null) { this.add( new IsDefined(testName, actual, thisArg));  return this;}

    /**
     * Adds an assertion to the group that verifies a value is strictly `undefined`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `undefined`.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {TestGroup} The current test group (for chaining).
     */
    isUndefined(testName, actual, thisArg = null) { this.add( new IsUndefined(testName, actual, thisArg));  return this;}
    
    /**
     * Adds an assertion that verifies a function throws an error.
     * Optionally verifies the error with a predicate.
     *
     * @param {string} testName - Descriptive test title.
     * @param {function} fn - Function expected to throw.
     * @param {function(any):boolean} [checkErrorFn] - Optional predicate to inspect the thrown error.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {TestGroup} The current test group (for chaining).
     */
    throws(testName, fn, checkErrorFn, thisArg = null) { this.add(new Throws(testName, fn, checkErrorFn, thisArg)); return this; }

    /**
     * Adds an assertion that verifies a function does NOT throw.
     *
     * @param {string} testName - Descriptive test title.
     * @param {function} fn - Function expected to execute without throwing.
     * @param {object} [thisArg] - Optional `this` binding for `fn`.
     * @returns {TestGroup} The current test group (for chaining).
     */
    noThrows(testName, fn, thisArg = null) { this.add(new NoThrows(testName, fn, thisArg)); return this; }

    /**
     * Adds a sequence equality assertion to the group.
     * Compares two iterable sequences element-by-element.
     *
     * @param {string} testName - Descriptive test title.
     * @param {Iterable} expected - The expected iterable sequence.
     * @param {Iterable} actual - The actual iterable sequence.
     * @param {function(any, any):boolean [itemComparer] - Optional custom item-level comparison function ((expected, actual) => boolean).
     * @returns {TestGroup} The current test group (for chaining).
     */
    sequencesAreEqual(testName, expected, actual, itemComparer) { this.add(new SequencesAreEqual(testName, expected, actual, itemComparer)); return this; }
}