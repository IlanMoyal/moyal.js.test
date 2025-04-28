/* 
 * File: test.moyal.testGroup.js
 */

import { TestGroup } from "../../src/moyal.test.js";

export default new TestGroup("TestGroup API and Behavior")

	.groupStart("basic grouping")
		.areEqual("1 + 1 = 2", 2, 1 + 1)
		.areNotEqual("2 != 3", 2, 3)
		.isTrue("true === true", true)
		.isFalse("false === false", false)
	.groupClose()

	.groupStart("nested groups with inheritance")
		.groupStart("subgroup A")
			.isNotNull("valid value", 123)
			.isNull("null value", null)
		.groupClose()
		.groupStart("subgroup B")
			.isDefined("defined var", "defined")
			.isUndefined("undefined var", undefined)
		.groupClose()
	.groupClose()

	.groupStart("fluent chaining behavior")
		.isTrue("true test", () => true)
		.areEqual("lazy equality", () => 4 * 2, () => 8)
		.isFalse("false test", () => false)
	.groupClose()

	.groupStart("direct failures in group")
		.isTrue("intentional fail", () => false) // will fail
		.areEqual("fail again", 1, 999)           // will fail
	.groupClose()

	.groupStart("group summary and stats")
		.groupStart("child group")
			.areEqual("Match test", "a", "a")
			.isNotNull("Still valid", "non-null")
		.groupClose()
		.groupStart("failing child group")
			.isFalse("Intended failure", true)   // will fail
			.throws("Expect error", () => { throw new Error("intentional") })
		.groupClose()
	.groupClose();
