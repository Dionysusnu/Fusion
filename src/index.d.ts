import { Spring } from "./Animation/Spring";
import { Tween } from "./Animation/Tween";
import { Children } from "./Instances/Children";
import { Cleanup } from "./Instances/Cleanup";
import { Hydrate } from "./Instances/Hydrate";
import { New } from "./Instances/New";
import { OnChange } from "./Instances/OnChange";
import { OnEvent } from "./Instances/OnEvent";
import { Out } from "./Instances/Out";
import { Ref } from "./Instances/Ref";
import {
	Animatable,
	CanBeState,
	ChildrenValue,
	Dependency,
	Dependent,
	PropertyTable,
	SpecialKey,
	StateObject,
	Task,
	Version,
} from "./PubTypes";
import { Computed } from "./State/Computed";
import { ForKeys } from "./State/ForKeys";
import { ForPairs } from "./State/ForPairs";
import { ForValues } from "./State/ForValues";
import { Observer } from "./State/Observer";
import { Value } from "./State/Value";
import { cleanup } from "./Utility/cleanup";
import { doNothing } from "./Utility/doNothing";

declare namespace Fusion {
	// State
	export { Computed, ForKeys, ForPairs, ForValues, Observer, Value };
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
		SpecialKey,
		StateObject,
		Task,
		Version,
	};
	// Default SpecialKeys
	export { Children, Cleanup, OnChange, OnEvent, Out, Ref };
	// Instances
	export { Hydrate, New };
	// Destructors
	export { cleanup, doNothing };
	// Misc
	export const version: Version;
}

export = Fusion;
