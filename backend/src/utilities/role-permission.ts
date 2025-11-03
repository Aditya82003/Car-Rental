
import { PermissionType, RoleType } from "../generated/prisma/enums";


export const rolePermission:Record<RoleType,PermissionType[]>={
    ADMIN:[
        PermissionType.ADD_CAR,
        PermissionType.EDIT_CAR,
        PermissionType.DELETE_CAR,
        PermissionType.VIEW_ALL_CARS,
        PermissionType.VIEW_AVAILABLE_CARS,

        PermissionType.VIEW_ALL_BOOKING,
        PermissionType.ADD_BOOKING,
        PermissionType.DELETE_BOOKING,
        PermissionType.EDIT_BOOKING,

        PermissionType.MANGAGE_PAYMENT
    ],
    CUSTOMER:[
        PermissionType.VIEW_AVAILABLE_CARS,
        PermissionType.ADD_BOOKING,
        PermissionType.EDIT_BOOKING,
        PermissionType.DELETE_BOOKING,
        PermissionType.MANGAGE_PAYMENT
    ],
    DRIVER:[
        PermissionType.VIEW_ALL_CARS,
        PermissionType.VIEW_AVAILABLE_CARS

    ]
}