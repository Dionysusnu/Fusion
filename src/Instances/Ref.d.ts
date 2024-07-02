import { MergeStrings } from "../Types";

export type RefSymbol = MergeStrings<"Ref">;
export type RefJsx = "Ref";
/**
 * A special key for property tables, which stores a reference to the instance
 * in a user-provided Value object.
 */
export declare const Ref: RefSymbol;
