import terser from '@rollup/plugin-terser';
import _buildInfo from './build/generated/build-info.js'

const terserBanner = `/*!
 * moyal.js.test v${_buildInfo.version}
 * (c) 2000–present Ilan Moyal
 * Released under the MIT License
 */`;

 const minifiedTerser = terser({
	format: {
	  comments: false,  // remove all comments
	  preamble: terserBanner // but inject this one
	}
});

export default [
	/* UMD - Development version (with documentations) */
	{
	  input: 'src/moyal.test.js',
	  output: {
		file: `dist/moyal.test.umd.js`,
		format: 'umd',
		name: 'moyal.test' 
	  }
	},

	/* UMD - Production version (minified) */
	{
		input: 'src/moyal.test.js',
		output: {
		  file: `dist/moyal.test.umd.min.js`,
		  format: 'umd',
		  name: 'moyal.test' 
		},
		plugins: [minifiedTerser]
	},

	/* ESM - Development version (with documentations) */
	{
	  input: 'src/moyal.test.js',
	  output: {
		file: `dist/moyal.test.mjs`,
		format: 'es'
	  }
	},

	/* ESM - Production version (minified) */
	{
		input: 'src/moyal.test.js',
		output: {
		  file: `dist/moyal.test.min.mjs`,
		  format: 'es'
		},
		plugins: [minifiedTerser]
	},

	/* CJS - Development version (with documentations) */
	{
	  input: 'src/moyal.test.js',
	  output: {
		file: `dist/moyal.test.cjs.js`,
		format: 'cjs'
	  }
	},

	/* CJS - Production version (minified) */
	{
		input: 'src/moyal.test.js',
		output: {
		  file: `dist/moyal.test.cjs.min.js`,
		  format: 'cjs'
		},
		plugins: [minifiedTerser]
	}
  ];
  