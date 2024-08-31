export interface Error {
	type: "Error"
	raw: string
	message: string
	trace: string
	context?: string
}

/** Types that can be expressed as vectors of numbers, and so can be animated. */
export type Animatable =
	| number
	| CFrame
	| Color3
	| ColorSequenceKeypoint
	| DateTime
	| NumberRange
	| NumberSequenceKeypoint
	| PhysicalProperties
	| Ray
	| Rect
	| Region3
	| Region3int16
	| UDim
	| UDim2
	| Vector2
	| Vector2int16
	| Vector3
	| Vector3int16

/** A task which can be accepted for cleanup. */
export type Task =
	| Instance
	| RBXScriptConnection
	| (() => void)
	| { destroy(): void }
	| { Destroy(): void }
	| Task[]

/** A scope of tasks to clean up. */
export type Scope<Constructors = Fusion> = Task[] & Constructors

/** An object which uses a scope to dictate how long it lives. */
export interface ScopedObject {
	scope?: Scope<unknown>
	oldestTask: unknown
}

/** Script-readable version information. */
export interface Version {
	major: number
	minor: number
	isRelease: boolean
}

/** An object which stores a value scoped in time. */
export interface Contextual<T> {
	type: "Contextual"
	now(): T
	is(value: T): ContextualIsMethods
}

interface ContextualIsMethods {
	during<R, A extends unknown[]>(fn: (...args: A) => R, ...args: A): R
}

/** Safely runs a function and returns the value it produces. */
export type Safe = <Success, Fail>(callbacks: {
	try: () => Success
	fallback: (err: unknown) => Fail
}) => Success | Fail

export type ContextualConstructor = <T>(defaultValue: T) => Contextual<T>

/** A graph object which can have dependencies and dependencies. */
export interface GraphObject extends ScopedObject {
	createdAt: number,
	dependencySet: Set<GraphObject>,
	dependentSet: Set<GraphObject>,
	lastChange?: number,
	timeliness: "lazy" | "eager",
	validity: "valid" | "invalid" | "busy",
	_evaluate(): boolean
}

/** An object which stores a piece of reactive state. */
export interface StateObject<T> extends GraphObject {
	type: "State",
	kind: string,
	_EXTREMELY_DANGEROUS_usedAsValue: T
}

/** Passing values of this type to `Use` returns `T`. */
export type UsedAs<T> = StateObject<T> | T

/** A state object whose value can be set at any time by the user. */
export type Use = <T>(target: UsedAs<T>) => T

/** A state object whose value can be set at any time by the user. */
export type Value<T, S = T> = StateObject<T> & {
	kind: "State"
	set(newValue: S, force?: boolean): S
	____phantom_setType: (arg0: never) => S
}

export type ValueConstructor = <T>(scope: Scope<unknown>, initialValue: T) => Value<T, any>

/** A state object whose value is derived from other objects using a callback. */
export interface Computed<T> extends StateObject<T> {
	kind: "Computed"
}

export type ComputedConstructor = <T, S>(scope: Scope<S>, callback: (use: Use, scope: Scope<S>) => T) => Computed<T>

/** A state object which maps over keys and/or values in another table. */
export interface For<KO, VO> extends StateObject<Map<KO, VO>> {
	kind: "For"
}

export type ForPairsConstructor = <KI, KO, VI, VO, S>(
	scope: Scope<S>,
	inputTable: UsedAs<Map<KI, VI>>,
	processor: (use: Use, scope: Scope<S>, key: KI, value: VI) => LuaTuple<[KO, VO]>
) => For<KO, VO>

export type ForKeysConstructor = <KI, KO, V, S>(
	scope: Scope<S>,
	inputTable: UsedAs<Map<KI, V>>,
	processor: (use: Use, scope: Scope<S>, key: KI) => KO
) => For<KO, V>

export type ForValuesConstructor = <K, VI, VO, S>(
	scope: Scope<S>,
	inputTable: UsedAs<Map<K, VI>>,
	processor: (use: Use, scope: Scope<S>, value: VI) => VO
) => For<K, VO>

/** An object which can listen for updates on another state object. */
export interface Observer extends GraphObject {
	type: "Observer"
	onChange(callback: () => void): () => void
	onBind(callback: () => void): () => void
}

export type ObserverConstructor = (scope: Scope<unknown>, watching: unknown) => Observer

/** A state object which follows another state object using tweens. */
export interface Tween<T> extends StateObject<T> {
	kind: "Tween"
}

export type TweenConstructor = <T>(
	scope: Scope<unknown>,
	goalState: UsedAs<T>,
	tweenInfo?: UsedAs<TweenInfo>
) => Tween<T>

/** A state object which follows another state object using spring simulation. */
export interface Spring<T> extends StateObject<T> {
	kind: "Spring"
	setPosition(newPosition: T): void
	setVelocity(newVelocity: T): void
	addVelocity(deltaVelocity: T): void
}

