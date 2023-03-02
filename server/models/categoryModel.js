const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Name can not empty"],
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
