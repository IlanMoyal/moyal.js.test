import fs from 'fs';
const libVersion = require('./version.js');

export default [
	{
	  input: 'src/moyal.test.js',
	  output: {
		file: `dist/moyal.test.${libVersion}.umd.js`,
		format: 'umd',
		name: 'moyal.test' 
	  }
	},
	{
	  input: 'src/moyal.test.js',
	  output: {
		file: `dist/moyal.test.${libVersion}.mjs`,
		format: 'es'
	  }
	},
	{
	  input: 'src/moyal.test.js',
	  output: {
		file: `dist/moyal.test.${libVersion}.cjs.js`,
		format: 'cjs'
	  }
	}
  ];
  