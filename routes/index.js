const express = require("express");
const User = require("./user");
const Follow = require("./follow");
// const Cart = require("./cart");
// const Email = require("./email");

const router = express.Router();

router.use("/accounts", User);
router.use("/followLists", Follow);
// router.use("/cart", Cart);
// router.use("/user/email", Email);


module.exports = router;
