/**
 * 对数组中的每个元素调用给定的 callback 回调函数，若回调函数返回 undefined，则过滤掉
 */
export function filterMap<T, U>(
  array: T[],
  callback: (value: T, index: number) => U
) {
  const ret: U[] = []
  for (const [index, item] of Object.entries(array)) {
    const value = callback(item, Number(index))
    if (value === undefined) continue
    ret.push(value)
  }
  return ret
}
