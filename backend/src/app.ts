import express, { Application } from "express"
import router from "./router"
import ErrorHandlingMiddleware from "./middleware/ErrorHandlingMiddleware"
import "./config/mongodb"
import"./config/sql"
import cors from "cors"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import path from "path"

const app:Application = express()

app.use (cors())
const limits = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 100,
  legacyHeaders: true
})
app.use(limits) 
app.use(helmet());

//body parsers
app.use (express.json({
    limit:"1mb"
}))

app.use (express.urlencoded({
    limit: "1mb"
}))
console.log (path.resolve(process.cwd(),"./public/uploads"))
app.use ('/assets',express.static(path.resolve(process.cwd(),"./public/uploads")))

app.use (router)

app.use ((req,res,next)=>{
    next({
        code:404,
        message:"Resource not found"
    })

})
app.use(ErrorHandlingMiddleware)

export default app