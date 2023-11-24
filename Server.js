const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const {
  LoginController,
  signupController,
} = require("./Controller/authController");
const { SendRequestController, AddFriendController, ShowFriendController, ShowReuestController } = require("./Controller/FriendController");
const { protectedRoute } = require("./Middleware/authMiddleware");


app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
const DB = "mongodb://localhost:27017/app";

const DBconnect = async () => {
  try {
    await mongoose.connect(DB);
    // console.log(q);
  } catch (error) {
    console.log(error);
  }
};

DBconnect();

app.post("/api/v1/auth/login", LoginController);
app.post("/api/v1/auth/signup", signupController);
app.post("/api/v1/friend/send",protectedRoute,SendRequestController)
app.post("/api/v1/friend/accept",protectedRoute,AddFriendController)
app.get("/api/v1/friend/",protectedRoute,ShowReuestController)

app.listen(PORT, () => {
  console.log("Listenning.........");
});
