
import { coupon } from "../../../../DB/model/Coupon.model.js";
import { asyncHandeler } from "../../../utils/errorHandling.js";
import cloudinary from './../../../utils/cloudinary.js';



export const get_coupon=asyncHandeler(
  async(req,res,next)=>{
    const find_all=await coupon.find({}).populate([{path:"Subcoupon"}])
    if(!find_all){
      return next(new Error("not coupon yet",{cause:500}))
    }
    const number=find_all.length
    return res.status(200).json({message:`${number} categories`,find_all})
 
}
)

export const create_coupon=asyncHandeler(
  async(req,res,next)=>{ 
    const {name,amount,expireDate}=req.body;
    if(await coupon.findOne({name})){
        return next(new Error('name must be unique',{cause:409}))
    }
   req.body.expireDate=new Date(expireDate)
  
    if(req.file){
        const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.API_NAME}/coupon`})
        req.body.image={secure_url,public_id}

    }
    req.body.createdBy=req.user._id
const create_coupon=await coupon.insertMany(req.body)
  if(!create_coupon){
    return next(new Error('fail create ',{cause:500}))
  }
   return res.status(201).json(create_coupon)
}
)
export const update_coupon=asyncHandeler(
  async(req,res,next)=>{
    const {couponId}=req.params;
    const find_coupon=await coupon.findById(couponId)
    if(!find_coupon){
      return res.status(400).json({message:"coupon not exist"})
    }
    if(req.body.expireDate){
      req.body.expireDate=new Date(req.body.expireDate)
    }
    if(req.body.name){
        if(await coupon.findOne({name:req.body.name})){
            return res.status(409).json({message:"name must be ubique"})
        }
        find_coupon.name=req.body.name;
    }
    if(req.body.amount){
    
        find_coupon.amount=req.body.amount;
    }
    if(req.file){
        const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.API_NAME}/coupon`})
        if(find_coupon.image){
            await cloudinary.uploader.destroy(find_coupon.image.public_id)

        }
        find_coupon.image={secure_url,public_id}

    }
    find_coupon.updatedBy=req.user._id
    
find_coupon.save()
return res.status(200).json(find_coupon)

}
)
