
import mongoose,{ Schema,Types,model } from "mongoose";
const categories_schema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    image:{
        type:Object,
        required:true
        
    },
    slug:{
        type:String,
        required:true
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    },
    updatedBy:{
        type:Types.ObjectId,
        ref:'User'
    },
    is_deleted:{
        type:Boolean,
        default:false
    }

},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
    timestamps:true
})
categories_schema.virtual('SubCategory',{
    localField:'_id',
    foreignField:'categoryId',
    ref:'SubCategory',
})
export const Category=mongoose.models.Category||model('Category',categories_schema)