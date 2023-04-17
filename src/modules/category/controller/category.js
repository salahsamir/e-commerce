import slugify from "slugify";
import { Category } from "../../../../DB/model/Category.model.js";
import { asyncHandeler } from "../../../utils/errorHandling.js";
import cloudinary from './../../../utils/cloudinary.js';
import { get_all } from './../../Helper.js';


export const get_category=get_all(Category)

export const create_category=asyncHandeler(
  async(req,res,next)=>{ 
    const {name}=req.body;
  const find_category=await Category.findOne({name})
  if(find_category){
    return next(new Error(' please enter anther name',{cause:500}))
  }
  const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.API_NAME}/category`})

  const create_category=await Category.insertMany({name,slug:slugify(name,'_'),image:{secure_url,public_id}, createdBy:req.user._id})
  if(!create_category){
    return next(new Error('fail create ',{cause:500}))
  }
   return res.status(201).json(create_category)
}
)
export const update_category=asyncHandeler(
  async(req,res,next)=>{
    const {id}=req.params;
    const cat=await Category.findById(id)
    if(!cat){
      return res.status(404).json({message:"category not exist"})
    }
   if(req.body.name){
    const find_category=await Category.findOne({name:req.body.name})
    if(find_category){
      return res.status(409).json({message:"name must be unique"})
    }
    cat.name=req.body.name
    cat.slug=slugify(req.body.name,"_")
   }
   if(req.file){
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.API_NAME}/category`})
    await cloudinary.uploader.destroy(cat.image)
   cat.image={secure_url,public_id}
   }

   cat.updatedBy=req.user._id
await cat.save();

return res.json(cat)
}
)
