const express = require('express')
const router = express.Router();
const loginController = require('../controllers/login_controller')


router.post("/", loginController.loginPost);

router.get("/", loginController.loginGet);

module.exports = router;