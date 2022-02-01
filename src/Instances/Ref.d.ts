import { MergeStrings } from "../Types";

export type RefSymbol = MergeStrings<"Ref", "">;
/*
	A special key for property tables, which parents any given descendants into
	an instance.
*/
export declare const Ref: RefSymbol;
