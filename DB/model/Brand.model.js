
import mongoose,{ Schema,Types,model } from "mongoose";
const brand_schema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
    },
    image:{
        type:Object
        
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
    is_deleted:{
        type:Boolean,
        default:false
    }

},{

    timestamps:true
})

export const brand=mongoose.models.brand||model('brand',brand_schema)