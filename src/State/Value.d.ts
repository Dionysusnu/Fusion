export declare interface Value<T> {
	type: "State";
	kind: "Value";
	/**
	 * Returns the value currently stored in this State object.
	 * The state object will be registered as a dependency unless `asDependency` is
	 * false.
	 */
	get(asDependency?: boolean): T;
	/**
	 * Updates the value stored in this State object.
	 *
	 * If `force` is enabled, this will skip equality checks and always update the
	 * state object and any dependents - use this with care as this can lead to
	 * unnecessary updates.
	 */
	set(value: T, force?: boolean): void;
}
/**
 * Constructs and returns objects which can be used to model independent
 * reactive state.
 */
export declare function Value<T>(initialValue: T): Value<T>;
