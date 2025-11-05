import bcrypt from 'bcrypt'
export const comparedPassword = async (plainPassword: string, hashedPassword: string) => {
    const isMatched = await bcrypt.compare(plainPassword, hashedPassword)
    return isMatched
}