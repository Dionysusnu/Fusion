import { CanBeState, StateObject } from "../PubTypes";
import { KeyType, ValueType } from "../Types";

type MapInputValue<In, OutKey> = [In, OutKey] extends [Array<infer V>, number]
	? Array<V>
	: In extends Map<any, infer V>
	? Map<OutKey, V>
	: In extends Set<any>
	? Set<OutKey>
	: OutKey extends string | number | symbol
	? Record<OutKey, ValueType<In>>
	: Map<OutKey, ValueType<In>>;
export declare interface ForKeys<T> extends StateObject<T> {
	type: "State";
	kind: "ForKeys";
	/**
	 * Returns the current value of this ForKeys object.
	 * The object will be registered as a dependency unless `asDependency` is false.
	 */
	get(asDependency?: boolean): T;
}
/**
 * Constructs a new ForKeys state object which maps keys of an array using
 * a `processor` function.
 *
 * Optionally, a `destructor` function can be specified for cleaning up
 * calculated keys. If omitted, the default cleanup function will be used instead.
 *
 * Optionally, a `meta` value can be returned in the processor function as the
 * second value to pass data from the processor to the destructor.
 */
export declare function ForKeys<In, Out, Meta>(
	input: CanBeState<In>,
	processor: (key: KeyType<In>) => Out | LuaTuple<[Out, Meta]>,
	destructor?: (key: Out, meta: Meta) => void,
): ForKeys<MapInputValue<In, Out>>;
