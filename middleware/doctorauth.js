const jwt = require("jsonwebtoken");
const Patient = require("../models/patients");
const Doctor = require("../models/doctors");
require("dotenv").config();
const doctorauth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const doctor = await Doctor.findOne({
      _id: decoded._id,
      //   "tokens.token": token,
    });

    if (!doctor) {
      throw new Error("something had happened during authentication!!");
    }

    // req.token = token;
    req.body.doctor = doctor;
    // console.log(doctor)
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = doctorauth;
