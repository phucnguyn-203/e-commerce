const slugify = require("slugify");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const removeAccents = require("../utils/removeAccents");

const productSchema = new Schema(
    {
        slug: String,
        name: {
            type: String,
            required: [true, "A product must have a name"],
            trim: true,
            unique: true,
        },
        price: {
            type: Number,
            required: [true, "A product must have price"],
        },
        quantity: Number,
        percentageDiscount: {
            type: Number,
            default: 0,
            min: [0, "Percentage discount must be greates or equal 0%"],
            max: [100, "Percentage discount must be lower or equal 100%"],
        },
        discription: {
            type: String,
            required: true,
        },
        thumbnail: String,
        images: [String],
        colors: [String],
        options: [String],
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "A product must belong to category"],
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    }
    // {
    //     toJSON: { virtuals: true },
    //     toObject: { virtuals: true },
    // }
);

productSchema.virtual("priceAfterDiscount").get(function () {
    return this.price - this.price * (this.percentageDiscount / 100);
});

productSchema.pre("save", function (next) {
    this.slug = slugify(removeAccents(this.name), { trim: true, lower: true });
    next();
});

productSchema.pre(/^find/, function (next) {
    this.populate({
        path: "category",
        select: "name -_id",
    }).select("-__v");
    next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
