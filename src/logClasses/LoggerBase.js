
let SimpleLogger;
let BrowserLogger;
let NodeLogger;

/**
 * Base class for logger.
 * 
 * @abstract
 */
export class LoggerBase {
	/** @type {LoggerBase} */
	static #_defaultLogger = null;

	/**
	 * 
	 * @param {LoggerBase} simpleLogger 
	 * @param {LoggerBase} browserLogger 
	 * @param {LoggerBase} nodeLogger 
	 * @ignore
	 */
	static __setup(simpleLogger, browserLogger, nodeLogger) {
		SimpleLogger = simpleLogger;
		BrowserLogger = browserLogger;
		NodeLogger = nodeLogger;
	}

	/**
	 * Detects the current environment and returns the appropriate console printer adapter.
	 * @returns {LoggerBase}
	 */
	static getDefaultLogger() {
		if (this.#_defaultLogger === null) {
			try {
				if ((typeof window !== "undefined" && typeof window.document !== "undefined"/* Browser */)
					||
					(typeof importScripts === "function" && typeof self !== "undefined" /* Web worker */)) {
					this.#_defaultLogger = new BrowserLogger();
				}
				else if (typeof process !== "undefined" && process.versions?.node) {
					this.#_defaultLogger = new NodeLogger();
				}
				else {
					this.#_defaultLogger = new SimpleLogger();
				}
			} catch {
				this.#_defaultLogger = new SimpleLogger();
			}
		}
		return this.#_defaultLogger;
	}

	/**
	 * Checks if obj is an instance of a subclass of LoggerBase.
	 * @param {any} logger - Object to test.
	 * @returns {boolean} True if obj is derived from LoggerBase.
	 */
	static isLogger(logger) {
		return logger instanceof LoggerBase && Object.getPrototypeOf(logger.constructor) === LoggerBase;
	}

	/**
	 * Support only colors that supported on all systems.
	 */
	#_supportedColors = new Set([
		"black", "red", "green", "yellow", "blue", "magenta", "cyan", "white", "gray",
		"lightred", "lightgreen", "lightyellow", "lightblue", "lightmagenta", "lightcyan", "lightgray"
	]);

	/**
	 * Returns true if the specified color is supported by the logger.
	 * @param {string} color - The color.
	 * @returns {boolean} - true if the specified color is supported by the logger; otherwise, flase.
	 */
	isSupportedColor(color) {
		return this.#_supportedColors.has(color);
	}

	/**
	 * Normalizes the specified color name, or return an empty string if it is not supported.
	 * 
	 * @param {string} color - The color.
	 * @returns {string} - The normalized color.
	 */
	normalizeColor(color) {
		return typeof color === "string" ? color.toLowerCase() : "";
	}

	/**
	 * Logs a message.
	 * @param {string} message - The message.
	 * @param {string} [color] - The color to be used.
	 * @param  {...any} args - Additional arguments.
	 * @returns {this} - The current instance for chaining.
	 * @abstract
	 */
	log(message, color, ...args){ /* eslint-disable-line no-unused-vars */ }

	 /**
	 * Logs information message.
	 * @param {string} message - The message.
	 * @param {string} [color] - The color to be used.
	 * @param  {...any} args - Additional arguments.
	 * @returns {this} The current instance for chaining.
	 * @abstract
	 */
	 info(message, color, ...args){ /* eslint-disable-line no-unused-vars */ }

	 /**
	 * Logs warning message.
	 * @param {string} message - The message.
	 * @param {string} [color] - The color to be used.
	 * @param  {...any} args - Additional arguments.
	 * @returns {this} The current instance for chaining.
	 * @abstract
	 */
	 warn(message, color, ...args){ /* eslint-disable-line no-unused-vars */ }

	 /**
	 * Logs error message.
	 * @param {string} message - The message.
	 * @param {string} [color] - The color to be used.
	 * @param  {...any} args - Additional arguments.
	 * @returns {this} The current instance for chaining.
	 * @abstract
	 */
	 error(message, color, ...args){ /* eslint-disable-line no-unused-vars */ }

	 /**
	 * Starts grouped output.
	 * @param {string} label - The group label.
	 * @param {string} [color] - The color to be used.
	 * @returns {this} The current instance for chaining.
	 * @abstract
	 */
	 group(label, color){ /* eslint-disable-line no-unused-vars */ }

	 /**
	 * Starts grouped output (collapsed by default).
	 * @param {string} label - The group label.
	 * @param {string} [color] - The color to be used.
	 * @returns {this} The current instance for chaining.
	 * @abstract
	 */
	 groupCollapsed(label, color){ /* eslint-disable-line no-unused-vars */ }

	 /**
	 * Ends group output.
	 * @returns {this} The current instance for chaining.
	 * @abstract
	 */
	 groupEnd(){}
}