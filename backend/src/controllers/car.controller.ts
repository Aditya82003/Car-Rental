import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.middleware";
import { UnauthorizedException } from "../utilities/appError";
import { carAddSchema } from "../validations/car.validation";
import { roleGuard } from "../utilities/roleGuard";
import { Permissions } from "../enums/role.enum";
import { addCarService, getAllCarService } from "../services/car.services";
import { HTTPSTATUS } from "../config/http.config";

export const addCarController = asyncHandler(async (req: Request, res: Response) => {
    const body = carAddSchema.parse(req.body)
    const userId=req.user?.id
    const role=req.user?.role
    if(!userId || !role){
        throw new UnauthorizedException("You are not authorized to perform this action")
    }
    roleGuard(role,[Permissions.ADD_CAR])

    const car = addCarService(body)
    res.status(HTTPSTATUS.OK).json({
        message: "Car added successfully",
        car
    })
})

export const getAllCarsController = asyncHandler(async (req: Request, res: Response) => {
    const userId=req.user?.id
    if(!userId){
        throw new UnauthorizedException("You are not authorized to perform this action")
    }

    const filter={
        name: req.query.name? String(req.query.name):undefined,
        fuelType: req.query.fuelType? String(req.query.fuelType):undefined,
        seats: req.query.seats? Number(req.query.seats):undefined,
        available: req.query.available? Boolean(req.query.available):undefined,
        driver: req.query.driver? String(req.query.driver):undefined,
        keyword: req.query.keyword? String(req.query.keyword):undefined
    }

    const pagination={
        pageSize:parseInt(req.query.pageSize as string) || 10,
        pageNumber:parseInt(req.query.pageNumber as string) || 1
    }

    const  result = await getAllCarService(filter,pagination)

    return res.status(HTTPSTATUS.OK).json({
        message:"Cars fetched successfully",
        ...result
    })
})