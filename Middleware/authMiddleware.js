const JWT = require("jsonwebtoken");

const protectedRoute = async (req, res, next) => {
  // console.log(req.headers.authorization);
  if(req.headers.authorization){
    const jwt = req.headers.authorization;
    const decode = JWT.verify(jwt,process.env.JWT_C)
    req.user = decode
    next();
  }
};

module.exports.protectedRoute = protectedRoute