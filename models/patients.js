const mongoose = require("mongoose");
//const validator = require("validator");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
const patientSchema = mongoose.Schema({
  id:{
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  Age: {
    type: Number,
    required: true
  },
  Address: {
    type: String,
    required: false,
    trim: true
  },
  consultingDoctor: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  medicines: [
    {
      dose: {
        type: Number,
        required: true
      },
      time: {
        type: String,
        required: true
      },
    },
  ],
  status: {
    type: String,
    required: false,
  },
});

const patientmodel= mongoose.model('patients',patientSchema);
module.exports = patientmodel;