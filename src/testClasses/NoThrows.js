/**
 * File: src/testClasses/NoThrows.js
 */

import { ThrowsBase } from "../core.js";

/**
 * @class NoThrows
 *
 * A test that verifies a function does not throw any error.
 *
 * Inherits from {@link ThrowsBase}.
 */
export class NoThrows extends ThrowsBase {
	/**
	 * Tests that a function does NOT throw.
	 *
	 * @param {string} testName - Name of the test.
	 * @param {?function} fn - The function to test.
	 * @param {any} [thisArg] - Optional `this` context.
	 */
	constructor(testName, fn, thisArg) {
		super(testName, false, fn, null, thisArg);
	}
}