const mongoose = require("mongoose");

const connectDatabase = (url) => {
  console.log("Connecting to database");
  mongoose.set("debug", true);
  return mongoose.connect(url);
};

module.exports = connectDatabase;
