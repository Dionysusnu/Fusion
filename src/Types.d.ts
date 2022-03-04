export type MergeStrings<S extends string, K> = K extends string | number | bigint | boolean | null | undefined
	? `____Fusion${S}${K}`
	: never;

export type KeysOfArrayMapOrRecord<I> = I extends Array<any> ? number : I extends Map<infer K, any> ? K : keyof I;
export type PropertyOfArrayMapOrRecord<I> = I extends Array<infer T> ? T : I extends Map<any, infer V> ? V : I[keyof I];
export type KeepArrayMapOrRecord<I, NewKey, NewValue> = I extends Array<infer V>
	? Array<NewValue>
	: I extends Map<infer K, any>
	? Map<NewKey, NewValue>
	: Record<keyof I, NewValue>;
