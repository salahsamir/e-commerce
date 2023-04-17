import joi from 'joi'
import { generalFields } from './../../middleware/validation.js';


export const create=joi.object({

    name:joi.string().required(),
    description:joi.string(),
    price:joi.number().required().integer().positive(),
    stock:joi.number().integer().positive(),
    discount:joi.number().positive(),
    file:joi.object({
        mainImage:joi.array().items(generalFields.file.required()).length(1).required(),
        subImages:joi.array().items(generalFields.file).min(1).max(5),
    
    
    }),
    categoryId:generalFields.id,
    subcategoryId:generalFields.id,
    brandId:generalFields.id,
    colors:joi.array(),
    sizes:joi.array()
    }).required() 

export const update_product=joi.object({

        name:joi.string(),
        description:joi.string(),
        price:joi.number().integer().positive(),
        stock:joi.number().integer().positive(),
        discount:joi.number().positive(),
        file:joi.object({
            mainImage:joi.array().items(generalFields.file).max(1),
            subImages:joi.array().items(generalFields.file).min(1).max(5),
        
        
        }),
        product_id:generalFields.id,

        categoryId:generalFields.opatinid,
        subcategoryId:generalFields.opatinid,
        brandId:generalFields.opatinid,
        colors:joi.array(),
        sizes:joi.array()
        }).required() 