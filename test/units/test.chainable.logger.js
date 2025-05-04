import { Test, TestGroup } from "../../src/index.js";

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
		.groupEnd()
		.log()
		.log()
		.log("* * * * * LOGGER TEST COMPLETED! * * * * *", "blue")
		.log()
		.log();
		
		return true;
	}
	catch {
		return false;
	}
}

export default new TestGroup("test chainable logger")
	.isTrue("validate that chainable log calls work as expected", testChainableLogger);
