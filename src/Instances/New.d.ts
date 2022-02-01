import { ChildrenSymbol } from "../Instances/Children";
import { StateObject } from "../PubTypes";
import { OnChangeSymbol } from "./OnChange";
import { OnEventSymbol } from "./OnEvent";

export type ChildrenValue =
	| Instance
	// StateObject needs to be written out to prevent circular reference error
	| {
			type: "State";
			kind: string;
			get(asDependency?: boolean): ChildrenValue;
	  }
	| Array<ChildrenValue>
	| { [K in any]: ChildrenValue }
	| undefined;

export type NewProperties<T extends Instance> = Partial<
	| {
			[K in keyof WritableInstanceProperties<T>]:
				| WritableInstanceProperties<T>[K]
				| StateObject<WritableInstanceProperties<T>[K]>;
	  }
	| {
			[K in InstancePropertyNames<T> as OnChangeSymbol<K>]: (newValue: T[K]) => void;
	  }
	| {
			[K in InstanceEventNames<T> as OnEventSymbol<K>]: T[K] extends RBXScriptSignal<infer C>
				? (...args: Parameters<C>) => void
				: never;
	  }
	| Record<ChildrenSymbol, ChildrenValue>
>;
/*
	Constructs and returns a new instance, with options for setting properties,
	event handlers and other attributes on the instance right away.
*/
export declare function New<T extends keyof CreatableInstances>(
	elementName: T,
): (properties: NewProperties<Instances[T]>) => Instances[T];
