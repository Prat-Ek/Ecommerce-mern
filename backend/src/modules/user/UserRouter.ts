import { Router } from "express";
import loginCheck from "../../middleware/AuthMiddleware";
import UserController from "./UserController";

const useRouter = Router()
const userCTRL= new UserController()
useRouter.get("/",loginCheck(),userCTRL.listAllUser)

export default useRouter