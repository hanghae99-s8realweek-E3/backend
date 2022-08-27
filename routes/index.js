const express = require("express");
const User = require("./user");
// const Product = require("./product");
// const Cart = require("./cart");
// const Email = require("./email");

const router = express.Router();

router.use("/user", User);
// router.use("/product", Product);
// router.use("/cart", Cart);
// router.use("/user/email", Email);

module.exports = router;
