import { MergeStrings } from "../Types";

export type OnEventSymbol<K> = MergeStrings<"OnEventSymbol", K>;
/*
	Constructs special keys for property tables which connect event listeners to
	an instance.
*/
export declare function OnEvent<K extends string>(name: K): OnEventSymbol<K>;
