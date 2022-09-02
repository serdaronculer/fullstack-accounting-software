const express = require('express')
const router = express.Router()
const registerController = require('../controllers/register_controller');
const validateNewUser = require('../validations/register_validation');
const validate = require('../validations/validator');

router.post("/", validateNewUser(), validate, registerController.register);

module.exports = router;