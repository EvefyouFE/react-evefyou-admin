import { clone, is } from "ramda";

// 深度合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  const res: any = clone(src);
  for (key in target) {
    res[key] = is(Object, res[key]) ? deepMerge(res[key], target[key]) : target[key];
  }
  return res;
}
