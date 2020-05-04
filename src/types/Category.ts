// Pattern explained in https://stackoverflow.com/questions/44480644/typescript-string-union-to-string-array/45486495

export const ALL_CATEGORIES = [
  'music',
  'theatre',
  'sports',
  'lectures',
  'dancing',
  'exhibitions',
  'culture',
  'other',
] as const
type CategoryTuple = typeof ALL_CATEGORIES
type Category = CategoryTuple[number]

export default Category
