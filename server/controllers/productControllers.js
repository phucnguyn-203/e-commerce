const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/apiFeatures");

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
    const features = new ApiFeatures(Product, req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const products = await features.query;

    res.status(200).json({
        status: "success",
        results: products.length,
        data: {
            products,
        },
        currentPage: req.query.page * 1 || 1,
        totalPages: Math.ceil(products.length / (req.query.limit || 10)),
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
