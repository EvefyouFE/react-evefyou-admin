import { enum2Obj } from "@/utils/model";

export enum BreakpointsAntdEnum {
  XS = 480,
  SM = 576,
  MD = 768,
  LG = 992,
  XL = 1200,
  XXL = 1600,
}

export const BreakpointsAntd = enum2Obj<keyof typeof BreakpointsAntdEnum>(BreakpointsAntdEnum)
