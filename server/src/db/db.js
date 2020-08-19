const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGO_LOCAL_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (!error) {
      console.log("Mongo DB connected!!!");
    } else {
      console.log("Error connecting to Mongo DB", error);
    }
  }
);
