/* 
 * File: test.moyal.autoNumbering.js
 */

import { AutoNumbering, TestGroup } from "../../src/moyal.test.js";

export default new TestGroup("AutoNumbering Tests")
	.groupStart("Simple numbered output")
		.areEqual("First", "1. Step A", new AutoNumbering().next("Step A"))
		.areEqual("Second", "2. Step B", (() => {
			const an = new AutoNumbering();
			an.next(); return an.next("Step B");
		})())
	.groupClose()

	.groupStart("Reset and restart")
		.areEqual("After reset starts from 1", "1. Hi", (() => {
			const an = new AutoNumbering();
			an.next("One"); an.reset();
			return an.next("Hi");
		})())
	.groupClose()

	.groupStart("Custom format and number")
		.areEqual("Custom prefix format", "001 - Hello", new AutoNumbering(1, "00{0} - ").next("Hello"))
	.groupClose()

	.throws("Format without {0} should throw", () => new AutoNumbering(1, "--"));	