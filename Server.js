const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const AuthRoute = require('./Routes/AuthRoute')
const dotenv = require('dotenv').config();
const {LoginController, signupController } = require("./Controller/authController");

app.use(express.json());
const PORT = process.env.PORT || 5000;
const DB = "mongodb://localhost:27017/app";

mongoose
  .connect(DB)
  .then(() => console.log("DB connencted"))
  .catch((err) => console.log(err));



app.get('/api/v1/auth/login',LoginController)
app.post('/api/v1/auth/signup',signupController)




app.listen(PORT, () => {
  console.log("Listenning.........");
});
  