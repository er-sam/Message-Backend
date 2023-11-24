const { hashPassword, passwordCompare } = require("../Middleware/hashPassword");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../Models/UserModels");

const LoginController = async (req, res) => {
  console.log(req.body)
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(203).send({
        success: false,
        message: "Enter required details",
      });
    }
   
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(203).send({
        success: false,
        message: "Invalid email or password....",
      });
    }
    const matched = await passwordCompare(password, user.password);
    if (!matched) {
      return res.status(203).send({
        success: false,
        message: "Invalid email or password....",
      });
    }
 
    const Token = JWT.sign({ _id: user._id }, process.env.JWT_C, {
      expiresIn: "170d",
    });
    return res.status(200).send({
      success: true,
      message: "Logged in successfully......",
      user:{
        name : user.name,
        email : user.email,
        image : user.image || "",
        phone : user.phone
      },
      Token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal error.....",
      error,
    });
  }
};



const signupController = async (req, res) => {
  console.log(req.body)
  try {
    const { name, email, password, image, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(203).send({
         success: false,
        message: "Enter required details",
      });
    }

    const isPresent = await UserModel.findOne({ email });
    if (isPresent) {
      return res.status(203).send({
        success: false,
        message: "Email already exist",
      });
    } else {
      const hpass = await hashPassword(password);
      const data = await new UserModel({
        name,
        email,
        password: hpass,
        phone,
        image,
      }).save();
      return res.status(201).send({
        success: true,
        message: "Account hasbeen Created",
        data,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      meesage: "Internal error.....",
      error,
    });
  }
};

module.exports = { LoginController, signupController };
