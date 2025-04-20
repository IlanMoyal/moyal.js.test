/* 
 * File: test.moyal.testGroup.js
 */

import "../../src/moyal.test.js";

const ml = new moyal.test.MultiLevelAutoNumbering();

export default new moyal.test.TestGroup(ml.next("TestGroup API and Behavior"))

	.groupStart(ml.nest().next("basic grouping"))
		.areEqual("1 + 1 = 2", 2, 1 + 1)
		.areNotEqual("2 != 3", 2, 3)
		.isTrue("true === true", true)
		.isFalse("false === false", false)
	.groupClose()

	.groupStart(ml.next("nested groups with inheritance"))
		.groupStart(ml.nest().next("subgroup A"))
			.isNotNull("valid value", 123)
			.isNull("null value", null)
		.groupClose()
		.groupStart(ml.unnest().next("subgroup B"))
			.isDefined("defined var", "defined")
			.isUndefined("undefined var", undefined)
		.groupClose()
	.groupClose()

	.groupStart(ml.next("fluent chaining behavior"))
		.isTrue("true test", () => true)
		.areEqual("lazy equality", () => 4 * 2, () => 8)
		.isFalse("false test", () => false)
	.groupClose()

	.groupStart(ml.next("direct failures in group"))
		.isTrue("intentional fail", () => false) // will fail
		.areEqual("fail again", 1, 999)           // will fail
	.groupClose()

	.groupStart(ml.next("group summary and stats"))
		.groupStart(ml.nest().next("child group"))
			.areEqual("Match test", "a", "a")
			.isNotNull("Still valid", "non-null")
		.groupClose()
		.groupStart(ml.next("failing child group"))
			.isFalse("Intended failure", true)   // will fail
			.throws("Expect error", () => { throw new Error("intentional") })
		.groupClose()
	.groupClose();
