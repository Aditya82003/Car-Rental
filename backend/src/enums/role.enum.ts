export const Roles = {
    ADMIN: "ADMIN",
    CUSTOMER: "CUSTOMER"
} as const

export const Permissions = {
    //cars..
    ADD_CAR: "ADD_CAR",
    DELETE_CAR: "DELETE_CAR",
    EDIT_CAR: "EDIT_CAR",
    VIEW_ALL_CARS: "VIEW_ALL_CARS",
    VIEW_AVAILABLE_CARS: "VIEW_AVAILABLE_CARS",

    //bookings
    VIEW_ALL_BOOKING: "VIEW_ALL_BOOKING",
    ADD_BOOKING: "ADD_BOOKING",
    DELETE_BOOKING: "DELETE_BOOKING",
    EDIT_BOOKING: "EDIT_BOOKING",

    //payment
    MANGAGE_PAYMENT: "MANGAGE_PAYMENT"
} as const

export type RoleType = keyof typeof Roles
export type PermissionType = keyof typeof Permissions
