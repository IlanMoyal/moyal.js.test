/**
 * File: src/testClasses/IsNotNull.js
 */

import { AreNotEqual } from "./AreNotEqual.js";

/**
 * @class IsNotNull
 *
 * A test that asserts the actual value is **not** `null`.
 *
 * Inherits from {@link Assert}.
 *
 * Example:
 * ```js
 * isNotNull("Should not be null", myValue);
 * ```
 */
export class IsNotNull extends AreNotEqual {
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