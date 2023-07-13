import { BasicHelp } from "@/components/Basic/src/BasicHelp";
import { formatById } from "@/locales";
import { Col, Divider, Form } from "antd";
import { Rule, RuleObject } from "antd/es/form";
import classNames from "classnames";
import { clone, is } from "ramda";
import React, { useMemo } from "react";
import { itemComponentMap } from "../../itemComponentMap";
import { ItemInnerProps } from "../props";
import { createPlaceholderMessage, validator } from "../utils/helper";


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

    if (!getHelpMessage || (Array.isArray(getHelpMessage) && getHelpMessage.length === 0)) {
        return renderLabel;
    }

    return (
        <span>
            {renderLabel}
            <BasicHelp placement="top" className="mx-1" text={getHelpMessage} {...helpProps} />
        </span>
    );
}

/**
 * 
 * @param param0 渲染项包裹的组件 Input、Select...
 * @returns 
 */
export function renderItemComponentFn({
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
    const { getFieldsValue, setFieldValue } = Form.useFormInstance();

    let itemComponentPropsValue: Recordable;
    if (is(Function, itemComponentProps)) {
        itemComponentPropsValue = itemComponentProps(renderCallbackParams!)
    } else {
        itemComponentPropsValue = itemComponentProps || {}
    }
    if (itemComponent === 'Divider') {
        return (
            <Col span={24}>
                <Divider {...itemComponentPropsValue}>{renderLabelHelpMessage(rest)}</Divider>
            </Col>
        );
    }

    const realItemComponentProps: Recordable = {
        allowClear: true,
        //input 没有该属性
        // getPopupContainer: (trigger: Element) => trigger.parentNode,
        disabled: disabled ? disabled : itemComponentPropsValue.disabled ? itemComponentPropsValue.disabled : false,
        size,
        ...itemComponentPropsValue,
    }

    const isCreatePlaceholder = !realItemComponentProps.disabled && autoSetPlaceHolder;
    // RangePicker place is an array
    if (isCreatePlaceholder && itemComponent !== 'RangePicker' && itemComponent) {
        realItemComponentProps.placeholder =
            itemComponentPropsValue?.placeholder || createPlaceholderMessage(itemComponent);
    }

    const isCheck = itemComponent && is(String, itemComponent) && ['Switch', 'Checkbox'].includes(itemComponent);
    const on = {
        [changeEvent]: (...args: Nullable<Recordable>[]) => {
            const [e] = args;
            if (realItemComponentProps[changeEvent]) {
                realItemComponentProps[changeEvent](...args);
            }
            const target = e ? e.target : null;
            const value = target ? (isCheck ? target.checked : target.value) : e;
            setFieldValue(name, value)
        }
    }
    Object.assign(realItemComponentProps, { ...on })

    const Comp = itemComponentMap.get(itemComponent ?? '')!;

    if (!renderItemComponentContent) {
        return <Comp {...realItemComponentProps} />
    }

    const content = renderItemComponentContent(renderCallbackParams!)
    return (
        <Comp {...realItemComponentProps}>
            {content}
        </Comp>
    )
}

/**
 * 
 * @param props 渲染项 form.item
 * @returns 
 */
export function renderItemFn(props: Partial<ItemInnerProps>) {
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
    const suffixValue = is(Function, suffix) ? suffix(renderCallbackParams!) : suffix;

    const itemContent = renderItemContent
        ? renderItemContent(renderCallbackParams!)
        : <ItemComponent {...props}/>

    const label = renderLabelHelpMessage(props)

    const className = classNames({ 'suffix-item': showSuffix })

    const rules: Rule[] = useMemo(() => {
        if (dynamicRules) {
            return dynamicRules(renderCallbackParams!) || [];
        }

        let rules: Rule[] = clone(defRules);

        const requiredValue = is(Function, required) ? required(renderCallbackParams!) : required;
        if (requiredValue) {
            if (!rules || !rules.length) {
                rules = [{ required: requiredValue, validator }];
            } else {
                const requiredIndex: number = rules.findIndex((rule) => Reflect.has(rule, 'required'));
                if (requiredIndex === -1) {
                    rules.push({ required: requiredValue, validator });
                }
            }
        }
        const requiredRuleIndex: number = rules.findIndex(
            (rule) => Reflect.has(rule, 'required') && !Reflect.has(rule, 'validator'),
        );
        if (requiredRuleIndex !== -1) {
            const rule = rules[requiredRuleIndex];
            if (itemComponent && !is(Function, rule)) {
                if (!Reflect.has(rule, 'type')) {
                    rule.type = itemComponent === 'InputNumber' ? 'number' : 'string';
                }
                rule.message = rule.message;
                if (itemComponent.includes('Input') || itemComponent.includes('Textarea')) {
                    rule.whitespace = true;
                }
                //这里跟itemComponent耦合不合理，待优化
                // const valueFormat = !is(Function, itemComponentProps) && itemComponentProps?.valueFormat;
                // setRuleTypeForComponent(rule, itemComponent, valueFormat);
            }
        }

        // Maximum input length rule check
        const characterInx = rules.findIndex((rule) => !is(Function, rule) && rule.max);
        const ruleWithMax = rules[characterInx] as RuleObject
        if (characterInx !== -1 && !ruleWithMax.validator) {
            ruleWithMax.message ??= formatById('component.form.maxTip', [ruleWithMax.max] as Recordable);
        }
        return rules;
    }, [itemComponent, renderCallbackParams, defRules, dynamicRules, required,])

    return (
        <Form.Item
            className={className}
            label={label}
            rules={rules}
            {...rest}
        >
            <div className="flex">
                <div className="flex-1">{itemContent}</div>
                {showSuffix && <span className="suffix">{suffixValue}</span>}
            </div>
        </Form.Item>
    );

}

export const ItemComponent = React.memo(renderItemComponentFn)
export const Item = React.memo(renderItemFn)