const jwt=require("jsonwebtoken")
const genToken = (userId, email) => {
  return jwt.sign({ id: userId, email: email }, process.env.JWT_SECRET, {
    expiresIn:"7d"
  })
}
module.exports=genToken