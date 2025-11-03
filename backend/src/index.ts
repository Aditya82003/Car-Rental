import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response, urlencoded } from 'express'
import cors from 'cors'
import session from 'express-session'
import { config } from './config/app.config'
import { asyncHandler } from './middleware/asyncHandler.middleware'
import { BadRequestException } from './utilities/appError'
import { HTTPSTATUS } from './config/http.config'
import { errorHandler } from './middleware/errorHandler.middleware'
import authRoute from './routes/auth.routes'

const app = express()

const PORT = config.PORT || 3000
const BASE_PATH = config.BASE_PATH

app.use(cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(urlencoded({ extended: true }))

app.use(
    session({
        name: "session",
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
            secure: config.MODE_ENV === "PRODUCTION",
            httpOnly:true,
            sameSite:"lax"
        }
    })
)

app.get('/', asyncHandler(async (req: Request, res: Response) => {
    throw new BadRequestException("Bad request")
    res.status(HTTPSTATUS.OK).json({
        message: "Response from /"
    })
}))

app.use(`${BASE_PATH}/auth`, authRoute)

app.use(errorHandler)


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))