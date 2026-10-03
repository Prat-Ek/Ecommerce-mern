import { Router } from "express";
import authRouter from "../modules/auth/AuthRouter";
import catRouter from "../modules/category/CategoryRouter";
import bannerRouter from "../modules/hero/BannerRouter";
import useRouter from "../modules/user/UserRouter";

const router = Router()

router.get ("/", (req,res)=>{
res.json({
    data:"Health ok",
    message:"Success",
    meta:null
})
})

router.use ("/auth", authRouter)
router.use ("/category",catRouter)
router.use ("/banners",bannerRouter)
router.use ('/user',useRouter)

export default router