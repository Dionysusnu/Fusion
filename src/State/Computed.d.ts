export declare interface Computed<T> {
	type: "State";
	kind: "Computed";
	/**
	 * Returns the last cached value calculated by this Computed object.
	 * The computed object will be registered as a dependency unless `asDependency`
	 * is false.
	 */
	get(asDependency?: boolean): T;
}
/**
 * Constructs and returns objects which can be used to model derived reactive
 * state.
 */
export declare function Computed<T>(callback: () => T): Computed<T>;
