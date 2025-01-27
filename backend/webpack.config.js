const path = require('path');

module.exports = {
  // Entry point for your application
  entry: './server/server.js', // Assuming your main server file is server.js

  // Output configuration
  output: {
    filename: 'bundle.js', // Output bundled file name
    path: path.resolve(__dirname, 'dist') // Directory to save the bundled file
  },

  // Mode for development or production
  mode: 'development', // Change to 'production' for production builds

  // For server-side code, node is specified here
  target: 'node',

  // Resolve .js extensions
  resolve: {
    extensions: ['.js']
  },

  // Webpack Dev Server configuration
  devServer: {
    static: path.resolve(__dirname, 'public'), // Folder for static files
    port: 3000, // Set your preferred port
  },

  // Optional: Module rules for how Webpack should handle different file types
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // If you're using Babel for transpiling JS
        },
      },
    ],
  },
};
