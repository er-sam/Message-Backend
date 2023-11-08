const { hashPassword, passwordCompare } = require("../Middleware/hashPassword");
const JWT = require("jsonwebtoken");
const {UserModel} = require("../Models/UserModels");

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Enter required deatils",
      });
    }

    const user = UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password....",
      });
    }

    const matched = await passwordCompare(password, user.password);
    if (!matched) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password....",
      });
    }

    const Token = await JWT.sign(
      {
        _id: user._id,
      },
      process.env.JWT_C,
      {
        expireIn: "170d",
      }
    );
    return res.status(200).send({
      success : true,
      message : "Logged in successfully......",
      user,
      Token
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success : false,
      message :"Internal error.....",
      error
    })
  }
};

const signupController = async (req, res) => {
  try {
    const { name, email, password, image, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).send({
        success: false,
        message: "Enter required deatils",
      });
    }

    const isPresent = await UserModel.findOne({email});
    if (isPresent) {
      return res.status(402).send({
        success: false,
        message: "User Available...",
      });
    } else {
      const hpass = await hashPassword(password);
      const data =await new UserModel({
        name,
        email,
        password:hpass,
        phone,
        image,
      }).save();
      return res.status(201).send({
        success: true,
        message: "Account Created....",
        data
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



module.exports={LoginController,signupController}