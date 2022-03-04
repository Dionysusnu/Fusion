import { PropertyTable } from "../PubTypes";

/**
 * Constructs and returns a new instance, with options for setting properties,
 * event handlers and other attributes on the instance right away.
 */
export declare function New<T extends keyof CreatableInstances>(
	elementName: T,
): (properties: PropertyTable<Instances[T]>) => Instances[T];
