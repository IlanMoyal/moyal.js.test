/**
 * File: src/testClasses/AreNotNull.js
 */

import { Assert, TestInternalResult } from "../core.js";
import { InternalUtils } from "../utilClasses/_InternalUtils.js";

/**
 * @class AreNotEqual
 *
 * A test that verifies two values are **not equal** using strict inequality (`!==`)
 * or a custom comparer function that is expected to return `false`.
 *
 * This test passes when `actual !== not_expected`, or when the `comparer` returns `false`.
 *
 * Inherits from {@link Assert}.
 *
 * Example:
 * ```js
 * new AreNotEqual("Should be different", 42, value);
 * new AreNotEqual("Custom inequality", a, b, (a, b) => deepCompare(a, b));
 * ```
 */
export class AreNotEqual extends Assert {
	/**
	 * Constructs a new inequality assertion.
	 *
	 * @param {string} testName - Name of the test.
	 * @param {any|Function} not_expected - Value the actual result must NOT match.
	 * @param {any|Function} actual - Actual value or function returning it.
	 * @param {function(any, any):boolean} [comparer] - Optional custom comparison function ((not_expected, actual) => boolean).
	 * @param {any} [thisArg] - Optional context for invoking deferred or comparison functions.
	 */
	constructor(testName, not_expected, actual, comparer, thisArg) {
		// Use the comparer if provided, otherwise compare using strict equality
		const needsDelayedExecution = InternalUtils.isFunction(not_expected) || InternalUtils.isFunction(actual) || InternalUtils.isFunction(comparer);        
		let test;
		let ad = null;
		if(needsDelayedExecution){
			test = () => {
				let not_expectedVal = InternalUtils.isFunction(not_expected) ? not_expected.call(thisArg ?? globalThis) : not_expected;
				let actualVal   = InternalUtils.isFunction(actual)   ? actual.call(thisArg ?? globalThis)   : actual;

				return new TestInternalResult(
					InternalUtils.isFunction(comparer) ? !comparer.call(thisArg ?? globalThis, not_expectedVal, actualVal) : not_expectedVal !== actualVal,
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