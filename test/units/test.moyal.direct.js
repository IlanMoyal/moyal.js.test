/* 
 * File: test.moyal.direct.js
 */

import { MultiLevelAutoNumbering, Test as tst } from "../../src/index.js";

class DirectTest{
	/**
	 * 
	 * @param {boolean} write 
	 * @param {MultiLevelAutoNumbering} mlAutoNumber 
	 */
	run(write, mlAutoNumber) {
		if(mlAutoNumber == null || !(mlAutoNumber instanceof MultiLevelAutoNumbering))
			mlAutoNumber = new moyal.test.MultiLevelAutoNumbering();

		tst.areEqual(mlAutoNumber.next("direct (static) areEqual - numbers"), 42, 40 + 2, null, write);
		tst.areEqual(mlAutoNumber.next("direct (static) areEqual - strings"), "hello", "he" + "llo", null, write);
		tst.areNotEqual(mlAutoNumber.next("direct (static) areNotEqual - numbers"), 42, 43, null, write);
		tst.areNotEqual(mlAutoNumber.next("direct (static) areNotEqual - different types"), 42, "42", null, write);

		tst.isTrue(mlAutoNumber.next("direct (static) isTrue - boolean true"), true, null, write);
		tst.isTrue(mlAutoNumber.next("direct (static) isTrue - expression"), 1 + 1 === 2, write);
		tst.isFalse(mlAutoNumber.next("direct (static) isFalse - boolean false"), false, write);
		tst.isFalse(mlAutoNumber.next("direct (static) isFalse - expression"), 2 + 2 === 5, write);

		tst.isNull(mlAutoNumber.next("direct (static) isNull - null literal"), null, write);
		tst.isNotNull(mlAutoNumber.next("direct (static) isNotNull - number"), 5, write);
		tst.isNotNull(mlAutoNumber.next("direct (static) isNotNull - object"), {}, write);

		tst.isUndefined(mlAutoNumber.next("direct (static) isUndefined - undefined literal"), undefined, write);
		tst.isDefined(mlAutoNumber.next("direct (static) isDefined - number"), 1, write);
		tst.isDefined(mlAutoNumber.next("direct (static) isDefined - null is defined"), null, write);

		tst.throws(mlAutoNumber.next("direct (static) throws - should throw error"), () => { throw new Error("boom"); }, null, null, write);
		tst.throws(mlAutoNumber.next("direct (static) throws - validate error message"), () => { throw new Error("fail"); }, e => e.message === "fail", null, write);

		tst.noThrows(mlAutoNumber.next("direct (static) noThrows - safe function"), () => { const unused__e = 1 + 1; }, null, write);
	}
}

export default new DirectTest();