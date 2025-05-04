/*!
 * File: src/utilClasses/_InternalUtils.js 
 */

/**
 * A set of internal utility functions for type checking.
 * @ignore
 */
class InternalUtils {
	static #_now;
	
	static {
		// Safe timer that always exists
		this.#_now = (typeof performance !== "undefined" && typeof performance.now === "function")
		? () => performance.now() : () => Date.now();
	}

	/**
	 * 
	 * @returns {Number}
	 * @ignore
	 */
	static now() {
		return this.#_now();
	}

	/**
	 * Checks if an object is a string.
	 * @param {*} obj - The object to test.
	 * @returns {boolean} True if the object is a string.
	 * @ignore
	 */
	static isString(obj) { return typeof obj === "string" || Object.prototype.toString.call(obj) === "[object String]"; }

	/**
	 * Checks if an object is iterable (i.e., supports Symbol.iterator).
	 * @param {*} obj - The object to check.
	 * @returns {boolean} True if it's iterable.
	 * @ignore
	 */
	static isIterable(obj) { return InternalUtils.isFunctionOrGeneratorFunction(obj?.[Symbol.iterator]); }

	/**
	 * Checks if an object is a function.
	 * @param {*} obj - The object to check.
	 * @returns {boolean} True if the object is a function.
	 * @ignore
	 */
	static isFunction(obj) {
		let too = typeof obj;
		return (too === "object" || too === "function") && Object.prototype.toString.call(obj) === "[object Function]";
	}

	/**
	 * Checks if an object is either a normal function or a generator function.
	 * @param {*} obj - The object to check.
	 * @returns {boolean} True if the object is a function or generator function.
	 * @ignore
	 */
	static isFunctionOrGeneratorFunction(obj) {
		const typeOfObj = typeof obj;
		if (typeOfObj !== "function" && typeOfObj !== "object") return false;
		
		const tag = Object.prototype.toString.call(obj);
		return tag === "[object Function]" || tag === "[object GeneratorFunction]";
	}
}

export {
	InternalUtils
};