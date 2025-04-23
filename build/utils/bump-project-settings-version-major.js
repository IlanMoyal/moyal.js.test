import fs from 'fs';

const settingsPath = 'project.settings.json';
const data = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
const parts = data.version.split('.').map(Number);

const prev_major = parts[0];
parts[0]++;
parts[1] = 0;
parts[2] = 0;
data.version = parts.join('.');

fs.writeFileSync(settingsPath, JSON.stringify(data, null, 2));
console.log(`Version major bumped from ${prev_major} to ${parts[0]}.`);
console.log(`The new version is: ${data.version}`);
