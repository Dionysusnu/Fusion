import { MergeStrings } from "../Types";

export type CleanupSymbol = MergeStrings<"Cleanup", "">;
/**
 * A special key for property tables, which adds user-specified tasks to be run
 * when the instance is destroyed.
 */
export declare const Cleanup: CleanupSymbol;
