import { Test, TestGroup } from "../../src/moyal.test.js";

function testChainableLogger(){
	try{
		Test.logger.group("open a group with gray title", "gray")
			.log("log a green mesage", "green")
			.info("with some blue info", "blue")
			.error("and meybe red error", "red")
			.warn("some time a yellow warning is all what we need", "yellow")
		.groupEnd()
		.groupCollapsed("chained grayed collapsed group", "gray")
			.log("log a green mesage", "green")
			.info("with some blue info", "blue")
			.error("and meybe red error", "red")
			.warn("some time a yellow warning is all what we need", "yellow")
			.group("open an inner group with gray title", "gray")
				.log("log a green mesage", "green")
				.info("with some blue info", "blue")
				.error("and meybe red error", "red")
				.warn("some time a yellow warning is all what we need", "yellow")
			.groupEnd()
		.groupEnd();
		
		return true;
	}
	catch {
		return false;
	}
}

export default new TestGroup("test chanable logger")
	.isTrue("validate that chainable log calls work as expected", testChainableLogger);
