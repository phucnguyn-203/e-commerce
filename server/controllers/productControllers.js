const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const ApiFeature = require("../utils/apiFeature");

exports.getOneProduct = catchAsync(async (req, res) => {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });
    res.status(200).json({
        status: "success",
        data: {
            product,
        },
    });
});

exports.getAllProduct = catchAsync(async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        status: "success",
        results: products.length,
        data: {
            products,
        },
    });
});

exports.createProduct = catchAsync(async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
        status: "success",
        data: newProduct,
    });
});

exports.updateProduct = catchAsync(async (req, res) => {
    const { slug } = req.params;
    const product = await Product.findOneAndUpdate({ slug }, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: "success",
        data: {
            product,
        },
    });
});

exports.deleteProduct = catchAsync(async (req, res) => {
    const { slug } = req.params;
    await Product.findOneAndDelete({ slug });
    res.status(204).json({
        status: "success",
        data: null,
    });
});
