/* 
 * File: test.moyal.assertions.js
 */
import "../../src/moyal.test.js";

export default new moyal.test.TestGroup("Basic Assertion Tests")

	.groupStart("areEqual")
		.areEqual("Direct equality", 2 + 2, 4)
		.areEqual("Deferred equality", () => 5 * 2, () => 10)
		.areEqual("Custom comparer", "abc", "ABC", (a, b) => a.toLowerCase() === b.toLowerCase())
		.areNotEqual("Mismatch should fail", 1, 2)
	.groupClose()

	.groupStart("areNotEqual")
		.areNotEqual("Different strings", "foo", "bar")
		.areNotEqual("Different types", 1, "1")
		.areNotEqual("Custom comparer false", 5, 10, (a, b) => a === b)
		.areEqual("Same values should fail", 3, 3)
	.groupClose()

	.groupStart("isTrue")
		.isTrue("True literal", true)
		.isTrue("Expression is true", 10 > 1)
		.isFalse("False literal", false)
		.isFalse("Falsy value", 0)
	.groupClose()

	.groupStart("isFalse")
		.isFalse("False literal", false)
		.isFalse("Expression is false", 5 < 3)
		.isTrue("True literal", true)
		.isTrue("Truthy value", 42)
	.groupClose()

	.groupStart("isNull and isNotNull")
		.isNull("null is null", null)
		.isNotNull("empty object is not null", {})
		.isNotNull("zero is not null", 0)
		.isNull("undefined is not null", undefined)
	.groupClose()

	.groupStart("isDefined and isUndefined")
		.isDefined("zero is defined", 0)
		.isDefined("false is defined", false)
		.isUndefined("undefined is undefined", undefined)
		.isDefined("null is defined", null) // note: null is defined!
	.groupClose();