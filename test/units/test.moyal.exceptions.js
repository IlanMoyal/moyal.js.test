/* 
 * File: test.moyal.exceptions.js
 */

import "../../src/moyal.test.js";

export default new moyal.test.TestGroup("Exception Testing (Throws / NoThrows)")
	.groupStart("Basic Throws")
		.throws("Throws basic error", () => { throw new Error("boom"); })
		.throws("Throws specific error object", () => { throw new TypeError("wrong type"); })
		.throws("Throws matches predicate", 
			() => { throw new RangeError("out of range"); }, 
			err => err instanceof RangeError && /range/.test(err.message))
	.groupClose()

	.groupStart("Throws fails if no error")
		.throws("Fails because no error thrown", () => {}) // should fail
	.groupClose()

	.groupStart("NoThrows")
		.noThrows("Safe code does not throw", () => { let unused__a = 2 + 2; })
		.noThrows("Function returns value safely", () => { return "ok"; })
	.groupClose()

	.groupStart("NoThrows fails if error thrown")
		.noThrows("Fails because error thrown", () => { throw "error"; }) // should fail
	.groupClose()

	.groupStart("Throws predicate fails")
		.throws("Fails due to predicate mismatch", 
			() => { throw new Error("bad"); }, 
			err => err.message === "expected") // should fail
	.groupClose();	
