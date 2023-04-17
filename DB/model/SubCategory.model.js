
import mongoose,{ Schema,Types,model } from "mongoose";
const subCategories_schema=new Schema({
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
    categoryId:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    },
    
    updatedBy:{
        type:Types.ObjectId,
        ref:'User',
       
    },
    custemid:{
        type:String,
        required:true
    },
    is_deleted:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})
export const SubCategory=mongoose.models.SubCategory||model('SubCategory',subCategories_schema)