
import mongoose,{ Schema,Types,model } from "mongoose";
const product_schema=new Schema({
    customId:String,
    name:{
        type:String,
        required:true,
       trim:true,
       lowercase:true
    },
    slug:{
        type:String,
        required:true,
        trim:true
    },
    description:String,
    stock:{
        type:Number,
        default:1

    },
    price:{
        type:Number,
        default:1

    },
    discount:{
        type:Number,
        default:0

    },
    finalprice:{
        type:Number,
        default:1

    },
    colors:[String],
    sizes:{type:[String],enum:['l','md','s']},

    mainImage:{
        type:Object,required:true},
    subImages:{type:[Object]},
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    },
    categoryId:{
        type:Types.ObjectId,
        ref:'Category',
        required:true
       
    },
    subcategoryId:{
        type:Types.ObjectId,
        ref:'SubCategory',
        required:true
       
    },

    brandId:{
        type:Types.ObjectId,
        ref:'brand',
        required:true
       
    },
    wishlist:[{  type:Types.ObjectId,
        ref:'User',
        required:true}],
    updatedBy:{
        type:Types.ObjectId,
        ref:'User',
       
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
product_schema.virtual('Reviews',{
    ref:"reveiw",
    localField:"_id",
    foreignField:"productId"
})
export const product=mongoose.models.product||model('product',product_schema)