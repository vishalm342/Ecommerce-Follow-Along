const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from the correct path
dotenv.config({ path: "config/.env" });

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.error(`Database connection failed: ${err.message}`);
      process.exit(1);
    });
};

module.exports = connectDatabase;
