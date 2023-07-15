import { useLocale } from "@/locales";
import { RuleObject } from "antd/es/form";
import { StoreValue } from "antd/es/form/interface";
import { isNil } from "ramda";
import { ItemComponentType } from "../types/form";

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component: ItemComponentType) {
    const {formatById} = useLocale()
    if (component.includes('Input') || component.includes('Complete')) {
        return formatById('components.common.input.text');
    }
    if (component.includes('Picker')) {
        return formatById('components.common.choose.text');
    }
    if (
        component.includes('Select') ||
        component.includes('Cascader') ||
        component.includes('Checkbox') ||
        component.includes('Radio') ||
        component.includes('Switch')
    ) {
        return formatById('components.common.choose.text');
    }
    return '';
}

export function setComponentRuleType(
    rule: RuleObject,
    component: ItemComponentType,
    valueFormat: string,
  ) {
    if (['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'].includes(component)) {
      rule.type = valueFormat ? 'string' : 'object';
    } else if (['RangePicker', 'Upload', 'CheckboxGroup', 'TimePicker'].includes(component)) {
      rule.type = 'array';
    } else if (['InputNumber'].includes(component)) {
      rule.type = 'number';
    }
  }

/**
 * 
 * @param rule 自定义校验器
 * @param value 
 * @returns 
 */
export function validator(rule: RuleObject, value: StoreValue, callback: (error?: string) => void) {
    console.debug(callback)
    const msg = rule.message;
    if (isNil(value)) {
        // 空值
        return Promise.reject(msg);
    } else if (Array.isArray(value) && !value.length) {
        // 数组类型
        return Promise.reject(msg);
    } else if (typeof value === 'string' && value.trim() === '') {
        // 空字符串
        return Promise.reject(msg);
    } else if (
        typeof value === 'object' &&
        Reflect.has(value, 'checked') &&
        Reflect.has(value, 'halfChecked') &&
        Array.isArray(value.checked) &&
        Array.isArray(value.halfChecked) &&
        value.checked.length === 0 &&
        value.halfChecked.length === 0
    ) {
        // 非关联选择的tree组件
        return Promise.reject(msg);
    }
    return Promise.resolve();
}