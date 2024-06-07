const mongoose = require("mongoose");
const BaseModel = require("../../utils/BaseModel.js");

const SchemaDefinition = {
    title: {
        type: String,
        required: true,
    },
    image: String,
    slug: {
        type: String,
        required: true,
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    size: {
        type: String,
        enum: ["M", "L", "XL", "XXL"],
    },
};

class ProductModel extends BaseModel {
    constructor() {
        super("Product", SchemaDefinition);
    }
}

const Product = new ProductModel().getModel();

module.exports = Product;
