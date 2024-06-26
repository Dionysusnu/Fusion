import { Children, ChildrenSymbol } from "../Instances/Children";
import { ChildrenValue, PropertyTable } from "../PubTypes";

declare global {
	namespace JSX {
		type IntrinsicElements = {
			[K in keyof CreatableInstances as Uncapitalize<K>]: PropertyTable<CreatableInstances[K]>;
		};

		// This ensures excess attributes and children are caught if the component doesn't accept them
		type IntrinsicAttributes = defined;
		type LibraryManagedAttributes<T, A> = A extends { [Children]: unknown } ? A : A & { [Children]?: never };

		// Class components not allowed
		type ElementClass = never;

		// The type JSX expressions become
		type Element = ChildrenValue;

		// Function Components must return Element, since jsx wrapper function directly returns their return value
		type FunctionComponent = (args: any) => Element;
		type ElementType = string | FunctionComponent;

		// Specifies the property name Children get assigned to for props typechecking
		// Value type is not used
		type ElementChildrenAttribute = Record<ChildrenSymbol, never>;
	}
}

export declare function jsx(element: JSX.ElementType, props: defined, children: ChildrenValue): Instance;
