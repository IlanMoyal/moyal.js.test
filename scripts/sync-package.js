/*!
 * file: scripts/sync-package.js
 *
 * Synchronizes package.json from build/package.template.jsonc and project.settings.jsonc
 */

import SettingsAccessor from "./include/settings-accessor.js";
import jsonc from "comment-json";

function applyTemplate(template, values) {
    template = JSON.stringify(jsonc.parse(template)); /* remove all comments */

    // Perform interpolation
    let publishInterpolated = "";
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
       let temp = JSON.parse(interpolated);
       interpolated = JSON.stringify(temp, null, 2);
       
       /* no scripts in publish version */
       delete temp.scripts;
       delete temp.devDependencies;
       delete temp["x-moyal-auto-generated-comment"];
       publishInterpolated = JSON.stringify(temp, null, 2);

    } catch (err) {
        throw new Error(`Interpolated package.json is invalid: ${err.message}`);
    }

    return [interpolated, publishInterpolated];
}

function syncPackageJson() {
    SettingsAccessor.validateAllFilesExistOrThrow();
    const json = applyTemplate(SettingsAccessor.packageTemplateJson, SettingsAccessor.projectSettings); 
    SettingsAccessor.packageJson = json[0];
    SettingsAccessor.publishPackageJson = json[1];
    console.log(`Synced ${SettingsAccessor.packageFilename} from ${SettingsAccessor.projectSettingsFilename} and ${SettingsAccessor.packageTemplateFilename}`);
}

syncPackageJson();

