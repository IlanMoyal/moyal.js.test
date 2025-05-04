import { SimpleLogger } from "./SimpleLogger.js";

/**
 * @class NodeLogger
 * 
 * A simple implementation of NodeJS Logger
 */
export class NodeLogger extends SimpleLogger {
	/**
	 * Converts color names to ANSI escape codes for Node.js
	 */
	#_nodeColorize(color, message) {
		color = this.normalizeColor(color);
		const ansi = {
			black: "\x1b[30m", red: "\x1b[31m", green: "\x1b[32m", yellow: "\x1b[33m",
			blue: "\x1b[34m", magenta: "\x1b[35m", cyan: "\x1b[36m", white: "\x1b[37m",
			gray: "\x1b[90m", lightred: "\x1b[91m", lightgreen: "\x1b[92m",
			lightyellow: "\x1b[93m", lightblue: "\x1b[94m", lightmagenta: "\x1b[95m",
			lightcyan: "\x1b[96m", lightgray: "\x1b[97m"
		};
		return (ansi[color] ?? "") + message + "\x1b[0m";
	}

	/**
	 * Wrap the specified message with color codes.
	 * @param {string} message - The message
	 * @param {string} [color] - The color
	 * @param {string} [defaultColor] - default color to be use if the specified color is nnot aplicable.
	 * @returns {string} The message sourounded with color codes.
	 * @override
	 */
	colorfy(message, color, defaultColor) {
		return this.#_nodeColorize(color?.toLowerCase() ?? defaultColor, message)
	}
}