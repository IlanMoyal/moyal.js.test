import fs from 'fs';

const settingsPath = 'project.settings.json';
const data = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
const parts = data.version.split('.').map(Number);

const prev_minor = parts[1];
parts[1]++;
parts[2] = 0;
data.version = parts.join('.');

fs.writeFileSync(settingsPath, JSON.stringify(data, null, 2));
console.log(`Version minor bumped from ${prev_minor} to ${parts[1]}.`);
console.log(`The new version is: ${data.version}`);
