/**
 * File: src/utilClasses/MultiLevelAutoNumbering.js
 */

import { AutoNumbering } from "./AutoNumbering.js";


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
export class MultiLevelAutoNumbering {
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