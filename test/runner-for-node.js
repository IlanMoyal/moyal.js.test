/*
 * test/run-node.js 
 *
 * This should be run from NodeJS environment.
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const runnerPath = path.join(__dirname, 'runner.js');

// Dynamic import to preserve ESM compatibility
import(runnerPath).catch((err) => {
  console.error("Failed to run test runner:", err);
  process.exit(1);
});
