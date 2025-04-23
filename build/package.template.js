export default {
	"moyal-comment": "THIS IS AUTO_GENERATED FILE. DON'T EDIT IT. INSTEAD EDIT ./build/package.template.json and ./project.settings.js",
	"name": "{{scope}}/{{lib}}",
	"version": "{{version}}",
	"description": "{{description}}",
	"type": "module",
	"main": "{{outputFolder}}/{{outputBaseFilename}}.cjs.js",
	"module": "{{outputFolder}}/{{outputBaseFilename}}.mjs",
	"browser": "{{outputFolder}}/{{outputBaseFilename}}.umd.js",
	"exports": {
		"require": "{{outputFolder}}/{{outputBaseFilename}}.cjs.js",
		"import": "{{outputFolder}}/{{outputBaseFilename}}.mjs"
	},
	"author": "{{author}}",
	"license": "{{license}}",
	"scripts": {
		/*: synchronize the content of package.json with the merged content of this template and project.settings.js */
		"sync": "node ./build/utils/sync-package-json.js",
		//"pretest": "node ./build/prepare-build-info.js",
		
		/*: run test for NodeJS */
		"test": "node ./test/runner-for-node.js",

		/*: run lint against source and test folders */
		"lint": "eslint src/ test/",

		"prepare-package-json": "node ./build/tools/prepare-package-json.js",

		"sync-config": "node ./build/utils/prepare-package.js",
  		"prepare": "npm run sync-config",
		"check": "npm run lint && npm run test",
		"prebuild": "npm run test",
		"build": "node ./build/build.js",
		"prepack": "npm run check",
		"pack:local": "bash ./build/pack-local.sh",
		"pack:preview": "bash ./build/pack-preview.sh",
		"pack": "npm run pack:local && npm run pack:preview",

		"bump:project-settings:version:patch": "node ./build/tools/bump-project-settings-version-patch.js",
		"bump:project-settings:version:minor": "node ./build/tools/bump-project-settings-version-minor.js",
		"bump:project-settings:version:major": "node ./build/tools/bump-project-settings-version-major.js",
		"sync-from-package:version": "node ./build/tools/sync-version-from-package.js",
		"version:patch": "npm version patch && git push && git push --tags && npr run sync-from-package:version",
		"version:minor": "npm version minor && git push && git push --tags && npr run sync-from-package:version",
		"version:major": "npm version major && git push && git push --tags && npr run sync-from-package:version",
		
		"publish:npm": "npm publish --access public",
		"release:minor": "npm run version:minor && npm run publish:npm"
	},
	"devDependencies": {
		"@eslint/js": "^9.25.0",
		"@rollup/plugin-terser": "^0.4.3",
		"eslint": "^9.25.0",
		"globals": "^16.0.0",
		"rollup": "^3.0.0"
	},
	"files": [
		"dist/",
		"README.md",
		"LICENSE"
	]
}
