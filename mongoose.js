const  mongoose  = require("mongoose");
           mongodb+srv://Nikita:@dod00@cluster0.ttzm3.mongodb.net/test
var mongoURL= 'mongodb+srv://Nikita:%40dod00@cluster0.ttzm3.mongodb.net/DoctorOnDemand'

mongoose.connect(mongoURL, {useUnifiedTopology : true, useNewUrlParser:true})

var connection = mongoose.connection;

connection.on('error', ()=>{
    console.log('Mongo DB Connection failed');
})

connection.on('connected', ()=>{
    console.log('Mongo DB Connection successful');
})
module.exports=mongoose