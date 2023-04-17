import { Router } from "express";
import * as orderControler from './controller/order.js'
import {auth} from '../../middleware/auth.js'
import { endPoint } from "./order.endPoint.js";
import { validation } from "../../middleware/validation.js";
import { Order, createOrder, updateOrder } from "./order.validation.js";

const router = Router()
router.post('/',auth(endPoint.create),validation(createOrder),orderControler.createOreder)
router.patch('/:orderId',auth(endPoint.update),validation(updateOrder),orderControler.canseledOrder)
router.put('/:orderId',auth(endPoint.update_status),validation(Order),orderControler.orderDone)





export default router