const express = require("express");
const router = express.Router();

const fileUploader = require("../middleware/multer");
const { uploadSingleFile } = require("../controllers/uploadControllers");

const { protect, roles } = require("../middleware/authMiddleware");

router
    .route("/")
    .post(
        protect,
        roles("admin"),
        fileUploader.single("file"),
        uploadSingleFile
    );

module.exports = router;
