import { LoggerBase } from "./LoggerBase.js";

/**
 * @class SimpleLogger
 * 
 * A basic implementation of simple logger.
 */
export class SimpleLogger extends LoggerBase {
	#_level = 0;
	#_prefixSpace = "";
	
	#_incrementLevel() {
		this.#_level++; 
		this.#_prefixSpace = "  ".repeat(this.#_level); 
	}

	#_decrementLevel() {
		this.#_level--; 
		if(this.#_level < 0)
			this.#_level = 0;
		this.#_prefixSpace = "  ".repeat(this.#_level); 
	}

	/**
	 * Prefix the specified message with the necessary indentation.
	 * @param {string} message - The message.
	 * @returns {string} - The indented message.
	 */
	prefixMessage(message) {
		return this.#_prefixSpace + message;
	}
	
	/**
	 * Wrap the specified message with color codes.
	 * @param {string} message - The message
	 * @param {string} [color] - The color
	 * @param {string} [defaultColor] - default color to be use if the specified color is not applicable.
	 * @returns {string} The message surrounded with color codes.
	 */
	colorfy(message, color, defaultColor) { /* eslint-disable-line no-unused-vars */ 
		return message;
	}

	/**
	 * Logs a message.
	 * @param {string} message - The message.
	 * @param {string} [color] - The color to be used.
	 * @param  {...any} args - Additional arguments.
	 * @returns {this} The current instance for chaining.
	 * @override
	 */
	log (message, color, ...args) { 
		message ??= "";
		console.log(this.colorfy(this.prefixMessage(message), color, "white"), ...args);
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
	info(message, color, ...args){ 
		message ??= "";
		console.info(this.colorfy(this.prefixMessage(message), color, "cyan"), ...args);
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
	warn(message, color, ...args){ 
		message ??= "";
		console.warn(this.colorfy(this.prefixMessage(message), color, "yellow"), ...args);
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
		console.error(this.colorfy(this.prefixMessage(message), color, "red"), ...args);
		return this;
	}

	#_group_impl(label, color) {
		label ??= "";
		console.log(this.colorfy(this.prefixMessage(`▼ ${label}`), color, "gray"));
		this.#_incrementLevel();
	}
	
	/**
	 * Starts grouped output.
	 * @param {string} label - The group label.
	 * @param {string} [color] - The color to be used.
	 * @returns {this} The current instance for chaining.
	 * @override
	 */
	group(label, color){
		this.#_group_impl(label, color);
		return this;
	}

	/**
	* Starts grouped output (collapsed by default).
	* @param {string} label - The group label.
	* @param {string} [color] - The color to be used.
	* @returns {this} The current instance for chaining.
	* @override
	*/
	groupCollapsed(label, color){
		this.#_group_impl(label, color);
		return this;
	}

	/**
	* Ends group output.
	* @returns {this} The current instance for chaining.
	* @override
	*/
	groupEnd() { 
		this.#_decrementLevel(); 
		return this;
	}
}