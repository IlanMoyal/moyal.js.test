/* 
 * File:  test.moyal.sequences.js
 */

import { SequencesAreEqual, TestGroup } from "../../src/index.js";

export default new TestGroup("Sequence Comparison Tests")
	.groupStart("basic equality")
		.sequencesAreEqual("Empty arrays", [], [])
		.sequencesAreEqual("Simple number arrays", [1, 2, 3], [1, 2, 3])
		.sequencesAreEqual("String sequences", ["a", "b"], ["a", "b"])
	.groupClose()

	.groupStart("mismatched lengths")
		.isTrue("Expected shorter", () => { 
			const test = new SequencesAreEqual("", [1, 2], [1, 2, 3]); 
			return test.run(false) === false && test.additionalData["Mismatch at indices"] === "expected.length !== actual.length";
		}) 
		.isTrue("Actual shorter", () => { 
			const test = new SequencesAreEqual("", [1, 2, 3], [1]);
			return test.run(false) === false && test.additionalData["Mismatch at indices"] === "expected.length !== actual.length";
		})
	.groupClose()

	.groupStart("element mismatch")
		.isTrue("One mismatch", () => {
			const test = new SequencesAreEqual("", [1, 2, 3], [1, 9, 3]); // should fail at index 1
			return test.run(false) === false && test.additionalData["Mismatch at indices"] === "Different element indices are: {1}";
		})
		.isTrue("All different", () => {
			const test = new SequencesAreEqual("", [1, 2], [3, 4]);      // all indices fail
			return test.run(false) === false && test.additionalData["Mismatch at indices"] === "Different element indices are: {0, 1}";
		})
	.groupClose()

	.groupStart("with custom comparer")
		.sequencesAreEqual("Comparer allows close values", [1, 2, 3], [1.001, 2.002, 3.003], (a, b) => Math.abs(a - b) < 0.01)
		.isTrue("Failing custom comparer", () => {
			const test = new SequencesAreEqual("", ["a", "b"], ["A", "B"], (a, b) => a === b); // should fail due to case
			return test.run(false) === false && test.additionalData["Mismatch at indices"] === "Different element indices are: {0, 1}";
		})
	.groupClose()

	.groupStart("lazy iterables")
		.sequencesAreEqual("Matching generators", function* () { yield* [1, 2, 3]; }(), function* () { yield 1; yield 2; yield 3; }())
		.isTrue("Different generators", () => {
			const test = new SequencesAreEqual("", function* () { yield* [1, 2]; }(), function* () { yield 1; yield 2; yield 3; }()); // fail
			return test.run(false) === false && test.additionalData["Mismatch at indices"] === "expected.length !== actual.length";
		})
	.groupClose()

	.groupStart("non-iterables")
		.isTrue("Expected not iterable", () => {
			const test = new SequencesAreEqual("", null, [1, 2]);       // fail
			return test.run(false) === false && test.additionalData["expected"] === "ERROR: 'expected' argument is not iterable!";
		})
		.isTrue("Actual not iterable", () => {
			const test = new SequencesAreEqual("", [1, 2], undefined);    // fail
			return test.run(false) === false && test.additionalData["actual"] === "ERROR: 'actual' argument is not iterable!";
		})
		.isTrue("Both invalid", () => {
			const test = new SequencesAreEqual("", {}, {});                      // fail
			return test.run(false) === false 
				&& 
				test.additionalData["expected"] === "ERROR: 'expected' argument is not iterable!" 
				&&
				test.additionalData["actual"] === "ERROR: 'actual' argument is not iterable!";
		})
	.groupClose();
