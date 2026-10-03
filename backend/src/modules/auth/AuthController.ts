import { type Request, type Response, type NextFunction } from "express";
import bcrypt from "bcryptjs";
import { appConfig } from "../../config/config";
import UserModel from "../user/UserModel";
import jwt from "jsonwebtoken";
import { IAuthRequest } from "../../types/IAuthtype";
class AuthController {
  registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      body.password = bcrypt.hashSync(body.password, 12);
      if (req.file) {
        // body.image= req.file

        body.image = {
          name: req.file.filename,
          path: req.file.path,
          size: req.file.size,
          type: req.file.mimetype,
          url: appConfig.assetsUrl + "users/" + req.file.filename,
          // url: `${appConfig.assetsUrl}${dirpath}${file.filename}`,
        };
      } else {
        // throw {code:400, message:"Validation failed",detail:{image:"Image is required"}}
      }

      const userObj = new UserModel(body);
      await userObj.save();

      res.json({
        data: userObj,
        message: "Register Success",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
  loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      const userDetail = await UserModel.findOne({
        $or: [{ username: username }, { email: username }, { phone: username }],
      });
      if (!userDetail) {
        throw { code: 422, message: "User not registerd yet" };
      }
      if (!bcrypt.compareSync(password, userDetail.password)) {
        if (!userDetail) {
          throw { code: 422, message: "User not registerd yet" };
        }
      }
      const accessToken = jwt.sign(
        { sub: userDetail._id },
        appConfig.jwtSecret as string,
        {
          expiresIn: "2h",
        },
      );
      const refreshToken = jwt.sign(
        { sub: userDetail._id },
        appConfig.jwtSecretRefresh as string,
        {
          expiresIn: "2h",
        },
      );

      res.json({
        data: {
          accessToken,
          refreshToken,
        },
        message: "Login Success",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
  getLoggedInUserProfile = (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.json({
        data: req.loggedInUser,
        message: "Your Profile",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
  logout = (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.cookies?.accessToken) {
        res.clearCookie("accessToken");
      }

      if (req.cookies?.refreshToken) {
        res.clearCookie("refreshToken");
      }

      res.json({
        data: null,
        message: "Logout Success",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
}

export default AuthController;
