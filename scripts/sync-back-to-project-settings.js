/*!
 * file: scripts/sync-back-to-project-settings.js
 *
 * Synchronizes project.settings.jsonc from package.json.
 */

import settingsAccessor from "./include/settings-accessor.js";
import jsonc from "comment-json";

const fieldsToSync = ["version", "devDependencies", "dependencies"];

function syncProjectSettings() {
	settingsAccessor.validateAllFilesExistOrThrow()
	
	const packageJsonObj = settingsAccessor.package;
	const projectSettingsObj = settingsAccessor.projectSettings;

	/* Conditionally copy fields */
	let changed = false;
	fieldsToSync.forEach(field => {
		if (field in packageJsonObj) {
			const current = JSON.stringify(projectSettingsObj[field]);
			const incoming = JSON.stringify(packageJsonObj[field]);
			if (current !== incoming) {
				projectSettingsObj[field] = packageJsonObj[field];
				console.log(`✔ Updated '${field}'`);
				changed = true;
			}
		} else if (field in projectSettingsObj) {
			delete projectSettingsObj[field];
			console.log(`✘ Removed '${field}' (not in ${settingsAccessor.packageFilename})`);
			changed = true;
		}
	});

	/* Stringify and write back as JSONC */
	if (changed) {
		// const jsoncString = jsonc.stringify(projectSettingsObj, null, 2);
		// settingsAccessor.projectSettingsJson = jsoncString;
		//const jsoncString = jsonc.stringify(projectSettingsObj, null, 2);
		settingsAccessor.projectSettings = projectSettingsObj;
		console.log(`🔁 Synced ${settingsAccessor.projectSettingsFilename} from ${settingsAccessor.packageFilename}`);
	} else {
		console.log(`✅ ${settingsAccessor.projectSettingsFilename} is already up to date`);
	}
}

syncProjectSettings();