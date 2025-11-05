import { RoleType } from "../generated/prisma/enums"

export type IUser = {
    id: string
    name: string
    email: string
    password?: string | null
    profilePicture?: string | null
    phone?: string | null
    role: RoleType
    createdAt: Date
    updatedAt: Date
}