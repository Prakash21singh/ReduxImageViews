const mongoose = require("mongoose");
const MONGODB_URI =
  "mongodb+srv://PrakashSinghRajput21:Tm0TS8ivdv16RdH4@cluster0.8macphs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async function () {
  return await mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Mongodb connected successfully");
    })
    .catch(() => {
      console.log("Mongodb Connection Failed");
    });
};

module.exports = { connectDB, MONGODB_URI };
