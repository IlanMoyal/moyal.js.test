// test.moyal.types.js
import "../../src/moyal.test.js";

const ml = new moyal.test.MultiLevelAutoNumbering();

export default new moyal.test.TestGroup(ml.next("Type Checks: moyal.test static methods"))
	.groupStart(ml.nest().next("isString"))
		.isTrue("String literal", moyal.test.isString("hello"))
		.isTrue("String object", moyal.test.isString(new String("hi")))
		.isFalse("Number is not string", moyal.test.isString(42))
		.isFalse("Null is not string", moyal.test.isString(null))
		.isFalse("Undefined is not string", moyal.test.isString(undefined))
		.isFalse("Object is not string", moyal.test.isString({}))
	.groupClose()

	.groupStart(ml.next("isFunction"))
		.isTrue("Arrow function", moyal.test.isFunction(() => {}))
		.isTrue("Named function", moyal.test.isFunction(function foo() {}))
		.isFalse("Generator function", moyal.test.isFunction(function* gen() {})) // only true for Function, not GeneratorFunction
		.isFalse("Object is not function", moyal.test.isFunction({}))
		.isFalse("String is not function", moyal.test.isFunction("fn"))
	.groupClose()

	.groupStart(ml.next("isFunctionOrGeneratorFunction"))
		.isTrue("Arrow function", moyal.test.isFunctionOrGeneratorFunction(() => {}))
		.isTrue("Named function", moyal.test.isFunctionOrGeneratorFunction(function foo() {}))
		.isTrue("Generator function", moyal.test.isFunctionOrGeneratorFunction(function* gen() {}))
		.isFalse("Object is not function", moyal.test.isFunctionOrGeneratorFunction({}))
		.isFalse("String is not function", moyal.test.isFunctionOrGeneratorFunction("fn"))
	.groupClose()

	.groupStart(ml.next("isIterable"))
		.isTrue("Array is iterable", moyal.test.isIterable([1, 2, 3]))
		.isTrue("String is iterable", moyal.test.isIterable("abc"))
		.isTrue("Map is iterable", moyal.test.isIterable(new Map()))
		.isTrue("Set is iterable", moyal.test.isIterable(new Set()))
		.isFalse("Plain object is not iterable", moyal.test.isIterable({ a: 1 }))
		.isFalse("null is not iterable", moyal.test.isIterable(null))
		.isFalse("undefined is not iterable", moyal.test.isIterable(undefined))
	.groupClose();
