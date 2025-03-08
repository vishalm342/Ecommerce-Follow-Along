const app = require("./app");
const connectDatabase = require("./db/Database");
const path = require("path");

process.on("uncaughtException", (err) => {
  console.log(`error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

// Load env vars
require("dotenv").config({
  path: path.join(__dirname, "config", ".env"),
});

// Connect to database
connectDatabase();

const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 8000}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
