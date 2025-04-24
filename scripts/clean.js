/* 
* File: scripts/clean.js 
*/

import fs from "fs";
import path from "path";
import utils from "./include/utils.js";
import settingsAccessor from "./include/settings-accessor.js";

const distFolderName = settingsAccessor.projectSettings.outputFolder ?? "dist";
const dist = path.join(utils.getRootDirectory(), distFolderName);

try {
	if (fs.existsSync(dist)) {
		fs.rmSync(dist, { recursive: true, force: true });
		console.log(`✅ Cleaned folder: ${dist}`);
	} else {
		console.log("ℹ️ Output folder not found:", dist);
	}
} catch (err) {
	console.error(`❌ Failed to clean folder ${dist}:`, err.message);
	process.exit(1);
}