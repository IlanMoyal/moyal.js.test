import { MultiLevelAutoNumbering, Test, TestGroup } from "../src/index.js";

/* 
* Example 02 - Enumerating results.
*/

 let test = new TestGroup("Numbered Tests")
 	.areNotEqual("`1 !== 1`?", 1, 1) // should fail
 	.areEqual("`foo === foo`?", "foo", "foo")
	.groupStart("Nested test group")
		.isFalse("`1 !== 1`?", () => 1 === 1)
		.areEqual("`'Hello World!' === 'Hello World!'`? ", "Hello World!", () => "Hello World!")
	.groupClose()
	.areEqual("`false === true`?", false, true)
	.areEqual("123 === 123", () => (41 * 3), () => (99 + 24));

test.run(
	true, 
	new MultiLevelAutoNumbering()
	/* instance of MultiLevelAutoNumbering enables auto numerating test result hirarichaly*/); 
	
/* you can access the logger through the instance of test */
test.logger.log(`Test result == ${test.succeeded}`);