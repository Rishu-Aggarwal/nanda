import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import JWT from "jsonwebtoken";
import getDataUri from "../helpers/getDataUri.js";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
export const register = async (req, res) => {
  try {
    const { name, email, password, number } = req.body;
    if (!name) {
      return res.json({
        success: false,
        message: "User name is required.",
      });
    }
    if (!email) {
      return res.json({
        success: false,
        message: "User email is required.",
      });
    }
    if (!password) {
      return res.json({
        success: false,
        message: "Password is required.",
      });
    }
    if (!number) {
      return res.json({
        success: false,
        message: "User mobile number required.",
      });
    }
    function validateMobileNumber(number) {
      const mobileNumberRegex = /^(?:\+?\d{1,3}[- ]?)?\d{10}$/;
      return mobileNumberRegex.test(number);
    }
    if (!validateMobileNumber) {
      return res.json({
        success: false,
        message: "Invalid mobile number.",
      });
    }
    const existUser = await userModel.findOne({
      $or: [{ email }, { number }],
    });
    if (existUser) {
      return res.json({
        success: false,
        message: "User already registered.",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
    }
    const hashPasword = await bcrypt.hash(password, 10);
    let otpCode = Math.floor(Math.random() * 100000);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USR_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    let emailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Your OTP</title>
    <style>
        body {
            font-family: sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Your One-Time Password (OTP)</h1>
        <p>Dear User,</p>
        <p>Please use the following OTP to verify your account:</p>
        <p class="otp">${otpCode}</p>
        <p>This OTP is valid for 10 minutes. Please do not share this code with anyone.</p>
        <div class="footer">
            <p>Best regards,</p>
            <p>Nanda Mart</p>
        </div>
    </div>
</body>
</html>`;
    let mailOptions = {
      from: process.env.SMTP_USR_EMAIL,
      to: email,
      subject: "Nanda Mart registration verification code.",
      text: "Sended by the nanda mart",
      html: emailTemplate,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.json({
          success: false,
          message: "Error in otp sending.",
        });
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    const date = new Date();
    const expiryTimeInMilliseconds = date.getTime() + 10 * 60 * 1000;
    const newUser = await userModel({
      name,
      email,
      password: hashPasword,
      number,
      verificationCode: otpCode,
      verificationCodeExpires: new Date(expiryTimeInMilliseconds),
    }).save();
    res.status(201).json({
      success: true,
      message: "OTP send successfully,check the email.",
      email,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error.",
      error,
    });
    console.log(error);
  }
};
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email) {
      return res.json({
        success: false,
        message: "Email is required.",
      });
    }
    if (!otp) {
      return res.json({
        success: false,
        message: "OTP is required.",
      });
    }
    const strOTP = otp.toString();
    if (strOTP.length < 5) {
      return res.json({
        success: false,
        message: "OTP must be of 5 characters.",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found.",
      });
    }
    if (user.isVerified) {
      return res.json({
        success: false,
        message: "User is already verified.",
      });
    }
    const expiryTime = user.verificationCodeExpires;
    const storedExpiry = new Date(expiryTime.toISOString());
    if (new Date() > storedExpiry) {
      return res.json({
        success: false,
        message: "OTP expired.",
      });
    } else {
      if (otp == user.verificationCode) {
        user.isVerified = true;
        await user.save();
        res.send({
          success: true,
          message: "Verify email successfully.",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "OTP verification error.",
      error,
    });
    console.log(error);
  }
};
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({
        success: false,
        messag: "Please provide email.",
      });
    }
    const existUser = await userModel.findOne({ email });
    if (!existUser) {
      return res.json({
        success: false,
        message: "User not found.",
      });
    }
    if (existUser.isVerified) {
      return res.json({
        success: false,
        message: "User already verified.",
      });
    }
    let otpCode = Math.floor(Math.random() * 100000);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USR_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    let emailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Your OTP</title>
    <style>
        body {
            font-family: sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Your One-Time Password (OTP)</h1>
        <p>Dear User,</p>
        <p>Please use the following OTP to verify your account:</p>
        <p class="otp">${otpCode}</p>
        <p>This OTP is valid for 10 minutes. Please do not share this code with anyone.</p>
        <div class="footer">
            <p>Best regards,</p>
            <p>Nanda Mart</p>
        </div>
    </div>
</body>
</html>`;
    let mailOptions = {
      from: process.env.SMTP_USR_EMAIL,
      to: email,
      subject: "Nanda Mart registration verification code.",
      text: "Sended by the nanda mart",
      html: emailTemplate,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.json({
          success: false,
          message: "Error in otp sending.",
        });
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    const date = new Date();
    const expiryTimeInMilliseconds = date.getTime() + 10 * 60 * 1000;
    existUser.verificationCode = otpCode;
    existUser.verificationCodeExpires = new Date(expiryTimeInMilliseconds);
    await existUser.save();
    res.status(200).json({
      success: true,
      message: "OTP sed successFully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error.",
      error,
    });
    console.log(error);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.json({
        success: false,
        message: "Please provide email.",
      });
    }
    if (!password) {
      return res.json({
        success: false,
        message: "Please provide password.",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found.",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({
        success: false,
        message: "Invalid password.",
      });
    }
    if (!user.isVerified) {
      return res.json({
        success: false,
        message: "Please verify the email.",
      });
    }
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.status(200).json({
      success: true,
      message: "Login successFully.",
      token,
      name: user.name,
      number: user.number,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error.",
      error,
    });
    console.log(error);
  }
};
export const update = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await userModel.findById({ _id: req.user });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found.",
      });
    }
    if (!name) {
      user.name = name;
    }
    if (req.file) {
      const file = getDataUri(req.file);
      if (user.isImagePresent) {
        await cloudinary.v2.uploader.destroy(user.image.public_id);
      }
      const cdb = await cloudinary.v2.uploader.upload(file.content);
      const image = {
        public_id: cdb.public_id,
        url: cdb.secure_url,
      };
      user.image = image;
      user.isImagePresent = true;
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: "User updated successFully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error.",
      error,
    });
  }
};
export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await userModel.findById({ _id: req.user });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found.",
      });
    }
    if (!oldPassword || !newPassword) {
      return res.json({
        success: false,
        message: "Please provide all feilds.",
      });
    }
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.json({
        success: false,
        message: "Icorrect old password.",
      });
    }
    if (newPassword.length < 8) {
      return res.json({
        success: false,
        message: "Password at least 8 letters.",
      });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password updated successFully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error.",
      error,
    });
  }
};
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({
        success: false,
        message: "Please provide email.",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid email,not registered.",
      });
    }
    let forgetCode = Math.floor(Math.random() * 100000);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USR_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    let emailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Your OTP</title>
    <style>
        body {
            font-family: sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Your password forget verification code.</h1>
        <p>Dear User,</p>
        <p>Please use the following verification code to verify your account:</p>
        <p class="otp">${forgetCode}</p>
        <p>This verification code is valid for 10 minutes. Please do not share this code with anyone.</p>
        <div class="footer">
            <p>Best regards,</p>
            <p>Nanda Mart</p>
        </div>
    </div>
</body>
</html>`;
    let mailOptions = {
      from: process.env.SMTP_USR_EMAIL,
      to: email,
      subject: "Nanda Mart account password forget code.",
      text: "Sended by the nanda mart",
      html: emailTemplate,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.json({
          success: false,
          message: "Error in forget password code sending.",
        });
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    const date = new Date();
    const expiryTimeInMilliseconds = date.getTime() + 10 * 60 * 1000;
    user.forgetOtp = forgetCode;
    user.forgetOtpExpiries = expiryTimeInMilliseconds;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Forget password verification code send successFully.",
      email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error.",
      error,
    });
  }
};
export const verifyForgetCode = async (req, res) => {
  try {
    const { email, forgetCode } = req.body;
    if (!email || !forgetCode) {
      return res.json({
        success: false,
        message: "Please provide all fields.",
      });
    }
    const strOTP = forgetCode.toString();
    if (strOTP.length < 5) {
      return res.json({
        success: false,
        message: "forget password verification code must be of 5 characters.",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid email",
      });
    }

    const expiryTime = user.forgetOtpExpiries;
    const storedExpiry = new Date(expiryTime.toISOString());
    if (new Date() > storedExpiry) {
      return res.json({
        success: false,
        message: "Forget password verification code expired.",
      });
    } else {
      if (forgetCode == user.forgetOtp) {
        user.isForgetCodeVerified = true;
        user.isVerified = true;
        const date = new Date();
        const expiryTimeInMilliseconds = date.getTime() + 10 * 60 * 1000;
        user.isForgetCodeVerifiedExpires = expiryTimeInMilliseconds;
        await user.save();
        res.send({
          success: true,
          message: "Verify email successfully.",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error.",
      error,
    });
  }
};
export const updateForgetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return register.json({
        success: false,
        message: "Please provide email.",
      });
    }
    if (!password) {
      return res.json({
        success: false,
        message: "Please enter new password.",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 chracters.",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid email.",
      });
    }
    if (!user.isForgetCodeVerified) {
      return res.json({
        success: false,
        message: "Please verify the forget password code.",
      });
    }
    const expiryTime = user.isForgetCodeVerifiedExpires;
    const storedExpiry = new Date(expiryTime.toISOString());
    if (new Date() > storedExpiry) {
      return res.json({
        success: false,
        message: "Forget password time expires.",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    user.isForgetCodeVerified = false;
    await user.save();
    res.json({
      success: true,
      message: "Password change successFully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error.",
      error,
    });
  }
};
export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById({ _id: id });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found.",
      });
    }
    if (user.isImagePresent) {
      await cloudinary.v2.uploader.destroy(user.image.public_id);
    }
    await userModel.findByIdAndDelete({ _id: id });
    res.json({
      success: true,
      message: "Account deleted successFully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error.",
      error,
    });
  }
};
export const getAccount = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findById({ _id: id }).select("-password");
  if (!user) {
    return res.json({
      success: false,
      message: "Account not found.",
    });
  }
  res.status(200).json({
    success: true,
    message: "Account find successFully.",
    user,
  });
};
export const getAllAccount = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).json({
      success: true,
      message: "All account find successFully.",
      total: users.length,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error.",
      error,
    });
  }
};
export const searchAccount = async (req, res) => {
  try {
    const { search_str } = req.params;
    const searchRegex = new RegExp(search_str, "i");
    const queryConditions = [
      { name: { $regex: searchRegex } },
      { email: { $regex: searchRegex } },
    ];
    if (mongoose.Types.ObjectId.isValid(search_str)) {
      queryConditions.push({ _id: new mongoose.Types.ObjectId(search_str) });
    }

    const users = await userModel.find({
      $or: queryConditions,
    });
    if (users.length == 0) {
      return res.status(200).json({
        success: true,
        message: "User not find.",
        users,
      });
    }
    res.status(200).json({
      success: true,
      message: "User find successFully",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error.",
      error,
    });
  }
};
