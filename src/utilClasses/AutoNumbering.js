/**
 * File: src/utilClasses/AutoNumbering.js
 */

import { InternalUtils } from "./_InternalUtils.js"
import { SequentialText } from "./SequentialText.js";

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
export class AutoNumbering extends SequentialText {
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
