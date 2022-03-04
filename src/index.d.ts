import { Spring } from "./Animation/Spring";
import { Tween } from "./Animation/Tween";
import { Children } from "./Instances/Children";
import { Cleanup } from "./Instances/Cleanup";
import { Hydrate } from "./Instances/Hydrate";
import { New } from "./Instances/New";
import { OnChange } from "./Instances/OnChange";
import { OnEvent } from "./Instances/OnEvent";
import {
	Animatable,
	CanBeState,
	ChildrenValue,
	Dependency,
	Dependent,
	PropertyTable,
	SemiWeakRef,
	SpecialKey,
	StateObject,
	Task,
	Version,
} from "./PubTypes";
import { Computed } from "./State/Computed";
import { ForPairs } from "./State/ForPairs";
import { Observer } from "./State/Observer";
import { Value } from "./State/Value";

declare namespace Fusion {
	// State
	export { Computed, ForPairs, Observer, Value };
	// Animation
	export { Spring, Tween };
	// Types (namespace does not allow export *)
	export {
		Animatable,
		CanBeState,
		ChildrenValue,
		Dependency,
		Dependent,
		PropertyTable,
		SemiWeakRef,
		SpecialKey,
		StateObject,
		Task,
		Version,
	};
	// Default SpecialKeys
	export { Children, Cleanup, OnChange, OnEvent };
	// Instances
	export { Hydrate, New };
	// Misc
	export const version: Version;
}

export = Fusion;
