const { UserModel } = require("../Models/UserModels");

const SendRequestController = async (req, res) => {
  try {
    const { id } = req.query;
    await UserModel.findByIdAndUpdate(id,{
      $push:{friendReq:req.user._id}
    });

    return res.status(200).send({
      success: true,
      Message: "Friend request sent....",
    });
  } catch (error) {
    return res
      .status(500)
      .send({
        Message: "Error in sending request..",
      })
      .json(error);
  }
};


const AddFriendController = async (req, res) => {
  try {
    const { id } = req.query;
    await UserModel.findByIdAndUpdate(req.user._id,{
      $push:{friend:id}
    });
    return res.status(200).send({
      success : true,
      Message : "Friend added"
    })
  } catch (error) {
    return res.status(500).send({
      success : false,
      Message : "Internal Errror",
      error
    })
  }


};


const ShowReuestController = async (req, res) => {
  const friend = await UserModel.findById(req.user._id,{password : 0}).populate("friend")
  console.log("user",req.user._id);
  console.log("friend",friend)
  return res.status(200).send({
    success : true,
    Message :"Friend fetched",
    friend
  })
};



const ShowFriendController = async (req, res) => {};

module.exports = {
  SendRequestController,
  AddFriendController,
  ShowFriendController,
  ShowReuestController,
};
