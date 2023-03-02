const express = require("express");
const router = express.Router();

const {
    signup,
    login,
    refreshToken,
    checkToken,
    logout,
} = require("../controllers/userControllers");

router.post("/signup", signup);
router.post("/login", login);
router.get("/refresh-token", refreshToken);
router.get("/check-token", checkToken);
router.get("/logout", logout);
module.exports = router;
