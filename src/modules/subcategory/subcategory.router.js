import { Router } from "express";
import { validation } from "../../middleware/validation.js";
import { fileUpload, fileValidation } from "../../utils/multer.js";
import { createsubCategory, updatesubCategory } from "./subcategory.validation.js";
import * as subcategory_controller from "./controller/subCategory.js"
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./subcategory.endPoint.js";
const router = Router({mergeParams:true})

router.get('/',subcategory_controller.get_subcategory)
router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).single('image'),validation(createsubCategory),subcategory_controller.create_subcategory)
router.put('/:subcategoryId',fileUpload(fileValidation.image).single('image'),validation(updatesubCategory),subcategory_controller.update_subcategory)





export default router