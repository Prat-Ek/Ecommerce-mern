import { type Request, type Response, type NextFunction } from "express";
export default function ErrorHandlingMiddleware(error:any, req:Request, res:Response, next:NextFunction) {
 let code = error.code || 500;
 let detail = error.detail || error.details || null;
let msg = error.message || "Internal server error"
 if (error.name === "MongoServerError") {
    code = 400
    msg = 'DB error'

    // unique failed
    if(+error.code === 11000) {
      msg = "Validation failed"
      detail = {} as Record<string, string>

      Object.keys(error.keyPattern).map((key: string) => {
        detail[key] = `${key} should be unique`
      })
    }
 }
res.status(code).json({
    detail:detail,
    message:msg,
    meta:null
})
}
