const express =require("express");
const router = express.Router();
const Doctors = require("../models/doctors");
const Patients = require("../models/patients");
router.get("/getallpatients", async(req,res)=>{
    try{
        const ptnts= await Patients.find({});
        //console.log(ptnts);
        return res.send({ptnts});
    }
    catch(error){
        console.log("error");
       return res.status(400).json({message: error});
    }
});


module.exports=router;