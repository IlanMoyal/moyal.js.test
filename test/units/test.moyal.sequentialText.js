/* 
 * File: test.moyal.sequentialText.js
 */

import "../../src/moyal.test.js";

const ml = new moyal.test.MultiLevelAutoNumbering();

export default new moyal.test.TestGroup(ml.next("SequentialText Tests"))
	.groupStart(ml.nest().next("Basic sequence"))
		.isTrue("First call is 'A1'", () => {
			const st = new moyal.test.SequentialText("A{0}", 1);
			return st.next() === "A1";
		})
		.isTrue("Next call is 'A2'", () => {
			const st = new moyal.test.SequentialText("A{0}", 1);
			st.next(); return st.next() === "A2";
		})
	.groupClose()

	.groupStart(ml.next("Reset behavior"))
		.isTrue("After reset, sequence restarts from 1", () => {
			const st = new moyal.test.SequentialText("Item {0}", 1);
			st.next(); st.next(); st.reset();
			return st.next() === "Item 1";
		})
	.groupClose()

	.groupStart(ml.next("Custom startValue"))
		.areEqual("Starts from 5", "X5", new moyal.test.SequentialText("X{0}", 5).next())
	.groupClose()

	.groupStart(ml.next("For-of iteration"))
		.isTrue("Yields sequential values", () => {
			const st = new moyal.test.SequentialText("B{0}", 3);
			let iter = st[Symbol.iterator]();
			return iter.next().value === "B3" && iter.next().value === "B4";
		})
	.groupClose()

	.throws("startValue < 1 should throw", () => new moyal.test.SequentialText("bad", 0));	
