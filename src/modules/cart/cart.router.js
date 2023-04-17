import { Router } from "express";
import * as cartController from './controller/cart.js'
import { Roles, auth } from "../../middleware/auth.js";
import { endPoint } from "./cart.endPoint.js";

const router = Router()


router.post('/',auth(Object.values(Roles)),cartController.create_cart)
router.patch('/',auth(Object.values(Roles)),cartController.clear)





export default router