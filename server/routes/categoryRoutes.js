const express = require("express");
const router = express.Router();

const {
    getAllCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryControllers");

const { protect, roles } = require("../middleware/authMiddleware");

router
    .route("/")
    .get(getAllCategory)
    .post(protect, roles("admin"), createCategory);
router
    .route("/:id")
    .patch(protect, roles("admin"), updateCategory)
    .delete(protect, roles("admin"), deleteCategory);

module.exports = router;
