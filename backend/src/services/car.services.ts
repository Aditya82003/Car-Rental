import prisma from "../prisma/cilent.prisma"

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
            { name: { contains: where.keyword, mode: "insensitive" } },
        ]
    }
    const {pageNumber,pageSize}=pagination
    const skip=(pageNumber-1)*pageSize

    const [cars,totalCount] = await prisma.$transaction([
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
        pagination:{
            pageSize,
            pageNumber,
            totalCount,
            totalPage,
            skip
        }
    }
}