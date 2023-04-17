
import userModel from '../../DB/model/User.model.js';
import {verifyToken} from '../utils/GenerateAndVerifyToken.js'
import { asyncHandeler } from '../utils/errorHandling.js';

export const Roles={
    Admin:"Admin",
    User:"User",
    HR:"HR"
}
export const auth=(accessRoles=[])=>{
    return asyncHandeler(
    async(req,res,next)=>{
        const { authorization } = req.headers;
if (!authorization?.startsWith(process.env.BEARER_KEY)) {
    return res.json({ message: "In-valid bearer key" })
}
        const token = authorization.split(process.env.BEARER_KEY)[1]

if (!token) {
    return res.json({ message: "In-valid token" })
}
const decoded=verifyToken({token})
        if (!decoded?.id) {
    return res.json({ message: "In-valid token payload" })
}
        const authUser = await userModel.findById(decoded.id).select('userName email role changePasswordTime')
if (!authUser) {
    return res.json({ message: "Not register account" })
}

if(parseInt(authUser.changePasswordTime?.getTime()/1000)>decoded.iat){
    return res.json({ message: "please enter anew token" })

}

//there i put user is the defalult value for roles
if( !accessRoles.includes(authUser.role)){
    return next(new Error('not authorized user',{cause:403}))
}
req.user = authUser;
        return next()

}
  )

}




