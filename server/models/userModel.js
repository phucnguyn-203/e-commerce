const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;
const brcypt = require("bcryptjs");

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name"],
    },
    email: {
        type: String,
        required: [true, "Please provide us your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Invalid email"],
    },
    photo: String,
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
    },
    password: {
        type: String,
        required: true,
        minLength: [
            8,
            "Password length must be greater than 8 characters or equal",
        ],
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "please confirm your password"],
        validate: {
            validator: function (val) {
                return val === this.password;
            },
            message: "Confirm password is not same password field",
        },
    },
    isActive: {
        type: Boolean,
        default: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await brcypt.hash(this.password, 12);
        this.passwordConfirm = undefined;
    }
    next();
});

userSchema.pre(/^find/, function (next) {
    this.select("-__v");
    next();
});

userSchema.methods.correctPassword = async function (password, userPassword) {
    return await brcypt.compare(password, userPassword);
};
const User = mongoose.model("User", userSchema);

module.exports = User;
