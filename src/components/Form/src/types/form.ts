import { FormInstance } from "antd";
import { BasicFormProps, ItemProps } from "../props";
import { BaseInstance, UsePropsMethods } from "@/hooks";

export interface ItemComponentParams {
    props: Partial<ItemProps>;
    // tableAction: TableActionType;
    // formActionType: FormActionType;
    formModel: Recordable;
}

export interface RenderCallbackParams {
  props: ItemProps;
  values: Recordable;
  field: string;
}

export interface UseFormPropsMethods extends Pick<UsePropsMethods<BasicFormProps>, 'init'> {
}
export type UseFormPropsReturnType = [BasicFormProps, UseFormPropsMethods]
export interface ModalHookMethods extends UseFormPropsMethods {
}
export interface BasicFormInstance<T extends Recordable = any> extends FormInstance<T>, BaseInstance<BasicFormProps>, Pick<ModalHookMethods,
'init'
> {
  
}

export type ItemComponentType = ''
| 'Input'
| 'InputGroup'
| 'InputPassword'
| 'InputSearch'
| 'InputTextArea'
| 'InputNumber'
| 'InputCountDown'
| 'Select'
| 'TreeSelect'
| 'RadioButtonGroup'
| 'RadioGroup'
| 'Checkbox'
| 'CheckboxGroup'
| 'AutoComplete'
| 'Cascader'
| 'DatePicker'
| 'MonthPicker'
| 'RangePicker'
| 'WeekPicker'
| 'TimePicker'
| 'Switch'
| 'StrengthMeter'
| 'Upload'
| 'IconPicker'
| 'Render'
| 'Slider'
| 'Rate'
| 'Divider'