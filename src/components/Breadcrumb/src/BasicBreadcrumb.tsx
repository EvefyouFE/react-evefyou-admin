import { CrumbData, RouteHandle } from "@routes/props";
import { Breadcrumb, BreadcrumbProps } from "antd";
import { FC } from "react";
import { useMatches } from "react-router-dom";
import './index.less';
import { useDesign } from "@/hooks";

export type BasicBreadcrumbProps = BreadcrumbProps & {
    back?: boolean;
}

export const BasicBreadcrumb: FC<BasicBreadcrumbProps> = ({
    back = false,
    ...rest
}) => {
    const {prefixCls} = useDesign('basic-breadcrumb')
    const matches = useMatches() as {
        data: CrumbData;
        handle: RouteHandle;
    }[];

    const items = matches
        .filter((match) => Boolean(match.handle?.crumb))
        .map((match) => match.handle?.crumb(match.data));

    return (
        <Breadcrumb className={prefixCls} items={items} {...rest} />
    )
}