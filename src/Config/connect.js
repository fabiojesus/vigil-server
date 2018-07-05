function  connection(){
  const mongoose = require("mongoose");
  //const URL = "mongodb://localhost/vigil-alpha";
  const URL = "mongodb://admin:admin1234@ds125211.mlab.com:25211/heroku_l2kpggqn";


  //Connect to mongodb
  mongoose.connect(URL);

   mongoose.connection
    .once("open", function () {
      console.log("Connection has been made with Mongo!");
    })
    .on("error", function (error) {
      console.log("Connection error:", error);
  });
}

module.exports = connection;
