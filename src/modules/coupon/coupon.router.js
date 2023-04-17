import { Router } from "express";
import { validation } from "../../middleware/validation.js";
import { fileUpload, fileValidation } from "../../utils/multer.js";
import { createcoupon, updatecoupon } from "./coupon.validation.js";
import * as coupon_controller from "./controller/coupon.js"
import {auth} from '../../middleware/auth.js'
import { endPoint } from "./coupon.endPoint.js";
const router = Router()
router.get('/',coupon_controller.get_coupon)
router.post('/',auth(endPoint.create_coupon),fileUpload(fileValidation.image).single('image'),validation(createcoupon),coupon_controller.create_coupon)
router.put('/:couponId',auth(endPoint.create_coupon),fileUpload(fileValidation.image).single('image'),validation(updatecoupon),coupon_controller.update_coupon)





export default router