
import { PermissionType } from "../generated/prisma/enums";
import { UnauthorizedException } from "./appError";
import { rolePermission } from "./role-permission";

export const roleGuard=(
    role:keyof typeof rolePermission,
    requiredPermission: PermissionType[]
)=>{
    const permissions=rolePermission[role]

    const hasPermission=requiredPermission.every(permission =>permissions.includes(permission))
    if(!hasPermission){
        throw new UnauthorizedException("You are not authorized to perform this action")
    }
}