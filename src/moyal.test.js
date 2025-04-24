/*!
 * moyal.js.test - A lightweight JavaScript testing framework.
 *
 * File: moyal.test.js* 
 * Repository: https://github.com/IlanMoyal/moyal.js.test
 * Author: Ilan Moyal (https://www.moyal.es)
 * Contact: ilan.amoyal[guess...what]gmail.com
 *
 * Description:
 * A minimalist, zero-dependency testing library for JavaScript,
 * designed to be embeddable, expressive, and suitable for both
 * browser and Node.js environments.
 *
 * License:
 * MIT License – Permission is granted for free use, modification, and distribution,
 * provided that the copyright notice and license appear in all copies.
 * Full license text: https://opensource.org/licenses/MIT
 *
 * © 2000–present Ilan Moyal. All rights reserved.
 */

// Ensure moyal global namespace exists
//@ts-ignore
(function (global) {global.moyal = global.moyal || {};})(globalThis);

import BuildInfo from "./auto-generated/build-info.js";

class _InternalUtils {
    /* 
     * Independent type checking ability 
     */

    /**
     * Checks if an object is a string.
     * @param {*} obj - The object to test.
     * @returns {boolean} True if the object is a string.
     */
    static isString(obj) { return typeof obj === "string" || Object.prototype.toString.call(obj) === "[object String]"; }

    /**
     * Checks if an object is iterable (i.e., supports Symbol.iterator).
     * @param {*} obj - The object to check.
     * @returns {boolean} True if it's iterable.
     */
    static isIterable(obj) { return _InternalUtils.isFunctionOrGeneratorFunction(obj?.[Symbol.iterator]); }

    /**
     * Checks if an object is a function.
     * @param {*} obj - The object to check.
     * @returns {boolean} True if the object is a function.
     */
    static isFunction(obj) {
        let too = typeof obj;
        return (too === "object" || too === "function") && Object.prototype.toString.call(obj) === "[object Function]";
    }

    /**
     * Checks if an object is either a normal function or a generator function.
     * @param {*} obj - The object to check.
     * @returns {boolean} True if the object is a function or generator function.
     */
    static isFunctionOrGeneratorFunction(obj) {
        let too = typeof obj;
        let name = Object.prototype.toString.call(obj);
        return (too === "object" || too === "function") && (name === "[object Function]" || name === "[object GeneratorFunction]");
    }
}

/**
 * @class moyal.test
 *
 * The main static interface for the moyal.js.test framework.
 * 
 * Provides assertion utilities for test development and a central entry point to define and run tests.
 * Also contains type utilities to assist in dynamic validation.
 *
 * Example usage:
 * ```js
 * moyal.test.isTrue("Test if value is true", myValue);
 * moyal.test.areEqual("Value check", expected, actual);
 * ```
 */

