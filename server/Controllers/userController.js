const HttpError = require("../Models/errorModel");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

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
      return next(new HttpError("Fill in all details", 422));
    }

    const newEmail = email.toLowerCase();

    const user = await User.findOne({ email: newEmail });
    if (!user) {
      return next(new HttpError("Invalid credentials", 422));
    }

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return next(new HttpError("Invalid credentials", 422));
    }

    const { _id: id, name } = user;

    const token = jwt.sign({ id, name }, process.env.JWT_SECRETKEY, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, id, name });
  } catch (error) {
    return next(
      new HttpError("Login Failed, Please check with your credentials.", 422)
    );
  }
};

//================================== USER PROFILE
//GET : http://localhost:8000/api/users/:id
//PROTECTED
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return next(new HttpError("User not found", 404));
    }
    res.status(200).json(user);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//================================== CHANGE USER AVATAR
//POST : http://localhost:8000/api/users/change-avatar
//PROTECTED

const changeAvatar = async (req, res, next) => {
  try {
    if (!req.files || !req.files.avatar) {
      return next(new HttpError("Please choose an image", 422));
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new HttpError("User not found", 404));
    }

    if (user.avatar) {
      const oldAvatarPath = path.join(__dirname, "..", "uploads", user.avatar);
      fs.unlink(oldAvatarPath, (err) => {
        if (err) {
          console.error("Failed to delete old avatar:", err);
          return next(new HttpError("Failed to delete old avatar", 500));
        }
      });
    }

    const { avatar } = req.files;
    if (avatar.size > 500000) {
      return next(
        new HttpError("Profile picture too big, should be less than 500kb", 422)
      );
    }

    const fileName = avatar.name;
    const splittedFileName = fileName.split(".");
    const newName = `${splittedFileName[0]}_${uuidv4()}.${
      splittedFileName[splittedFileName.length - 1]
    }`;
    const newAvatarPath = path.join(__dirname, "..", "uploads", newName);

    avatar.mv(newAvatarPath, async (err) => {
      if (err) {
        console.error("Failed to move new avatar:", err);
        return next(new HttpError("Failed to move new avatar", 500));
      }

      try {
        const updateAvatar = await User.findByIdAndUpdate(
          req.user.id,
          { avatar: newName },
          { new: true }
        );
        if (!updateAvatar) {
          return next(new HttpError("Avatar can't be changed", 422));
        }

        res.status(200).json(updateAvatar);
      } catch (updateError) {
        console.error("Failed to update user avatar:", updateError);
        return next(
          new HttpError("An error occurred while updating avatar", 500)
        );
      }
    });
  } catch (error) {
    console.error("An error occurred while changing avatar:", error);
    return next(new HttpError("An error occurred while changing avatar", 500));
  }
};

//================================== EDIT USER DETAILS
//POST : http://localhost:8000/api/users/edit-user
//PROTECTED
const editUser = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new HttpError("User not authenticated", 401));
    }
    console.log("User object:", req.user);

    if (!req.user.id) {
      return next(new HttpError("User ID not found", 400));
    }
    const { name, email, currentPassword, newPassword, confirmPassword } =
      req.body;
    if (
      !name ||
      !email ||
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      return next(new HttpError("Fill in all details", 422));
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new HttpError("User not found", 403));
    }

    const emailExist = await User.findOne({ email });
    if (emailExist && emailExist._id != req.user.id) {
      return next(new HttpError("Email already exist.", 422));
    }

    const validateUserPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!validateUserPassword) {
      return next(new HttpError("Invalid current password", 422));
    }

    if (newPassword != confirmPassword) {
      return next(new HttpError("New Password do not match.", 422));
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    const newInfo = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, password: hash },
      { new: true }
    );
    res.status(200).json(newInfo);
  } catch (error) {
    console.log(error);
    return next(new HttpError(error));
  }
};

//================================== GET AUTHORS
//get : http://localhost:8000/api/users/authors
//PROTECTED
const getAuthors = async (req, res, next) => {
  try {
    const authors = await User.find().select("-password");
    res.status(200).json(authors);
  } catch (error) {
    return next(new HttpError(error));
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAuthors,
  getUser,
  changeAvatar,
  editUser,
};
