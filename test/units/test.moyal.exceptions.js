/* 
 * File: test.moyal.exceptions.js
 */

import { NoThrows, TestGroup, Throws } from "../../src/index.js";

export default new TestGroup("Exception Testing (Throws / NoThrows)")
	.groupStart("Basic Throws")
		.throws("Throws basic error", () => { throw new Error("boom"); })
		.throws("Throws specific error object", () => { throw new TypeError("wrong type"); })
		.throws("Throws matches predicate", 
			() => { throw new RangeError("out of range"); }, 
			err => err instanceof RangeError && /range/.test(err.message))
	.groupClose()

	.groupStart("Throws fails if no error")
		.isFalse("Fails because no error thrown", new Throws("", () => {}).run(false))
	.groupClose()

	.groupStart("NoThrows")
		.noThrows("Safe code does not throw", () => { let unused__a = 2 + 2; })
		.noThrows("Function returns value safely", () => { return "ok"; })
	.groupClose()

	.groupStart("NoThrows fails if error thrown")
		.isFalse("Fails because error thrown", new NoThrows("", () => { throw "error"; }).run(false))
	.groupClose()

	.groupStart("Throws predicate fails")
		.isFalse("Fails due to predicate mismatch", new Throws("", () => { throw new Error("bad"); }, err => err.message === "expected").run(false))
	.groupClose();	
