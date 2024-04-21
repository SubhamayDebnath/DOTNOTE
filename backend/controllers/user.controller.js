import AppError from "../utils/error.utils.js";
import User from "../models/user.model.js";
import sendEmail from "../utils/sendMail.js";
import crypto from "crypto";
import fs from "fs/promises";
import cloudinary from "cloudinary";
import { config } from "dotenv";
config();

// cookie option
const cookieOption = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
};

// user register
const register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return next(new AppError("All Fields are required", 400));
    }

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return next(new AppError("Email already exist", 400));
    }

    const user = await User.create({
      userName,
      email,
      password,
      avatar: {
        public_id: email,
        secure_url: "not found",
      },
    });

    if (!user) {
      return next(
        new AppError("User registration failed,please try again", 400)
      );
    }

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: 'dotnote', 
          width: 250,
          height: 250,
          gravity: 'faces',
          crop: 'fill',
        });
  
        if (result) {
          user.avatar.public_id = result.public_id;
          user.avatar.secure_url = result.secure_url;

          fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (error) {
        return next(
          new AppError(error || 'File not uploaded, please try again', 400)
        );
      }
    }

    await user.save();
    user.password = undefined;
    const token = await user.generateJWTToken();
    res.cookie("token", token, cookieOption);
    res.status(200).json({
      success: true,
      message: "user register successfully",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// user login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("All Fields are required", 400));
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.comparePassword(password)) {
      return next(new AppError("Email or Password does not match", 400));
    }
    if (user.status != "ACTIVE") {
      return next(new AppError("Not valid user", 400));
    }
    const token = await user.generateJWTToken();
    user.password = undefined;
    res.cookie("token", token, cookieOption);
    res.status(200).json({
      success: true,
      message: "user logged in successfully",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// user logout
const logout = (req, res) => {
  try {
    res.cookie("token", null, {
      maxAge: 0,
      httpOnly: true,
      secure: true,
    });
    res.status(200).json({
      success: true,
      message: "user logged out successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// user profile info
const getProfile = async (req, res) => {
  try {
    const userID = req.user.id;
    const user = await User.findById(userID);
    res.status(200).json({
      success: true,
      message: "get user details successfully",
      user,
    });
  } catch (error) {
    return next(new AppError("Failed to fetch user details", 500));
  }
};

// forgot password
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(new AppError("Email is required", 400));
    }
    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppError("Email is not registered", 400));
    }
    const resetToken = await user.generateResetPasswordToken();

    await user.save();
    const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const subject = "Reset Password";
    const message = `You can reset your password by clicking <a href=${resetPasswordURL} target="_blank">Reset your password</a>\n
        If the above link does not work for some reason then copy paste this link in new tab ${resetPasswordURL}.\n
        If you have not requested this, kindly ignore.`;
    try {
      await sendEmail(email, subject, message);
      res.status(200).json({
        success: true,
        message: `Reset password has been send to ${email} successfully`,
      });
    } catch (error) {
      user.forgotPasswordExpiry = undefined;
      user.forgotPasswordToken = undefined;
      await user.save();
      return next(new AppError(error.message, 500));
    }
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// reset password
const resetPassword = async (req, res, next) => {
  try {
    const { resetToken } = req.params;
    const forgotPasswordToken = crypto
      .create("sha256")
      .update(resetToken)
      .digest("hex");
    const user = await User.findOne({
      forgotPasswordToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return next(
        new AppError("Token is invalid or expired, please try again", 400)
      );
    }
    user.password = password;
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;
    user.save();
    res.status(200).json({
      success: true,
      message: `Password changed successfully`,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
// change Password
const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;
  if (!oldPassword || !newPassword) {
    return next(new AppError("all fields are required", 400));
  }
  const user = await User.findById(id).select("+password");
  if (!user) {
    return next(new AppError("User does not exist", 400));
  }
  const isPasswordValid = await user.comparePassword(oldPassword);
  if (!isPasswordValid) {
    return next(new AppError("Invalid old password", 400));
  }
  user.password = newPassword;

  await user.save();
  user.password = undefined;
  res.status(200).json({
    success: true,
    message: `Password changed successfully`,
  });
};

const updateProfile = async (req, res, next) => {
  const { userName } = req.body;
  const { id } = req.user.id;

  const user = await User.findById(id);
  if (!user) {
    return next(new AppError("User does not exist", 400));
  }
  if (req.userName) {
    user.userName = userName;
  }

  if (req.file) {
    await cloudinary.v2.uploader.destroy(user.avatar.publicID);
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "dotNOTE USERS",
        width: 500,
        height: 500,
        gravity: "faces",
        crop: "fill",
      });
      if (result) {
        user.avatar.publicID = result.publicID;
        user.avatar.secureURL = result.secureURL;

        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (error) {
      
    }
  }
  await user.save();
  res.status(200).json({
    success: true,
    message: `Profile details updated successfully`,
  });
};

export {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  updateProfile,
};
