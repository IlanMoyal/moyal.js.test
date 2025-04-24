/* 
 * File: test.moyal.direct.js
 */

import "../../src/moyal.test.js";

class DirectTest{
	/**
	 * 
	 * @param {boolean} write 
	 * @param {moyal.test.MultiLevelAutoNumbering} mlAutoNumber 
	 */
	run(write, mlAutoNumber) {
		if(mlAutoNumber == null || !(mlAutoNumber instanceof moyal.test.MultiLevelAutoNumbering))
			mlAutoNumber = new moyal.test.MultiLevelAutoNumbering();

		// moyal.test.logger.group(mlAutoNumber.next("test direct (static) test funstions:"));
		// mlAutoNumber.nest();

		moyal.test.areEqual(mlAutoNumber.next("direct (static) areEqual - numbers"), 42, 40 + 2, null, write);
		moyal.test.areEqual(mlAutoNumber.next("direct (static) areEqual - strings"), "hello", "he" + "llo", null, write);
		moyal.test.areNotEqual(mlAutoNumber.next("direct (static) areNotEqual - numbers"), 42, 43, null, write);
		moyal.test.areNotEqual(mlAutoNumber.next("direct (static) areNotEqual - different types"), 42, "42", null, write);

		moyal.test.isTrue(mlAutoNumber.next("direct (static) isTrue - boolean true"), true, null, write);
		moyal.test.isTrue(mlAutoNumber.next("direct (static) isTrue - expression"), 1 + 1 === 2, write);
		moyal.test.isFalse(mlAutoNumber.next("direct (static) isFalse - boolean false"), false, write);
		moyal.test.isFalse(mlAutoNumber.next("direct (static) isFalse - expression"), 2 + 2 === 5, write);

		moyal.test.isNull(mlAutoNumber.next("direct (static) isNull - null literal"), null, write);
		moyal.test.isNotNull(mlAutoNumber.next("direct (static) isNotNull - number"), 5, write);
		moyal.test.isNotNull(mlAutoNumber.next("direct (static) isNotNull - object"), {}, write);

		moyal.test.isUndefined(mlAutoNumber.next("direct (static) isUndefined - undefined literal"), undefined, write);
		moyal.test.isDefined(mlAutoNumber.next("direct (static) isDefined - number"), 1, write);
		moyal.test.isDefined(mlAutoNumber.next("direct (static) isDefined - null is defined"), null, write);

		moyal.test.throws(mlAutoNumber.next("direct (static) throws - should throw error"), () => { throw new Error("boom"); }, null, null, write);
		moyal.test.throws(mlAutoNumber.next("direct (static) throws - validate error message"), () => { throw new Error("fail"); }, e => e.message === "fail", null, write);

		moyal.test.noThrows(mlAutoNumber.next("direct (static) noThrows - safe function"), () => { const unused__e = 1 + 1; }, null, write);

		// moyal.test.logger.groupEnd(mlAutoNumber.unnest());
	}
}

export default new DirectTest();