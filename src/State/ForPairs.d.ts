import { CanBeState } from "../PubTypes";
import { KeyType, ValueType } from "../Types";

type MapInputValue<In, OutKey, OutValue> = [In, OutKey] extends [Array<any>, number]
	? Array<OutValue>
	: In extends Map<any, any>
	? Map<OutKey, OutValue>
	: [In, OutValue] extends [Set<any>, true]
	? Set<OutKey>
	: OutKey extends string | number | symbol
	? Record<OutKey, OutValue>
	: Map<OutKey, OutValue>;
export declare interface ForPairs<T> {
	type: "State";
	kind: "ForPairs";
	/**
	 * Returns the current value of this ForPairs object.
	 * The object will be registered as a dependency unless `asDependency` is false.
	 */
	get(asDependency?: boolean): T;
}
/**
 * **TS note**: The types for ForPairs may be unsafe. Prefer using ForKeys or ForValues.
 *
 * Constructs a new ForPairs object which maps pairs of a table using
 * a `processor` function.
 *
 * Optionally, a `destructor` function can be specified for cleaning up values.
 * If omitted, the default cleanup function will be used instead.
 *
 * Additionally, a `meta` table/value can optionally be returned to pass data created
 * when running the processor to the destructor when the created object is cleaned up.
 */
export declare function ForPairs<In, OutKey, OutValue, Meta>(
	input: CanBeState<In>,
	processor: (key: KeyType<In>, value: ValueType<In>) => LuaTuple<[OutKey, OutValue, Meta?]>,
	destructor?: (key: OutKey, value: OutValue) => void,
): ForPairs<MapInputValue<In, OutKey, OutValue>>;
