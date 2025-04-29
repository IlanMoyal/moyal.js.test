/*!
 * File: src/logger.js
 */

/**
 * Base class for logger.
 * 
 * @abstract
 */
class LoggerBase {
    /** @type {LoggerBase} */
    static #_defaultLogger = null;

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

/**
 * @class SimpleLogger
 * 
 * A basic implementation of simple logger.
 */
class SimpleLogger extends LoggerBase {
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
    log (msg, color, ...args) { 
        console.log(this.colorfy(this.prefixMessage(msg), color, "white"), ...args);
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
    info(msg, color, ...args){ 
        console.info(this.colorfy(this.prefixMessage(msg), color, "cyan"), ...args);
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
    warn(msg, color, ...args){ 
        console.warn(this.colorfy(this.prefixMessage(msg), color, "yellow"), ...args);
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
    error(msg, color, ...args) { 
        console.error(this.colorfy(this.prefixMessage(msg), color, "red"), ...args);
        return this;
    }

    #_group_impl(label, color) {
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

/**
 * @class BrowserLogger
 * 
 * A simple implementation of browser console logger.
 */
class BrowserLogger extends LoggerBase {
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
    info(msg, color, ...args) {
        console.info(`%c${msg}`, `color:${this.#_sanitizeColor(color) ?? "blue"}`, ...args);
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
    warn(msg, color, ...args) {
        console.warn(`%c${msg}`, `color:${this.#_sanitizeColor(color) ?? "orange"}`, ...args);
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
    error(msg, color, ...args) {
        console.error(`%c${msg}`, `color:${this.#_sanitizeColor(color) ?? "red"}`, ...args);
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

/**
 * @class NodeLogger
 * 
 * A simple implementation of NodeJS Logger
 */
class NodeLogger extends SimpleLogger {
    /**
     * Converts color names to ANSI escape codes for Node.js
     */
    #_nodeColorize(color, msg) {
        color = this.normalizeColor(color);
        const ansi = {
            black: "\x1b[30m", red: "\x1b[31m", green: "\x1b[32m", yellow: "\x1b[33m",
            blue: "\x1b[34m", magenta: "\x1b[35m", cyan: "\x1b[36m", white: "\x1b[37m",
            gray: "\x1b[90m", lightred: "\x1b[91m", lightgreen: "\x1b[92m",
            lightyellow: "\x1b[93m", lightblue: "\x1b[94m", lightmagenta: "\x1b[95m",
            lightcyan: "\x1b[96m", lightgray: "\x1b[97m"
        };
        return (ansi[color] ?? "") + msg + "\x1b[0m";
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
        return this.#_nodeColorize(color ?? defaultColor, message)
    }
}

// Bundle all loggers together (optional default export)
const MoyalTestLogger = {
    LoggerBase,
    SimpleLogger,
    BrowserLogger,
    NodeLogger
};

export default MoyalTestLogger;

export {
    LoggerBase,
    SimpleLogger,
    BrowserLogger,
    NodeLogger
};