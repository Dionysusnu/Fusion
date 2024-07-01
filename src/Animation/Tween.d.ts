import { CanBeState, StateObject } from "../PubTypes";

export declare interface Tween<T> {
	type: "State";
	kind: "Tween";
	/**
	 * Returns the current value of this Tween object.
	 * The object will be registered as a dependency unless `asDependency` is false.
	 */
	get(asDependency?: boolean): T;
}
/**
 * Constructs a new computed state object, which follows the value of another
 * state object using a tween.
 */
export declare function Tween<T>(goalState: StateObject<T>, tweenInfo?: CanBeState<TweenInfo>): Tween<T>;
