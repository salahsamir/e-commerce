import { Router } from "express";
import { validation } from "../../middleware/validation.js";
import { fileUpload, fileValidation } from "../../utils/multer.js";
import { createCategory, updateCategory } from "./category.validation.js";
import * as category_controller from "./controller/category.js"
import subcategoryrouter from '../subcategory/subcategory.router.js' 
import { Roles, auth } from "../../middleware/auth.js";
import { endPoint } from "./category.endPoint.js";


const router = Router()

router.use('/:categoryId/subcategory',subcategoryrouter)
router.get('/',auth(Object.values(Roles)),category_controller.get_category)
router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).single('image'),validation(createCategory),category_controller.create_category)
router.put('/:id',auth(endPoint.create),fileUpload(fileValidation.image).single('image'),validation(updateCategory),category_controller.update_category)





export default router