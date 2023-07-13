/**
 * Component list, register here to setting it in the form
 */
import {
  AutoComplete,
  Cascader,
  Checkbox,
  DatePicker,
  Divider,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  TreeSelect,
} from 'antd';
import { ItemComponentType } from './src/types/form';

const itemComponentMap = new Map<ItemComponentType, React.ComponentType<any>>();

itemComponentMap.set('', Input);
itemComponentMap.set('Input', Input);
itemComponentMap.set('InputGroup', Input.Group);
itemComponentMap.set('InputPassword', Input.Password);
itemComponentMap.set('InputSearch', Input.Search);
itemComponentMap.set('InputTextArea', Input.TextArea);
itemComponentMap.set('InputNumber', InputNumber);
itemComponentMap.set('AutoComplete', AutoComplete);

itemComponentMap.set('Select', Select);
itemComponentMap.set('TreeSelect', TreeSelect);
itemComponentMap.set('Switch', Switch);
itemComponentMap.set('RadioGroup', Radio.Group);
itemComponentMap.set('Checkbox', Checkbox);
itemComponentMap.set('CheckboxGroup', Checkbox.Group);
itemComponentMap.set('Cascader', Cascader);
itemComponentMap.set('Slider', Slider);
itemComponentMap.set('Rate', Rate);

itemComponentMap.set('DatePicker', DatePicker);
itemComponentMap.set('MonthPicker', DatePicker.MonthPicker);
itemComponentMap.set('RangePicker', DatePicker.RangePicker);
itemComponentMap.set('WeekPicker', DatePicker.WeekPicker);
itemComponentMap.set('TimePicker', TimePicker);

itemComponentMap.set('Divider', Divider);

export function add(compName: ItemComponentType, component: React.ComponentType<any>) {
  itemComponentMap.set(compName, component);
}

export function del(compName: ItemComponentType) {
  itemComponentMap.delete(compName);
}

export { itemComponentMap as itemComponentMap };
