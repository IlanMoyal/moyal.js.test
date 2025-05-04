/**
 * File: src/testClasses/AreEqual.js
 */

import { Assert, TestInternalResult } from "../core.js";
import { InternalUtils } from "../utilClasses/_InternalUtils.js"; 

/**
 * @class AreEqual
 *
 * A test that compares two values using strict equality (`===`) or a custom comparer function.
 *
 * Inherits from {@link Assert}.
 */
export class AreEqual extends Assert {
	/**
	 * Compares two values using `===` or a custom comparer function.
	 * Values can be passed directly or as functions for deferred evaluation.
	 *
	 * @param {string} testName - Name of the test.
	 * @param {any|Function} expected - Expected value or function returning it.
	 * @param {any|Function} actual - Actual value or function returning it.
	 * @param {function(any, any):boolean} [comparer] - Optional custom comparison function ((expected, actual) => boolean).
	 * @param {any} [thisArg] - Optional context for invoking deferred or comparison functions.
	 */
	constructor(testName, expected, actual, comparer, thisArg) {
		// Use the comparer if provided, otherwise compare using strict equality
		const needsDelayedExecution = InternalUtils.isFunction(expected) || InternalUtils.isFunction(actual) || InternalUtils.isFunction(comparer);        
		let test;
		let ad = null;
		if(needsDelayedExecution){
			test = () => {
				let expectedVal = InternalUtils.isFunction(expected) ? expected.call(thisArg ?? globalThis) : expected;
				let actualVal   = InternalUtils.isFunction(actual)   ? actual.call(thisArg ?? globalThis)   : actual;

				return new TestInternalResult(
					InternalUtils.isFunction(comparer)  ? comparer.call(thisArg ?? globalThis, expectedVal, actualVal) : expectedVal === actualVal,
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