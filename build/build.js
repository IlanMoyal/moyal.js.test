// File: /build/build.js
import { execSync } from 'child_process';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

// Resolve the root directory
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

function runCommand(cmd, label) {
	try {
		console.log(`\n⏳ ${label}...`);
		execSync(cmd, { cwd: rootDir, stdio: 'inherit' });
		console.log(`✅ ${label} done.`);
	} catch {
		console.error(`❌ Failed: ${label}`);
		process.exit(1);
	}
}

// Ensure package.json exists
if (!existsSync(resolve(rootDir, 'package.json'))) {
	console.error("❌ package.json not found. Are you in the right folder?");
	process.exit(1);
}

// Run steps
runCommand('npm install', 'Installing dependencies');
runCommand('npx rollup -c', 'Building package');
