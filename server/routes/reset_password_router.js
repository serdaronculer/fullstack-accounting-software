const express = require('express');
const router = express.Router();
const resetPassword = require('../controllers/reset_password_controller');


router.post("/", resetPassword);



module.exports = router;