import { Router } from "express";
import { validation } from "../../middleware/validation.js";
import { fileUpload, fileValidation } from "../../utils/multer.js";
import { createbrand, deletebrand, updatebrand } from "./brand.validation.js";
import * as brand_controller from "./controller/brand.js"
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./brand.endPoint.js";

const router = Router()

router.get('/',brand_controller.get_brand)
router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).single('image'),validation(createbrand),brand_controller.create_brand)
router.put('/:id',auth(endPoint.create),fileUpload(fileValidation.image).single('image'),validation(updatebrand),brand_controller.update_brand)
router.delete('/:id',auth(endPoint.delete),validation(deletebrand),brand_controller.delete_brand)


export default router