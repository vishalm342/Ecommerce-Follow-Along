const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the product name"],
    },
    description: {
        type: String,
        required: [true, "Please provide the product description"],
    },
    category: {
        type: String,
        required: [true, "Please provide the product category"],
    },
    tags: {
        type: [String],
        default: [],
    },
    price: {
        type: Number,
        required: [true, "Please provide the product price"],
    },
    stock: {
        type: Number,
        required: [true, "Please provide the product stock"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        match: [/.+@.+\..+/, "Please provide a valid email address"],
    },
    images: {
        type: [String],
        required: [true, "Please upload product images"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

},{
    timestamps: true,
});

module.exports = mongoose.model("Product", productSchema);