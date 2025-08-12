const jwt = require("jsonwebtoken");
const { successResponse, errorResponse } = require("../utils/responseHandlers");
const authMiddleware = async (req, res,next) => {
  const token = req.cookies?.token;
  if (!token) {
    return successResponse(res,'not authorized',null,401)
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    console.log(req.user)
    next();
  } catch (error) {
    return errorResponse(res,"invalid token",null,401)
  }
}
module.exports=authMiddleware