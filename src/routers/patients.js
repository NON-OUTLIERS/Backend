const express = require("express");
// const User = require("../models/user");
// const auth = require("../middleware/auth");
const router = new express.Router();

// router.post("/users", async (req, res) => {
//   const user = new User(req.body);

//   try {
//     await user.save();
//     const token = await user.generateAuthToken();
//     res.status(201).send({ user, token });
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });
const Patient = require("../models/patients.js");
router.get("/patients", async (req, res) => {});
router.post("/patients", async (req, res) => {
  // res.send("You are fooled!!");
  const patient = new Patient(req.body);
  await patient.save();
  res.send(patient);
});

module.exports = router;
