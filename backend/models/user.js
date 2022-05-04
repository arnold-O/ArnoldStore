const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    maxlength: [30, "your name cannot exceed 30 character"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "please enter a valid email address"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "please enter your password"],
    minlength: [6, "your password length must be longer than 6 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  //    product: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref:"Product",
  //     required:true

  // },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetpasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  
  this.password = await bcrypt.hash(this.password, 10);
  next()
});

/*  here i used the methods attached to the schema to hash password */

userSchema.methods.correctPassword = async function (enteredPassword) {
  return await bcrypt.compare(`${enteredPassword}`, this.password);
};

/*  here i used the methods attached to the schema get jwt web token */

userSchema.methods.getJwtToken = function () {
  return Jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// generate password reset token

userSchema.methods.getResetPasswordToken = function () {
  // generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // not advisable to send token the way it is hence we hash it

  this.resetpasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // create expires time for this token

  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
