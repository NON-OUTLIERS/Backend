const express = require("express");
// const User = require("../models/user");
const patientauth = require("../middleware/patientauth");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

router.get("/hello", async (req, res) => {
  console.log("hello");
});
const Patient = require("../models/patients.js");
router.get("/patients", async (req, res) => {
  res.send("Hey are you serching someone!!");
});

router.post("/signup", async (req, res) => {
  const patient = new Patient(req.body);
  try {
    patient.password = await bcrypt.hash(req.body.password, 8);
    await patient.save();
    res.status(201).send("Patient successfully added!!");
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body.email, req.body.password);
    const patient = await Patient.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = jwt.sign(
      { _id: patient._id.toString() },
      process.env.JWT_SECRET_KEY
    );
    // res.send({ patient, token });
    // console.log(token);
    res.status(200).json({ token: token, userId: patient._id });
  } catch (e) {
    res.status(400).send("Login Failed!!");
  }
});
router.get("/me", patientauth, (req, res) => {
  const _id = req.params._id;
  const patient = Patient.find({ _id: _id });
  res.send(req.body.patient);
});
router.get("/specific/:_id", async (req, res) => {
  const _id = new ObjectId(req.params._id);
  const patient = await Patient.find({ _id: _id });
  res.send(patient);
});

module.exports = router;
