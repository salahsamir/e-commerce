import { Router } from "express";
import * as reviewController from './controller/review.js'
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./reviews.endPoint.js";
const router = Router({mergeParams:true})


router.post('/',auth(endPoint.create), reviewController.add_review)
router.patch('/:reviewId',auth(endPoint.update), reviewController.update_review)





export default router