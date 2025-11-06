import { z } from 'zod'

export const carIdSchema = z.string().trim().min(1)
export const carNameSchema = z.string().trim().min(1,
    "Car name is required"
)
export const carBrandSchema = z.string().trim().min(1, "Car brand is required")
export const carLicensePlateSchema = z.string().trim().min(1, "License plate is required").max(20, "License plate is too long")
export const carFuelSchema = z.string().trim().optional()
export const carSeatsSchema = z.number().optional()
export const carMeterReadingSchema = z.number().optional()
export const carPricePerDaySchema = z.number().positive("Price per day must be a positive number")
export const carImageSchema = z.string().trim().optional()
export const carAvailableSchema = z.boolean().default(true)

export const carDriverIdSchema = z.string().trim().optional()

export const carLatitudeSchema = z.number().refine((val) => val >= -90 && val <= 90, "Invalid latitude").optional()
export const carLongitudeSchema = z.number().refine((val) => val >= -180 && val <= 180, "Invalid longitude").optional()

export const carAddSchema = z.object({
    name: carNameSchema,
    brand: carBrandSchema,
    licensePlate: carLicensePlateSchema,
    fuel: carFuelSchema,
    seat:carSeatsSchema,
    meterReading:carMeterReadingSchema,
    pricePerDay:carPricePerDaySchema,
    image:carImageSchema,
    available:carAvailableSchema,
    driverId:carDriverIdSchema,
    latitude:carLatitudeSchema,
    longitude:carLongitudeSchema
})

export const carUpdateSchema = carAddSchema.partial()
