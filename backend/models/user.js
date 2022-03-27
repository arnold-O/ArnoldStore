const mongoose = require('mongoose')
const validator = require('validator')


const userSchema = new mongoose.Schema({


    name: {
        type:String,
        required: [true, 'name is required'],
        maxlength: [30 , 'your name cannot exceed 30 character']
    },
    email:{
        type:String,
        required: [true , 'please enter your email'],
        unique:true,
        lowercase:true,
        validate: [validator.isEmail, 'please enter a valid email address']
    },
    password:{
        type:String,
        required: [true, 'please enter your password'],
        maxlength: [6, 'your password length must be longer than 6 characters'],
        select:false

    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
                url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    resetpasswordToken:String,
    resetPasswordExpire:Date

})


module.exports = mongoose.model('User', userSchema)