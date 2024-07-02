import { MergeStrings } from "../Types";

export type ChildrenSymbol = MergeStrings<"Children">;
export type ChildrenJsx = "Children";
/**
 * A special key for property tables, which parents any given descendants into
 * an instance.
 */
export declare const Children: ChildrenSymbol;
