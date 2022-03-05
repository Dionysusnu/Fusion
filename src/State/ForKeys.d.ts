import { CanBeState } from "../PubTypes";
import { KeyType } from "../Types";

type MapInputValue<In, OutValue> = In extends Array<any>
	? Array<OutValue>
	: In extends Map<infer K, any>
	? Map<K, OutValue>
	: In extends Set<infer K>
	? Map<K, OutValue>
	: In extends Record<infer K, any>
	? Record<K, OutValue>
	: Record<keyof In, OutValue>;
export declare interface ForKeys<T> {
	type: "State";
	kind: "ForKeys";
	/**
	 * Returns the current value of this ForKeys object.
	 * The object will be registered as a dependency unless `asDependency` is false.
	 */
	get(asDependency?: boolean): T;
}
/**
 * Constructs a new ForKeys object which maps keys of a table using
 * a `processor` function.
 *
 * Optionally, a `destructor` function can be specified for cleaning up values.
 * If omitted, the default cleanup function will be used instead.
 *
 * Additionally, a `meta` table/value can optionally be returned to pass data created
 * when running the processor to the destructor when the created object is cleaned up.
 */
export declare function ForKeys<In, Out, Meta>(
	input: CanBeState<In>,
	processor: (key: KeyType<In>) => Out | LuaTuple<[Out, Meta]>,
	destructor?: (key: Out, meta: Meta) => void,
): ForKeys<MapInputValue<In, Out>>;
