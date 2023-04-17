import { Router } from "express";
import * as productController from './controller/product.js'
import { fileUpload, fileValidation } from "../../utils/multer.js";
import { Roles, auth } from "../../middleware/auth.js";
import { endPoint } from './../subcategory/subcategory.endPoint.js';
import { validation } from "../../middleware/validation.js";
import { create, update_product } from "./product.validation.js";
import reviewsRouter from '../reviews/reviews.router.js'
const router = Router()



router.use('/:productId/reviews',reviewsRouter)

router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImages',maxCount:5},

]),validation(create),productController.create_product)
router.put('/:product_id',auth(endPoint.update),fileUpload(fileValidation.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImages',maxCount:5},

]),validation(update_product),productController.update_product)

router.get('/',auth(Object.values(Roles)),productController.get_product)

export default router