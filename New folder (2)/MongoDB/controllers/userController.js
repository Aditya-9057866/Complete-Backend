const User = require("../models/User");
const { successResponse, errorResponse } = require("../utils/responseHandlers");
exports.createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return errorResponse(res,"email already exists",400)
    }
    const newUser = await User.create({ name, email, age })
    return successResponse(res,"User created successfully",newUser,201)
  } catch (error) {
    return errorResponse(res,error.message,500)
  }
}
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return successResponse(res, "Users retrieved successfully", users, 200);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
}
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }
      return successResponse(res, "User retrieved successfully", user, 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }

}
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params
  const user = await User.findById(id);
  if(!user) {
    return errorResponse(res, "User not found", 404);
  } 
  // step-2 update the user
  const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true  });
  return successResponse(res, "User updated successfully", updateUser, 200);
  } catch (error) {
        return errorResponse(res, error.message, 500);

  }
}
exports.deleteteUser = async (req, res) => {
  try {
    const { id } = req.params
  const user = await User.findById(id);
  if(!user) {
    return errorResponse(res, "User not found", 404);
  } 
  // step-2 delete the user
  const deleteUser = await User.findByIdAndDelete(id);
  return successResponse(res, "User deleted successfully", deleteUser, 200);
  } catch (error) {
        return errorResponse(res, error.message, 500);

  }
}