moyal.test = class {
    /** @type {moyal.test.LoggerBase} */
    static #_logger = null;

    static {
        //this.#_logger  = _getDefaultConsolePrinter();
        //this.#_logger  = moyal.test.LoggerBase.getDefaultLogger();
    }

     /**
     * Returns the version of the test library.
     * This is a read-only property used for diagnostics or compatibility checks.
     * @returns {string} Semantic version string.
     */
    static get Version() {
        return BuildInfo.version;
    }

    static get logger() {
        if(this.#_logger == null)
            this.#_logger = moyal.test.LoggerBase.getDefaultLogger();

        return this.#_logger;
    }

    static set logger(logger) {
        if(logger == null)
            this.#_logger  = moyal.test.LoggerBase.getDefaultLogger();

        else if(moyal.test.LoggerBase.isLogger(logger)) 
            this.#_logger = logger;
    }

    /* 
     * Direct test functions 
     */

    /**
     * Asserts strict equality - checks if `actual === expected`, or uses a custom comparer if provided.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} expected - Expected value.
     * @param {*} actual - Actual value to compare.
     * @param {((a: any, b: any) => boolean) | null | undefined} [comparer] - Optional custom comparison function ((expected, actual) => boolean).
     * @param {boolean | null | undefined} [write] - The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static areEqual(testName, expected, actual, comparer, write) { return new moyal.test.AreEqual(testName, expected, actual, comparer).run(write);}

    /**
     * Asserts strict inequality - checks if `actual !== not_expected`, or uses a custom comparer if provided.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} not_expected - The value we not expecting.
     * @param {*} actual - Actual value to compare.
     * @param {((a: any, b: any) => boolean) | null | undefined} [comparer] - Optional custom comparison function ((not_expected, actual) => boolean).
     * @param {boolean | null | undefined} [write] - The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static areNotEqual(testName, not_expected, actual, comparer, write) { return new moyal.test.AreNotEqual(testName, not_expected, actual, comparer).run(write);}

    /**
     * Asserts that specified value is strictly `true`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `true`.
     * @param {boolean | null | undefined} [write] - The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static isTrue(testName, actual, write) { return new moyal.test.IsTrue(testName, actual).run(write); }

    /**
     * Asserts that specified value is strictly `false`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `false`.
     * @param {boolean | null | undefined} [write] - The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static isFalse(testName, actual, write) { return new moyal.test.IsFalse(testName, actual).run(write); }

    /**
     * Assets that the specfied value is strictly `null`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `null`.
     * @param {boolean | null | undefined} [write] - The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static isNull(testName, actual, write) { return new moyal.test.IsNull(testName, actual).run(write); }
    
    /**
     * Asserts that the specified value is **not** `null`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is not `null`.
     * @param {boolean | null | undefined} [write] - The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static isNotNull(testName, actual, write) {return new moyal.test.IsNotNull(testName, actual).run(write);}

    /**
     * Asserts that specified value is **not** `undefined`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is defined.
     * @param {boolean | null | undefined} [write] - The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static isDefined(testName, actual, write) { return new moyal.test.IsDefined(testName, actual).run(write); }

    /**
     * Asserts that specified value is strictly `undefined`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `undefined`.
     * @param {boolean | null | undefined} [write] - The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static isUndefined(testName, actual, write) { return new moyal.test.IsUndefined(testName, actual).run(write); }

    /**
     * Adds an assertion that verifies a function throws an error.
     * Optionally verifies the error with a predicate.
     *
     * @param {string} testName - Descriptive test title.
     * @param {Function} fn - Function expected to throw.
     * @param {(err: any) => boolean} [checkErrorFn] - Optional predicate to inspect the thrown error.
     * @param {object} [thisArg] - Optional `this` binding for `fn` and `checkErrorFn`.
     * @param {boolean | null | undefined} [write] - The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static throws(testName, fn, checkErrorFn, thisArg, write) { return new moyal.test.Throws(testName, fn, checkErrorFn, thisArg).run(write); }

    /**
     * Adds an assertion that verifies a function does NOT throw.
     *
     * @param {string} testName - Descriptive test title.
     * @param {Function} fn - Function expected to execute without throwing.
     * @param {object} [thisArg] - Optional `this` binding for `fn`.
     * @param {boolean | null | undefined} [write] - The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static noThrows(testName, fn, thisArg, write) { return new moyal.test.NoThrows(testName, fn, thisArg).run(write);}

    /**
     * Adds a sequence equality assertion to the group.
     * Compares two iterable sequences element-by-element.
     *
     * @param {string} testName - Descriptive test title.
     * @param {Iterable} expected - The expected iterable sequence.
     * @param {Iterable} actual - The actual iterable sequence.
     * @param {((a: any, b: any) => boolean) | null | undefined} [itemComparer] - Optional custom item-level comparison function ((expected, actual) => boolean).
     * @param {boolean | null | undefined} [write] - The write mode: true - log all; false - don't log anything; null (or undefined) - log only errors.
     * @returns {boolean} True if the test succeeded; otherwise, false.
     */
    static sequencesAreEqual(testName, expected, actual, itemComparer, write) { return new moyal.test.SequencesAreEqual(testName, expected, actual, itemComparer).run(write); }
}

/**
 * Base class for logger.
 * 
 * @abstract
 */
moyal.test.LoggerBase = class {
    /** @type {moyal.test.LoggerBase} */
    static #_defaultLogger = null;

    /**
     * Detects the current environment and returns the appropriate console printer adapter.
     * @returns {moyal.test.LoggerBase}
     */
    static getDefaultLogger() {
        if (this.#_defaultLogger === null) {
            try {
                if ((typeof window !== "undefined" && typeof window.document !== "undefined"/* Browser */)
                    ||
                    (typeof importScripts === "function" && typeof self !== "undefined" /* Web worker */)) {
                    this.#_defaultLogger = new moyal.test.BrowserLogger();
                }
                else if (typeof process !== "undefined" && process.versions?.node) {
                    this.#_defaultLogger = new moyal.test.NodeLogger();
                }
                else {
                    this.#_defaultLogger = new moyal.test.SimpleLogger();
                }
            } catch {
                this.#_defaultLogger = new moyal.test.SimpleLogger();
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
        return logger instanceof moyal.test.LoggerBase && Object.getPrototypeOf(logger.constructor) === moyal.test.LoggerBase;
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
     * @abstract
     */
    log(message, color, ...args){ /* eslint-disable-line no-unused-vars */ }

     /**
     * Logs information message.
     * @param {string} message - The message.
     * @param {string} [color] - The color to be used.
     * @param  {...any} args - Additional arguments.
     * @abstract
     */
     info(message, color, ...args){ /* eslint-disable-line no-unused-vars */ }

     /**
     * Logs warning message.
     * @param {string} message - The message.
     * @param {string} [color] - The color to be used.
     * @param  {...any} args - Additional arguments.
     * @abstract
     */
     warn(message, color, ...args){ /* eslint-disable-line no-unused-vars */ }

     /**
     * Logs error message.
     * @param {string} message - The message.
     * @param {string} [color] - The color to be used.
     * @param  {...any} args - Additional arguments.
     * @abstract
     */
     error(message, color, ...args){ /* eslint-disable-line no-unused-vars */ }

     /**
     * Starts grouped output.
     * @param {string} label - The group label.
     * @param {string} [color] - The color to be used.
     * @abstract
     */
     group(label, color){ /* eslint-disable-line no-unused-vars */ }

     /**
     * Starts grouped output (collapsed by default).
     * @param {string} label - The group label.
     * @param {string} [color] - The color to be used.
     * @abstract
     */
     groupCollapsed(label, color){ /* eslint-disable-line no-unused-vars */ }

     /**
     * Ends group output.
     * @abstract
     */
     groupEnd(){}
};

/**
 * @class moyal.test.SimpleLogger
 * 
 * A simple implementation of browser console logger.
 */
moyal.test.BrowserLogger = class extends moyal.test.LoggerBase {
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
     * @override
     */
    log(message, color, ...args) {
         console.log(`%c${message}`, `color:${this.#_sanitizeColor(color) ?? "inherit"}`, ...args)
    }

     /**
     * Logs information message.
     * @param {string} message - The message.
     * @param {string} [color] - The color to be used.
     * @param  {...any} args - Additional arguments.
     * @override
     */
    info(msg, color, ...args) {
        console.info(`%c${msg}`, `color:${this.#_sanitizeColor(color) ?? "blue"}`, ...args);
    }

    /**
     * Logs warning message.
     * @param {string} message - The message.
     * @param {string} [color] - The color to be used.
     * @param  {...any} args - Additional arguments.
     * @override
     */
    warn(msg, color, ...args) {
        console.warn(`%c${msg}`, `color:${this.#_sanitizeColor(color) ?? "orange"}`, ...args);
    }

     /**
     * Logs error message.
     * @param {string} message - The message.
     * @param {string} [color] - The color to be used.
     * @param  {...any} args - Additional arguments.
     * @override
     */
    error(msg, color, ...args) {
        console.error(`%c${msg}`, `color:${this.#_sanitizeColor(color) ?? "red"}`, ...args);
    }

     /**
     * Starts grouped output.
     * @param {string} label - The group label.
     * @param {string} [color] - The color to be used.
     * @override
     */
    group(label, color) {
        console.group(`%c${label}`, `color:${this.#_sanitizeColor(color) ?? "inherit"}`);
    }

    /**
    * Starts grouped output (collapsed by default).
    * @param {string} label - The group label.
    * @param {string} [color] - The color to be used.
    * @override
    */
    groupCollapsed(label, color) {
        console.groupCollapsed(`%c${label}`, `color:${this.#_sanitizeColor(color) ?? "inherit"}`);
    }

    /**
    * Ends group output.
    * @override
    */
    groupEnd() {
        console.groupEnd();
    }
};

/**
 * @class moyal.test.SimpleLogger
 * 
 * A basic implementation of simple logger.
 */
moyal.test.SimpleLogger = class extends moyal.test.LoggerBase {
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
     * Prefix the specified message with the necessary inditation.
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
     * @param {string} [defaultColor] - default color to be use if the specified color is nnot aplicable.
     * @returns {string} The message sourounded with color codes.
     */
    colorfy(message, color, defaultColor) { /* eslint-disable-line no-unused-vars */ 
        return message;
    }

    /**
     * Logs a message.
     * @param {string} message - The message.
     * @param {string} [color] - The color to be used.
     * @param  {...any} args - Additional arguments.
     * @override
     */
    log (msg, color, ...args) { 
        console.log(this.colorfy(this.prefixMessage(msg), color, "white"), ...args);
    }

     /**
     * Logs information message.
     * @param {string} message - The message.
     * @param {string} [color] - The color to be used.
     * @param  {...any} args - Additional arguments.
     * @override
     */
    info(msg, color, ...args){ 
        console.info(this.colorfy(this.prefixMessage(msg), color, "cyan"), ...args);
    }

    /**
     * Logs warning message.
     * @param {string} message - The message.
     * @param {string} [color] - The color to be used.
     * @param  {...any} args - Additional arguments.
     * @override
     */
    warn(msg, color, ...args){ 
        console.warn(this.colorfy(this.prefixMessage(msg), color, "yellow"), ...args);
    }

     /**
     * Logs error message.
     * @param {string} message - The message.
     * @param {string} [color] - The color to be used.
     * @param  {...any} args - Additional arguments.
     * @override
     */
    error(msg, color, ...args) { 
        console.error(this.colorfy(this.prefixMessage(msg), color, "red"), ...args);
    }

    #_group_impl(label, color) {
        console.log(this.colorfy(this.prefixMessage(`▼ ${label}`), color, "gray"));
        this.#_incrementLevel();
    }
    
    /**
     * Starts grouped output.
     * @param {string} label - The group label.
     * @param {string} [color] - The color to be used.
     * @override
     */
    group(label, color){
        this.#_group_impl(label, color);
    }

    /**
    * Starts grouped output (collapsed by default).
    * @param {string} label - The group label.
    * @param {string} [color] - The color to be used.
    * @override
    */
    groupCollapsed(label, color){
        this.#_group_impl(label, color);
    }

    /**
    * Ends group output.
    * @override
    */
    groupEnd() { 
        this.#_decrementLevel(); 
    }
};

/**
 * @class moyal.test.NodeLogger
 * 
 * A simple implementation of NodeJS Logger
 */
moyal.test.NodeLogger = class extends moyal.test.SimpleLogger {
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
};

/**
 * @class moyal.test.SequentialText
 *
 * A utility class that generates a sequence of formatted strings like `"1"`, `"2"`, etc., using a
 * text template such as `"{0}"` or `"Step {0}"`.
 * 
 * Supports resetting and iteration with `for...of`.
 *
 * Example:
 * ```js
 * const st = new moyal.test.SequentialText("Item {0}", 1);
 * st.next(); // "Item 1"
 * st.next(); // "Item 2"
 * ```
 */
moyal.test.SequentialText = class {
    /**
     * Generator that produces an infinite sequence of formatted strings using a number.
     * Example: "{0}" → "1", "2", "3", ...
     * @param {string} textFormat - A string template, e.g., "{0}" or "Step {0}".
     * @param {number} startValue - The initial numeric value.
     * @yields {string} Formatted strings.
     */
    static *#_sequentialTextGen(textFormat, startValue) {
        while (true) {
            yield textFormat.replace("{0}", startValue++)
        };
    }

    #_textFormat = null;
    #_startValue = null;
    #_gen = null;

    /**
     * Constructs a sequential text generator instance.
     * @param {string} textFormat - The format string, default is "{0}".
     * @param {number} startValue - The starting number, default is 1.
     */
    constructor(textFormat, startValue) {
        if (startValue != null && (!Number.isInteger(startValue) || startValue < 1)) {
            throw new Error("startValue must be a positive integer");
        }
        this.#_textFormat = textFormat ?? "{0}";
        this.#_startValue = startValue ?? 1;
    }

    /**
     * Resets the generator state so iteration starts over from startValue.
     */
    reset() {
        this.#_gen = moyal.test.SequentialText.#_sequentialTextGen(this.#_textFormat, this.#_startValue);
    }

    /**
     * Returns the next generated formatted string.
     * @returns {string}
     */
    next() {
        if (this.#_gen == null) 
            this.reset();
        return this.#_gen.next().value;
    }

    /**
     * Closes the generator and cleans up internal state.
     */
    close() {
        if (this.#_gen?.return) 
            this.#_gen.return();
        this.#_gen = null;
	}

    /**
     * Enables iteration using for...of syntax on the class.
     * Each call to the iterator returns a fresh generator.
     */
    *[Symbol.iterator]() {
        let gen = moyal.test.SequentialText.#_sequentialTextGen(this.#_textFormat, this.#_startValue);
        for (let item of gen) {
            yield item;
        }
    }
}

/**
 * @class moyal.test.AutoNumbering
 *
 * Extends {@link moyal.test.SequentialText} to support formatted auto-numbered items like `"1. Step A"`.
 * 
 * Useful for numbering tests, documentation sections, or steps in a procedure.
 *
 * Example:
 * ```js
 * const an = new moyal.test.AutoNumbering();
 * an.next("Initialize DB"); // "1. Initialize DB"
 * an.next("Check Schema");  // "2. Check Schema"
 * ```
 */
moyal.test.AutoNumbering = class extends moyal.test.SequentialText {
    /**
     * Constructs an auto-numbering generator that prefixes a number to each item.
     * 
     * This is a convenience wrapper around `SequentialText` for cases where you want
     * numbered outputs like "1. Item A", "2. Item B", etc.
     * 
     * @param {number} [startValue=1] - Starting number for the sequence.
     * @param {string} [numberingTextFormat="{0}. "] - Format for the numeric prefix.
     *        The string must contain "{0}" as a placeholder.
     */
    constructor(startValue = 1, numberingTextFormat = "{0}. ") {
        numberingTextFormat ??= "{0}. ";
        if(!_InternalUtils.isString(numberingTextFormat) || numberingTextFormat.indexOf("{0}") < 0) 
            throw new Error("Automatic numbering format must include {0}");

        super(numberingTextFormat, startValue ?? 1);
    }

    /**
     * Generates the next string in the sequence by prefixing a number to the given text.
     * 
     * This method calls the base `next()` to get the current number
     * and appends the optional string after it.
     * 
     * @param {string} [text=""] - Optional content to append after the number.
     * @returns {string} Numbered string like "1. Hello"
     */
    next(text) { return super.next() + (text ?? ""); }
}

/**
 * @class moyal.test.MultiLevelAutoNumbering
 *
 * A hierarchical auto-numbering utility supporting nested sequences like:
 * ```
 * 1.
 * 1.1.
 * 1.2.
 * 2.
 * 2.1.1.
 * ```
 * 
 * Internally uses a stack of {@link moyal.test.AutoNumbering} instances, one for each level.
 * Supports `nest()` to go deeper and `unnest()` to go back.
 *
 * Example:
 * ```js
 * const ml = new moyal.test.MultiLevelAutoNumbering();
 * ml.next("Root A");           // "1. Root A"
 * ml.nest().next("Child A");   // "1.1. Child A"
 * ml.next("Child B");         // "1.2. Child B"
 * ml.unnest().next("Root B");  // "2. Root B"
 * ml.next("Root C");           // "3. Root B"
 * ```
 */
moyal.test.MultiLevelAutoNumbering = class {
    /** @type {string} Stores the most recent result to calculate the nested prefix */
    #_current = "";

    /** @type {moyal.test.AutoNumbering[]} Stack of AutoNumbering generators, one per nesting level */
    #_an = [];

    /** @type {number} The start value of the auto numbering */
    #_startValue = 1;

    /**
     * Creates a new multi-level auto-numbering generator.
     * 
     * Only the default format `"{0}. "` is supported — other formats are not allowed.
     *
     * @param {number} [startValue=1] - The starting number for the top-level counter.
     * 
     * @throws {Error} If a custom numbering format is provided.
     */
    constructor(startValue) {
        this.#_startValue = startValue ?? 1;
        this.reset();
    }

    /**
     * Resets this instance of {@link moyal.test.MultiLevelAutoNumbering}.
     */ 
    reset(){
        this.#_current = "";
        this.#_an.length = 0;
        this.#_an.push(new moyal.test.AutoNumbering(this.#_startValue, null));
    }

    /**
     *  Gets the current nesting level (1 = root).
     * 
     * @returns {number} Current nesting level (1 = root) 
     * */
    get level() { return this.#_an.length; }

    /**
     * Returns the next string in the current nesting level.
     * 
     * @param {string} [text] - Optional content to append after the number (e.g., a title).
     * @returns {string} Formatted numbered string like `1. Title` or `2.3. Another`.
     */
    next(text) {
        this.#_current = this.#_an[this.#_an.length - 1].next();
        return this.#_current + (text ?? "");
    }

    /**
     * Increases the nesting level (e.g., goes from `2.` to `2.1.`, or from `1.2.` to `1.2.1.`).
     * 
     * The new level resets its own counter, while prefixing the last generated parent string.
     * 
     * @param {number} [startValue=1] - Starting number for the new level.
     * @returns {moyal.test.MultiLevelAutoNumbering} The current instance (for chaining).
     */
    nest(startValue) {
        let nxtFormat = this.#_current.trim();
        nxtFormat += "{0}. ";
        this.#_an.push(new moyal.test.AutoNumbering(startValue ?? 1, nxtFormat));
        return this;
    }

    /**
     * Decreases the nesting level (e.g., goes from `1.1.1.` to `1.1.`).
     * 
     * Does nothing if already at the top-level (level 1).
     *
     * @returns {moyal.test.MultiLevelAutoNumbering} The current instance (for chaining).
     */
    unnest() { 
        if(this.#_an.length > 1)
            this.#_an.pop();
        return this;
    }
}

/**
 * Internal class used by assertions to carry both the result of a test evaluation
 * and any associated metadata (such as expected/actual values) for logging.
 *
 * @private
 * @class
 */
class TestInternalResult{
    /**
     * @type {boolean} Indicates if the test passed or failed.
     */
    _result = null;

    /**
     * @type {any} Additional context (e.g., expected/actual values) to display with the result.
     */
    _additionalData = null;

    /**
     * Constructs a new result object for use in lazy assertions.
     *
     * @param {boolean} result - The outcome of the test (true/false).
     * @param {any} additionalData - Extra metadata to assist in diagnostics (optional).
     */
    constructor(result, additionalData) {
        this._result = result;
        this._additionalData = additionalData;
    }
}

/**
 * @class moyal.test.BaseTest
 *
 * Abstract base class for all test types.
 * 
 * Provides a unified interface for managing test name, success/failure status, timing, and output.
 * Subclasses must override the `_run_impl()` method to implement test logic.
 * @abstract
 */
moyal.test.BaseTest = class {
    /** @type {string} */
    #_testName = null;
    
    /** @type {boolean} */
    #_succeeded = true;

    /** @type {string} */
    #_successMessage = null;

    /** @type {string} */
    #_failureMessage = null;

    /** @type {any} */
    #_additionalData = null;

    /** @type {Array<Error>} */
    #_errors = [];

    /** @type {number} */
    #_elapsed = 0;

    /**
     * Base class for all test types.
     * 
     * This class defines the common interface for test name, result summary,
     * success/failure messages, optional data, and a way to log results.
     *
     * @param {string} testName - The name of the test (must be string).
     * @param {string} [successMessage="success"] - Message when the test passes.
     * @param {string} [failureMessage="failure"] - Message when the test fails.
     * @param {any} [additionalData] - Arbitrary data to show with test output.
     */
    constructor(testName, successMessage, failureMessage, additionalData) {
        if (!_InternalUtils.isString(testName)) { throw new Error("testName must be string"); }
        if (successMessage != null && !_InternalUtils.isString(successMessage)) { throw new Error("successMessage must be string, null or undefined"); }
        if (failureMessage != null && !_InternalUtils.isString(failureMessage)) { throw new Error("failureMessage must be string, null or undefined"); }
        this.#_testName = testName;
        this.#_successMessage = successMessage ?? "success";
        this.#_failureMessage = failureMessage ?? "failure";
        this.#_additionalData = additionalData;
	}

    /** @returns {string} The name of the test */
    get name() { return this.#_testName; }

    /** @returns {string} The message to display on test success */
    get successMessage() { return this.#_successMessage; }

    /** @returns {string} The message to display on test failure */
    get failureMessage() { return this.#_failureMessage; }

    /**
     * Gets the duration in milliseconds.
     * 
     * @returns {number} The duration in milliseconds. */
    get elapsed() { return this.#_elapsed; } /* milliseconds*/

    /** 
     * Sets the time elapsed.
     * 
     * @param {number} value - Duration in milliseconds
     */
    set elapsed(value) {  this.#_elapsed = value; } /* milliseconds*/

    /** @returns {boolean} Whether the test passed — overridden in derived classes */
    get succeeded() { return this.#_succeeded;}
    
    /**
     * Sets a value indicating whether the test passed.
     * @param {boolean} value - A value indicating whether the test passed.
     */
    set succeeded(value) { this.#_succeeded = (value === true);}

    /** @returns {boolean} Whether the test failed (inverse of succeeded) */
    get failed() { return this.succeeded !== true; }

    /** @returns {Array<Error>} List of errors associated with the test */
    get errors() { return this.#_errors; }

    /** @returns {number} Count of errors (possibly from child tests) */
    get errorCount() { return this.errors.length; } /* might be the count of inner tests' errors, so in derived class might be positive even though the errors collection is null! */
    
    /** 
     * Gets extra information to log with the test.
     * 
     * @returns {any} Extra information to log with the test  
     */
    get additionalData() { return this.#_additionalData; }

    /** 
     * Sets extra information to log with the test.
     * 
     * @param {any} value The additional data.
     */
    set additionalData(value) { this.#_additionalData = value; }

    /**
     * Runs the test and optionally writes its result.
     * 
     * @param {boolean} write - If true, writes the result to the console; 
     *          If false doesn't write the result to the console; 
     *          Otherwise writes only failures to the console.
     * @param {moyal.test.MultiLevelAutoNumbering} [mlAutoNumber] - Optional multi-level automatic numbering to automatically prefix messages with numbers.
     * @returns {boolean} Whether the test passed.
     */
    run(write, mlAutoNumber) { 
        this.succeeded = this._run_impl();
        if (write === true || (write !== false && !this.succeeded)) {
            this.write(mlAutoNumber);
		}
        return this.succeeded;
    }

    /**
     * Runs the test without printing.
     * 
     * @returns {boolean} Whether the test passed.
     * @abstract
     */
    _run_impl() {
        throw new Error("Method 'run_impl()' must be implemented by subclass");
    }

    /**
     * Pushes the specified error to the error list.
     * 
     * @param {Error} e - The error.
     */
    _push_error(e){
        this.#_errors.push(e);
    }

    /**
     * Logs the result of the test to the console.
     * 
     * If the test passes with no errors, it uses a flat `console.log`.
     * If there are errors or additional data, it uses a collapsed group for clarity.
     * @param {moyal.test.MultiLevelAutoNumbering} [mlAutoNumber] - Optional multi-level automatic numbering to automatically prefix messages with numbers. 
     */
    write(mlAutoNumber) {
        if(mlAutoNumber == null || !(mlAutoNumber instanceof moyal.test.MultiLevelAutoNumbering)) 
            mlAutoNumber = null;
        
        const labelName = this.name?.trim() || "(unnamed test)";
        let label = `${(mlAutoNumber?.next() ?? "")}${labelName}: ${(this.succeeded ? this.successMessage : this.failureMessage)} (${this.elapsed} ms`
        let color = this.succeeded ? "green" : "red";
        if (this.errorCount === 0) {
            label += ")";
        }
        else {
            let errorStr = (this.succeeded ? "" : "un") + "expected " + (this.errorCount > 1 ? "errors" : "error");
            label += `, ${this.errorCount} ${errorStr})`;
        }

        if (this.errorCount == 0 && this.additionalData == null) {
            // Simple success case
            moyal.test.logger.log(label, color);
            return;
        }
        
        // Grouped output with errors or extra info
        moyal.test.logger.groupCollapsed(label, color);

        // Show errors if available
        if (this.errorCount > 0) {
            if (this.additionalData != null) {
                moyal.test.logger.groupCollapsed("errors");
            }
            /*
             * Available colors:
             *   "black", "red", "green", "yellow", "blue", "magenta", "cyan", "white", "gray", "lightred", 
             *   "lightgreen", "lightyellow", "lightblue", "lightmagenta", "lightcyan", "lightgray"
             */
            for (let err of this.errors) {
                if(this.succeeded)                    
                    moyal.test.logger.error(err, "black");
                else
                    moyal.test.logger.error(err);
            }
            if (this.additionalData != null) {
                moyal.test.logger.groupEnd();
            }
        }

        // Show additional data if available
        if (this.additionalData != null) {
            if (this.errorCount > 0) {
                moyal.test.logger.groupCollapsed("additional data");
            }
            moyal.test.logger.log(this.additionalData);
            if (this.errorCount > 0) {
                moyal.test.logger.groupEnd();
            }
        }

        moyal.test.logger.groupEnd();
    }
}

/**
 * @class moyal.test.Assert
 *
 * A generic assertion test class that evaluates either a boolean or a function returning boolean.
 * 
 * Inherits from {@link moyal.test.BaseTest}.
 * Typically used for boolean tests or custom logic.
 */
moyal.test.Assert = class extends moyal.test.BaseTest {
    // Holds the test logic, result, context, error and timing info
    /** @type {function|boolean} */
    #_test = null;

    /** @type {any} */
    #_thisArg = null;

    /**
     * A test that evaluates a function or boolean and tracks its result.
     * 
     * If the test value is a function, it's called and timed.
     * If the function throws, it fails and captures the error.
     * 
     * @param {string} testName - Name of the test.
     * @param {Function|boolean} test - Test logic (function or static boolean).
     * @param {string} [successMessage] - Custom message on success.
     * @param {string} [failureMessage] - Custom message on failure.
     * @param {any} [additionalData] - Extra data to log.
     * @param {any} [thisArg=globalThis] - `this` context to bind when calling the function.
     */
    constructor(testName, test, successMessage, failureMessage, additionalData, thisArg) {
        super(testName, successMessage, failureMessage, additionalData);
        this.#_test = test;
        this.#_thisArg = thisArg ?? globalThis;
    }

    /**
     * Runs the test without printing.
     * 
     * @returns {boolean} Whether the test passed.
     * @override
     */
    _run_impl() {
        if (this.#_test === true) 
            return true;

        if (!_InternalUtils.isFunction(this.#_test))
            return false; // Test is neither true nor a function

        let res;
        const t0 = performance.now();
        try {
            let tmp =  this.#_test.call(this.#_thisArg);
            if(tmp instanceof TestInternalResult){
                this.additionalData = tmp._additionalData;
                res = tmp._result === true;
            }
            else {
                res = tmp;
            }
        }
        catch (e) {
            this._push_error(e);
            res = false;
        }
        const t1 = performance.now();
        this.elapsed = t1 - t0;

        return res;
    }
};

/**
 * @class moyal.test.AreEqual
 *
 * A test that compares two values using strict equality (`===`) or a custom comparer function.
 *
 * Inherits from {@link moyal.test.Assert}.
 */
moyal.test.AreEqual = class extends moyal.test.Assert {
    /**
     * Compares two values using `===` or a custom comparer function.
     * Values can be passed directly or as functions for deferred evaluation.
     *
     * @param {string} testName - Name of the test.
     * @param {any|Function} expected - Expected value or function returning it.
     * @param {any|Function} actual - Actual value or function returning it.
     * @param {((a: any, b: any) => boolean) | null | undefined} [comparer] - Optional custom comparison function ((expected, actual) => boolean).
     * @param {any} [thisArg] - Optional context for invoking deferred or comparison functions.
     */
    constructor(testName, expected, actual, comparer, thisArg) {
        // Use the comparer if provided, otherwise compare using strict equality
        let needsDelayedExecution = _InternalUtils.isFunction(expected) || _InternalUtils.isFunction(actual) || _InternalUtils.isFunction(comparer);        
        let test;
        let ad = null;
        if(needsDelayedExecution){
            test = () => {
                let expectedVal = _InternalUtils.isFunction(expected) ? expected.call(thisArg ?? globalThis) : expected;
                let actualVal   = _InternalUtils.isFunction(actual)   ? actual.call(thisArg ?? globalThis)   : actual;

                return new TestInternalResult(
                    _InternalUtils.isFunction(comparer)  ? comparer.call(thisArg ?? globalThis, expectedVal, actualVal) : expectedVal === actualVal,
                    { "expected": expectedVal, "actual": actualVal }
                );
            }
        }
        else {
            test = expected === actual;
            ad = { "expected": expected, "actual": actual };
        }
        super(testName, 
            test, 
            "Expected and actual values matched", 
            "Expected and actual values did not match", 
            ad,
            thisArg);
    }
}

/**
 * @class moyal.test.AreNotEqual
 *
 * A test that verifies two values are **not equal** using strict inequality (`!==`)
 * or a custom comparer function that is expected to return `false`.
 *
 * This test passes when `actual !== not_expected`, or when the `comparer` returns `false`.
 *
 * Inherits from {@link moyal.test.Assert}.
 *
 * Example:
 * ```js
 * new moyal.test.AreNotEqual("Should be different", 42, value);
 * new moyal.test.AreNotEqual("Custom inequality", a, b, (a, b) => deepCompare(a, b));
 * ```
 */
moyal.test.AreNotEqual = class extends moyal.test.Assert {
    /**
     * Constructs a new inequality assertion.
     *
     * @param {string} testName - Name of the test.
     * @param {any|Function} not_expected - Value the actual result must NOT match.
     * @param {any|Function} actual - Actual value or function returning it.
     * @param {((a: any, b: any) => boolean) | null | undefined} [comparer] - Optional custom comparison function ((not_expected, actual) => boolean).
     * @param {any} [thisArg] - Optional context for invoking deferred or comparison functions.
     */
    constructor(testName, not_expected, actual, comparer, thisArg) {
        // Use the comparer if provided, otherwise compare using strict equality
        let needsDelayedExecution = _InternalUtils.isFunction(not_expected) || _InternalUtils.isFunction(actual) || _InternalUtils.isFunction(comparer);        
        let test;
        let ad = null;
        if(needsDelayedExecution){
            test = () => {
                let not_expectedVal = _InternalUtils.isFunction(not_expected) ? not_expected.call(thisArg ?? globalThis) : not_expected;
                let actualVal   = _InternalUtils.isFunction(actual)   ? actual.call(thisArg ?? globalThis)   : actual;

                return new TestInternalResult(
                    _InternalUtils.isFunction(comparer) ? !comparer.call(thisArg ?? globalThis, not_expectedVal, actualVal) : not_expectedVal !== actualVal,
                    { "not_expected": not_expectedVal, "actual": actualVal }
                );
            }
        }
        else {
            test = not_expected !== actual;
            ad = { "not_expected": not_expected, "actual": actual };
        }

        super(testName, 
            test, 
            "Actual value did not match the disallowed value (as expected!)",
            "Actual value matched the disallowed value (not as expected!)",
            ad,
            thisArg);
    }
}

/**
 * @class moyal.test.IsTrue
 *
 * A test that asserts the actual value is strictly `true`.
 * 
 * Can accept a boolean value or a function returning boolean.
 *
 * Inherits from {@link moyal.test.Assert}.
 */
moyal.test.IsTrue = class extends moyal.test.AreEqual {
    /**
     * Asserts that a value is strictly `true`.
     *
     * @param {string} testName - The name of the test.
     * @param {any|Function} actual - The value or function to evaluate.
     * @param {any} [thisArg] - Optional context in which to invoke deferred evaluation.
     */
    constructor(testName, actual, thisArg) {
        super(testName, true, actual, null, thisArg);
    }
}

/**
 * @class moyal.test.IsFalse
 *
 * A test that asserts the actual value is strictly `false`.
 * 
 * Can accept a boolean value or a function returning boolean.
 *
 * Inherits from {@link moyal.test.Assert}.
 */
moyal.test.IsFalse = class extends moyal.test.AreEqual {
    /**
     * Asserts that a value is strictly `false`.
     *
     * @param {string} testName - The name of the test.
     * @param {any|Function} actual - The value or function to evaluate.
     * @param {any} [thisArg] - Optional context for evaluation.
     */
    constructor(testName, actual, thisArg) {
        super(testName, false, actual, null, thisArg);
    }
}

/**
 * @class moyal.test.IsNull
 *
 * A test that asserts the actual value is strictly `null`.
 *
 * Inherits from {@link moyal.test.Assert}.
 *
 * Example:
 * ```js
 * moyal.test.isNull("Should be null", myValue);
 * ```
 */
moyal.test.IsNull = class extends moyal.test.AreEqual {
    /**
     * Constructs a null-check assertion.
     *
     * @param {string} testName - Descriptive name of the test.
     * @param {any|Function} actual - Value to test or function that returns it.
     * @param {any} [thisArg] - Optional context for function calls.
     */
    constructor(testName, actual, thisArg) {
        super(testName, null, actual, null, thisArg);
    }
}

/**
 * @class moyal.test.IsNotNull
 *
 * A test that asserts the actual value is **not** `null`.
 *
 * Inherits from {@link moyal.test.Assert}.
 *
 * Example:
 * ```js
 * moyal.test.isNotNull("Should not be null", myValue);
 * ```
 */
moyal.test.IsNotNull = class extends moyal.test.AreNotEqual {
    /**
     * Constructs a not-null assertion.
     *
     * @param {string} testName - Descriptive name of the test.
     * @param {any|Function} actual - Value to check.
     * @param {any} [thisArg] - Optional context for invocation.
     */
    constructor(testName, actual, thisArg) {
        super(testName, null, actual, null, thisArg);
    }
}

/**
 * @class moyal.test.IsDefined
 *
 * A test that asserts the actual value is **not** `undefined`.
 *
 * Inherits from {@link moyal.test.Assert}.
 *
 * Example:
 * ```js
 * moyal.test.isDefined("Value should be defined", myValue);
 * ```
 */
moyal.test.IsDefined = class extends moyal.test.AreNotEqual {
    /**
     * Constructs a defined-check assertion.
     *
     * @param {string} testName - Descriptive name of the test.
     * @param {any|Function} actual - Value to evaluate or function to call.
     * @param {any} [thisArg] - Optional context for evaluation.
     */
    constructor(testName, actual, thisArg) {
        super(testName, undefined, actual, null, thisArg);
    }
}

/**
 * @class moyal.test.IsUndefined
 *
 * A test that asserts the actual value is strictly `undefined`.
 *
 * Inherits from {@link moyal.test.Assert}.
 *
 * Example:
 * ```js
 * moyal.test.isUndefined("Should be undefined", maybeMissing);
 * ```
 */
moyal.test.IsUndefined = class extends moyal.test.AreEqual {
     /**
     * Constructs an undefined-check assertion.
     *
     * @param {string} testName - Descriptive name of the test.
     * @param {any|Function} actual - Value to test or a function that returns it.
     * @param {any} [thisArg] - Optional context for deferred invocation.
     */
    constructor(testName, actual, thisArg) {
        super(testName, undefined, actual, null, thisArg);
    }
}

/**
 * @class moyal.test.ThrowsBase
 *
 * Base class for tests that evaluate whether a function throws or not.
 * 
 * Supports optional error validation via predicate functions.
 *
 * Inherits from {@link moyal.test.Assert}.
 * Not used directly — use {@link moyal.test.Throws} or {@link moyal.test.NoThrows} instead.
 */
moyal.test.ThrowsBase = class extends moyal.test.Assert {
    /** @type {function} */
    #_checkErrorFn = null;

    /** @type {any} */
    #_thisArg = null;

    /** @type {boolean} */
    #_expected = true;

    /**
     * Base class to test whether a function throws (or not), and optionally validate the error thrown.
     *
     * @param {string} testName - Name of the test.
     * @param {boolean} expectingError - Whether an error is expected (`true` = should throw).
     * @param {Function} fn - Function to test.
     * @param {Function|null|undefined} [checkErrorFn] - Optional error predicate to validate the thrown error.
     * @param {any} [thisArg] - Optional `this` context for invoking the test/check function.
     */
    constructor(testName, expectingError, fn, checkErrorFn, thisArg) {
        expectingError = (expectingError === true);
        const errWasThrownAsExpected = "An error was thrown (as expected)!"; 
        const errWasNotThrownAsExpected = "An error was NOT thrown (as expected)."; 
        const errExpectedFail = "Expected an error, but none was thrown or it did not satisfy the predicate."; 
        const errWasThrownAsUnexpectedly = "An error was not thrown (unexpectedly)."; 

        super(testName, fn, 
            expectingError ? errWasThrownAsExpected : errWasNotThrownAsExpected, 
            expectingError ? errExpectedFail : errWasThrownAsUnexpectedly, 
            thisArg);
        if (!_InternalUtils.isFunction(fn)) { throw new Error("fn parameter must be a function"); }
        if (expectingError && checkErrorFn != null && !_InternalUtils.isFunction(checkErrorFn)) { throw new Error("checkErrorFn parameter must be a function, null or undefined"); }
        this.#_expected = expectingError;
        this.#_thisArg = thisArg;
        this.#_checkErrorFn = checkErrorFn;
    }

    
    /**
     * Executes the test, checking if an error was thrown and optionally applying a predicate on the error.
     * 
     * @returns {boolean} Whether the test passed.
     * @override
     *
     */
    _run_impl() {
        const basePassed = super._run_impl();

        if (!basePassed && this.errors.length === 1) {
            return this.#_expected && (this.#_checkErrorFn == null || this.#_checkErrorFn.call(this.#_thisArg, this.errors[0]) === true);
        }
        return !this.#_expected; 
    }
}

/**
 * @class moyal.test.Throws
 *
 * A test that expects a function to throw an exception.
 * 
 * You may optionally provide a predicate to verify the thrown error.
 *
 * Inherits from {@link moyal.test.ThrowsBase}.
 */
moyal.test.Throws = class extends moyal.test.ThrowsBase {
    /**
     * Tests that a function throws, and optionally that the thrown error satisfies a condition.
     *
     * @param {string} testName - Name of the test.
     * @param {Function} fn - The function that should throw.
     * @param {Function|null|undefined} [checkErrorFn] - Optional error predicate.
     * @param {any} [thisArg] - Optional `this` context.
     */
    constructor(testName, fn, checkErrorFn, thisArg) {
        super(testName, true, fn, checkErrorFn, thisArg);
    }
}

/**
 * @class moyal.test.NoThrows
 *
 * A test that verifies a function does not throw any error.
 *
 * Inherits from {@link moyal.test.ThrowsBase}.
 */
moyal.test.NoThrows = class extends moyal.test.ThrowsBase {
    /**
     * Tests that a function does NOT throw.
     *
     * @param {string} testName - Name of the test.
     * @param {Function|null|undefined} fn - The function to test.
     * @param {any} [thisArg] - Optional `this` context.
     */
    constructor(testName, fn, thisArg) {
        super(testName, false, fn, null, thisArg);
    }
}

/**
 * @class moyal.test.SequencesAreEqual
 *
 * A test that compares two iterable sequences element-by-element for equality.
 * 
 * You can supply a custom item comparison function. Results include index mismatches.
 *
 * Inherits from {@link moyal.test.BaseTest}.
 */
moyal.test.SequencesAreEqual = class extends moyal.test.BaseTest {
    /** @type {Iterable<any>} */
    #_expected = null;

    /** @type {Iterable<any>} */
    #_actual = null;

    /** @type {function} */
    #_itemComparer = null;

    /** @type {boolean} */
    #_validIterables = true;

    /** @type {any} */
    #_thisArg = null;

    /**
     * Compares two iterable sequences element by element.
     * 
     * @param {string} testName - Name of the test.
     * @param {Iterable<any>} expected - Expected sequence.
     * @param {Iterable<any>} actual - Actual sequence.
     * @param {((a: any, b: any) => boolean) | null | undefined} [itemComparer] - Optional custom comparison function to compare individual items ((expected, actual) => boolean).
     * @param {any} [thisArg] - Optional `this` binding for the itemComparer.
     */
    constructor(testName, expected, actual, itemComparer, thisArg) {
        // Call Assert constructor with all info
        super(testName, `Actual sequence equals to the expected sequence`, `Actual sequence does not equal to the expected sequence)`, null, thisArg);
        this.additionalData = {};

        this.#_expected = expected;
        this.#_actual = actual;
        this.#_itemComparer = itemComparer;
        this.#_thisArg = thisArg;

        // Validate that expected is iterable
        if (!_InternalUtils.isIterable(expected)) {
            this.additionalData["expected"] = "ERROR: 'expected' argument is not iterable!"
            this.#_validIterables = false;
        }

        // Validate that actual is iterable
        if (!_InternalUtils.isIterable(actual)) {
            this.additionalData["actual"] = "ERROR: 'actual' argument is not iterable!"
            this.#_validIterables = false;
        }
    }

    /**
     * Runs the test without printing.
     * 
     * @returns {boolean} Whether the test passed.
     * @override
     */
    _run_impl() {
        if(!this.#_validIterables) 
            return false;
        
        const t0 = performance.now();

        let expectedArr = this.additionalData["expected"] = Array.from(this.#_expected);
        let actualArr = this.additionalData["actual"] = Array.from(this.#_actual);
        let res;

        // Check lengths
        if (expectedArr.length === actualArr.length) {
            // Check individual items
            let indicesDifferent = [];
            for (var i = 0; i < expectedArr.length; i++) {
                let res = this.#_itemComparer != null ? this.#_itemComparer.call(this.#_thisArg ?? undefined, expectedArr[i], actualArr[i]) : expectedArr[i] === actualArr[i];
                if (res !== true) {
                    indicesDifferent.push(i);
                }
            }

            if (indicesDifferent.length > 0)
                this.additionalData["Problem found"] = "Different element indices are: {" + indicesDifferent.join(", ") + "}";

            res = indicesDifferent.length === 0;
        }
        else{
            this.additionalData["Problem found"] = "expected.length !== actual.length";
            res = false;
        }

        const t1 = performance.now();
        this.elapsed = t1 - t0;

        return res;
    }
}

/**
 * @class moyal.test.TestGroup
 *
 * A container for managing and executing multiple tests (or nested groups of tests).
 * 
 * Automatically aggregates success/failure counts and outputs structured logs.
 * 
 * Supports fluent-style chaining:
 * ```js
 * group.isTrue("A", true)
 *      .areEqual("Compare", 1, 1)
 *      .throws("Expect error", () => { throw new Error(); });
 *      .groupStart("another group")
 *              .areEqual("Compare", 3, 3)
 *              .throws("Expect error", () => { throw new Error(); });
 *      .groupClose()
 *      .run();
 * ```
 *
 * Inherits from {@link moyal.test.BaseTest}.
 */
moyal.test.TestGroup = class extends moyal.test.BaseTest {
    /** @type {Array<moyal.test.BaseTest>} */
    #_tests = [];

    /** @type {number} */
    #_directFailureCount = 0;

    /** @type {number} */
    #_totalFailureCount = 0;

    /** @type {number} */
    #_totalErrorCount = 0;

    /** @type {number} */
    #_unexpectedErrorCount = 0;

    /** @type {moyal.test.TestGroup | null} */
    #_parentGroup = null;

    /** @type {boolean|null} */
    #_write = null; // Controls output policy for child test writes (true, false, or conditional)

    /**
     * Creates a new test group to encapsulate multiple tests or nested groups.
     *
     * @param {string} testName - The name/title of this group.
     * @param {...moyal.test.BaseTest} tests - Optional tests or nested groups to immediately add.
     */
    constructor(testName, ...tests) {
        super(testName);
        this.add(...tests);
    }

    /** 
     * Clears all tests in this group. 
     * 
     * @public
     */
    clear() { 
        this.#_tests.length = 0;
        this.#_directFailureCount = 0;
        this.#_totalFailureCount = 0;
        this.#_totalErrorCount = 0;
        this.#_unexpectedErrorCount = 0;
    }

    /** @returns {number} Total number of errors found (including nested groups). */
    get errorCount() { return this.#_totalErrorCount; }

    /**
     * Runs the test and optionally writes its result.
     * 
     * @param {boolean} write - If true, writes the result to the console; 
     *          If false doesn't write the result to the console; 
     *          Otherwise writes only failures to the console.
     * @param {moyal.test.MultiLevelAutoNumbering} [mlAutoNumber] - Optional multi-level automatic numbering to automatically prefix messages with numbers.
     * @returns {boolean} Whether the test passed.
     * @override
     */
    run(write, mlAutoNumber){
        this.#_write = write;
        return super.run(write, mlAutoNumber);
    }
    /**
     * Executes all tests/groups in this group without printing.
     * Aggregates error and timing info, but delays output if `write` is false.*
     
     * @returns {boolean} True if all direct tests succeeded.
     * @override
     */
    _run_impl() {
        this.#_directFailureCount = 0;
        this.#_totalErrorCount = 0;
        this.#_unexpectedErrorCount = 0;
        
        const t0 = performance.now();
        for (let t of this.#_tests) {
            t._run_impl(); 

            this.#_directFailureCount += t.succeeded ? 0 : 1;

            if (t instanceof moyal.test.TestGroup) {
                // Accumulate from nested groups
                this.#_totalFailureCount += t.#_totalFailureCount;
                this.#_unexpectedErrorCount += t.#_unexpectedErrorCount;
            }
            else {
                // Leaf tests
                this.#_totalFailureCount = this.#_directFailureCount;
                this.#_unexpectedErrorCount += t.succeeded ? 0 : t.errorCount;
            }

            this.#_totalErrorCount += t.errorCount;
        }
        const t1 = performance.now();
        this.elapsed = t1 - t0;
        
        return this.#_directFailureCount === 0;
    }

    /**
     * Outputs a summary line and recursively logs all child test results.
     * Uses collapsed group for passed tests and expanded group for failed ones.
     * 
     * @param {moyal.test.MultiLevelAutoNumbering} [mlAutoNumber] - Optional multi-level automatic numbering to automatically prefix messages with numbers.
     * @override
     */
    write(mlAutoNumber) {
        if(mlAutoNumber == null || !(mlAutoNumber instanceof moyal.test.MultiLevelAutoNumbering))
            mlAutoNumber = null;

        let label = `${(mlAutoNumber?.next() ?? "")}${this.name}: (${this.elapsed}ms, `;
        let color;
        if (this.#_directFailureCount === 0) {
            color = "green";
            label += "all passed"
        }
        else {
            color = "red";
            if (this.#_directFailureCount > 0) {
                label += `${this.#_directFailureCount} direct failure${(this.#_directFailureCount === 1 ? "" : "s")}, ${this.#_totalFailureCount} total failure${(this.#_totalFailureCount === 1 ? "" : "s")}`;
            }
        }

        if (this.#_unexpectedErrorCount> 0) {
            label += `, ${this.#_unexpectedErrorCount} unexpected error${(this.#_unexpectedErrorCount > 1 ? "s" : "")}`;
        }

        label += ")";

        if (this.succeeded) {
            moyal.test.logger.groupCollapsed(label, color);
        }
        else {
            moyal.test.logger.group(label, color);
		}
        if(this.#_tests?.length > 0) {
            mlAutoNumber?.nest()
            for (let t of this.#_tests) {
                if(this.#_write === true || (this.#_write == null && !t.succeeded)) {
                    t.write(mlAutoNumber);
                }
            }
            mlAutoNumber?.unnest();
        }
        moyal.test.logger.groupEnd();
    }

    /**
     * Adds tests or groups to this group.
     *
     * @param {...moyal.test.BaseTest} tests - One or more test/group instances.
     */
    add(...tests) {
        this.#_tests.push(...tests);
        for (let t of tests) {
            if (t instanceof moyal.test.TestGroup) {
                t.#_parentGroup = this;
			}
		}
    }

    /**
     * Begins a new nested group and automatically adds it to this group.
     *
     * @param {string} testName - The name of the nested group.
     * @returns {moyal.test.TestGroup} The new nested group.
     */
    groupStart(testName) {
        let grp = new moyal.test.TestGroup(testName);
        this.add(grp);
        return grp;
    }

    /**
     * Ends the current group and returns its parent, if any.
     * Enables fluid chaining of group nesting.
     *
     * @returns {moyal.test.TestGroup} - The parent group or `this` if already root.
     */
    groupClose() {
        return this.#_parentGroup ?? this;
    }

    /**
     * Adds an equality assertion to the group.
     * Checks if `actual === expected`, or uses a custom comparer if provided.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} expected - Expected value.
     * @param {*} actual - Actual value to compare.
     * @param {((a: any, b: any) => boolean) | null | undefined} [comparer] - Optional custom comparison function ((expected, actual) => boolean).
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    areEqual(testName, expected, actual, comparer, thisArg) { this.add(new moyal.test.AreEqual(testName, expected, actual, comparer, thisArg)); return this; }

     /**
     * Adds an inequality assertion to the group.
     * Checks if `actual !== not_expected`, or uses a custom comparer if provided.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} not_expected - The value we're not expecting.
     * @param {*} actual - Actual value to compare.
     * @param {((a: any, b: any) => boolean) | null | undefined} [comparer] - Optional custom comparison function ((expected, actual) => boolean).
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
     areNotEqual(testName, not_expected, actual, comparer, thisArg) { this.add(new moyal.test.AreNotEqual(testName, not_expected, actual, comparer, thisArg)); return this; }

    /**
     * Adds an assertion to the group that verifies a value is `true`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `true`.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    isTrue(testName, actual, thisArg = null) { this.add(new moyal.test.IsTrue(testName, actual, thisArg)); return this; }

    /**
     * Adds an assertion to the group that verifies a value is `false`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `false`.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    isFalse(testName, actual, thisArg) { this.add(new moyal.test.IsFalse(testName, actual, thisArg)); return this; }

    /**
     * Adds an assertion to the group that verifies a value is strictly `null`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `null`.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    isNull(testName, actual, thisArg) { this.add(new moyal.test.IsNull(testName, actual, thisArg)); return this; }
    
    /**
     * Adds an assertion to the group that verifies a value is **not** `null`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is not `null`.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    isNotNull(testName, actual, thisArg = null) {this.add(new moyal.test.IsNotNull(testName, actual, thisArg)); return this;}

     /**
     * Adds an assertion to the group that verifies a value is **not** `undefined`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is defined.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    isDefined(testName, actual, thisArg = null) { this.add( new moyal.test.IsDefined(testName, actual, thisArg));  return this;}

    /**
     * Adds an assertion to the group that verifies a value is strictly `undefined`.
     *
     * @param {string} testName - Descriptive test title.
     * @param {*} actual - Value to assert is `undefined`.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    isUndefined(testName, actual, thisArg = null) { this.add( new moyal.test.IsUndefined(testName, actual, thisArg));  return this;}
    
    /**
     * Adds an assertion that verifies a function throws an error.
     * Optionally verifies the error with a predicate.
     *
     * @param {string} testName - Descriptive test title.
     * @param {Function} fn - Function expected to throw.
     * @param {(err: any) => boolean} [checkErrorFn] - Optional predicate to inspect the thrown error.
     * @param {any} [thisArg] - Optional context for evaluation.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    throws(testName, fn, checkErrorFn, thisArg = null) { this.add(new moyal.test.Throws(testName, fn, checkErrorFn, thisArg)); return this; }

    /**
     * Adds an assertion that verifies a function does NOT throw.
     *
     * @param {string} testName - Descriptive test title.
     * @param {Function} fn - Function expected to execute without throwing.
     * @param {object} [thisArg] - Optional `this` binding for `fn`.
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    noThrows(testName, fn, thisArg = null) { this.add(new moyal.test.NoThrows(testName, fn, thisArg)); return this; }

    /**
     * Adds a sequence equality assertion to the group.
     * Compares two iterable sequences element-by-element.
     *
     * @param {string} testName - Descriptive test title.
     * @param {Iterable} expected - The expected iterable sequence.
     * @param {Iterable} actual - The actual iterable sequence.
     * @param {((a: any, b: any) => boolean) | null | undefined} [itemComparer] - Optional custom item-level comparison function ((expected, actual) => boolean).
     * @returns {moyal.test.TestGroup} The current test group (for chaining).
     */
    sequencesAreEqual(testName, expected, actual, itemComparer) { this.add(new moyal.test.SequencesAreEqual(testName, expected, actual, itemComparer)); return this; }
}

export default moyal.test;