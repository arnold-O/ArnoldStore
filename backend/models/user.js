const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcryptjs")
const Jwt = require('jsonwebtoken')


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
        trim:true,
        lowercase:true,
        validate: [validator.isEmail, 'please enter a valid email address']
    },
    password:{
        type:String,
        trim:true,
        required: [true, 'please enter your password'],
        minlength: [6, 'your password length must be longer than 6 characters'],
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

});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.correctPassword = async function (
    candidatepassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatepassword, userPassword);
  };




userSchema.methods.getJwtToken = function(){
    return Jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
}


module.exports = mongoose.model('User', userSchema)