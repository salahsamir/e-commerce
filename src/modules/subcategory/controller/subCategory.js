import slugify from "slugify";
import { Category } from "../../../../DB/model/Category.model.js";
import { asyncHandeler } from "../../../utils/errorHandling.js";
import cloudinary from './../../../utils/cloudinary.js';
import { SubCategory } from './../../../../DB/model/SubCategory.model.js';
import { nanoid } from "nanoid";


export const get_subcategory=asyncHandeler(
  async(req,res,next)=>{
    const find_all=await SubCategory.find({})
    if(!find_all){
      return next(new Error("not category yet",{cause:500}))
    }
    const number=find_all.length
    return res.status(200).json({message:`${number} SubCategory`,find_all})
 
}
)

export const create_subcategory=asyncHandeler(
  async(req,res,next)=>{ 
    const {name}=req.body;
    const {categoryId}=req.params
  const find_category=await Category.findById(categoryId)
  if(!find_category){
    return next(new Error('category not exist "invalid-id"',{cause:404}))
  }
  const custemid=nanoid()
  const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.API_NAME}/category/${categoryId}/${custemid}`})
  const create_subcategory=await SubCategory.insertMany({name,categoryId,slug:slugify(name,'_'),image:{secure_url,public_id},custemid,createdBy:req.user._id})
  if(!create_subcategory){
    return next(new Error('fail create ',{cause:500}))
  }
   return res.status(201).json(create_subcategory)
}
)
export const update_subcategory=asyncHandeler(
  async(req,res,next)=>{
    const {subcategoryId,categoryId}=req.params;
    const  subcategory=await SubCategory.findOne({_id:subcategoryId,categoryId})
    if(!subcategory){
      return res.status(404).json({message:" subcategory not exist"})
    }
   if(req.body.name){
    
    subcategory.name=req.body.name.toLowerCase()
    subcategory.slug=slugify(req.body.name,"_")
   }
   if(req.file){
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.API_NAME}/category/${categoryId}/${subcategory.custemid}`})
   subcategory.image={secure_url,public_id}
   
   }
   subcategory.updateddBy=req.user._id


await subcategory.save();

return res.json(subcategory)
}
)
