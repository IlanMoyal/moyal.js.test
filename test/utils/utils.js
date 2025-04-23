/* 
 * File: utils.js
 */


export default class {
	static fixGlobal() {
		if (typeof globalThis === 'undefined') {
			(function() {
				if (typeof self !== 'undefined') {
					self.globalThis = self;
				} else if (typeof window !== 'undefined') {
					window.globalThis = window;
				} else if (typeof global !== 'undefined') {
					global.globalThis = global;
				} else {
					this.globalThis = this;
				}
			})();
		}
	}

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