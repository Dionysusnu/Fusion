import { PropertyTable } from "../PubTypes";

/**
 * Processes and returns an existing instance, with options for setting
 * properties, event handlers and other attributes on the instance.
 */
export declare function Hydrate<T extends Instances[keyof Instances]>(instance: T): (properties: PropertyTable<T>) => T;
