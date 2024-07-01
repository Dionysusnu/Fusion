import { Children, ChildrenJsx, ChildrenSymbol } from "../Instances/Children";
import { CanBeState, ChildrenValue, Task } from "../PubTypes";
import { Value } from "../State/Value";
import { CleanupJsx } from "./Cleanup";
import { OnChangeJsx } from "./OnChange";
import { OnEventJsx } from "./OnEvent";
import { OutJsx } from "./Out";
import { RefJsx } from "./Ref";

declare global {
	namespace JSX {
		type JsxPropertyTable<T extends Instance> = Partial<
			{
				[K in keyof WritableInstanceProperties<T>]: CanBeState<WritableInstanceProperties<T>[K]>;
			} & {
				[K in InstancePropertyNames<T> as OutJsx<K>]: Value<T[K]>;
			} & {
				[K in InstancePropertyNames<T> as OnChangeJsx<K>]: (newValue: T[K]) => void;
			} & {
				[K in InstanceEventNames<T> as OnEventJsx<K>]: T[K] extends RBXScriptSignal<infer C>
					? (...args: Parameters<C>) => void
					: never;
			} & Record<ChildrenJsx, ChildrenValue> &
				Record<CleanupJsx, Task | undefined> &
				Record<RefJsx, Value<Instance | undefined>>
		>;

		type IntrinsicElements = {
			[K in keyof CreatableInstances as Uncapitalize<K>]: JsxPropertyTable<CreatableInstances[K]>;
		};

		// This ensures excess attributes are caught if the component doesn't accept them
		type IntrinsicAttributes = defined;

		// Same story, but for Children
		// eslint-disable-next-line @typescript-eslint/no-unused-vars -- type variables are given by TS
		type LibraryManagedAttributes<T, A> = A extends { [Children]: unknown } ? A : A & { [Children]?: never };

		// Class components not allowed
		type ElementClass = never;

		// The type JSX expressions become
		type Element = ChildrenValue;

		// Function Components must return Element, since jsx wrapper function directly returns their return value
		type FunctionComponent = (args: any) => Element;
		type ElementType = string | FunctionComponent;

		// Specifies the property name Children get assigned to for props typechecking
		// value type is not used
		type ElementChildrenAttribute = Record<ChildrenSymbol, never>;
	}
}

export declare function jsx(element: JSX.ElementType, props: defined, children: ChildrenValue): Instance;
