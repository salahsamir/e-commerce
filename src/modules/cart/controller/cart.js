
import { asyncHandeler } from './../../../utils/errorHandling.js';
import { product } from './../../../../DB/model/Product.model.js';
import { cart_model } from '../../../../DB/model/Cart.model.js';

export const create_cart=asyncHandeler(
    async(req,res,next)=>{
        const {productId,quantity}=req.body;
        const check_product=await product.findById(productId)
        if(!check_product){
            return next(new Error('product not found',{cause:400}))
        }
        if(check_product.stock<quantity||check_product.is_deleted){
          
            await  product.findByIdAndUpdate(productId,{$addToSet:{wishlist:req.user._id}})
            return next(new Error('your quantity not provide yet',{cause:400}))

        }
    const checkCart=await cart_model.findOne({user:req.user._id})
    if(!checkCart){
        const create_cart=await cart_model.create({
            user:req.user._id,
            products:[
               { productId,
                quantity}
            ]
        })
     
        return res.status(201).json(create_cart)
    }
    
    let match=false
    for (let i = 0; i < checkCart.products.length; i++) {
       if(checkCart.products[i].productId.toString()==productId){
        checkCart.products[i].quantity=quantity;
        match=true
        break
       }
       if(!match){
            checkCart.products.push({productId,quantity})
       }
        
    }

    await checkCart.save()
    return res.status(200).json(checkCart)


    }
)
 export async function clearFunc(productIds,user) {
  return   await cart_model.updateMany({user},{$pull:{ products:{productId:{$in:productIds}}}})
}

export const clear =asyncHandeler(
async(req,res,next)=>{
    const {productIds}=req.body
    // await cart_model.updateMany({user:req.user._id},{$pull:{ products:{productId:{$in:productIds}}}})
    await clearFunc(productIds,req.user._id)
    return res.status(200).json({message:"Done successfully"})
}


)