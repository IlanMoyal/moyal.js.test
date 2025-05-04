/**
 * File: src/testClasses/IsFalse.js
 */

import { AreEqual } from "./AreEqual.js";

/**
 * @class IsFalse
 *
 * A test that asserts the actual value is strictly `false`.
 * 
 * Can accept a boolean value or a function returning boolean.
 *
 * Inherits from {@link Assert}.
 */
export class IsFalse extends AreEqual {
	/**
	 * Asserts that a value is strictly `false`.
	 *
	 * @param {string} testName - The name of the test.
	 * @param {any|Function} actual - The value or function to evaluate.
	 * @param {any} [thisArg] - Optional context for evaluation.
	 */
	constructor(testName, actual, thisArg) {
		super(testName, false, actual, null, thisArg);
	}
}