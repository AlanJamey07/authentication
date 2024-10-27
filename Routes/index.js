const express = require("express");
const router = express.Router();
const {
    createUser,
    login,
    dashBoard,
} = require("../controllers/index");

router.post("/register" , createUser);
router.post("/login" , login);
router.post("/dashBoard" , dashBoard);










module.exports = router;