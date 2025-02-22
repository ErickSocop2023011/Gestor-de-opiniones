import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { swaggerDocs, swaggerUi } from "./swagger.js";
import { dbConnection } from "./mongo.js"
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import categoryRoutes from "../src/category/category.routes.js"
import postRoutes from "../src/post/post.routes.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import {createDefaultAdmin , createDefaultCategory} from "./default-data.js"

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) =>{
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.use("/socialmedia/v1/auth", authRoutes)
    app.use("/socialmedia/v1/user", userRoutes)
    app.use("/socialmedia/v1/category", categoryRoutes)
    app.use("/socialmedia/v1/post", postRoutes)
}

const ConnectDB = async () =>{
    try{
        await dbConnection()
        await createDefaultAdmin()
        await createDefaultCategory()
    }catch(err){
        console.log(`Database connecetion failed ${err}`)
        process.exit(1)
    }
}

export const initServer = () =>{
    const app = express()
    try{
        middlewares(app)
        ConnectDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`server inti failed ${err}`)
    }
}