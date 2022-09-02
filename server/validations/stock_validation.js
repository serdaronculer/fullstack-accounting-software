const { body } = require('express-validator');


const validateAddStock = function () {

    return [
        body("stockName").notEmpty({ ignore_whitespace: true }).isString().trim().isLength({ min: 1 }).withMessage("Stock name must be at least 1 character"),
        body("quantity").isNumeric().withMessage("Please enter only numeric characters").optional(),
        body("purchasePrice").isNumeric().withMessage("Please enter only numeric characters").optional(),
        body("salePrice").isNumeric().withMessage("Please enter only numeric characters").optional()
    ];

}

const validateUpdateStock = function () {

    return [
        body("stockName").notEmpty({ ignore_whitespace: true }).isString().trim().isLength({ min: 1 }).withMessage("Stock name must be at least 1 character").optional(),
        body("quantity").isNumeric().withMessage("Please enter only numeric characters").optional(),
        body("purchasePrice").isNumeric().withMessage("Please enter only numeric characters").optional(),
        body("salePrice").isNumeric().withMessage("Please enter only numeric characters").optional()
    ];

}

const validateStockGroup = function () {
    return [
        body("groupName").isString().notEmpty({ ignore_whitespace: true }).trim().withMessage("group name required field")
    ];
}

const validateUnit = function () {
    return [
        body("unitName").isString().notEmpty({ ignore_whitespace: true }).trim().withMessage("Unit name required field")
    ];
}

module.exports = {
    validateAddStock,
    validateUpdateStock,
    validateStockGroup,
    validateUnit
}



