
import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'
export const createOrder=joi.object(
  {  note:joi.string(),
    couponName:joi.string(),
    address:joi.string().required(),
    phone:joi.array().items(joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/)).required()).min(1).max(3).required(),
    products:joi.array().items(joi.object({
        productId:generalFields.id,
        quantity:joi.number().positive()
    }))


}
).required()
export const updateOrder=joi.object(
  {  reason:joi.string(),
    orderId:generalFields.id,

}
).required()
export const Order=joi.object(
  {  status:joi.string().valid('onway','deliverd').required(),
    orderId:generalFields.id,

}
).required()