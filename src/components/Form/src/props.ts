import { ButtonProps, ColProps, FormItemProps, FormProps, RowProps } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { SpaceSize } from "antd/es/space";
import { CSSProperties, MouseEventHandler } from "react";
import { ItemComponentType } from "./types/form";
import { BasicHelpProps } from "@/components/Basic/src/props";

export interface RenderCallbackParams {
    props: ItemProps;
    values: Recordable;
    field: string;
}

export interface ItemInnerProps extends ItemProps {
    renderCallbackParams: RenderCallbackParams;
}

export interface ItemProps extends Omit<FormItemProps, 'required'> {
    itemComponent?: ItemComponentType;
    itemComponentProps?: Recordable | ((params: RenderCallbackParams) => Recordable);
    helpMessage?:
    | string
    | string[]
    | ((renderCallbackParams: RenderCallbackParams) => string | string[]);
    helpProps?: Partial<BasicHelpProps>;
    subLabel?: React.ReactNode;
    changeEvent?: string;
    disabled?: boolean;
    size?: SizeType;
    autoSetPlaceHolder?: boolean;
    suffix?: string | number | ((params: RenderCallbackParams) => string | number);
    renderItemComponentContent?: (params: RenderCallbackParams) => React.ReactNode;
    renderItemContent?: (params: RenderCallbackParams) => React.ReactNode;
    required?: boolean | ((params: RenderCallbackParams) => boolean);
    dynamicRules?: (params: RenderCallbackParams) => FormItemProps['rules'];
}

export interface BasicFormItemProps {
    // 渲染与否
    canRender?: boolean;
    // 隐藏与否
    hidden?: boolean;
    formProps?: Partial<BasicFormProps>;
    itemProps?: ItemProps;
    colProps?: Partial<ColProps>;
    renderColContent?: (params: RenderCallbackParams) => React.ReactNode;
}

type ButtonOptions = Partial<ButtonProps> & { text: React.ReactNode; };

export interface BasicFormActionProps {
    expand?: boolean;
    showExpand?: boolean;
    showSubmit?: boolean;
    showReset?: boolean;
    onExpand?: MouseEventHandler<(HTMLButtonElement & HTMLAnchorElement)>;
    submitBtnOptions?: ButtonOptions;
    resetBtnOptions?: ButtonOptions;
    size?: SpaceSize;
    textAlign?: CSSProperties['textAlign'];
    renderSubmitBefore?: React.ReactNode;
    renderResetBefore?: React.ReactNode;
    renderExpandBefore?: React.ReactNode;
    renderExpandAfter?: React.ReactNode;
}

export interface BasicFormProps extends FormProps {
    baseColProps?: Partial<ColProps>;
    rowProps?: RowProps;
    autoSetPlaceHolder?: boolean;
    items?: BasicFormItemProps[];
    showExpand?: boolean;
    actionProps?: BasicFormActionProps;
    showAction?: boolean;
    name?: string;
}