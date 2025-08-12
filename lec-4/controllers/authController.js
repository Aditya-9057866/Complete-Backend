const User = require("../models/User");
const genToken = require("../utils/genToken");
const { errorResponse, successResponse } = require("../utils/responseHandlers");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, age, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !age || !password) {
      return errorResponse(res, "All fields are required", 400);
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, "Email already exists", 400);
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      age,
    });

    // Generate token
    const token = genToken(newUser._id, newUser.email);

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      // sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return successResponse(res, "User registered successfully", { token, newUser }, 201);
  } catch (error) {
    console.error(error);
    return errorResponse(res, error.message, 500);
  }
};
exports.loginUser = async (req, res) => {
  try {
    const {  email, password } = req.body;

    

    // Check if email already exists
    const user = await User.findOne({ email }).select("+password");;
    if (!user) {
      return errorResponse(res, " Invalid Email.User not found", 401);
    }

    // compare the password
    const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch) {
    return errorResponse(res,"Invalid password",401)
  }
    
    // Generate token
    const token = genToken(user?._id, user.email);

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      // sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
        ;


    return successResponse(res, "User login successfully", { token, user }, 201);
  } catch (error) {
    console.error(error);
    return errorResponse(res, error.message, 500);
  }
};
exports.logoutUser = async(req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure:true
    });
    return successResponse(res,"logged out successfully",null,201)
  } catch (error) {
    return errorResponse(res,error.message,500)
  }
}
exports.checkAuth = async (req, res) => {
  try {
    const userId = req.user.id
    const user = await User.findById(userId).select('-password')
    if (!user) return errorResponse(res, 'user not found', 404)
    return successResponse(res,"user is authorized to access",user,201)
  } catch (error) {
    return errorResponse(res,error.message,500)
  }
}