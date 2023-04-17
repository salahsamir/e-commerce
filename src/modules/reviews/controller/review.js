import { order_model } from "../../../../DB/model/order.model.js";
import { reveiw_model } from "../../../../DB/model/review.model.js";
import { asyncHandeler } from "../../../utils/errorHandling.js";

import chalk from 'chalk'

export const add_review=asyncHandeler(
async(req,res,next)=>{
    const {productId}=req.params;
    const {comment,rating}=req.body
    const find_order=await order_model.findOne({userId:req.user._id,status:"delivered",'products.productId':productId})
    if(!find_order){
        return next(new Error("in-valid order",{cause:404}))
    }
    //check review  If it exists or not
    const check_review=await reveiw_model.findOne({productId,orderId:find_order._id,userId:req.user._id})
    if(check_review){
        return next(new Error(" Right to reply only once",{cause:404}))

    }
    //create review
    const create_review=await reveiw_model.insertMany({userId:req.user._id,productId,orderId:find_order._id,comment,rating})
    if(!create_review){
        return next(new Error(" fail process once",{cause:404}))

    }
    return res.status(201).json({message:"done created",create_review})
    // console.log(chalk.bgCyan(check_review));
}


)
//-------//
//update review
export const update_review=asyncHandeler(
    async(req,res,next)=>{
        const {productId,reviewId}=req.params;
    
        //check review  If it exists or not
        const check_review=await reveiw_model.findOneAndUpdate({productId,_id:reviewId,userId:req.user._id},req.body,{new:true})
            //    console.log(chalk.bgCyan(check_review));
        if(!check_review){
            return next(new Error(" Right to reply only once",{cause:404}))
    
        }
        return res.status(201).json({message:"done updated",check_review})
 
    }
    
    
    )