import classNames from "classnames";
import { FC, useMemo } from "react";
import { BasicHelp } from './BasicHelp';
import './BasicTitle.less';
import { BasicTittleProps } from "./props";
import { useDesign } from "@/hooks/design";

export const BasicTittle: FC<PropsWithChildrenCls<BasicTittleProps>> = ({
    span,
    normal,
    helpMessage = '',
    onDoubleClick,
    className,
    children,
}) => {
    const {prefixCls} = useDesign('basic-title')
    const rootClsName = useMemo(() => {
        return classNames(
            className,
            prefixCls,
            children && span && prefixCls.concat('-show-span'),
            normal && prefixCls.concat('-normal')
        )
    }, [span, normal])
    return (
        <span className={rootClsName} onDoubleClick={onDoubleClick}>
            {children}
            {helpMessage ? <BasicHelp className={prefixCls.concat('-help')} text={helpMessage} /> : undefined}
        </span>
    )
}