export default {
	"unitTests" : {
		/*
		 * base path to the unit tests
		 */
		"basePath": "./units",
		"list": [ /* list of the unit tests, excluding the base path */
			"test.moyal.assertions.js",
			"test.moyal.autoNumbering.js",
			"test.moyal.direct.js",
			"test.moyal.exceptions.js",
			"test.moyal.multiLevelAutoNumbering.js",
			"test.moyal.sequences.js",
			"test.moyal.sequentialText.js",
			"test.moyal.testGroup.js"		
		]
	},	
	/*
	 * true - write all 
	 * false - write none
	 * null | undefined - write errors only
	 */
	"writeMode": null
};