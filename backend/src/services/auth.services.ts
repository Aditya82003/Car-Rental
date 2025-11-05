import { Provider } from "../generated/prisma/enums"
import prisma from "../prisma/cilent.prisma"
import bcrypt from "bcrypt"
import { BadRequestException, NotFoundException } from "../utilities/appError"
import { comparedPassword } from "../utilities/comparedPassword"

export const loginOrCreateAccount = async (data: {
    provider: Provider,
    providerId: string,
    displayName: string,
    picture?: string,
    email?: string
}) => {
    const { provider, providerId, displayName, picture, email } = data

    return await prisma.$transaction(async (ts) => {
        let user = await ts.user.findFirst({
            where: { email }
        })
        if (!user) {
            user = await ts.user.create({
                data: {
                    name: displayName,
                    email: email as string,
                    profilePicture: picture,
                }
            })
            await ts.accountProvider.create({
                data: {
                    provider: provider,
                    providerId: providerId,
                    userId: user.id
                }
            })
        }
        return { user }
    })
}

export const verifyUserService = async ({ email, password, provider = Provider.EMAIL }: { email: string, password: string, provider?: Provider }) => {
    const account = await prisma.accountProvider.findFirst({
        where: {
            provider: provider,
            providerId: email
        }
    })
    if (!account) {
        throw new NotFoundException("Invalid email or password")
    }
    const user = await prisma.user.findUnique({
        where: {
            id: account.userId
        }
    })
    if (!user) {
        throw new NotFoundException("User not found for this account")
    }
    const isMatched = await comparedPassword(password, user.password as string)
    if (!isMatched) {
        throw new NotFoundException("Invalid email or password")
    }
    return  user 
}

export const registerUserService =async(body:{
    email:string,
    name:string,
    password:string
})=>{
    const {email,name,password} = body

    return await prisma.$transaction(async (ts)=>{
        const existingUser = await ts.user.findUnique({
            where:{email}
        })
        if(existingUser){
            throw new BadRequestException("User already exists")
        }
        const hassedPassword=await bcrypt.hash(password,10)
        let user =await ts.user.create({
            data:{
                email,
                name,
                password:hassedPassword
            }
        })
        await ts.accountProvider.create({
            data:{
                provider:Provider.EMAIL,
                providerId:email,
                userId:user.id
            }
        })
    })
}