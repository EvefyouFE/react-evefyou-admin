import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { CrumbData } from "./loader";
import { MenuItemLabel } from "@/components/Menu";

export interface RouteHandle {
    crumb: RouteAntdCrumbHandle;
}
export type RouteAntdCrumbHandle = (data?: CrumbData) => BreadcrumbItemType;

export interface RouteHandleOption {
    title?: string;
    path?: string
}

/**
 * 
 * @param title 
 * @returns 最后一个面包屑返回没跳转reactnode，目录面包屑返回处理函数，首页返回有跳转reactnode
 */
export function routeAntdBreadCrumbHandle({
    title,
    path
}: RouteHandleOption): RouteAntdCrumbHandle {
    return title
        ? path
            ? () => ({
                title: <MenuItemLabel title={title || ''} to={path} />
            })
            : () => ({
                title: <MenuItemLabel title={title || ''} />
            })
        : (data?: CrumbData) => ({
            title: (<MenuItemLabel title={data?.title || ''} />),
            menu: {
                items: data?.menuTreeList?.map((item) => ({
                    key: item.key,
                    label: (<MenuItemLabel title={item.locale ? item.locale : item.name} to={item.path} />)
                }))
            }
        })
}

export function handleFn(option: RouteHandleOption = {}): RouteHandle {
    const crumb = routeAntdBreadCrumbHandle(option);
    return {
        crumb
    }
}