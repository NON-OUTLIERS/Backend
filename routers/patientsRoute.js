const express = require("express");
// const User = require("../models/user");
// const auth = require("../middleware/auth");
const router = new express.Router();
const bcrypt = require("bcryptjs");
router.get("/hello", async (req, res) => {
  console.log("hello");
});
const Patient = require("../models/patients.js");
router.get("/patients", async (req, res) => {
  res.send("Hey are you serching someone!!");
});

router.post("/patients", async (req, res) => {
  const patient = new Patient(req.body);
  try {
    patient.password = await bcrypt.hash(req.body.password, 8);
    await patient.save();
    // sendWelcomeEmail(patient.email, patient.name);
    const token = await patient.generateAuthToken();
    res.status(201).send({ patient, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    // console.log(req.body.email, req.body.password);
    const patient = await Patient.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await patient.generateAuthToken();
    res.send({ patient, token });
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
