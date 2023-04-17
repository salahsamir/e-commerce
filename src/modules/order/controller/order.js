
import { asyncHandeler } from './../../../utils/errorHandling.js';
import { product } from './../../../../DB/model/Product.model.js';
import { coupon } from '../../../../DB/model/Coupon.model.js';
import { order_model } from '../../../../DB/model/order.model.js';
import { cart_model } from './../../../../DB/model/Cart.model.js';
import { createInvoice } from '../../../utils/pdf.js';

export const createOreder=asyncHandeler(
async(req,res,next)=>{
const {products,quantity,address,phone,couponName,note,payment}=req.body;

// convert cart to orders
if(!req.body.products){
    const carts=await cart_model.findOne({user:req.user._id})
if(!carts?.products?.length){
    return next (new Error('empty cart '))
}
req.body.products=carts.products
req.body.cart=true
}
if(couponName){
    const check_coupon=await coupon.findOne({name:couponName, usedBy:{$nin:req.user._id}})
    
    if(!check_coupon ||check_coupon.expireDate.getTime()<Date.now()){
        return next(new Error('in_valid coupon name',{cause:404}))
    }
    req.body.coupon=check_coupon
}
let productList=[];
let productIds=[]
let total=0
for (let  element of req.body.products) {
    const find_product=await product.findOne({
        _id:element.productId,
        stock:{$gte:element.quantity},
        is_deleted:false
    })
    if(!find_product){
        return next(new Error('in_valid product',{cause:400}))

    }
    if(req.body.cart)element=element.toObject()
    element.unitprice=find_product.finalprice
    element.finalprice=find_product.finalprice*element.quantity
    productList.push(element)
    productIds.push(element.productId)
    total+=element.finalprice
    
}

const dummyOrder={
    userId:req.user._id,
    products:productList,
    address,
    phone,
    note,
    payment,
    couponId:req.body.coupon?._id,
    finalprice:Number(total-(total*(req.body.coupon?.amount)/100||0)).toFixed(2),
    total:total
}
const number=productList.length
const create_order=await order_model.insertMany(dummyOrder)
// 1 pug  decrease ptoduct stock
for (const element of req.body.products) {
    const decrease=await product.findByIdAndUpdate(element.productId,{$inc:{stock:-parseFloat(element.quantity)}})
    if(!decrease){
        return next(new Error('fail to decrease'))
    } 
}

// 2- push in coupon usedby
if(couponName){
  const update_coupon=  await coupon.updateOne({name:couponName},{$addToSet:{usedBy:req.user._id}})
 
    if(!update_coupon.modifiedCount){
        return next(new Error('fail to update_coupon')) 
    }
}
//clear cart
if(req.body.cart){
    await cart_model.updateMany({user:req.user._id},{ products:[]})
}else{
await cart_model.updateMany({user:req.user._id},{$pull:{ products:{productId:{$in:productIds}}}})

}
const invoice = {
    shipping: {
      name: req.user.userName,
      address: create_order.address,
      city: "San Francisco",
      state: "CA",
      country: "US",
      postal_code: 94111
    },
    items:create_order.products,
    subtotal: total,
    paid: 0,
    invoice_nr: create_order._id
  };
  createInvoice(invoice, "invoice.pdf");


return res.status(201).json({message:"add to cart ",metaData:{length: number},create_order})



}
)


export const canseledOrder=asyncHandeler(
    async(req,res,next)=>{
        const{orderId}=req.params;
        const {reason}=req.body
        const findOrder=await order_model.findOne({_id:orderId,userId:req.user._id})
        if(!findOrder){
            return next(new Error('order not exist ',{cause:400}))
        }
        if(findOrder?.status!='placed'&&findOrder?.payment=='cash')
        {
            return next(new Error('fail to cancle this order',{cause:400}))
        }
        const cancle=await order_model.findByIdAndUpdate(orderId,{status:"cancled",updatedBy:req.user._id,reason})
        if(!cancle){
            return next(new Error('fail to find this order',{cause:400}))

        }


        for (const element of findOrder.products) {
            const decrease=await product.findByIdAndUpdate(element.productId,{$inc:{stock:parseFloat(element.quantity)}})
            if(!decrease){
                return next(new Error('fail to decrease'))
            } 
        }
        // 2- push in coupon usedby
        if(findOrder.couponId){
          const update_coupon=  await coupon.updateOne({_id:findOrder.couponId},{$pull:{usedBy:req.user._id}})
         
            if(!update_coupon.modifiedCount){
                return next(new Error('fail to update_coupon')) 
            }
        }

        return res.status(200).json({message:"done"})
    }
)


//deliver order
export const orderDone=asyncHandeler(
    async(req,res,next)=>{
        const {orderId}=req.params;
        const{status}=req.body
        //or write list in query but use $nin
        const find_order=await order_model.findByIdAndUpdate(orderId,{status})
        if(!find_order){
            return next(new Error('error to update this order',{cause:400}))
        }
        if(['rejected','delivered','cancled'].includes(find_order.status)){
            return next(new Error('can not delivered this order',{cause:400}))

        }
        return res.status(200).json({message:"done successfully"})
    }
)