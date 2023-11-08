const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    // image :{
    //     type : String
    // },
    phone:{
        type : String
    }
},{timestamps : true})


const UserModel = mongoose.model("User",UserSchema)
// export default UserModel;
module.exports.UserModel = UserModel