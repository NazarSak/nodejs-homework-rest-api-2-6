const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { HandleMongoose } = require("../helpers");

// const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
        type: String,
        required: [true, 'Set password for user'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
  },
  { versionKey: false, timeseries: true }
);

userSchema.post("save", HandleMongoose);

const registerShema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().required(),
});

const loginShema = Joi.object({
    email: Joi.string().required(),
    subscription: Joi.string().required(),
  });

  const schemas = {
    registerShema,
    loginShema,
  }

  const User = model("user", userSchema)

  module.exports = {
    User, 
    schemas,
  }