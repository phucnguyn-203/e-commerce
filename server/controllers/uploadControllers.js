const catchAsync = require("../utils/catchAsync");
const cloudinary = require("../middleware/cloudinary");

exports.uploadSingleFile = catchAsync(async (req, res, next) => {
    // const urlUploaded = await cloudinary.upload(req.file.path, "Products");
    res.status(200).json({
        status: "success",
        data: {
            url: `${req.protocol}://${req.hostname}:${
                process.env.PORT
            }/${req.file.path.replace("public/", "")}`,
        },
    });
});
