import { Children, ChildrenSymbol } from "../Instances/Children";
import { ChildrenValue, PropertyTable } from "../PubTypes";

declare global {
	namespace JSX {
		type IntrinsicElements = {
			[K in keyof CreatableInstances as Uncapitalize<K>]: PropertyTable<CreatableInstances[K]>;
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
