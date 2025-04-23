import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname in ES Module context
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROOT = path.resolve(__dirname, "../../");
const settingsPath = path.join(ROOT, "project.settings.json");
const templatePath = path.join(ROOT, "build/package.template.js");
const outputPath = path.join(ROOT, "package.json");

// Simple template replacement using {{key}}
function applyTemplate(template, values) {
    const jsonString = JSON.stringify(template);
    const interpolated = jsonString.replace(/{{(\w+)}}/g, (_, key) => {
        return values[key] ?? `{{${key}}}`;
    });
    return JSON.parse(interpolated);
}

function syncPackageJson() {
    const settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
    const template = JSON.parse(fs.readFileSync(templatePath, "utf-8"));
    const result = applyTemplate(template, settings);
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
    console.log("Synced package.json from project.settings.json");
}

syncPackageJson();
