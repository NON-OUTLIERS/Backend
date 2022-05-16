const express = require("express");
const router = express.Router();
const Doctors = require("../models/doctors");
const Patients = require("../models/patients");
const bcrypt = require("bcryptjs");
const patientauth = require("../middleware/patientauth");
const doctorauth = require("../middleware/doctorauth");
router.get("/getallpatients", doctorauth, async (req, res) => {
  console.log("hello");
  try {
    console.log(req.body.doctor);
    const _id = req.body.doctor._id;
    const ptnts = await Patients.find({doctorId:_id }).populate("getpatients").exec((error,data)=>{
        
    });
    return res.send(ptnts);
  } catch (error) {
    // console.log("error");
    return res.status(400).json({ message: error });
  }
});
// Story.findOne({ title: "Casino Royale" })
//   .populate("author")
//   .exec(function (err, story) {
//     if (err) return handleError(err);
//     console.log("The author is %s", story.author.name);
//     // prints "The author is Ian Fleming"
//   });

router.post("/signup", async (req, res) => {
  const doctor = new Doctors(req.body);
  try {
    doctor.password = await bcrypt.hash(req.body.password, 8);
    await doctor.save();
    // sendWelcomeEmail(doctor.email, doctor.name);
    // const token = await doctor.generateAuthToken();
    // res.status(201).send({ doctor, token });
    res.status(201).send("Doctor account created!!");
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    // console.log(req.body.email, req.body.password);
    const doctor = await Doctors.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await doctor.generateAuthToken();
    res.send({ doctor, token });
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
