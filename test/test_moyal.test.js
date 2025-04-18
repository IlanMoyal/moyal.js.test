import "../src/moyal.test.js";

/* 
 * test the multi level numbering 
*/
let mn = new moyal.test.MultiLevelAutoNumbering();
moyal.test.areEqual("Automatic numbering test", "1. A message", mn.next("A message"));
moyal.test.areEqual("Automatic numbering test", "2. Another message", mn.next("Another message"));
moyal.test.areEqual("Automatic numbering test", "3. ", mn.next());
moyal.test.areEqual("Automatic numbering test", "3.1. ", mn.nest().next());
moyal.test.areEqual("Automatic numbering test", "3.2. ", mn.next());
moyal.test.areEqual("Automatic numbering test", "3.2.4. ", mn.nest(4).next());
moyal.test.areEqual("Automatic numbering test", "3.2.5. ", mn.next());
moyal.test.areEqual("Automatic numbering test", "3.3. ", mn.unnest().next());
moyal.test.areEqual("Automatic numbering test", "3.4. ", mn.next());
moyal.test.areEqual("Automatic numbering test", "4. ", mn.unnest().next());

mn.reset();
moyal.test.areEqual("Automatic numbering test", "1. A message", mn.next("A message"));
moyal.test.areEqual("Automatic numbering test", "2. Another message", mn.next("Another message"));
moyal.test.areEqual("Automatic numbering test", "3. ", mn.next());
moyal.test.areEqual("Automatic numbering test", "3.1. ", mn.nest().next());
moyal.test.areEqual("Automatic numbering test", "3.2. ", mn.next());
moyal.test.areEqual("Automatic numbering test", "3.2.4. ", mn.nest(4).next());
moyal.test.areEqual("Automatic numbering test", "3.2.5. ", mn.next());
moyal.test.areEqual("Automatic numbering test", "3.3. ", mn.unnest().next());
moyal.test.areEqual("Automatic numbering test", "3.4. ", mn.next());
moyal.test.areEqual("Automatic numbering test", "4. ", mn.unnest().next());

/* 
 * test direct test methods.
 */

moyal.test.areEqual(mn.next("test direct areEqual"), moyal.test.areEqual("dummy", 4, 3 + 1), true);
//..
//.. ad more test


new moyal.test.TestGroup(mn.next("Test grouping"))
	.groupStart(mn.nest().next("test areEqual"))
		.areEqual(mn.nest().next("test simple equality"), 4, 3 + 1)
		.areEqual(mn.next("test bizzare equality with comparer"), 5, 3 + 1, (a, b) => b === a + 1)
	.groupClose()
	.groupStart(mn.unnest().next("test isTrue"))
		.isTrue(mn.nest().next("test simple isTru"), 3 === 2 + 1)
		.isTrue(mn.next("test another isTrue"), "hello world" === "hello" + " " + "world")
	.groupClose(mn.unnest())
	.run(true);


		
	

