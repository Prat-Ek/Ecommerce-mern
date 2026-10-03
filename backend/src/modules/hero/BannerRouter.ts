import { Router } from "express";
import loginCheck from "../../middleware/AuthMiddleware";
import Uploader from "../../middleware/UploaderMiddleware";
import bodyValidator from "../../middleware/ValidatorMiddleware";
import BannerController from "./BannerController";
import { BannerCreateDTO } from "./BannerDTO";
const bannerCtrl = new BannerController()

const bannerRouter = Router()

bannerRouter.get("/home",bannerCtrl.listAllForHome)



bannerRouter.post("/",loginCheck() ,Uploader("/banners").single("image"), bodyValidator(BannerCreateDTO),bannerCtrl.create)
bannerRouter.get("/",loginCheck(),bannerCtrl.listAll)


bannerRouter.get("/:bannerId",loginCheck(), bannerCtrl.getBannerById)

bannerRouter.put ("/:bannerId",loginCheck(),Uploader("/banners").single("image"),bannerCtrl.update)
bannerRouter.delete("/:bannerId",loginCheck(), bannerCtrl.deleteBannerById)
export default bannerRouter