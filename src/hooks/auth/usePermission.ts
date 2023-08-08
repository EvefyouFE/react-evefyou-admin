import { Role } from "@models/auth";
import { includes } from "ramda";
import { useLocation } from "react-router";
import { ComponentPermissionEnum, ControlPermissionEnum } from "@/enums";
import { transforRoutePathToPermissionCode } from "@/routes";
import { useAuthRecoilState } from "@/stores/auth";
import { isSubList } from "@/utils/list";

export interface PermissionOptions {
    control?: ControlPermissionEnum;
    component?: ComponentPermissionEnum;
    roles?: Role[];
}

const WHITE_LIST = ['/']

export function usePermission() {
    const [{ permissionList, roleList, routes }] = useAuthRecoilState()
    const { pathname } = useLocation()

    function authenticateRouting() {
        if (includes(pathname, WHITE_LIST)) return true
        return includes(pathname, routes)
    }
    function authenticateRole(roles?: Role[]) {
        return !roles || isSubList(roles, roleList)
    }
    function authenticatePermission(permissions: string[] | number[]) {
        return !permissions || isSubList(permissions, permissionList)
    }
    function buildCompPermission(control?: ControlPermissionEnum, component?: ComponentPermissionEnum) {
        return component ? control ? `${component}:${control}` : `${component}` : control ? `${control}` : ''
    }
    function buildPermission(control?: ControlPermissionEnum, component?: ComponentPermissionEnum) {
        const compPermission = buildCompPermission(control, component)
        if (!compPermission) {
            return ''
        }
        const viewPermission = transforRoutePathToPermissionCode(pathname)
        return viewPermission.concat(':').concat(compPermission)
    }

    function hasPermission({ control, roles, component }: PermissionOptions = {}) {
        if (!control && !component) {
            return true
        }
        return authenticateRole(roles)
            && authenticatePermission([buildPermission(control, component)])
    }
    function hasNumberPermission(permissions: number[]) {
        return authenticatePermission(permissions)
    }
    return {
        authenticateRouting,
        hasPermission,
        hasNumberPermission
    }
}