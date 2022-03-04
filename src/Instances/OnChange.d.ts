import { MergeStrings } from "../Types";

export type OnChangeSymbol<K> = MergeStrings<"OnChange", K>;
/**
 * Constructs special keys for property tables which connect property change
 * listeners to an instance.
 */
export declare function OnChange<K extends string>(name: K): OnChangeSymbol<K>;
