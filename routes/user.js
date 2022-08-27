const express = require("express");
const router =express.Router();

const userController = new UserController();

router.post('/accounts', userController.signup);
router.post('/accounts/singup', userController.signup);

module.exports = router;