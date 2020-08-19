const dotenv = require("dotenv");
dotenv.config();

require("./db/db");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.static(__dirname + "/public"));

app.use(cors());
app.use(express.json());
app.use(fileUpload());

//Models
require("./models/User");
require("./models/Post");
//Routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
app.use(authRoutes);
app.use("/posts", postRoutes);

app.listen(process.env.PORT, (error) => {
  if (!error) {
    console.log("Node server is running on port", process.env.PORT);
  } else {
    console.log("Error while running the server", error);
  }
});
