/*!
 * File: src/Utils.js
 */

import InternalUtils from "./_InternalUtils.js";

/**
 * @class SequentialText
 *
 * A utility class that generates a sequence of formatted strings like `"1"`, `"2"`, etc., using a
 * text template such as `"{0}"` or `"Step {0}"`.
 * 
 * Supports resetting and iteration with `for...of`.
 *
 * Example:
 * ```js
 * const st = new SequentialText("Item {0}", 1);
 * st.next(); // "Item 1"
 * st.next(); // "Item 2"
 * ```
 */
class SequentialText {
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
        this.#_gen = SequentialText.#_sequentialTextGen(this.#_textFormat, this.#_startValue);
    }

    /**
     * Returns the next generated formatted string.
     * 
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
        let gen = SequentialText.#_sequentialTextGen(this.#_textFormat, this.#_startValue);
        for (let item of gen) {
            yield item;
        }
    }
}

/**
 * @class AutoNumbering
 *
 * Extends {@link SequentialText} to support formatted auto-numbered items like `"1. Step A"`.
 * 
 * Useful for numbering tests, documentation sections, or steps in a procedure.
 *
 * Example:
 * ```js
 * const an = new AutoNumbering();
 * an.next("Initialize DB"); // "1. Initialize DB"
 * an.next("Check Schema");  // "2. Check Schema"
 * ```
 */
class AutoNumbering extends SequentialText {
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
        if(!InternalUtils.isString(numberingTextFormat) || numberingTextFormat.indexOf("{0}") < 0) 
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
 * @class MultiLevelAutoNumbering
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
 * Internally uses a stack of {@link AutoNumbering} instances, one for each level.
 * Supports `nest()` to go deeper and `unnest()` to go back.
 *
 * Example:
 * ```js
 * const ml = new MultiLevelAutoNumbering();
 * ml.next("Root A");           // "1. Root A"
 * ml.nest().next("Child A");   // "1.1. Child A"
 * ml.next("Child B");         // "1.2. Child B"
 * ml.unnest().next("Root B");  // "2. Root B"
 * ml.next("Root C");           // "3. Root B"
 * ```
 */
class MultiLevelAutoNumbering{
    /**
     * Stores the most recent result to calculate the nested prefix 
     * 
     * @type {string}  
     * */
    #_current = "";

    /**
     * Stack of AutoNumbering generators, one per nesting level
     *  
     * @type {AutoNumbering[]} 
     * */
    #_an = [];

    /**
     * The start value of the auto numbering
     * 
     *  @type {number}  
     */
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
     * Resets this instance of {@link MultiLevelAutoNumbering}.
     */ 
    reset(){
        this.#_current = "";
        this.#_an.length = 0;
        this.#_an.push(new AutoNumbering(this.#_startValue, null));
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
     * @returns {MultiLevelAutoNumbering} The current instance (for chaining).
     */
    nest(startValue) {
        let nxtFormat = this.#_current.trim();
        nxtFormat += "{0}. ";
        this.#_an.push(new AutoNumbering(startValue ?? 1, nxtFormat));
        return this;
    }

    /**
     * Decreases the nesting level (e.g., goes from `1.1.1.` to `1.1.`).
     * 
     * Does nothing if already at the top-level (level 1).
     *
     * @returns {MultiLevelAutoNumbering} The current instance (for chaining).
     */
    unnest() { 
        if(this.#_an.length > 1)
            this.#_an.pop();
        return this;
    }
}

// Bundle all loggers together (optional default export)
const MoyalTestUtils = {
    SequentialText,
    AutoNumbering,
    MultiLevelAutoNumbering
};

export default MoyalTestUtils;

export {
    SequentialText,
    AutoNumbering,
    MultiLevelAutoNumbering
};