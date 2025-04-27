import "./portability.js";
import url from 'url';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import jsonc from "comment-json";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let __root = path.resolve(__dirname, '../..');
if(!fs.existsSync(path.join(__root, "project.settings.jsonc")))
	__root = null;

export default class utils {
	static getRootDirectory() {
		if(__root == null)
			throw new Error("utils.js must resides two levels under project root directory, usually ./scripts/include/utils.js");
		return __root;
	}

	static runCommand(cmd, wd, label) {
		try {
			console.log(`\n⏳ ${label}...`);
			execSync(cmd, { cwd: wd, stdio: 'inherit' });
			console.log(`✅ ${label} done.`);
		} catch {
			console.error(`❌ Failed: ${label}`);
			process.exit(1);
		}
	}

	/**
	 * Gets the directory of the calling file (not utils.js)
	 * @returns {string} Directory of the caller
	 */
	static getCallerDirname() {
		const origPrepareStackTrace = Error.prepareStackTrace;

		try {
			const err = new Error();
			Error.prepareStackTrace = (_, stack) => stack;
			const stack = err.stack;

			// stack[0] = this function (getCallerDirname)
			// stack[1] = who called this function (that's what we want!)
			const caller = stack[1]; 

			const callerFileUrl = caller.getFileName(); // full file path (with file:// if ESM)
			const filePath = callerFileUrl.startsWith('file://')
				? url.fileURLToPath(callerFileUrl)
				: callerFileUrl;

			return path.dirname(filePath);
		} finally {
			Error.prepareStackTrace = origPrepareStackTrace;
		}
	}

	static writeJsonString(target, jsonStr) {
		fs.writeFileSync(target, jsonStr.trim() + "\n");
	}

	static writeJson(target, obj) {
		this.writeJsonString(target, JSON.stringify(obj, null, 4));
	}

	static writeJsonWithCommentsString(target, jsoncStr) {
		fs.writeFileSync(target, jsoncStr.trim() + "\n");
	}

	static writeJsonWithComments(target, obj) {
		this.writeJsonWithCommentsString(target, jsonc.stringify(obj, null, 4));
	}

	/**
	* Creates a file with optional content if it does not already exist.
	* 
	* @param {string} filePath - Absolute or relative path to the file.
	* @param {string} content - Optional initial content to write (default: empty).
	*/
	static createFileIfNotExists(filePath, content = '') {
		const resolvedPath = path.resolve(filePath);
		if (!fs.existsSync(resolvedPath)) {
			fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
			fs.writeFileSync(resolvedPath, content);
		} 
	}
}