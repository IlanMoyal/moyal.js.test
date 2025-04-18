import "../../src/moyal.test.js";
import test_flags from '../test.moyal.flags.js';

// test.moyal.multiLevelAutoNumbering.js
import "../../src/moyal.test.js";

const ml = new moyal.test.MultiLevelAutoNumbering();
const grp = new moyal.test.TestGroup(ml.next("MultiLevelAutoNumbering Tests"));

let mn = new moyal.test.MultiLevelAutoNumbering();

grp.groupStart(ml.nest().next("First sequence"))
	.areEqual("1. A message", "1. A message", mn.next("A message"))
	.areEqual("2. Another message", "2. Another message", mn.next("Another message"))
	.areEqual("3. ", "3. ", mn.next())
	.areEqual("3.1. ", "3.1. ", mn.nest().next())
	.areEqual("3.2. ", "3.2. ", mn.next())
	.areEqual("3.2.4. ", "3.2.4. ", mn.nest(4).next())
	.areEqual("3.2.5. ", "3.2.5. ", mn.next())
	.areEqual("3.3. ", "3.3. ", mn.unnest().next())
	.areEqual("3.4. ", "3.4. ", mn.next())
	.areEqual("4. ", "4. ", mn.unnest().next())
.groupClose();

mn.reset();

grp.groupStart(ml.next("After reset"))
	.areEqual("1. A message", "1. A message", mn.next("A message"))
	.areEqual("2. Another message", "2. Another message", mn.next("Another message"))
	.areEqual("3. ", "3. ", mn.next())
	.areEqual("3.1. ", "3.1. ", mn.nest().next())
	.areEqual("3.2. ", "3.2. ", mn.next())
	.areEqual("3.2.4. ", "3.2.4. ", mn.nest(4).next())
	.areEqual("3.2.5. ", "3.2.5. ", mn.next())
	.areEqual("3.3. ", "3.3. ", mn.unnest().next())
	.areEqual("3.4. ", "3.4. ", mn.next())
	.areEqual("4. ", "4. ", mn.unnest().next())
.groupClose();

grp.run(test_flags.write_mode);
