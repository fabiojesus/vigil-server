function  connection(){
  const mongoose = require("mongoose");
  //const URL = "mongodb://localhost/vigil-alpha";
  const URL = "mongodb://fabiojesus:tuna123@ds161700.mlab.com:61700/heroku_8xzfhp1l";

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
