const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`mongoDB connected:${connect.connection.host}`.bgGreen);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
