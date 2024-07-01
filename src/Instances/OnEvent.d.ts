import { MergeStrings, MergeStringsJsx } from "../Types";

export type OnEventSymbol<K> = MergeStrings<"OnEvent", K>;
export type OnEventJsx<K> = MergeStringsJsx<"OnEvent", K>;
/**
 * Constructs special keys for property tables which connect event listeners to
 * an instance.
 */
export declare function OnEvent<K extends string>(name: K): OnEventSymbol<K>;
