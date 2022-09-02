const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stock_controller');
const stockValidate = require('../validations/stock_validation');
const validate = require('../validations/validator');



//! STOCK GROUP
router.get('/stock-groups', stockController.getStockGroups);
router.post('/stock-groups', stockValidate.validateStockGroup(), validate, stockController.addStockGroup);
router.get('/stock-groups/:id', stockController.getStockGroup);
router.patch('/stock-groups/:id', stockValidate.validateStockGroup(), validate, stockController.updateStockGroup);
router.delete('/stock-groups/:id', stockController.deleteStockGroup);


//! UNIT
router.get('/units', stockController.getUnits);
router.post('/units', stockValidate.validateUnit(), validate, stockController.addUnit);
router.get('/units/:id', stockController.getUnit);
router.patch('/units/:id', stockValidate.validateUnit(), validate, stockController.updateUnit);
router.delete('/units/:id', stockController.deleteUnit);


//! STOREHOUSE
router.get('/storehouses', stockController.getStorehouses);
router.post('/storehouses', stockController.addStorehouse);
router.get('/storehouses/:id', stockController.getStorehouse);
router.patch('/storehouses/:id', stockController.updateStorehouse);
router.delete('/storehouses/:id', stockController.deleteStorehouse);


//! STOCK
router.get("/", stockController.getStocks);
router.post("/", stockValidate.validateAddStock(), validate, stockController.addStock);
router.get("/:id", stockController.getStock);
router.patch("/:id", stockValidate.validateUpdateStock(), validate, stockController.updateStock);
router.delete("/:id", stockController.deleteStock);


module.exports = router;