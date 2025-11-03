import { getEnv } from "../utilities/getEnv";

const appConfig = ()=>({
    MODE_ENV:getEnv("MODE_ENV","DEVELOPMENT"),
    PORT:getEnv("PORT","3000"),
    BASE_PATH: getEnv("BASE_PATH", "/api"),
    SESSION_SECRET: getEnv("SESSION_SECRET", "secret"),

    FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "http://localhost:5173"),
     FRONTEND_GOOGLE_CALLBACK_URL: getEnv("FRONTEND_GOOGLE_CALLBACK_URL"),
})

export const config = appConfig()