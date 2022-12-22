require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);
mongoose.connection.on("connected", function () {
  console.log("Application is connected to Databse");
});
