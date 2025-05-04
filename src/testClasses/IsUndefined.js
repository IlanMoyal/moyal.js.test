/**
 * File: src/testClasses/IsUndefined.js
 */

import { AreEqual } from "./AreEqual.js";

/**
 * @class IsUndefined
 *
 * A test that asserts the actual value is strictly `undefined`.
 *
 * Inherits from {@link Assert}.
 *
 * Example:
 * ```js
 * isUndefined("Should be undefined", maybeMissing);
 * ```
 */
export class IsUndefined extends AreEqual {
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