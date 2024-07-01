import { MergeStrings, MergeStringsJsx } from "../Types";

export type OutSymbol<K> = MergeStrings<"Out", K>;
export type OutJsx<K> = MergeStringsJsx<"Out", K>;
/**
 * A special key for property tables, which allows users to extract values from
 * an instance into an automatically-updated Value object.
 */
export declare function Out<K extends string>(name: K): OutSymbol<K>;
