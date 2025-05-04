/**
 * File: src/testClasses/IsNull.js
 */

import { AreEqual } from "./AreEqual.js";

/**
 * @class IsNull
 *
 * A test that asserts the actual value is strictly `null`.
 *
 * Inherits from {@link Assert}.
 *
 * Example:
 * ```js
 * isNull("Should be null", myValue);
 * ```
 */
export class IsNull extends AreEqual {
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