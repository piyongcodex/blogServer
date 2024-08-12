const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();
const { verify } = require("../auth");

// Route for user registration
router.post("/", userController.createUser);
// Route for user authentication
router.post("/login", userController.loginUser);
//Route for updating user information
router.patch("/info", verify, userController.updateUser);
//Route for getting user information
router.get("/", verify, userController.getUserDetails);
//Route for changing password
router.patch("/password", verify, userController.changePassword);
//Route for changing pincode
router.patch("/pincode", verify, userController.changePin);

module.exports = router;
