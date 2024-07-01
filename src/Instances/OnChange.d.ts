import { MergeStrings, MergeStringsJsx } from "../Types";

export type OnChangeSymbol<K> = MergeStrings<"OnChange", K>;
export type OnChangeJsx<K> = MergeStringsJsx<"OnChange", K>;
/**
 * Constructs special keys for property tables which connect property change
 * listeners to an instance.
 */
export declare function OnChange<K extends string>(name: K): OnChangeSymbol<K>;
