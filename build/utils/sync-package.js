/* 
 * build/utils/sync-package.js 
 */
import fs from "fs";
import config from "../project.config.js";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
pkg.name = config.name;
pkg.version = config.version;
pkg.description = config.description;

fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
