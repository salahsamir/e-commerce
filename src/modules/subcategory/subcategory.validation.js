import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'


export const createsubCategory=joi.object(
   {
    name:joi.string().min(2).max(50).required(),
    file:generalFields.file,
    categoryId:generalFields.id.required(),



   }
).required()
export const updatesubCategory=joi.object(
    {
     name:joi.string().min(2).max(50),
     file:generalFields.file,
     categoryId:generalFields.id.required(),
     subcategoryId:generalFields.id.required(),




 
    }
 ).required()