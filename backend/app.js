const express = require("express");
const app = express();
const ErrorHandler = require("./utils/ErrorHandler");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use(cookieParser());
app.use("/", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config/.env" });
}

// Import models first
require("./model/user");
require("./model/product");

// Then import routes
const user = require("./controller/user");
const product = require("./controller/product");

// Use routes
app.use("/api/v2/user", user);
app.use("/api/v2/product", product);
app.use((err, req, res, next) => {
  if (err) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
  next();
});

module.exports = app;
