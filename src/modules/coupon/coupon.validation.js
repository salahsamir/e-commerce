import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'


export const createcoupon=joi.object(
   {
    name:joi.string().min(2).max(50).required(),
    amount:joi.number().positive().min(1).max(100).required(),
    file:generalFields.file,
    expireDate:joi.date().greater(new Date()).required()

   }
).required()
export const updatecoupon=joi.object(
    {
     name:joi.string().min(2).max(50),
     file:generalFields.file,
     couponId:generalFields.id.required(),
    amount:joi.number().positive().min(1).max(100),
    expireDate:joi.date()

 
    }
 ).required()