/* 
 * File: runner.js
 */

import './setup-globalThis-polyfill.js';
import test_utils from "./utils.js";
import test_settings from "./settings.js"; 

/* Loads the test and run each of them, one by one */
Promise.all(test_settings.test_files.map(path => import(path)))
    .then(modules => {
        let hasFailure = false;

        for (const mod of modules) {
            const test = mod.default;

            try {
                const result = test.run(test_settings.write_mode);
                // If test.run returns a boolean or result object
                if (result === false) 
                    hasFailure = true;
            } catch (err) {
                console.error(`Error while running test: ${err}`);
                hasFailure = true;
            }
			if(hasFailure)
				break;
        }
        test_utils.exit(hasFailure ? 1 : 0);
    })
    .catch(err => {
        console.error("Failed to load tests:", err);
        test_utils.exit(1);
    });