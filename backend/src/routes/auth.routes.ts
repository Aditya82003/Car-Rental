import express, { Request, Response } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.middleware'
import passport from 'passport'
import { loginController, logoutController, registerUserController } from '../controllers/auth.controller'

const router=express.Router()

router.post('/register',registerUserController)
router.post('/login',loginController)
router.post('/logout',logoutController)

router.get('/google',passport.authenticate('google',{scope:["email","profile"]}))

export default router