
import { asyncHandeler } from './../../../utils/errorHandling.js';
import { SubCategory } from './../../../../DB/model/SubCategory.model.js';
import { brand } from './../../../../DB/model/Brand.model.js';
import slugify  from 'slugify';
import cloudinary from './../../../utils/cloudinary.js';
import { product } from '../../../../DB/model/Product.model.js';
import { nanoid } from 'nanoid';
import { get_all } from './../../Helper.js';
import { ApiFeatures } from '../../../utils/ApiFeatures.js';

export const create_product=asyncHandeler(
    async(req,res,next)=>{
      
        const{name,categoryId, subcategoryId,brandId,price,discount}=req.body;
        const find_subCategory=await SubCategory.findOne({_id:subcategoryId,categoryId})
        if(!find_subCategory){
            return next (new Error('in valid category and sub category',{cause:400}));

        }
        const find_brand=await brand.findById(brandId)
        if(!find_brand){
            return next (new Error('in valid brand',{cause:400}));
            
        }
        req.body.slug=slugify(name,"_")
        // get two number bad ,
        req.body.finalprice=Number.parseFloat(price-(price*((discount||0)/100))).toFixed(2)
        req.body.customeId=nanoid()
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.files.mainImage[0].path,{folder:`product/${req.body.customeId}`})
        req.body.mainImage={secure_url,public_id};
        if(req.files.subImages){
            req.body.subImages=[]
            for (const file of req.files.subImages) {
                const {secure_url,public_id}=await cloudinary.uploader.upload(file.path,{folder:`product/${req.body.customeId}/subimages`})
                req.body.subImages.push({secure_url,public_id})
            }
        }
        req.body.createdBy=req.user._id
      
const products=await product.create(req.body);
return products?res.status(201).json({message:'done',products}):next(new Error('fail to create this product',{cause:400}))
    }
)


export const update_product=asyncHandeler(
async(req,res,next)=>{
    const {product_id}=req.params;
    const{name,categoryId, subcategoryId,brandId,price,discount}=req.body;
   const get_product=await product.findById(product_id)
    if(!get_product){
        return next (new Error('this product not found',{cause:409}))
    }
    if(subcategoryId&& categoryId){
        if(!await SubCategory.findOne({_id:subcategoryId,categoryId})){
            return next (new Error('in valid category and sub category',{cause:400}));

        }

    }
    if(brandId){
        if(!await brand.findById(brandId)){
            return next (new Error('in valid brand',{cause:400}));

        }
    }
    if(name){
        req.body.slug=slugify(name,"_")

    }
    req.body.finalprice=(price||discount)?Number.parseFloat((price||get_product.price)-((price||get_product.price)*((discount||get_product.discount)/100))).toFixed(2):Number.parseFloat(price-(price*((discount)/100))).toFixed(2)

//   if(price && discount){
//     req.body.finalprice=Number.parseFloat(price-(price*((discount)/100))).toFixed(2)
//   }
//   else if(price){
//   req.body.finalprice=Number.parseFloat(price-(price*((get_product.discount)/100))).toFixed(2)
//   }
//   else if(discount){
//   req.body.finalprice=Number.parseFloat(get_product.price-(get_product.price*((discount)/100))).toFixed(2)

//   }

  if(req.files?.mainImage?.length){
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.files.mainImage[0].path,{folder:`product/${get_product.customeId}`})
    req.body.mainImage={secure_url,public_id};
  }
 if(req.files?.subImages?.length){
    if(req.files.subImages){
        req.body.subImages=[]
        for (const file of req.files.subImages) {
            const {secure_url,public_id}=await cloudinary.uploader.upload(file.path,{folder:`product/${req.body.customeId}/subimages`})
            req.body.subImages.push({secure_url,public_id})
        }
    }
 }

       
        req.body.updatedBy=req.user._id
        const update_product=await product.findByIdAndUpdate(product_id,req.body,{new:true})
        return update_product?res.status(200).json({message:"updated successfully",update_product}):next (new Error("fail to updated "))
}



)
// export const get_product=get_all(product)

export const get_product=asyncHandeler(
    async(req,res,next)=>{
const products=new ApiFeatures(product.find(),req.query).sort().search().select()
let productData=  await products.mongoosequery


return res.status(200).json({message:"done ",productData})

    

      

    }
)
