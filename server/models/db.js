const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://larry_coal:Morolake12@cluster0.dhqtz.mongodb.net/?retryWrites=true&w=majority"
);
mongoose.connection.on("connected", function () {
  console.log("Application is connected to Databse");
});
