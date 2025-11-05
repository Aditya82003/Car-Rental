import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import { registerUserService } from "../services/auth.services";
import passport from "passport";

export const registerUserController = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body
    await registerUserService(body)

    return res.status(HTTPSTATUS.CREATED).json({
        message: "User created successfully"
    })
})

export const loginController = asyncHandler(async (req: Request, res: Response,next:NextFunction) => {
    passport.authenticate('local',(
        err:Error  | null,
        user:Express.User | null,
        info:{message:string}|null
    )=>{
        if(err){
            return next(err)
        }
        if(!user){
            return res.status(HTTPSTATUS.UNAUTHORIZED).json({
                message:info?.message || "Invalid credentials"
            })
        }
        req.logIn(user,(err)=>{
            if(err){
                return next(err)
            }
            return res.status(HTTPSTATUS.OK).json({
                message:"Login successful"
            })
        })
    })(req,res,next)
})

export const logoutController = asyncHandler(async (req: Request, res: Response) => {
    req.logOut((err) => {
        if (err) {
            console.log("Logout Error", err)
            return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
                message: "Logout Error"
            })
        }
        req.session.destroy((err) => {
            if (err) {
                console.log("Session destroy error", err)
                return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
                    message: "Session destroy error"
                })
            }
        })
        res.clearCookie("session")

        return res.status(HTTPSTATUS.OK).json({
            message: "Logout successful"
        })
    })

})