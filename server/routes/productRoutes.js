const express = require("express");
const router = express.Router();

const {
    getOneProduct,
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productControllers");

const { protect, roles } = require("../middleware/authMiddleware");

router
    .route("/")
    .get(getAllProduct)
    .post(protect, roles("admin"), createProduct);
router
    .route("/:slug")
    .get(getOneProduct)
    .patch(protect, roles("admin"), updateProduct)
    .delete(protect, roles("admin"), deleteProduct);

module.exports = router;
