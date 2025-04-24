/* 
 * File:  test.moyal.sequences.js
 */

import "../../src/moyal.test.js";

export default new moyal.test.TestGroup("Sequence Comparison Tests")
	.groupStart("basic equality")
		.sequencesAreEqual("Empty arrays", [], [])
		.sequencesAreEqual("Simple number arrays", [1, 2, 3], [1, 2, 3])
		.sequencesAreEqual("String sequences", ["a", "b"], ["a", "b"])
	.groupClose()

	.groupStart("mismatched lengths")
		.sequencesAreEqual("Expected shorter", [1, 2], [1, 2, 3]) // should fail
		.sequencesAreEqual("Actual shorter", [1, 2, 3], [1])       // should fail
	.groupClose()

	.groupStart("element mismatch")
		.sequencesAreEqual("One mismatch", [1, 2, 3], [1, 9, 3]) // should fail at index 1
		.sequencesAreEqual("All different", [1, 2], [3, 4])      // all indices fail
	.groupClose()

	.groupStart("with custom comparer")
		.sequencesAreEqual("Comparer allows close values", [1, 2, 3], [1.001, 2.002, 3.003], (a, b) => Math.abs(a - b) < 0.01)
		.sequencesAreEqual("Failing custom comparer", ["a", "b"], ["A", "B"], (a, b) => a === b) // should fail due to case
	.groupClose()

	.groupStart("lazy iterables")
		.sequencesAreEqual("Matching generators", function* () { yield* [1, 2, 3]; }(), function* () { yield 1; yield 2; yield 3; }())
		.sequencesAreEqual("Different generators", function* () { yield* [1, 2]; }(), function* () { yield 1; yield 2; yield 3; }()) // fail
	.groupClose()

	.groupStart("non-iterables")
		.sequencesAreEqual("Expected not iterable", null, [1, 2])       // fail
		.sequencesAreEqual("Actual not iterable", [1, 2], undefined)    // fail
		.sequencesAreEqual("Both invalid", {}, {})                      // fail
	.groupClose();
