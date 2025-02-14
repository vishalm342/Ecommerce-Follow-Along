require("dotenv").config({ path: "./config/.env" });
const app = require("./app");
const connectDatabase = require("./db/Database");

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server for handling uncaught exception");
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config/.env" });
}

// Connect to database
connectDatabase();

// Create server
const server = app.listen(process.env.PORT || 8000, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 8000}`
  );
});
