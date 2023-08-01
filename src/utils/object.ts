import { clone, is, mergeDeepRight } from "ramda";

// 深度合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  const res: any = clone(src);
  for (key in target) {
    res[key] = is(Object, res[key]) ? deepMerge(res[key], target[key]) : target[key];
  }
  return res;
}

export function deepMergeObjectByKeys(
  keys: readonly any[],
  value: any,
  obj: Recordable
) {
  let newObj = {} as typeof obj
  let target = newObj
  keys.forEach((k, idx) => {
    target[k] = idx === keys.length - 1 ? value : {}
    target = target[k]
  })
  return mergeDeepRight(obj, newObj)
}

export function deepSetObjectByKeys(
  keys: readonly any[],
  value: any,
  obj: Recordable
) {
  let newObj = clone(obj)
  let target = newObj
  keys.forEach((k, idx) => {
    target[k] = idx === keys.length - 1 ? value : target[k]
    target = target[k]
  })
  return newObj
}