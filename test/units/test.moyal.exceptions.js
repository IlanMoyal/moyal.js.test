// test.moyal.exceptions.js
import "../../src/moyal.test.js";
import test_flags from '../test.moyal.flags.js';

const ml = new moyal.test.MultiLevelAutoNumbering();

new moyal.test.TestGroup(ml.next("Exception Testing (Throws / NoThrows)"))

	.groupStart(ml.nest().next("Basic Throws"))
		.throws("Throws basic error", () => { throw new Error("boom"); })
		.throws("Throws specific error object", () => { throw new TypeError("wrong type"); })
		.throws("Throws matches predicate", 
			() => { throw new RangeError("out of range"); }, 
			err => err instanceof RangeError && /range/.test(err.message))
	.groupClose()

	.groupStart(ml.next("Throws fails if no error"))
		.throws("Fails because no error thrown", () => {}) // should fail
	.groupClose()

	.groupStart(ml.next("NoThrows"))
		.noThrows("Safe code does not throw", () => { let a = 2 + 2; })
		.noThrows("Function returns value safely", () => { return "ok"; })
	.groupClose()

	.groupStart(ml.next("NoThrows fails if error thrown"))
		.noThrows("Fails because error thrown", () => { throw "error"; }) // should fail
	.groupClose()

	.groupStart(ml.next("Throws predicate fails"))
		.throws("Fails due to predicate mismatch", 
			() => { throw new Error("bad"); }, 
			err => err.message === "expected") // should fail
	.groupClose()

	.run(test_flags.write_mode);
