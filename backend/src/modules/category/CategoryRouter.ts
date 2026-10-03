import { Router } from "express";
import CategoryController from "./CategoryController";
import loginCheck from "../../middleware/AuthMiddleware";
import Uploader from "../../middleware/UploaderMiddleware";
import bodyValidator from "../../middleware/ValidatorMiddleware";
import { catDataDTO } from "./CategoryDTO";

const catRouter = Router()
const catCtrl = new CategoryController ()

catRouter.get("/all-cats", catCtrl.FElistAll)
catRouter.get ("/:slug/detail",catCtrl.getDetailBySlug)

catRouter.post("/",loginCheck(),Uploader("/categories").single("image"),bodyValidator(catDataDTO), catCtrl.store)
catRouter.get("/",loginCheck(), catCtrl.listAll)
catRouter.get("/:id",loginCheck(), catCtrl.show)

catRouter.put('/:catId', loginCheck(), Uploader('/categories').single('image'), bodyValidator(catDataDTO), catCtrl.update)

catRouter.delete("/:catId",loginCheck(), catCtrl.delete)

export default catRouter