import { FormInstance } from "antd";
import { BaseInstance, UsePropsMethods } from "react-evefyou-hooks";
import { BasicFormProps, ItemProps } from "../props";

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