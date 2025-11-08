import prisma from "../prisma/client.prisma"
import { NotFoundException } from "../utilities/appError"

export const addCarService = async (body: {
    name: string
    brand: string
    licensePlate: string
    fuel?: string
    seats?: number
    meterReading?: number
    pricePerDay: number
    image?: string
    available?: boolean
}) => {
    const { name, brand, licensePlate, fuel, seats, meterReading, pricePerDay, image, available } = body

    const car = await prisma.car.create({
        data: {
            name,
            brand,
            licensePlate,
            fuelType: fuel,
            seats,
            meterReading,
            priceperday: pricePerDay,
            imageUrl: image,
            available

        }
    })
    return car
}

export const deleteCarService = async (carId: string) => {
    await prisma.car.delete({
        where: { id: carId }
    })
}

export const updateCarService = async (
    carId:string,
    body: {
    name?: string
    brand?: string
    licensePlate?: string
    fuel?: string
    seat?: number
    meterReading?: number
    pricePerDay?: number
    image?: string
    available?: boolean
    driverId?: string
}) => {
    const { name, brand, licensePlate, fuel, seat, meterReading, pricePerDay, image, available, driverId } = body

    const car = await prisma.car.findUnique({
        where:{id: carId}
    })
    if(!car){
        throw new NotFoundException("Car not found")
    }
    const updatedCar = await prisma.car.update({
        where:{id:carId},
        data:{
            name,
            brand,
            licensePlate,
            fuelType: fuel,
            seats: seat,
            meterReading,
            priceperday: pricePerDay,
            imageUrl: image,
            available,
        }
    })
    return {updatedCar}
}


export const getAllCarService = async (filter: {
    name?: string
    fuelType?: string
    seats?: number
    available?: boolean
    driver?: string
    keyword?: string
}, pagination: {
    pageSize: number
    pageNumber: number
}) => {
    const where: any = {}
    if (filter.name) {
        where.name = filter.name
    }
    if (filter.fuelType) {
        where.fuelType = filter.fuelType
    }
    if (filter.seats) {
        where.seats = filter.seats
    }
    if (filter.available) {
        where.available = filter.available
    }
    if (filter.driver) {
        where.driver = filter.driver
    }
    if (filter.keyword) {
        where.OR = [
            { name: { contains: filter.keyword, mode: "insensitive" } },
        ]
    }
    const { pageNumber, pageSize } = pagination
    const skip = (pageNumber - 1) * pageSize

    const [cars, totalCount] = await prisma.$transaction([
        prisma.car.findMany({
            where,
            skip,
            take: pageSize,
        }),
        prisma.car.count({
            where,
        }),
    ])
    const totalPage = Math.ceil(totalCount / pageSize)
    return {
        cars,
        pagination: {
            pageSize,
            pageNumber,
            totalCount,
            totalPage,
            skip
        }
    }
}

export const assignDriverToCarService=async(carId:string,driverId:string)=>{
    let car = await prisma.car.findUnique({
        where:{id:carId}
    })
    if(!car){
        throw new NotFoundException("Car not found")
    }
    const user =await prisma.user.findUnique({
        where:{id:driverId}
    })
    if(!user){
        throw new NotFoundException("User not found")
    }
    if(car.driverId && car.driverId !== driverId){
        
    }
    car= await prisma.car.update({
        where:{id:carId},
        data:{driverId:driverId},
        include:{driver:true}
    })
    return car

}

export const getCarByIdService = async (carId: string) => {
    const car = await prisma.car.findUnique({
        where:{
            id:carId,
        },
        include: {
            driver: {
                select:{
                    name:true
                }
            }
        }
    })
    return car
}