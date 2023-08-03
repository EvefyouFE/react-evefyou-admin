import { Col, Form, Row, RowProps } from "antd";
import { is, omit } from "ramda";
import React, { MouseEvent, ReactElement, Ref, useImperativeHandle, useMemo } from "react";
import { BasicFormAction } from "./components/BasicFormAction";
import { BasicFormItem } from "./components/BasicFormItem";
import { useFormItems } from "./hooks";
import { BasicFormActionProps, BasicFormProps } from "./props";
import { BasicFormInstance } from "./types/form";
import { usePropsState } from "@/hooks/core";
import { genUUID } from "@/utils/generate";
import { useFormProps } from "./hooks/useFormProps";

export const BasicForm = React.memo(React.forwardRef(<T extends Recordable = any>(
  props: PropsWithChildrenCls<BasicFormProps>,
  ref: React.ForwardedRef<BasicFormInstance<T>>
) => {
  const {children} = props;
  
  const [propsState, propsMethods] = useFormProps(props)

  const {
    items,
    rowProps,
    baseColProps,
    actionProps,
    size,
    showAction,
  } = propsState
  const [expand, setExpand] = usePropsState(!!actionProps?.expand);
  const [form] = Form.useForm<T>();

  const [itemsMemo] = useFormItems(propsState)

  const instance: BasicFormInstance<T> = useMemo(() => ({
    init: propsMethods.init,
    ...form,
  }), [propsMethods, form])

  useImperativeHandle(ref, () => instance, [instance])

  const propsValue: BasicFormProps = {
    ...omit(['children', 'items', 'showAction', 'actionProps', 'rowProps', 'baseColProps'], propsState)
  }

  const actionColSpan = useMemo(() => {
    const rowSpan = rowProps?.gutter
    if (!is(Number, rowSpan)) {
      return 24;
    }
    const colSpan = baseColProps?.span
    const site = Number.parseFloat(colSpan + '') / Number.parseFloat(rowSpan + '')
    if (items?.length && (items.length * site) > 3 / 4) {
      return rowSpan
    }
    return colSpan
  }, [rowProps, baseColProps, items])
  const rowPropsValue: RowProps = {
    ...rowProps,
    className: 'p-4',
  }

  const actionPropsValue: BasicFormActionProps = {
    size,
    onExpand: handleExpand,
    expand,
    ...omit(['onExpand', 'expand'], actionProps),
  }

  function handleExpand(event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) {
    setExpand(!expand)
    actionProps?.onExpand?.(event)
  }
  return (
    <Form<T> form={form} {...propsValue} >
      {children}
      {
        !children && <Row {...rowPropsValue}>
        {
          itemsMemo.map((item) => (
            <BasicFormItem key={genUUID()} {...item} />
          ))
        }
        {
          showAction && <Col span={actionColSpan} className="h-full">
          <BasicFormAction {...actionPropsValue} />
        </Col>
        }
        
      </Row>
      }
    </Form>
  )
})) as <T extends Recordable = any>(p: PropsWithChildrenCls<BasicFormProps> & { ref?: Ref<BasicFormInstance<T>> }) => ReactElement;
