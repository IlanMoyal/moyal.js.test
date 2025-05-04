import { LoggerBase } from "./LoggerBase.js";

/**
 * @class BrowserLogger
 * 
 * A simple implementation of browser console logger.
 */
export class BrowserLogger extends LoggerBase {
	/**
	 * Browser console implementation.
	 */
	#_sanitizeColor(color) {
		color = this.normalizeColor(color);
		return this.isSupportedColor(color) ? color : undefined;
	}

	/**
	 * Logs a message.
	 * @param {string} message - The message.
	 * @param {string} [color] - The color to be used.
	 * @param  {...any} args - Additional arguments.
	 * @returns {this} The current instance for chaining.
	 * @override
	 */
	log(message, color, ...args) {
		message ??= "";
		 console.log(`%c${message}`, `color:${this.#_sanitizeColor(color) ?? "inherit"}`, ...args);
		 return this;
	}

	 /**
	 * Logs information message.
	 * @param {string} message - The message.
	 * @param {string} [color] - The color to be used.
	 * @param  {...any} args - Additional arguments.
	 * @returns {this} The current instance for chaining.
	 * @override
	 */
	info(message, color, ...args) {
		message ??= "";
		console.info(`%c${message}`, `color:${this.#_sanitizeColor(color) ?? "blue"}`, ...args);
		return this;
	}

	/**
	 * Logs warning message.
	 * @param {string} message - The message.
	 * @param {string} [color] - The color to be used.
	 * @param  {...any} args - Additional arguments.
	 * @returns {this} The current instance for chaining.
	 * @override
	 */
	warn(message, color, ...args) {
		message ??= "";
		console.warn(`%c${message}`, `color:${this.#_sanitizeColor(color) ?? "orange"}`, ...args);
		return this;
	}

	 /**
	 * Logs error message.
	 * @param {string} message - The message.
	 * @param {string} [color] - The color to be used.
	 * @param  {...any} args - Additional arguments.
	 * @returns {this} The current instance for chaining.
	 * @override
	 */
	error(message, color, ...args) {
		message ??= "";
		console.error(`%c${message}`, `color:${this.#_sanitizeColor(color) ?? "red"}`, ...args);
		return this;
	}

	 /**
	 * Starts grouped output.
	 * @param {string} label - The group label.
	 * @param {string} [color] - The color to be used.
	 * @returns {this} The current instance for chaining.
	 * @override
	 */
	group(label, color) {
		console.group(`%c${label}`, `color:${this.#_sanitizeColor(color) ?? "inherit"}`);
		return this;
	}

	/**
	* Starts grouped output (collapsed by default).
	* @param {string} label - The group label.
	* @param {string} [color] - The color to be used.
	* @returns {this} The current instance for chaining.* 
	* @override
	*/
	groupCollapsed(label, color) {
		console.groupCollapsed(`%c${label}`, `color:${this.#_sanitizeColor(color) ?? "inherit"}`);
		return this;
	}

	/**
	* Ends group output.
	* @returns {this} The current instance for chaining.
	* @override
	*/
	groupEnd() {
		console.groupEnd();
		return this;
	}
}