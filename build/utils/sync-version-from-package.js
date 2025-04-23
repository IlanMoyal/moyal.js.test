import fs from "fs";
import path from "path";

// Paths
const projectRoot = path.resolve(new URL("../../..", import.meta.url).pathname);
const packageJsonPath = path.join(projectRoot, "package.json");
const settingsJsonPath = path.join(projectRoot, "project.settings.json");

try {
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  const settings = JSON.parse(fs.readFileSync(settingsJsonPath, "utf-8"));

  if (!pkg.version) throw new Error("No version in package.json");

  if (settings.version !== pkg.version) {
    settings.version = pkg.version;
    fs.writeFileSync(settingsJsonPath, JSON.stringify(settings, null, 2));
    console.log(`Synced project.settings.json to version ${pkg.version}`);
  } else {
    console.log(`Version already in sync: ${pkg.version}`);
  }

} catch (err) {
  console.error("Failed to sync version:", err.message);
  process.exit(1);
}
