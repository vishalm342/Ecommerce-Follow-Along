const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide the product name'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide the product price'],
    },
    description: {
        type: String,
        required: [true, 'Please provide the product description'],
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
    },
    tags: {
        type: [String],
        default: [],
    },
    stock: {
        type: Number,
        required: [true, 'Product stock is required'],
    },
    email: {
        type: String,
        required: [true, 'Product email is required'],
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    images: {
        type: [String],
        required: [true, 'Product images are required'],
    },
    cart: [
        {
            productid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: [true, "Please provide the product ID"]
            },
            quantity: {
                type: Number,
                required: [true, "Please provide the quantity"],
                min: [0, "Quantity cannot be negative"],
            },
        },
    ],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
