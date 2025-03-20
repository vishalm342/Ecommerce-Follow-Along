const express = require("express");
const router = express.Router();
const Cart = require("../model/cart");
const User = require("../model/user");
const Product = require("../model/product");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsynErrors");

// Add to cart
router.post(
  "/add-to-cart",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { userId, productId, quantity, price, name, image } = req.body;

      if (!userId || !productId) {
        return next(
          new ErrorHandler("User ID and Product ID are required", 400)
        );
      }

      // Find user by email or ID
      let user;
      if (userId.includes("@")) {
        // If userId is an email
        user = await User.findOne({ email: userId });
      } else {
        // If userId is an ObjectId
        user = await User.findById(userId);
      }

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      // Find existing cart
      let cart = await Cart.findOne({ user: user._id });

      if (!cart) {
        // Create new cart if it doesn't exist
        cart = await Cart.create({
          user: user._id,
          cartItems: [],
        });
      }

      // Check if product already exists in cart
      const existingItem = cart.cartItems.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        // Update quantity if product exists
        existingItem.quantity += quantity || 1;
      } else {
        // Add new item to cart
        cart.cartItems.push({
          product: productId,
          name,
          price,
          quantity: quantity || 1,
          image,
        });
      }

      await cart.save();

      return res.status(200).json({
        success: true,
        cart,
      });
    } catch (error) {
      console.error("Cart error:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get cart items by email or ID
router.get(
  "/get-cart/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.params.userId;

      // Find user by email or ID
      let user;
      if (userId.includes("@")) {
        // If userId is an email
        user = await User.findOne({ email: userId });
      } else {
        // If userId is an ObjectId
        user = await User.findById(userId);
      }

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      const cart = await Cart.findOne({ user: user._id });

      if (!cart) {
        return res.status(200).json({
          success: true,
          cart: { cartItems: [] },
        });
      }

      return res.status(200).json({
        success: true,
        cart,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Remove item from cart
router.delete(
  "/remove-from-cart/:userId/:itemId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { userId, itemId } = req.params;

      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
        return next(new ErrorHandler("Cart not found", 404));
      }

      cart.cartItems = cart.cartItems.filter(
        (item) => item._id.toString() !== itemId
      );

      await cart.save();

      return res.status(200).json({
        success: true,
        cart,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
