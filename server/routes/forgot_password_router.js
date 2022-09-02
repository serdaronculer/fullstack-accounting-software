const express = require('express')
const router = express.Router();
const forgotPasswordController = require('../controllers/forgot_password_controller')

router.post("/", forgotPasswordController.forgotPassword);

router.get("/:id/:token", forgotPasswordController.resetPassword);



module.exports = router;