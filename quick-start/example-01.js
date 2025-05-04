import { Test, TestGroup } from "../src/index.js";

/* 
* Example 01 - The most common use example 
*/

 let testResult = new TestGroup("Numbered Tests")
 	.areNotEqual("`1 !== 1`?", 1, 1) // should fail
 	.areEqual("`foo === foo`?", "foo", "foo")
	.groupStart("Nested test group")
		.isFalse("`1 !== 1`?", () => 1 === 1)
		.areEqual("`'Hello World!' === 'Hello World!'`? ", "Hello World!", () => "Hello World!")
	.groupClose()
	.areEqual("`false === true`?", false, true)
	.areEqual("123 === 123", () => (41 * 3), () => (99 + 24))
 	.run(true 
		/* true - prints all tests results
		* false - prints none of the test results.
		* null or undefined will print errors only */
	); 
	
Test.logger.log(`Test result == ${testResult}`);