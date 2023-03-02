const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/products");
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().toISOString()}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb({ message: "Unsupported format file" }, false);
    }
};

const fileUploader = multer({ storage, fileFilter });

module.exports = fileUploader;
