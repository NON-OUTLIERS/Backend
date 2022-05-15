const express = require("express");
var app = express();
//const bodyParser = require('body-parser');
const port=process.env.PORT || 5000;
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
const dbConfig =require('./mongoose');

//const patientsRoute = require('./routers/patientsRoute');
const doctorsRoute = require('./routers/doctorsRoute');
//const reportRoute = require('./routers/reportsRoute');
//app.use('/api/patient',patientsRoute);
app.use('/api/doctor',doctorsRoute);
//app.use('/api/report',reportRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
