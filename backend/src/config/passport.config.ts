import passport from 'passport'
import { Request } from 'express'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as LocalStrategy } from 'passport-local'

import { config } from './app.config'
import { NotFoundException } from '../utilities/appError'
import { Provider } from '../generated/prisma/enums'
import { loginOrCreateAccount, verifyUserService } from '../services/auth.services'

import { omitPassword } from '../utilities/omitPassword'
import prisma from '../prisma/client.prisma'

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_CALLBACK_URL,
    scope: ["email", "profile"],
    passReqToCallback: true
}, async (req: Request, accessToken, refreshToken, profile, done) => {
    try {
        const { email, sub: gooleId, picture } = profile._json
        console.log(profile, "profile")
        console.log(gooleId, "googleId")
        if (!gooleId) {
            throw new NotFoundException("Google ID not found")
        }
        const { user } = await loginOrCreateAccount({
            provider: Provider.GOOGLE,
            providerId: gooleId,
            displayName: profile.displayName,
            picture,
            email
        })
        const safeUser = omitPassword(user)
        return done(null, safeUser)
    } catch (error) {
        return done(error, false)
    }
}))

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    session: true
}, async (email, password, done) => {
    try {
        const user = await verifyUserService({ email, password, provider: Provider.EMAIL })
        const safeUser = omitPassword(user)
        return done(null, safeUser)
    } catch (error) {
        return done(error, false)

    }
}))

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id }
        })
        if(!user) return done(null,false)
        const safeUser = omitPassword(user)
        return done(null, safeUser)
    }catch(error){
        return done(error, false)
    }
})