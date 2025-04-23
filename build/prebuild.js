/* 
 * File: prebuild.js 
 */

import fs from 'fs';
const pkg = JSON.parse(fs.readFileSync('./project.settings.json', 'utf-8'));

// Resolve the root directory
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

const build_info =  {
	version: pkg.version
};

const fileContent = `export default ${JSON.stringify(build_info, null, 2)};\n`;

fs.mkdirSync('./build/generated', { recursive: true });
fs.writeFileSync('./build/generated/build-info.js', fileContent);