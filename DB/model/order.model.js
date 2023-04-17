

import mongoose,{ Schema,Types,model } from "mongoose";
const order_schema=new Schema({
   userId:{ type:Types.ObjectId,ref:'User',required:true},
   updatedBy:{ type:Types.ObjectId,ref:'User'},

   name:{type:String},
   note:{type:String},
   products:[
    {
        productId:{ type:Types.ObjectId, ref:'product',required:true},
        quantity:{type:Number,default:1,required:true},
        unitprice:{type:Number,default:1},
        finalprice:{type:Number,default:1}
} ],
total:{type:Number,default:1},
finalprice:{type:Number,default:1},
couponId:{type:Types.ObjectId,ref:'coupon'},
address:String,
reason:String,

phone:[String],
status:{type:String,default:"placed",enum:['placed','rejected','onWay','delivered','cancled']},
payment:{type:String,default:"cash",enum:['cash','card']},
updatedBy:{ type:Types.ObjectId,ref:'User'},
is_deleted:{type:Boolean,default:'false'}



  
   

},{

    timestamps:true
})

export const order_model=mongoose.models.order||model('order',order_schema)