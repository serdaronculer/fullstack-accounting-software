const { body } = require('express-validator');
const User = require('../models/user_model');


const validateNewUser = function () {
    return [
        body('firstName').isString().trim().isLength({ min: 2 }).withMessage("Name field must be a minimum of 2 characters"),
        body("lastName").isString().trim().isLength({ min: 2 }).withMessage("Last name field must be a minimum of 2 characters"),
        body("userName").isString().trim().isLength({ min: 2 }).withMessage("User name field must be a minimum of 2 characters"),
        body("email").isString().trim().isLength({ min: 2 }).toLowerCase().withMessage("Email field must be a minimum of 2 characters").
            isEmail().withMessage("Please enter a correct email address").custom(async (value, { req }) => {
                const result = await User.findOne({ email: value });
                if (result && result.emailIsActive === true) {
                    throw new Error("This email address is already taken");
                }
                return true;
            }),
        body("password").isString().trim().isLength({ min: 6 }).withMessage("Password field must be a minimum of 6 characters"),
        body("repassword").isString().trim().custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        })
    ];
};

module.exports = validateNewUser;