import slugify from "slugify";
import { brand } from "../../../../DB/model/brand.model.js";
import { asyncHandeler } from "../../../utils/errorHandling.js";
import cloudinary from './../../../utils/cloudinary.js';
import { delete_model, get_all } from "../../Helper.js";



export const get_brand=get_all(brand)

export const create_brand=asyncHandeler(
  async(req,res,next)=>{ 
    const name=req.body.name.toLowerCase();
  const find_brand=await brand.findOne({name})
  if(find_brand){
    return next(new Error(' please enter anther name',{cause:500}))
  }
  const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.API_NAME}/brand`})

  const create_brand=await brand.insertMany({name,slug:slugify(name,'_'),image:{secure_url,public_id},createdBy:req.user._id})
  if(!create_brand){
    return next(new Error('fail create ',{cause:500}))
  }
   return res.status(201).json(create_brand)
}
)
export const update_brand=asyncHandeler(
  async(req,res,next)=>{
    const {id}=req.params;
    console.log(req.user._id);
    const update_brand=await brand.findById(id)
    if(!update_brand){
      return res.status(404).json({message:"brand not exist"})
    }
   if(req.body.name){
    const find_brand=await brand.findOne({name:req.body.name})
    if(find_brand){
      return res.status(409).json({message:"name must be unique"})
    }
    update_brand.name=req.body.name
    update_brand.slug=slugify(req.body.name,"_")
   }
   if(req.file){
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.API_NAME}/brand`})
    if(update_brand.image){
        await cloudinary.uploader.destroy(update_brand.image)
    }
   
   update_brand.image={secure_url,public_id}
   }
   update_brand.updatedBy=req.user._id
  
await update_brand.save();

return res.json(update_brand)
}
)


export const delete_brand=delete_model(brand)