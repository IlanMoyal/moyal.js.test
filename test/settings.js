/* 
 * File: settings.js
 */

export default {
	/* hold the tests to run */
	"test_files": [
		"./units/test.moyal.assertions.js",
		"./units/test.moyal.autoNumbering.js",
		"./units/test.moyal.direct.js",
		"./units/test.moyal.exceptions.js",
		"./units/test.moyal.multiLevelAutoNumbering.js",
		"./units/test.moyal.sequences.js",
		"./units/test.moyal.sequentialText.js",
		"./units/test.moyal.testGroup.js"		
	],

	/* 
	 * false - don't log, 
	 * true - log all, 
	 * null - log failures only 
	 */
	"write_mode": true
};