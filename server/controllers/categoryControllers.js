const Category = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllCategory = catchAsync(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json({
        status: "success",
        results: categories.length,
        data: {
            categories,
        },
    });
});

exports.createCategory = catchAsync(async (req, res) => {
    const newCategory = await Category.create(req.body);
    res.status(201).json({
        status: "success",
        data: newCategory,
    });
});

exports.updateCategory = catchAsync(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: "success",
        data: category,
    });
});

exports.deleteCategory = catchAsync(async (req, res) => {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(204).json({
        status: "success",
        data: null,
    });
});
