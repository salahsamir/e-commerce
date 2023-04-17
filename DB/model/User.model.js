import { Schema, model } from "mongoose";


const userSchema = new Schema({

    userName: {
        type: String,
        required: [true, 'userName is required'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char']

    },
    email: {
        type: String,
        unique: [true, 'email must be unique value'],
        required: [true, 'userName is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        default: 'User',
        enum: ['User', 'Admin']
    },

    status: {
        type:String,
        default: "offline",
        enum:['offline','online','blocked']
    },
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    changePasswordTime:{type:Date,
        default:Date.now()
    },
    image: Object,
    DOB: String,
}, {
    timestamps: true
})


const userModel = model('User', userSchema)
export default userModel