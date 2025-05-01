/**
 * file: scripts/version-current.js
 */

import SettingsAccessor from "./include/settings-accessor.js";
import { execSync } from 'child_process';

function main() {
    const version = SettingsAccessor.package.version; 
    console.log(`🏷️ Running npm version --allow-same-version v${version}`);
    execSync(`npm version --allow-same-version ${version}`, { stdio: "inherit" });    
}

main();
