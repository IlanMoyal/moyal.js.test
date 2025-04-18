export default class {
	static exit(code) {
		if (typeof process !== 'undefined' && typeof process.exit === 'function') {
			process.exit(code);
		} else {
			window.__testExitCode = code;
			console.log(`[exit(${code})] simulated in browser`);
			// Optional: trigger DOM feedback
			document.body.style.backgroundColor = code === 0 ? 'green' : 'red';
		}
	}
};