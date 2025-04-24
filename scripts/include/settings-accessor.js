/*!
 * scripts/include/settings-accessor.js
 *
 * Synchronizes package.json from build/package.template.jsonc and project.settings.jsonc
 */

import fs from "fs";
import path from "path";
import utils from "./utils.js";
import jsonc from "comment-json";

//TODO: On completion of workflow development - change to init_entries
import { init_entries as __init_entries} from "./init-entries.js";

const __root = utils.getRootDirectory();

export default class SettingsAccessor {
	static #_packageTemplateFilename = __init_entries.packageTemplateFilename;
	static get packageTemplateFilename() { return this.#_packageTemplateFilename; }
	
	static #_projectSettingsFilename = __init_entries.projectSettingsFilename;
	static get projectSettingsFilename() { return this.#_projectSettingsFilename; }

	// TODO: when development complete, change to "package.json"
	static #_packageFilename = __init_entries.packageFilename;
	static get packageFilename() { return this.#_packageFilename; }

	static #_packageTemplatePath;
	static get packageTemplatePath(){return this.#_packageTemplatePath;}

	static #_projectSettingsPath;
	static get projectSettingsPath(){return this.#_projectSettingsPath;}

	static #_packagePath;
	static get packagePath(){return this.#_packagePath;}

	static
	{
		this.#_packageTemplatePath = path.join(__root, this.#_packageTemplateFilename);
		this.#_projectSettingsPath = path.join(__root, this.#_projectSettingsFilename);
		this.#_packagePath = path.join(__root, this.#_packageFilename);
	}
	
	static get packageTemplateJson() {return fs.readFileSync(this.#_packageTemplatePath, "utf-8");}
	static set packageTemplateJson(pkg) {utils.writeJsonWithCommentsString(this.#_packageTemplatePath, pkg);}
	static get packageTemplate() {return jsonc.parse(this.packageTemplateJson);}
	static set packageTemplate(pkg) { utils.writeJsonWithComments(this.#_packageTemplatePath, pkg); }

	static get projectSettingsJson() {return fs.readFileSync(this.#_projectSettingsPath, "utf-8");}
	static set projectSettingsJson(settings) { utils.writeJsonWithCommentsString(this.#_projectSettingsPath, settings);}
	static get projectSettings() {return jsonc.parse(this.projectSettingsJson);}
	static set projectSettings(settings) { utils.writeJsonWithComments(this.#_projectSettingsPath, settings); }

	static get packageJson() {return fs.readFileSync(this.#_packagePath, "utf-8");}
	static set packageJson(pkg) {utils.writeJsonString(this.#_packagePath, pkg);}
	static get package() {return JSON.parse(this.packageJson);}
	static set package(pkg) { utils.writeJson(this.#_packagePath, pkg);}

	static validateAllFilesExistOrThrow() {
		if (!fs.existsSync(this.#_packageTemplatePath)) throw new Error("Missing package template.");
		if (!fs.existsSync(this.#_projectSettingsPath)) throw new Error("Missing project settings.");
		console.info(this.#_packagePath);
		if (!fs.existsSync(this.#_packagePath)) throw new Error("Missing package.json.");
	}

	static allFilesExist() {
		return fs.existsSync(this.#_packageTemplatePath)
			&& fs.existsSync(this.#_projectSettingsPath)
			&& fs.existsSync(this.#_packagePath);
	}

	static createEmptyPackageIfNotExists(){
		utils.createFileIfNotExists(this.#_packagePath, "{}");
	}

	static toObject() {
		return {
			template: this.packageTemplate,
			settings: this.projectSettings,
			pkg: this.package
		};
	}
};