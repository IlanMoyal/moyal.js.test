/**
 * Version-Current: Tag the current version without bumping.
 *
 * Steps:
 * 1. Run `npm run preversion` logic.
 * 2. Validate Git working directory is clean.
 * 3. Check if the tag already exists.
 * 4. Create local tag if missing.
 * 5. Push the tag to origin.
 * 6. Optionally run postversion (but in this case, we'll directly push the tag only).
 */

import SettingsAccessor from "./include/settings-accessor.js";

import { execSync } from 'child_process';

function run(command, options = {}) {
    console.log(`> ${command}`);
    execSync(command, { stdio: 'inherit', ...options });
}

function gitIsClean() {
    try {
        execSync('git diff-index --quiet HEAD --');
        return true;
    } catch {
        return false;
    }
}

function tagExists(tag) {
    try {
        const output = execSync(`git tag -l "${tag}"`).toString().trim();
        return output.length > 0;
    } catch {
        return false;
    }
}

function main() {
    const version = SettingsAccessor.package.version; 
    const tagName = `v${version}`;

    // Step 1: Simulate preversion manually (run npm run check)
    console.log('🔍 Running preversion checks...');
    run('npm run check');

    // Step 2: Validate Git is clean
    console.log('🔍 Checking Git working tree...');
    if (!gitIsClean()) {
        console.error('❌ Git working directory is not clean. Please commit or stash your changes.');
        process.exit(1);
    }

    // Step 3: Check if tag already exists
    console.log(`🔍 Checking if tag ${tagName} already exists...`);
    if (tagExists(tagName)) {
        console.log(`⚠️ Tag ${tagName} already exists. Skipping creation.`);
    } else {
        // Step 4: Create local tag
        console.log(`🏷️ Creating tag ${tagName} locally...`);
        run(`git tag ${tagName}`);
    }

    // Step 5: Push tag to origin
    console.log(`🚀 Pushing tag ${tagName} to remote...`);
    run(`git push`)
    run(`git push origin ${tagName}`);

    console.log(`✅ Done. Tag ${tagName} is pushed to origin.`);
}

main();
