
import mongoose,{ Schema,Types,model } from "mongoose";
const cart_schema=new Schema({
   user:{ type:Types.ObjectId,
   ref:'User',
   required:true,unique:true},
   products:[
    {
        productId:{ type:Types.ObjectId, ref:'product',required:true,unique:true},
        quantity:{type:Number,default:1,required:true}



}

   ]
   

},{

    timestamps:true
})

export const cart_model=mongoose.models.cart||model('cart',cart_schema)