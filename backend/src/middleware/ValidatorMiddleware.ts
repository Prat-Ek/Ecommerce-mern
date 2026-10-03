import type { Request,Response, NextFunction } from "express";
import { ZodError, ZodObject} from "zod"

const bodyValidator = (schema: ZodObject)=>{
    return async (req:Request, res:Response, next:NextFunction)=>{
 try {
      const data = req.body; 
      if(!data) {
        throw {code: 422, message: "Data not set"}
      }

      // 
      const parsedData = await schema.parseAsync(data);

      req.body = parsedData
      next()
    } catch(exception) {
       if(exception instanceof ZodError) {
        // validation error 
        let errBag: Record<string,string>= {}
        exception.issues.map((error) => {
          errBag[error.path.join(".")] = error.message
        })
        next({code: 400, detail: errBag, message: "Validation Failed"})
      } else {
        next(exception)
      }
    }
    }
   

}

export default bodyValidator