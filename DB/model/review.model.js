
import mongoose,{ Schema,Types,model } from "mongoose";
const reveiw_schema=new Schema({
  userId:{type:Types.ObjectId,ref:'User',required:true},
  updatedBy:{type:Types.ObjectId,ref:'User'},
  productId:{type:Types.ObjectId,required:true,ref:'product'},
  orderId:{type:Types.ObjectId,required:true,ref:'order'},
  comment:{type:String,required:true},
  rating:{type:Number,min:1,max:4},

    is_deleted:{
        type:Boolean,
        default:false
    }

},{

    timestamps:true
})

export const reveiw_model=mongoose.models.reveiw||model('reveiw',reveiw_schema)