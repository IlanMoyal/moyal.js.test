/*!
 * file: scripts/sync-package.js
 *
 * Synchronizes package.json from build/package.template.jsonc and project.settings.jsonc
 */

import settingsAccessor from "./include/settings-accessor.js";
import jsonc from "comment-json";

function applyTemplate(template, values) {
    template = JSON.stringify(jsonc.parse(template)); /* remove all comments */

    // Perform interpolation
    let interpolated = template.replace(/{{(\w+)}}/g, (_, key) => {
        return values[key] ?? `{{${key}}}`;
    });

    // === Replace "key": "::placeholder::" with full object ===
    interpolated = interpolated.replace(
        /"(\w+)":\s*"::placeholder::"/g,
        (_, key) => {
            if (!(key in values)) {
                throw new Error(`Missing value for placeholder key: ${key}`);
            }
            const json = JSON.stringify(values[key], null, 2); // Pretty-printed JSON
            return `"${key}": ${json}`;
        }
    );

    try {
        /* 
        * JSON.parse(interpolated) - Validate the output is still valid JSON 
        * JSON.stringify(...) - beautify the result
        */
        interpolated = JSON.stringify(JSON.parse(interpolated), null, 2);
    } catch (err) {
        throw new Error(`Interpolated package.json is invalid: ${err.message}`);
    }

    return interpolated;
}

function syncPackageJson() {
    settingsAccessor.validateAllFilesExistOrThrow();
    settingsAccessor.packageJson = applyTemplate(settingsAccessor.packageTemplateJson, settingsAccessor.projectSettings);
    console.log(`Synced ${settingsAccessor.packageFilename} from ${settingsAccessor.projectSettingsFilename} and ${settingsAccessor.packageTemplateFilename}`);
}

syncPackageJson();

