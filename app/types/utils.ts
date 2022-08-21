export type RecursivelyReplaceNullWithUndefined<T> = T extends null
	? undefined
	: T extends Date
	? T
	: {
			[K in keyof T]: T[K] extends (infer U)[]
				? RecursivelyReplaceNullWithUndefined<U>[]
				: RecursivelyReplaceNullWithUndefined<T[K]>
	  }
