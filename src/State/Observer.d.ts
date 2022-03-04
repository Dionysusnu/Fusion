import { StateObject } from "../PubTypes";

export declare interface Observer {
	type: "State";
	kind: "Observer";
	/**
	 * Adds a change listener. When the watched state changes value, the listener
	 * will be fired.
	 *
	 * Returns a function which, when called, will disconnect the change listener.
	 * As long as there is at least one active change listener, this Observer
	 * will be held in memory, preventing GC, so disconnecting is important.
	 */
	onChange(callback: () => void): () => void;
}
/**
 * Constructs a new state object which can listen for updates on another state
 * object.
 */
export declare function Observer(watchedState: StateObject<any>): Observer;
