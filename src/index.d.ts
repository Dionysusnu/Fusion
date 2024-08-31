import * as Types from "./Types"

export as namespace Fusion
export = Fusion
declare namespace Fusion {
	export type Animatable = Types.Animatable
	export type UsedAs<T> = Types.UsedAs<T>
	export type Child = Types.Child
	export type Computed<T> = Types.Computed<T>
	export type Contextual<T> = Types.Contextual<T>
	export type GraphObject = Types.GraphObject
	export type For<KO, VO> = Types.For<KO, VO>
	export type Observer = Types.Observer
	export type PropertyTable<T extends Instance = Instance> = Types.PropertyTable<T>
	export type Scope<Constructors extends Types.Fusion> = Types.Scope<Constructors>
	export type ScopedObject = Types.ScopedObject
	export type SpecialKey = Types.SpecialKey
	export type Spring<T> = Types.Spring<T>
	export type StateObject<T> = Types.StateObject<T>
	export type Task = Types.Task
	export type Use = Types.Use
	export type Value<T, S = T> = Types.Value<T, S>
	export type Version = Types.Version

	// General
	export const version: Version
	export const Contextual: Types.ContextualConstructor
	export const Safe: Types.Safe

	// Memory
	/** @deprecated use {@link doCleanup} */
	export const cleanup: (task: Task) => void
	export const deriveScope: Types.DeriveScopeConstructor
	export const doCleanup: (task: Task) => void
	export const innerScope: Types.DeriveScopeConstructor
	export const scoped: Types.ScopedConstructor

	// Graph
	export const Observer: Types.ObserverConstructor

	// State
	export const Computed: Types.ComputedConstructor
	export const ForKeys: Types.ForKeysConstructor
	export const ForPairs: Types.ForPairsConstructor
	export const ForValues: Types.ForValuesConstructor
	export const peek: Use
	export const Value: Types.ValueConstructor

	// Roblox API
	export const Attribute: (attributeName: string) => SpecialKey
	export const AttributeChange: (attributeName: string) => SpecialKey
	export const AttributeOut: (attributeName: string) => SpecialKey
	export const Child: (x: Child[]) => Child
	export const Children: Types.Children
	export const Hydrate: Types.HydrateConstructor
	export const New: Types.NewConstructor
	export const OnChange: <Property extends string>(propertyName: Property) => Types.OnChangeKey<Property>
	export const OnEvent: <Event extends string>(eventName: Event) => Types.OnEventKey<Event>
	export const Out: <Property extends string>(propertyName: Property) => Types.OutKey<Property>

	// Animation
	export const Tween: Types.TweenConstructor
	export const Spring: Types.SpringConstructor
}