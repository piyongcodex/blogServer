const User = require("../models/User");
const bcrypt = require("bcryptjs");
const auth = require("../auth");

module.exports.createUser = async (req, res) => {
  try {
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    let newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      pinCode: req.body.pinCode,
    });
    // Save new user
    await newUser.save();
    return res.status(201).send({ message: "Registered Successfully" });
  } catch (err) {
    console.error("Error in saving the user: ", err);
    return res.status(500).send({ error: "Error in saving the user" });
  }
};
module.exports.loginUser = async (req, res) => {
  // const loginMethodIsEmail = req.body.userNameOrEmail.includes("@");
  const createToken = (user) => {
    return res.status(200).send({ access: auth.createAccessToken(user) });
  };
  const checkPassIfCorrect = (password, user) => {
    // Compare passwords using bcrypt
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, password);
    // If the password matches
    if (isPasswordCorrect) {
      createToken(user);
    } else {
      // If the password does not match
      return res.status(401).send({ error: "Email and password do not match" });
    }
  };
  try {
    const user = await User.findOne({
      $or: [
        { email: req.body.userNameOrEmail },
        { username: req.body.userNameOrEmail },
      ],
    });
    // If the user does not exist
    if (user == null) {
      return res.status(404).send({ error: "No User found" });
    }
    //check user password if match
    checkPassIfCorrect(user.password, user);
  } catch (findErr) {
    console.error("Error in finding the User information: ", findErr);
    return res
      .status(500)
      .send({ error: "Error in finding the User information" });
  }
};
module.exports.updateUser = async (req, res) => {
  try {
    const userData = await User.findById(req.user.id);
    (userData.firstName = req.body.firstName),
      (userData.lastName = req.body.lastName),
      (userData.email = req.body.email),
      await userData.save();
    return res.status(200).send({
      message: `User information updated successfully`,
      user: userData,
    });
  } catch (err) {
    console.error("Error in saving the user: ", err);
    return res.status(500).send({ error: `Error in saving an update` });
  }
};
module.exports.getUserDetails = async (req, res) => {
  try {
    const userData = await User.findById(req.user.id);
    if (userData) {
      return res.status(200).send({ user: userData });
    }
  } catch (err) {
    console.error("Error in finding the user information", err);
    res.status(500).send({ error: `Error in finding the user information` });
  }
};
module.exports.changePassword = async (req, res) => {
  try {
    const userData = await User.findById(req.user.id);
    if (userData.pinCode === req.body.pinCode) {
      //compare the current password to the one you choose
      const isPasswordTheSame = bcrypt.compareSync(
        req.body.password,
        userData.password
      );
      if (isPasswordTheSame) {
        return res
          .status(401)
          .send({ error: "Password should not be the same as the current" });
      }
      let hashedPassword = await bcrypt.hash(req.body.password, 10);
      userData.password = hashedPassword;
      await userData.save();
      return res
        .status(200)
        .send({ message: `User password updated successfully` });
    } else {
      return res.status(401).send({ error: "Incorrect Pincode" });
    }
  } catch (err) {
    console.error("Error in changing password", err);
    return res.status(500).send({ error: `Error in changing password` });
  }
};
module.exports.changePin = async (req, res) => {
  try {
    const userData = await User.findById(req.user.id);
    if (userData.pinCode === req.body.pinCode) {
      return res
        .status(401)
        .send({ error: "Pincode should not be the same as the current" });
    }
    userData.pinCode = req.body.pinCode;
    await userData.save();
    return res
      .status(200)
      .send({ message: `User pincode updated successfully` });
  } catch (err) {
    console.error("Error in changing pincode", err);
    return res.status(500).send({ error: `Error in changing pincode` });
  }
};
