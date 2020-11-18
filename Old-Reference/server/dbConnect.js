/*A quick module that will connect and disconnect the server from the 
mongodb database using the mongoose npm package.*/
require("dotenv").config();
const mongoose = require("mongoose");

// Connect to DB
module.exports.connect = () => {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

//Disconnect from DB
module.exports.close = () => {
  mongoose.connection.close();
};
