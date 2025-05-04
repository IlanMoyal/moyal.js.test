/*
 * Example 04 - Simple and cumbersome tests.
 */

import { AreEqual, AreNotEqual, IsDefined, IsFalse, IsNotNull, IsTrue, IsUndefined, NoThrows, SequencesAreEqual, TestGroup, Throws } from "../src/index.js";

new AreEqual("Are equal!", 10, 10).run(true);
new AreEqual("Are equal? mmm", 10, 11).run(true); // should fail
new AreNotEqual("Are not equal!", 1, 10).run(true);
new AreNotEqual("Are not equal? mmm", 1, () => 1).run(true); // should fail
new IsTrue("`(1 === 1) === true`?", () => 1 === 1).run(true);

///
/// etc.
///