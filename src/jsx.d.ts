import Fusion from "./index";

type JsxChild =
	// fusion component wrapper
	((...args: any) => Instance) | Instance | AcceptableFusionChildren | undefined;

type AcceptableFusionChildren =
	| ReadonlyArray<Instance>
	| ReadonlyMap<string | number, Instance>
	| Record<string | number, Instance>;

type JsxNode = JsxChild | AcceptableFusionChildren;

declare global {
	namespace JSX {
		type Element = Instance;

		interface ElementChildrenAttribute {
			_jsx_children: {};
		}

		interface IntrinsicAttributes {
			Key?: string;
			_jsx_children?: JsxNode;
		}

		type IntrinsicElement<T extends Instance> = Fusion.JsxInstance<T> & IntrinsicAttributes;

		interface IntrinsicElements {
			billboardgui: IntrinsicElement<BillboardGui>;
			camera: IntrinsicElement<Camera>;
			frame: IntrinsicElement<Frame>;
			imagebutton: IntrinsicElement<ImageButton>;
			imagelabel: IntrinsicElement<ImageLabel>;
			screengui: IntrinsicElement<ScreenGui>;
			scrollingframe: IntrinsicElement<ScrollingFrame>;
			surfacegui: IntrinsicElement<ScreenGui>;
			textbox: IntrinsicElement<TextBox>;
			textbutton: IntrinsicElement<TextButton>;
			textlabel: IntrinsicElement<TextLabel>;
			uiaspectratioconstraint: IntrinsicElement<UIAspectRatioConstraint>;
			uicorner: IntrinsicElement<UICorner>;
			uigradient: IntrinsicElement<UIGradient>;
			uigridlayout: IntrinsicElement<UIGridLayout>;
			uilistlayout: IntrinsicElement<UIListLayout>;
			uipadding: IntrinsicElement<UIPadding>;
			uipagelayout: IntrinsicElement<UIPageLayout>;
			uiscale: IntrinsicElement<UIScale>;
			uisizeconstraint: IntrinsicElement<UISizeConstraint>;
			uistroke: IntrinsicElement<UIStroke>;
			uitablelayout: IntrinsicElement<UITableLayout>;
			uitextsizeconstraint: IntrinsicElement<UITextSizeConstraint>;
			viewportframe: IntrinsicElement<ViewportFrame>;
		}
	}
}
