export type MergeStrings<S extends string, K> = K extends string | number | bigint | boolean | null | undefined
	? `____Fusion${S}${K}`
	: never;

export type KeysOfArrayMapOrRecord<I> = I extends Array<any> ? number : I extends Map<infer K, any> ? K : keyof I;
export type PropertyOfArrayMapOrRecord<I> = I extends Array<infer T> ? T : I extends Map<any, infer V> ? V : I[keyof I];
export type KeepArrayMapOrRecord<I, NewKey, NewValue> =
	I extends Array<any>
	? Array<NewValue>
		: I extends Map<any, any>
	? Map<NewKey, NewValue>
	: Record<keyof I, NewValue>;

export type KeyType<T> =
	T extends Array<any>
	? number
	: T extends Map<infer K, any>
	? K
	: T extends Set<infer K>
	? K
	: T extends Record<infer K, any>
	? K
	: keyof T;
export type ValueType<T> =
	T extends Array<infer V>
	? V
	: T extends Map<any, infer V>
	? V
	: T extends Set<any>
	? true
	: T extends Record<any, infer V>
	? V
	: T[keyof T];
