import express, { Request, Response } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.middleware'
import passport from 'passport'
import { googleLoginCallback, loginController, logoutController, registerUserController } from '../controllers/auth.controller'
import { config } from '../config/app.config'

const router=express.Router()

const failedUrl = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?error=access_denied`

router.post('/register',registerUserController)
router.post('/login',loginController)
router.post('/logout',logoutController)

router.get('/google',passport.authenticate('google',{scope:["email","profile"]}))

router.get('/google/callback',passport.authenticate('google',{failureRedirect:""}),googleLoginCallback)

export default router