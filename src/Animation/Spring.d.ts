import { CanBeState, StateObject } from "../PubTypes";

export declare interface Spring<T> extends StateObject<T> {
	type: "State";
	kind: "Spring";
	/**
	 * Returns the current value of this Spring object.
	 * The object will be registered as a dependency unless `asDependency` is false.
	 */
	get(asDependency?: boolean): T;
	/**
	 * Sets the position of the internal springs, meaning the value of this
	 * Spring will jump to the given value. This doesn't affect velocity.
	 *
	 * If the type doesn't match the current type of the spring, an error will be
	 * thrown.
	 */
	setPosition(position: T): void;
	/**
	 * Sets the velocity of the internal springs, overwriting the existing velocity
	 * of this Spring. This doesn't affect position.
	 *
	 * If the type doesn't match the current type of the spring, an error will be
	 * thrown.
	 */
	setVelocity(velocity: T): void;
	/**
	 * Adds to the velocity of the internal springs, on top of the existing
	 * velocity of this Spring. This doesn't affect position.
	 *
	 * If the type doesn't match the current type of the spring, an error will be
	 * thrown.
	 */
	addVelocity(velocity: T): void;
}
/**
 * Constructs a new computed state object, which follows the value of another
 * state object using a spring simulation.
 */
export declare function Spring<T>(
	goalState: StateObject<T>,
	speed?: CanBeState<number>,
	damping?: CanBeState<number>,
): Spring<T>;
