const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const patientRouter = require("./routers/patients");
// const doctorRouter = require("./routers/doctors");
// const reportRouter = require("./routers/reports");
app.use(patientRouter);
// app.use(doctorRouter);
// app.use(reportRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
