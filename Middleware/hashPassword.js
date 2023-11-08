const bcrypt = require("bcrypt")

const hashPassword=async(password)=>{
    try {
        const hashPassword = await bcrypt.hash(password,9)
        return hashPassword;
    } catch (error) {
        console.log('error in hashing password',error)
    }
}


const passwordCompare=async(password,hashedPassword)=>{
   return bcrypt.compare(password,hashedPassword)
}


module.exports = {hashPassword,passwordCompare}