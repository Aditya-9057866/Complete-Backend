const express = require("express");
const { createUser, getAllUsers, getUserById,updateUser, deleteteUser} = require("../controllers/userController");
const router = express.Router()
// CRUD Routes
router.post("/create-user", createUser)
router.get("/users", getAllUsers)
router.get("/user/:id", getUserById)
router.put("/user/:id", updateUser)
router.delete("/user/:id",deleteteUser)
module.exports = router;