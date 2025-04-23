import fs from 'fs';

const settingsPath = 'project.settings.json';
const data = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
const parts = data.version.split('.').map(Number);

const prev_patch = parts[2];
parts[2]++;
data.version = parts.join('.');

fs.writeFileSync(settingsPath, JSON.stringify(data, null, 2));
console.log(`Version patch bumped from ${prev_patch} to ${parts[2]}.`);
console.log(`The new version is: ${data.version}`);
