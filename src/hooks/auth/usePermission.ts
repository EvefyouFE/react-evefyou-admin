import { ComponentPermissionEnum, ControlPermissionEnum } from "@/enums";
import { userAtom } from "@/stores";
import { isSubArray } from "@/utils/array";
import { Role } from "@models/auth";
import { useLocation } from "react-router";
import { useRecoilValue } from "recoil";

type PermissionOption = {control: ControlPermissionEnum, component?: ComponentPermissionEnum}
export type HasPermissionOption = {roles: Role[], permissionOptions: PermissionOption[]}

interface ReturnMethods {
    hasPermission: (option?: HasPermissionOption) => boolean;
}

type usePermissionReturnType = [ReturnMethods]

export function usePermission(): usePermissionReturnType {
    const { permissions: userPermissions, roles: userRoles } = useRecoilValue(userAtom)

    function getPermission({component, control}: PermissionOption) {
        const componentStr = component?`${component}:` : ''
        return `${componentStr}${control}`; 
    }
    function getPermissions(options: PermissionOption[]) {
        return options.map((op) => getPermission(op)); 
    }
    function getFullPermissions(options?: PermissionOption[]) {
        const { pathname } = useLocation()
        const permissions = options && getPermissions(options)
        if(permissions?.length) {
            if (pathname) {
                const prefix = pathname.replaceAll('/', ':').slice(1)
                return permissions?.map((p) => prefix ? prefix.concat(':').concat(p) : p)
            }
        }
        return permissions
    }
    function hasPermission(options?: HasPermissionOption) {
        const {roles, permissionOptions} = options || {}
        const permisssions = getFullPermissions(permissionOptions)
        return isSubArray(roles, userRoles) && isSubArray(permisssions, userPermissions)
    }
    return [{
        hasPermission,
    }]
}