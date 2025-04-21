
From the root of the project run


1. To build Install dependencies (only once):
npm install

// Build the package:
npx rollup -c

// Install a minifier plugin:
npm install --save-dev @rollup/plugin-terser

8. Add minified versions of each format
npm install --save-dev rollup-plugin-terser

npm run pack:local
npm run pack:preview

//

// 4. Uploading to NPM
npm login        # use the account you created
npm publish      # publishes the package

// If successful, it becomes available at:
// https://www.npmjs.com/package/moyal.js.test

// If it’s scoped (e.g. @ilanmoyal/moyal.js.test), then use npm publish --access public.

//5. Best Practices in Versioning
Follow Semantic Versioning (SemVer):
1.0.0 – first stable release
1.1.0 – added new feature (backward compatible)
1.1.1 – bug fix (no new features)
Use npm version to update versions easily:

npm version patch   # bumps x.x.+1
npm version minor   # bumps x.+1.0
npm version major   # bumps +1.0.0
