/* 
 * File: test.moyal.sequentialText.js
 */


import { SequentialText, TestGroup } from "../../src/moyal.test.js";

export default new TestGroup("SequentialText Tests")
	.groupStart("Basic sequence")
		.isTrue("First call is 'A1'", () => {
			const st = new SequentialText("A{0}", 1);
			return st.next() === "A1";
		})
		.isTrue("Next call is 'A2'", () => {
			const st = new SequentialText("A{0}", 1);
			st.next(); return st.next() === "A2";
		})
	.groupClose()

	.groupStart("Reset behavior")
		.isTrue("After reset, sequence restarts from 1", () => {
			const st = new SequentialText("Item {0}", 1);
			st.next(); st.next(); st.reset();
			return st.next() === "Item 1";
		})
	.groupClose()

	.groupStart("Custom startValue")
		.areEqual("Starts from 5", "X5", new SequentialText("X{0}", 5).next())
	.groupClose()

	.groupStart("For-of iteration")
		.isTrue("Yields sequential values", () => {
			const st = new SequentialText("B{0}", 3);
			let iter = st[Symbol.iterator]();
			return iter.next().value === "B3" && iter.next().value === "B4";
		})
	.groupClose()

	.throws("startValue < 1 should throw", () => new SequentialText("bad", 0));	
