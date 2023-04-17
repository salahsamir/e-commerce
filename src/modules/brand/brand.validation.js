import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'


export const createbrand=joi.object(
   {
    name:joi.string().min(2).max(50).required(),
    file:generalFields.file.required(),
  

   }
).required()
export const updatebrand=joi.object(
    {
     name:joi.string().min(2).max(50),
     file:generalFields.file,
     id:generalFields.id.required(),
  

 
    }
 ).required()
 export const deletebrand=joi.object(
   {
    id:generalFields.id.required(),
   }
).required()