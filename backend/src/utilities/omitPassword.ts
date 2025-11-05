import { IUser } from "../@types/type";

export const omitPassword = (user: IUser) => {
    const { password, ...rest } = user
    return rest
}