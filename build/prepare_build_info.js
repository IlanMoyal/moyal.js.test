// prepare_build_info.js

import fs from 'fs';
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const build_info =  {
	version: pkg.version
};

const fileContent = `export default ${JSON.stringify(build_info, null, 2)};\n`;

fs.mkdirSync('./build/generated', { recursive: true });
fs.writeFileSync('./build/generated/build_info.js', fileContent);