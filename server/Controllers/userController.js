const HttpError = require("../Models/errorModel");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");

//================================== REGISTER A NEW USER
//POST : http://localhost:8000/api/users/register
//UNPROTECTED
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, password2 } = req.body;
    if (!name || !email || !password) {
      return next(new HttpError("Fill in all fields", 422));
    }
    const newEmail = email.toLowerCase();

    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return next(new HttpError("Email already exists.", 422));
    }

    if (password.trim().length < 6) {
      return next(new HttpError("Password shoulf be at least 6", 422));
    }

    if (password != password2) {
      return next(new HttpError("Passwords do not match", 422));
    }

    const salt = await bcrypt.genSalt(10);
    const handlePass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name: name,
      email: newEmail,
      password: handlePass,
    });

    res.status(201).json(`New User ${newUser.email} registered successfully`);
  } catch (error) {
    return next(new HttpError("User registration failed", 422));
  }
};

//================================== LOGIN USER
//POST : http://localhost:8000/api/users/login
//UNPROTECTED
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      next(new HttpError("Fill in all details", 422));
    }

    const newEmail = email.toLowerCase();

    const user = await User.findOne({ email: newEmail });
    if (!user) {
      next(new HttpError("Invalid credentials", 422));
    }

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      next(new HttpError("Invalid credentials", 422));
    }

    const { _id: id, name } = user;

    const token = jwt.sign({ id, name }, process.env.JWT_SECRETKEY, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, id, name });
  } catch (error) {
    next(
      new HttpError("Login Failed, Please check with your credentials.", 422)
    );
  }
};

//================================== USER PROFILE
//GET : http://localhost:8000/api/users/:id
//PROTECTED
const getUser = async (req, res, next) => {
  res.json("User Profile");
};

//================================== CHANGE USER AVATAR
//POST : http://localhost:8000/api/users/change-avatar
//PROTECTED
const changeAvatar = async (req, res, next) => {
  res.json("Change User Avatar");
};

//================================== EDIT USER DETAILS
//POST : http://localhost:8000/api/users/edit-user
//PROTECTED
const editUser = async (req, res, next) => {
  res.json("Edit user Details");
};

//================================== GET AUTHORS
//get : http://localhost:8000/api/users/authors
//PROTECTED
const getAuthors = async (req, res, next) => {
  res.json("Get all authors ");
};

module.exports = {
  registerUser,
  loginUser,
  getAuthors,
  getUser,
  changeAvatar,
  editUser,
};
