// test.moyal.direct.js
import "../../src/moyal.test.js";

class DirectTest{
	run(write) {
		const ml = new moyal.test.MultiLevelAutoNumbering();

		moyal.test.areEqual(ml.next("areEqual - numbers"), 42, 40 + 2);
		moyal.test.areEqual(ml.next("areEqual - strings"), "hello", "he" + "llo");
		moyal.test.areNotEqual(ml.next("areNotEqual - numbers"), 42, 43);
		moyal.test.areNotEqual(ml.next("areNotEqual - different types"), 42, "42");

		moyal.test.isTrue(ml.next("isTrue - boolean true"), true);
		moyal.test.isTrue(ml.next("isTrue - expression"), 1 + 1 === 2);
		moyal.test.isFalse(ml.next("isFalse - boolean false"), false);
		moyal.test.isFalse(ml.next("isFalse - expression"), 2 + 2 === 5);

		moyal.test.isNull(ml.next("isNull - null literal"), null);
		moyal.test.isNotNull(ml.next("isNotNull - number"), 5);
		moyal.test.isNotNull(ml.next("isNotNull - object"), {});

		moyal.test.isUndefined(ml.next("isUndefined - undefined literal"), undefined);
		moyal.test.isDefined(ml.next("isDefined - number"), 1);
		moyal.test.isDefined(ml.next("isDefined - null is defined"), null);

		moyal.test.throws(ml.next("throws - should throw error"), () => { throw new Error("boom"); });
		moyal.test.throws(ml.next("throws - validate error message"), () => { throw new Error("fail"); }, e => e.message === "fail");

		moyal.test.noThrows(ml.next("noThrows - safe function"), () => { const x = 1 + 1; });
	}
}

export default new DirectTest();