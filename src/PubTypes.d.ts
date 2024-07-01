import { ChildrenSymbol } from "./Instances/Children";
import { CleanupSymbol } from "./Instances/Cleanup";
import { OnChangeSymbol } from "./Instances/OnChange";
import { OnEventSymbol } from "./Instances/OnEvent";
import { OutSymbol } from "./Instances/Out";
import { RefSymbol } from "./Instances/Ref";
import { Value } from "./State/Value";

/** Types that can be expressed as vectors of numbers, and so can be animated. */
export type Animatable =
	| number
	| CFrame
	| Color3
	| ColorSequenceKeypoint
	| DateTime
	| NumberRange
	| NumberSequenceKeypoint
	| PhysicalProperties
	| Ray
	| Rect
	| Region3
	| Region3int16
	| UDim
	| UDim2
	| Vector2
	| Vector2int16
	| Vector3
	| Vector3int16;

/** A task which can be accepted for cleanup. */
export type Task =
	| Instance
	| RBXScriptConnection
	| (() => void)
	| { destroy: () => void }
	| { Destroy: () => void }
	| Array<Task>;

/** Script-readable version information. */
export type Version = {
	major: number;
	minor: number;
	isRelease: boolean;
};

/** A graph object which can have dependents. */
export type Dependency = {
	dependentSet: Set<Dependent>;
};

/** A graph object which can have dependencies. */
export type Dependent = {
	update: (dependent: Dependent) => boolean;
	dependencySet: Set<Dependency>;
};

// Internal note: Remember to also change this below in ChildrenValue
/** An object which stores a piece of reactive state. */
export type StateObject<T> = {
	type: "State";
	kind: string;
	get(asDependency?: boolean): T;
};

/** Either a constant value of type T, or a state object containing type T. */
export type CanBeState<T> = StateObject<T> | T;

/** Denotes children instances in an instance or component's property table. */
export type SpecialKey = {
	type: "SpecialKey";
	kind: string;
	stage: "self" | "descendants" | "ancestor" | "observer";
	apply(propValue: any, applyTo: Instance, cleanupTasks: Array<Task>): void;
};

/** A collection of instances that may be parented to another instance. */
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
	| Map<any, ChildrenValue>
	| undefined;

/** A table that defines an instance's properties, handlers and children. */
export type PropertyTable<T extends Instance> = Partial<
	{
		[K in keyof WritableInstanceProperties<T>]: CanBeState<WritableInstanceProperties<T>[K]>;
	} & {
		[K in InstancePropertyNames<T> as OnChangeSymbol<K>]: (newValue: T[K]) => void;
	} & {
		[K in InstancePropertyNames<T> as OutSymbol<K>]: Value<T[K]>;
	} & {
		[K in InstanceEventNames<T> as OnEventSymbol<K>]: T[K] extends RBXScriptSignal<infer C>
			? (...args: Parameters<C>) => void
			: never;
	} & Record<ChildrenSymbol, ChildrenValue> &
		Record<CleanupSymbol, Task | undefined> &
		Record<RefSymbol, Value<Instance | undefined>>
>;
