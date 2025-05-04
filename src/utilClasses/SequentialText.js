/**
 * File: src/utilClasses/SequentialText.js
 */

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
export class SequentialText {
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