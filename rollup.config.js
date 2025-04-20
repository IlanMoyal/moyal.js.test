import terser from '@rollup/plugin-terser';

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
		plugins: [terser()]
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
		plugins: [terser()]
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
		plugins: [terser({
			format: {
			  comments: false // 👈 Remove all comments, even /*! ... */
			}
		  })]
	}
  ];
  