export type SpringConstructor = <T>(
	scope: Scope<unknown>,
	goalState: UsedAs<T>,
	speed?: UsedAs<number>,
	damping?: UsedAs<number>
) => Spring<T>

/** Defines a custom operation to apply to a Roblox instance. */
export interface SpecialKey {
	type: "SpecialKey"
	kind: string
	stage: "self" | "descendants" | "ancestor" | "observer"
	apply(scope: Scope<unknown>, value: unknown, applyTo: Instance): void
}

/** A collection of instances that may be parented to another instance. */
export type Child =
	| Instance
	// specified StateObject as to avoid a circular reference
	| (GraphObject & {
		type: "State",
		kind: string,
		_EXTREMELY_DANGEROUS_usedAsValue: Child
	})
	| Child[]

export type Children = SpecialKey & SpecialKeyType<"Children">
export type OnChangeKey<T> = SpecialKey & SpecialKeyType<"OnChange", T>
export type OutKey<T> = SpecialKey & SpecialKeyType<"Out", T>
export type OnEventKey<T> = SpecialKey & SpecialKeyType<"OnEvent", T>
type SpecialKeyType<Kind extends string, Subtype = ""> = Subtype extends
	| string
	| number
	| bigint
	| boolean
	| null
	| undefined
	? `____phantom_specialKey_${Kind}${Subtype}`
	: never

/** A table that defines an instance's properties, handlers and children. */
export type PropertyTable<T extends Instance> = Partial<
	{
		[K in keyof WritableInstanceProperties<T>]: UsedAs<WritableInstanceProperties<T>[K]>
	} & {
		[K in InstancePropertyNames<T> as OnChangeKey<K>]: (newValue: T[K]) => void
	} & {
		[K in InstancePropertyNames<T> as OutKey<K>]: Value<T[K]>
	} & {
		[K in InstanceEventNames<T> as OnEventKey<K>]: T[K] extends RBXScriptSignal<infer C>
		? (...args: Parameters<C>) => void
		: never
	} & Record<Children, Child> &
	Map<SpecialKey, unknown>
>

export type NewConstructor = <T extends keyof CreatableInstances>(
	scope: Scope<unknown>,
	className: T
) => (propertyTable: PropertyTable<CreatableInstances[T]>) => CreatableInstances[T]

export type HydrateConstructor = <T extends Instances[keyof Instances]>(
	scope: Scope<unknown>,
	instance: T
) => (propertyTable: PropertyTable<T>) => T

// Is there a sane way to write out this type?
// ... I sure hope so.

type InferScoped<T> = T extends (scope: Scope<unknown>, ...args: infer Args) => infer Returns
	? (this: Scope<unknown>, ...args: Args) => Returns
	: T

export type DeriveScopeConstructor = <Existing extends Scope<unknown>, AddMethods extends object[]>(
	existing: Existing,
	...addMethods: AddMethods
) => Scope<{
	[Key in keyof Existing | keyof AddMethods[number]]: Key extends keyof Existing
	? Existing[Key]
	: Key extends keyof AddMethods[number]
	? InferScoped<AddMethods[number][Key]>
	: never
}>

export type ScopedConstructor = <Methods extends object[]>(
	...methods: Methods
) => Scope<{
	[Key in keyof Methods[number]]: InferScoped<Methods[number][Key]>
}>

export interface Fusion {
	version: Version
	Contextual: ContextualConstructor
	Safe: Safe

	doCleanup: (task: Task) => void
	scoped: ScopedConstructor
	deriveScope: DeriveScopeConstructor
	innerScope: DeriveScopeConstructor

	peek: Use
	Value: ValueConstructor
	Computed: ComputedConstructor
	ForPairs: ForPairsConstructor
	ForKeys: ForKeysConstructor
	ForValues: ForValuesConstructor
	Observer: ObserverConstructor

	Tween: TweenConstructor
	Spring: SpringConstructor

	New: NewConstructor
	Hydrate: HydrateConstructor

	Child: (x: Child[]) => Child
	Children: Children
	Out: <T extends string>(propertyName: T) => OnChangeKey<T>
	OnEvent: <T extends string>(eventName: T) => OnEventKey<T>
	OnChange: <T extends string>(propertyName: T) => OnChangeKey<T>
	Attribute: (attributeName: string) => SpecialKey
	AttributeChange: (attributeName: string) => SpecialKey
	AttributeOut: (attributeName: string) => SpecialKey
}

export interface ExternalProvider {
	policies: {
		allowWebLinks: boolean
	}

	logErrorNonFatal: (
		errorString: string
	) => void
	logWarn: (
		errorString: string
	) => void

	doTaskImmediate: (
		resume: () => void
	) => void
	doTaskDeferred: (
		resume: () => void
	) => void
	startScheduler: () => void,
	stopScheduler: () => void
}

export interface ExternalDebugger {
	startDebugging: () => void
	stopDebugging: () => void

	trackScope: (
		scope: Scope<object>
	) => void
	untrackScope: (
		scope: Scope<object>
	) => void
}
