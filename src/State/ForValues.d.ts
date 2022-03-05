import { CanBeState } from "../PubTypes";
import { ValueType } from "../Types";

type MapInputValue<In, Out> = In extends Array<any>
	? Array<Out>
	: In extends Map<infer K, any>
	? Map<K, Out>
	: In extends Set<infer K>
	? Map<K, Out>
	: In extends Record<infer K, any>
	? Record<K, Out>
	: Record<keyof In, Out>;
export declare interface ForValues<T> {
	type: "State";
	kind: "ForValues";
	/**
	 * Returns the current value of this ForValues object.
	 * The object will be registered as a dependency unless `asDependency` is false.
	 */
	get(asDependency?: boolean): T;
}
/**
 * Constructs a new ForValues object which maps values of a table using
 * a `processor` function.
 *
 * Optionally, a `destructor` function can be specified for cleaning up values.
 * If omitted, the default cleanup function will be used instead.
 *
 * Additionally, a `meta` table/value can optionally be returned to pass data created
 * when running the processor to the destructor when the created object is cleaned up.
 */
export declare function ForValues<In, Out, Meta>(
	input: CanBeState<In>,
	processor: (value: ValueType<In>) => Out | LuaTuple<[Out, Meta]>,
	destructor?: (value: Out, meta: Meta) => void,
): ForValues<MapInputValue<In, Out>>;
