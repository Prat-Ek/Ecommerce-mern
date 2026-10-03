import {  Response, NextFunction } from "express";
import  jwt  from "jsonwebtoken";
import { appConfig } from "../config/config";
import UserModel from "../modules/user/UserModel";
import { AddressType, IAuthRequest, ImageType } from "../types/IAuthtype";

export default function loginCheck() {
  return async(req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
       let token = req.headers["authorization"]
       if (!token) {
         throw { code: 401, message: "Login requried" };
       }
       token = token.replace("Bearer ", "").trim();

       const data = jwt.verify(token, appConfig.jwtSecret as string)

        const userDetail = await UserModel.findById(data.sub);
      if (!userDetail) {
        throw { message: "User not found", code: 401 };
      }
      req.loggedInUser ={
         role: userDetail.role,
         image: userDetail.image as unknown as ImageType,
         address: userDetail.address as unknown as AddressType,
         status: userDetail.status,
        phone: userDetail.phone, 
        username: userDetail.username,
        email: userDetail.email, 
        birthDate: userDetail.birthDate,
        gender: userDetail.gender,
        firstName: userDetail.firstName,
        lastName: userDetail.lastName,
        _id: userDetail._id as unknown as string
      };
      next()

        
    } catch (exception) {
        
   if(exception instanceof jwt.JsonWebTokenError) {
        next({code: 401, message: exception.message})
      } else {
        next(exception)
      }
    }
  }
}
