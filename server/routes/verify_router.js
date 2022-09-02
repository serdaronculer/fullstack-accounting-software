const express = require('express')
const router = express.Router()
const verify = require('../controllers/verify_controller');

router.get("/:id", verify);

module.exports = router;