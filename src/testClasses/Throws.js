/**
 * File: src/testClasses/Throws.js
 */

import { ThrowsBase } from "../core.js";

/**
 * @class Throws
 *
 * A test that expects a function to throw an exception.
 * 
 * You may optionally provide a predicate to verify the thrown error.
 *
 * Inherits from {@link ThrowsBase}.
 */
export class Throws extends ThrowsBase {
	/**
	 * Tests that a function throws, and optionally that the thrown error satisfies a condition.
	 *
	 * @param {string} testName - Name of the test.
	 * @param {function} fn - The function that should throw.
	 * @param {function(any):boolean} [checkErrorFn] - Optional error predicate.
	 * @param {any} [thisArg] - Optional `this` context.
	 */
	constructor(testName, fn, checkErrorFn, thisArg) {
		super(testName, true, fn, checkErrorFn, thisArg);
	}
}