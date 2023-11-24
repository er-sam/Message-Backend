const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    sender: [{ 
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    reciever: [{
      type: mongoose.Types.ObjectId,
      ref: "User",
    }],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
// export default UserModel;
module.exports.Message = Message;
