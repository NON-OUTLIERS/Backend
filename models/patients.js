const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "MyNewproject";
const patientSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  Address: {
    type: String,
    required: false,
    trim: true,
  },
  consultingDoctor: {
    type: String,
    required: true,
    trim: true,
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
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password can not conatin 'password'");
      }
    },
  },
  medicines: [
    {
      dose: {
        type: Number,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    required: false,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
patientSchema.methods.generateAuthToken = async function () {
  const patient = this;
  const token = jwt.sign({ _id: patient.id.toString() }, jwtSecret);
  patient.tokens = patient.tokens.concat({ token });

  await patient.save();

  return token;
};

patientSchema.statics.findByCredentials = async (email, password) => {
  const patient = await Patient.findOne({ email: email });
  if (!patient) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, patient.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return patient;
};

const Patient = mongoose.model("patients", patientSchema);
module.exports = Patient;
