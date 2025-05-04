/**
 * File: src/testClasses/IsTrue.js
 */

import { AreEqual } from "./AreEqual.js";

/**
 * @class IsTrue
 *
 * A test that asserts the actual value is strictly `true`.
 * 
 * Can accept a boolean value or a function returning boolean.
 *
 * Inherits from {@link Assert}.
 */
export class IsTrue extends AreEqual {
	/**
	 * Asserts that a value is strictly `true`.
	 *
	 * @param {string} testName - The name of the test.
	 * @param {any|Function} actual - The value or function to evaluate.
	 * @param {any} [thisArg] - Optional context in which to invoke deferred evaluation.
	 */
	constructor(testName, actual, thisArg) {
		super(testName, true, actual, null, thisArg);
	}
}