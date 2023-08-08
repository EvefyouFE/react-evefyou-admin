import { FormInstance } from "antd";
import { BasicFormProps, ItemProps } from "../props";
import { BaseInstance, UsePropsMethods } from "@/hooks/core";

export interface ItemComponentParams {
  props: Partial<ItemProps>;
  // tableAction: TableActionType;
  // formActionType: FormActionType;
  formModel: Recordable;
}

export type UseFormPropsMethods = Pick<UsePropsMethods<BasicFormProps>, 'init'>;
export type UseFormPropsReturnType = [BasicFormProps, UseFormPropsMethods]
export type ModalHookMethods = UseFormPropsMethods;
export interface BasicFormInstance<T = any> extends FormInstance<T>, BaseInstance<BasicFormProps>, Pick<ModalHookMethods,
  'init'
> {
}