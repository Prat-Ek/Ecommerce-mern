import { Request, Response, NextFunction } from "express";
import UserModel from "./UserModel";


class UserController {
   async listAllUser(req:Request, res:Response, next:NextFunction){
       try{
        let filter:Record<string,any> ={   
        }
        let page = Number ( req.query.page || 1)
        const limit = Number (req.query.limit || 20)

        let skip = (page-1) *limit;
        if (req.query.search){
            filter={
                ...filter,
                $or: [
                    {name: new RegExp(req.query.search as string,"i") },
                    {email: new RegExp(req.query.search as string,"i") },
                    {role: new RegExp(req.query.search as string,"i") },
                    {phone: new RegExp(req.query.search as string,"i") },
                ]

            }
        }

        const data = await UserModel.find(filter,{
            password: 0
        }).sort({"name":"asc"}).skip(skip).limit(limit)
        const count = await UserModel.countDocuments(filter)

 res.json({
            data:data,
            message:"User Lists",
            meta:{
                pagination:{
                    page:+page,
                    limit:+limit,
                    total:+count,
                    totalPages: Math.ceil(+count / limit)
                }
            }
        })
       }catch (exception){
        next(exception)
       }
    }
    async getAllUserByName (req:Request, res:Response, next:NextFunction){

    }

}
export default UserController