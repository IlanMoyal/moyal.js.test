import { Test } from "../src/index.js";

/*
 * Example 03 - Without grouping (chaining) you can execute static tests through Test class.
 */

//
// By default only errors logged.
//
Test.areNotEqual("`1 !== 1`?", 1, 1); // should fail - will be logged
Test.areEqual("`foo === foo`?", "foo", "foo"); // doesn't log result
Test.isFalse("`1 !== 1`?", () => 1 === 1, true);  // last parameter `true` force logging for successful tests.
Test.areEqual("`'Hello World!' === 'Hello World!'`? ", "Hello World!", () => "Hello World!");
Test.areEqual("`false === true`?", false, true);
Test.isNotNull("`null === undefined`?", undefined, false); // last `false` argument force no logging, even for failures.
Test.areEqual("123 === 123", () => (41 * 3), () => (99 + 24));
//
// etc...
//