import express, { Request, Response } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.middleware'

const router=express.Router()

router.get('/register',asyncHandler(async(req:Request,res:Response)=>{
   res.send("Register") 
}))

export default router