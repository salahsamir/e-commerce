
import { asyncHandeler } from './../utils/errorHandling.js';


// get all models


export const get_all=(model)=>{
    return asyncHandeler(
        async(req,res,next)=>{
          const find_all=await model.find({is_deleted:false})
          if(!find_all){
            return next(new Error("not brand yet",{cause:500}))
          }
          const number=find_all.length
          return res.status(200).json({message:`${number} elements`,find_all})
       
      }
      )
}


// for delete from model
export const delete_model=(model)=>{
  return   asyncHandeler(
    async(req,res,next)=>{
      const {id}=req.params;
      const check_element=await model.findByIdAndDelete(id);
      return check_element?res.status(200).json({message:"done successfully"}):next(new Error("this element not found",{cause:409}))
    }
  )
}