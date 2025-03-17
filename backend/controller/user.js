const express = require("express");
const path = require("path");
const fs = require("fs");
const User = require("../model/user");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsynErrors");
const bcrypt = require("bcryptjs");
require("dotenv").config();


// In your create-user route handler
router.post("/create-user", upload.single("file"), catchAsyncErrors(async (req, res, next) => {
  console.log("Creating user...");
  const { name, email, password } = req.body;

  // Check if required fields are present
  if (!name) {
      return next(new ErrorHandler("Please enter your name!", 400));
  }

  const userEmail = await User.findOne({ email });
  if (userEmail) {
      if (req.file) {
          const filepath = path.join(__dirname, "../uploads", req.file.filename);
          try {
              fs.unlinkSync(filepath);
          } catch (err) {
              console.log("Error removing file:", err);
              return res.status(500).json({ message: "Error removing file" });
          }
      }
      return next(new ErrorHandler("User already exists", 400));
  }

  let fileUrl = "";
  if (req.file) {
      fileUrl = path.join("uploads", req.file.filename);
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("At Create ", "Password: ", password, "Hash: ", hashedPassword);
  
  // Make sure to provide a default value for avatar.public_id if file is not uploaded
  const user = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar: {
          public_id: req.file ? req.file.filename : "default_avatar", // Provide a default value
          url: req.file ? fileUrl : "default_avatar_url", // Provide a default avatar URL
      },
  });
  
  console.log(user)
  res.status(201).json({ success: true, user });
}));

router.post("/login", catchAsyncErrors(async (req, res, next) => {
    console.log("Logging in user...");
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please provide email and password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    console.log("At Auth", "Password: ", password, "Hash: ", user.password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    user.password = undefined;
    res.status(200).json({
        success: true,
        user,
    });
}));
router.get(
  "/profile",
  catchAsyncErrors(async (req, res, next) => {
    const { email } = req.query;
    if (!email) {
      return next(new ErrorHandler("Please provide an email", 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        avatarUrl: user.avatar.url,
      },
      addresses: user.addresses,

      // {
      //     "success": true,
      //     "user": {
      //         "name": "a",
      //         "email":"a@example.com",
      //         "phoneNumber": "1234567890",
      //         "avatarUrl": "https://example.com/avatar.jpg"
      //     },
      //     "addresses": ["Address 1", "Address 2"]
      // }
    });
    console.log(user.avatarUrl);
  })
);
router.post("/add-address", catchAsyncErrors(async (req, res, next) => {

 

    const { country, city, address1, address2, zipCode, addressType, email } = req.body;
 


 

    const user = await User.findOne({ email });
 


 

    if (!user) {
 

        return next(new ErrorHandler("User not found", 404));
 

    }
 


 

    const newAddress = {
 

        country,
 

        city,
 

        address1,
 

        address2,
 

        zipCode,
 

        addressType,
 

    };
 


 

    user.addresses.push(newAddress);
 

    await user.save();
 


 

    res.status(201).json({
 

        success: true,
 

        addresses: user.addresses,
 

    });
 

}));
router.get(
    "/addresses",
    catchAsyncErrors(async (req, res, next) => {
      const { email } = req.query;
      if (!email) {
        return next(new ErrorHandler("Please provide an email", 400));
      }
      const user = await User.findOne({ email });
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
      res.status(200).json({
        success: true,
        addresses: user.addresses,
      });
    })
  );
module.exports = router;