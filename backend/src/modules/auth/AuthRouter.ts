import { Router } from "express";
import AuthController from "./AuthController";
import Uploader from "../../middleware/UploaderMiddleware";
import bodyValidator from "../../middleware/ValidatorMiddleware";
import { LoginDTO, UserRegisterDTO } from "./AuthDTO";
import loginCheck from "../../middleware/AuthMiddleware";


const authRouter = Router()
const authCtrl = new AuthController();

authRouter.post ("/register",Uploader("/users").single("image"), bodyValidator(UserRegisterDTO),authCtrl.registerUser)
authRouter.post ("/login",bodyValidator(LoginDTO), authCtrl.loginUser)
 authRouter.get ("/me",loginCheck(),authCtrl.getLoggedInUserProfile)
 authRouter.post ("/logout",loginCheck(),authCtrl.logout)


export default authRouter