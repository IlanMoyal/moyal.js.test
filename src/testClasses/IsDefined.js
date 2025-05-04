/**
 * File: src/testClasses/IsDefined.js
 */

import { AreNotEqual } from "./AreNotEqual.js";

/**
 * @class IsDefined
 *
 * A test that asserts the actual value is **not** `undefined`.
 *
 * Inherits from {@link Assert}.
 *
 * Example:
 * ```js
 * isDefined("Value should be defined", myValue);
 * ```
 */
export class IsDefined extends AreNotEqual {
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