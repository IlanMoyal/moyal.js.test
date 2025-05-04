/**
 * File: src/testClasses/SequenceAreEqual.js
 */

import { TestBase } from "../core.js";
import { InternalUtils } from "../utilClasses/_InternalUtils.js";

/**
 * @class SequencesAreEqual
 *
 * A test that compares two iterable sequences element-by-element for equality.
 * 
 * You can supply a custom item comparison function. Results include index mismatches.
 *
 * Inherits from {@link TestBase}.
 */
export class SequencesAreEqual extends TestBase {
	/** @type {Iterable<any>} */
	#_expected = null;

	/** @type {Iterable<any>} */
	#_actual = null;

	/** @type {function} */
	#_itemComparer = null;

	/** @type {boolean} */
	#_validIterables = true;

	/** @type {any} */
	#_thisArg = null;

	/**
	 * Compares two iterable sequences element by element.
	 * 
	 * @param {string} testName - Name of the test.
	 * @param {Iterable<any>} expected - Expected sequence.
	 * @param {Iterable<any>} actual - Actual sequence.
	 * @param {function(any, any):boolean} [itemComparer] - Optional custom comparison function to compare individual items ((expected, actual) => boolean).
	 * @param {any} [thisArg] - Optional `this` binding for the itemComparer.
	 */
	constructor(testName, expected, actual, itemComparer, thisArg) {
		// Call Assert constructor with all info
		super(testName, `Actual sequence equals to the expected sequence`, `Actual sequence does not equal to the expected sequence)`, null, thisArg);
		this.additionalData = {};

		this.#_expected = expected;
		this.#_actual = actual;
		this.#_itemComparer = itemComparer;
		this.#_thisArg = thisArg;

		// Validate that expected is iterable
		if (!InternalUtils.isIterable(expected)) {
			this.additionalData["expected"] = "ERROR: 'expected' argument is not iterable!"
			this.#_validIterables = false;
		}

		// Validate that actual is iterable
		if (!InternalUtils.isIterable(actual)) {
			this.additionalData["actual"] = "ERROR: 'actual' argument is not iterable!"
			this.#_validIterables = false;
		}
	}

	/**
	 * Runs the test without printing.
	 * 
	 * @returns {boolean} Whether the test passed.
	 * @override 
	 */
	runImpl() {
		if(!this.#_validIterables) {
			this.succeeded = false;
		}
		else {
			const t0 = InternalUtils.now();

			let expectedArr = this.additionalData["expected"] = Array.from(this.#_expected);
			let actualArr = this.additionalData["actual"] = Array.from(this.#_actual);
			let res;

			// Check lengths
			if (expectedArr.length === actualArr.length) {
				// Check individual items
				let indicesDifferent = [];
				for (var i = 0; i < expectedArr.length; i++) {
					let res = this.#_itemComparer != null ? this.#_itemComparer.call(this.#_thisArg ?? undefined, expectedArr[i], actualArr[i]) : expectedArr[i] === actualArr[i];
					if (res !== true) {
						indicesDifferent.push(i);
					}
				}

				if (indicesDifferent.length > 0)
					this.additionalData["Mismatch at indices"] = "Different element indices are: {" + indicesDifferent.join(", ") + "}";

				res = indicesDifferent.length === 0;
			}
			else{
				this.additionalData["Mismatch at indices"] = "expected.length !== actual.length";
				res = false;
			}

			const t1 = InternalUtils.now();
			this.elapsed = t1 - t0;

			this.succeeded = res;
		}
	}
}