
import mongoose,{ Schema,Types,model } from "mongoose";
const coupon_schema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    image:{
        type:Object
        
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    },
    expireDate:{type:Date,required:true},
    
    updatedBy:{
        type:Types.ObjectId,
        ref:'User',
       
    },
    usedBy:[{
        type:Types.ObjectId,
        ref:'User'
    }],
    is_deleted:{
        type:Boolean,
        default:false
    },
    amount:{
        type:Number,
        defult:1,
        required:true
    }

},{

    timestamps:true
})

export const coupon=mongoose.models.coupon||model('coupon',coupon_schema)