/* eslint-disable react-refresh/only-export-components */
import { Col, Divider, Form } from 'antd';
import { Rule, RuleObject } from 'antd/es/form';
import classNames from 'classnames';
import { clone, is } from 'ramda';
import React, { useMemo } from 'react';
import { itemComponentMap } from '../../itemComponentMap';
import { ItemInnerProps } from '../props';
import { createPlaceholderMessage, validator } from '../utils/helper';
import { BasicHelp } from '@/components/Basic/src/BasicHelp';
import { formatById } from '@/locales';

function renderLabelHelpMessage({
  label,
  subLabel,
  helpMessage,
  helpProps,
  renderCallbackParams,
}: Partial<ItemInnerProps>) {
  const renderLabel = subLabel ? (
    <span>
      {label} <span className="text-secondary">{subLabel}</span>
    </span>
  ) : (
    label
  );

  const getHelpMessage = is(Function, helpMessage)
    ? helpMessage(renderCallbackParams!)
    : helpMessage;

  if (
    !getHelpMessage ||
    (Array.isArray(getHelpMessage) && getHelpMessage.length === 0)
  ) {
    return renderLabel;
  }

  return (
    <span>
      {renderLabel}
      <BasicHelp
        placement="top"
        className="mx-1"
        text={getHelpMessage}
        {...helpProps}
      />
    </span>
  );
}

/**
 *
 * @param param0 渲染项包裹的组件 Input、Select...
 * @returns
 */
export function useRenderItemComponentFn({
  name = '',
  itemComponent,
  itemComponentProps,
  help,
  changeEvent = 'onChange',
  disabled,
  size,
  autoSetPlaceHolder,
  renderItemComponentContent,
  renderCallbackParams,
  ...rest
}: Partial<ItemInnerProps>) {
  const { setFieldValue } = Form.useFormInstance();

  let itemComponentPropsValue: Recordable;
  if (is(Function, itemComponentProps)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    itemComponentPropsValue = itemComponentProps(renderCallbackParams!);
  } else {
    itemComponentPropsValue = itemComponentProps || {};
  }
  if (itemComponent === 'Divider') {
    return (
      <Col span={24}>
        <Divider {...itemComponentPropsValue}>
          {renderLabelHelpMessage(rest)}
        </Divider>
      </Col>
    );
  }

  const realItemComponentProps: Recordable = {
    allowClear: true,
    // input 没有该属性
    // getPopupContainer: (trigger: Element) => trigger.parentNode,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    disabled:
      disabled ||
      (itemComponentPropsValue.disabled
        ? itemComponentPropsValue.disabled
        : false),
    size,
    ...itemComponentPropsValue,
  };

  const isCreatePlaceholder =
    !realItemComponentProps.disabled && autoSetPlaceHolder;
  // RangePicker place is an array
  if (isCreatePlaceholder && itemComponent !== 'RangePicker' && itemComponent) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    realItemComponentProps.placeholder =
      itemComponentPropsValue?.placeholder ||
      createPlaceholderMessage(itemComponent);
  }

  const isCheck =
    itemComponent &&
    is(String, itemComponent) &&
    ['Switch', 'Checkbox'].includes(itemComponent);
  const on = {
    [changeEvent]: (...args: Nullable<Recordable>[]) => {
      const [e] = args;
      if (realItemComponentProps[changeEvent]) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        realItemComponentProps[changeEvent](...args);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const target = e ? e.target : null;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const value = target ? (isCheck ? target.checked : target.value) : e;
      setFieldValue(name, value);
    },
  };
  Object.assign(realItemComponentProps, { ...on });

  const Comp = itemComponentMap.get(itemComponent ?? '')!;

  if (!renderItemComponentContent) {
    return <Comp {...realItemComponentProps} />;
  }

  const content = renderItemComponentContent(renderCallbackParams!);
  return <Comp {...realItemComponentProps}>{content}</Comp>;
}

/**
 *
 * @param props 渲染项 form.item
 * @returns
 */
export function useRenderItemFn(props: Partial<ItemInnerProps>) {
  const {
    itemComponent,
    itemComponentProps,
    renderItemContent,
    renderCallbackParams,
    suffix,
    rules: defRules = [],
    dynamicRules,
    required,
    ...rest
  } = props;

  const showSuffix = !!suffix;
  const suffixValue = is(Function, suffix)
    ? suffix(renderCallbackParams!)
    : suffix;

  const itemContent = renderItemContent ? (
    renderItemContent(renderCallbackParams!)
  ) : (
    <ItemComponent {...props} />
  );

  const label = renderLabelHelpMessage(props);

  const className = classNames({ 'suffix-item': showSuffix });

  const rules: Rule[] = useMemo(() => {
    if (dynamicRules) {
      return dynamicRules(renderCallbackParams!) || [];
    }

    let ruls: Rule[] = clone(defRules);

    const requiredValue = is(Function, required)
      ? required(renderCallbackParams!)
      : required;
    if (requiredValue) {
      if (!ruls || !ruls.length) {
        ruls = [{ required: requiredValue, validator }];
      } else {
        const requiredIndex: number = ruls.findIndex((rule) =>
          Reflect.has(rule, 'required'),
        );
        if (requiredIndex === -1) {
          ruls.push({ required: requiredValue, validator });
        }
      }
    }
    const requiredRuleIndex: number = ruls.findIndex(
      (rule) =>
        Reflect.has(rule, 'required') && !Reflect.has(rule, 'validator'),
    );
    if (requiredRuleIndex !== -1) {
      const rule = ruls[requiredRuleIndex];
      if (itemComponent && !is(Function, rule)) {
        if (!Reflect.has(rule, 'type')) {
          rule.type = itemComponent === 'InputNumber' ? 'number' : 'string';
        }
        // ruls.message = rule.message;
        if (
          itemComponent.includes('Input') ||
          itemComponent.includes('Textarea')
        ) {
          rule.whitespace = true;
        }
        // 这里跟itemComponent耦合不合理，待优化
        // const valueFormat = !is(Function, itemComponentProps) && itemComponentProps?.valueFormat;
        // setRuleTypeForComponent(rule, itemComponent, valueFormat);
      }
    }

    // Maximum input length rule check
    const characterInx = ruls.findIndex(
      (rule) => !is(Function, rule) && rule.max,
    );
    const ruleWithMax = ruls[characterInx] as RuleObject;
    if (characterInx !== -1 && !ruleWithMax.validator) {
      ruleWithMax.message ??= formatById('components.form.max.tip', {
        max: ruleWithMax.max,
      });
    }
    return ruls;
  }, [itemComponent, renderCallbackParams, defRules, dynamicRules, required]);

  return (
    <Form.Item className={className} label={label} rules={rules} {...rest}>
      <div className="flex">
        <div className="flex-1">{itemContent}</div>
        {showSuffix && <span className="suffix">{suffixValue}</span>}
      </div>
    </Form.Item>
  );
}

export const ItemComponent = React.memo(useRenderItemComponentFn);
export const Item = React.memo(useRenderItemFn);
