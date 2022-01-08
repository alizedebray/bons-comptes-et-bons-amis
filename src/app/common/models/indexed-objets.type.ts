export type IndexedValue<T> = T & {key: string};

export type IndexedList<T> = IndexedValue<T>[];