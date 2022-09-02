const createHttpError = require("http-errors");
const Stock = require("../models/stock_models/stock");
const StockGroup = require("../models/stock_models/stock_group");
const Unit = require("../models/stock_models/unit");
const Storehouse = require("../models/stock_models/storehouse");

//! STOCKS CONTROLLER

const getStocks = async (req, res, next) => {
    try {
        const selectedUser = req.user;
        const stocks = await Stock.find({ userID: selectedUser.id });
        console.log(stocks);
        if (stocks) {
            res.status(200).json(stocks)
        } else {
            next(createHttpError(400, "Stock not found"));
        }

    } catch (error) {
        next(createHttpError(500, error));
    }
}

const getStock = async (req, res, next) => {
    try {
        const selectedUser = req.user;
        const stockID = req.params.id;

        const stock = await Stock.findById(stockID).and({ userID: selectedUser._id });
        if (!stock) {
            next(createHttpError(400, "Stock not found"));
        } else {
            res.status(200).json(stock);
            return;
        }

    } catch (error) {
        next(createHttpError(500, error));
    }
}

const addStock = async (req, res, next) => {
    try {
        const selectedUser = req.user;
        const stock = new Stock(req.body);
        stock.userID = selectedUser._id;
        const newStock = await stock.save();
        res.status(201).json(newStock);

    } catch (error) {
        next(createHttpError(500, error));
    }
}

const updateStock = async (req, res, next) => {
    try {
        const selectedUser = req.user;
        const stockID = req.params.id;
        const newStockInfo = req.body;
        const newStock = await Stock.findByIdAndUpdate(stockID, newStockInfo, { new: true, runValidators: true })
            .and([{ userID: selectedUser._id }]);
        if (newStock) {
            res.status(202).json(newStock);
        } else {
            next(createHttpError(400, "Stock not found"));
        }

    } catch (error) {
        next(createHttpError(500, error));
    }
}

const deleteStock = async (req, res, next) => {
    try {
        const selectedUser = req.user;
        const stockID = req.params.id;
        const deletedStock = await Stock.findByIdAndDelete(stockID)
            .and([{ userID: selectedUser._id }]);
        if (deletedStock) {
            res.status(202).json(deletedStock);
        } else {
            next(createHttpError(400, "Stock not found"));
        }
    } catch (error) {
        next(createHttpError(500, error));
    }
}

//! STOCK GROUP CONTROLLER

const getStockGroups = async (req, res, next) => {
    try {
        const selectedUser = req.user;
        const stockGroups = await StockGroup.find({ userID: selectedUser.id });
        res.json(stockGroups);

    } catch (error) {
        next(createHttpError(500, error));
    }
}

const getStockGroup = async (req, res, next) => {
    try {
        const stockGroupID = req.params.id;
        const stockGroup = await StockGroup.findById(stockGroupID).and({ userID: selectedUser._id });
        if (stockGroup) {
            res.json(stockGroup);
        } else {
            next(createHttpError(400, "Stock group not found"));
        }


    } catch (error) {
        next(createHttpError(500, error));
    }
}

const addStockGroup = async (req, res, next) => {
    try {
        const selectedUser = req.user;
        const stockGroup = new StockGroup(req.body);
        stockGroup.userID = selectedUser._id;
        const newStockGroup = await stockGroup.save();
        res.json(newStockGroup);
    } catch (error) {
        next(createHttpError(500, error));
    }
}

const updateStockGroup = async (req, res, next) => {
    try {
        const stockGroupID = req.params.id;
        const stockGroup = await StockGroup.findByIdAndUpdate(stockGroupID, req.body, { new: true, runValidators: true })
            .and([{ userID: selectedUser._id }]);
        if (stockGroup) {
            res.json(stockGroup);
        } else {
            next(createHttpError(400, "Stock group not found"));
        }
    } catch (error) {
        next(createHttpError(500, error));
    }
}

const deleteStockGroup = async (req, res, next) => {
    try {
        const stockGroupID = req.params.id;
        const deletedStockGroup = await StockGroup.findByIdAndDelete(stockGroupID)
            .and([{ userID: selectedUser._id }]);;

        if (deletedStockGroup) {
            res.json(deletedStockGroup);
        } else {
            next(createHttpError(400, "Stock group not found"));
        }
    } catch (error) {
        next(createHttpError(500, error));
    }
}

//! UNIT CONTROLLER

const getUnits = async (req, res, next) => {
    try {
        const selectedUser = req.user;
        const units = await Unit.find({ userID: selectedUser.id });
        res.json(units);

    } catch (error) {
        next(createHttpError(500, error));
    }
}

const getUnit = async (req, res, next) => {
    try {
        const selectedUser = req.user;
        const unitID = req.params.id;
        const unit = await StockGroup.findById(unitID).and({ userID: selectedUser._id });
        if (unit) {
            res.json(unit);
        } else {
            next(createHttpError(400, "Unit not found"));
        }


    } catch (error) {
        next(createHttpError(500, error));
    }
}

const addUnit = async (req, res, next) => {
    try {
        const selectedUser = req.user;
        const unit = new Unit(req.body);
        unit.userID = selectedUser._id;
        const newUnit = await unit.save();
        res.json(newUnit);
    } catch (error) {
        next(createHttpError(500, error));
    }
}

const updateUnit = async (req, res, next) => {
    try {
        const unitID = req.params.id;
        const unit = await StockGroup.findByIdAndUpdate(unitID, req.body, { new: true, runValidators: true })
            .and([{ userID: selectedUser._id }]);
        if (unit) {
            res.json(unit);
        } else {
            next(createHttpError(400, "Unit not found"));
        }
    } catch (error) {
        next(createHttpError(500, error));
    }
}

const deleteUnit = async (req, res, next) => {
    try {
        const unitID = req.params.id;
        const deletedUnit = await StockGroup.findByIdAndDelete(unitID)
            .and([{ userID: selectedUser._id }]);

        if (deletedUnit) {
            res.json(deletedUnit);
        } else {
            next(createHttpError(400, "Unit not found"));
        }
    } catch (error) {
        next(createHttpError(500, error));
    }
}

//! STORE-HOUSE CONTROLLER

const getStorehouses = async (req, res, next) => {
    try {
        const selectedUser = req.user;
        const storehouses = await Storehouse.find({ userID: selectedUser.id });
        res.json(storehouses);

    } catch (error) {
        next(createHttpError(500, error));
    }
}

const getStorehouse = async (req, res, next) => {
    try {
        const storehouseID = req.params.id;
        const selectedUser = req.user;
        const storehouse = await StockGroup.findById(storehouseID)
            .and({ userID: selectedUser._id });
        if (storehouse) {
            res.json(storehouse);
        } else {
            next(createHttpError(400, "Storehouse not found"));
        }


    } catch (error) {
        next(createHttpError(500, error));
    }
}

const addStorehouse = async (req, res, next) => {
    try {
        const selectedUser = req.user;
        const storehouse = new Storehouse(req.body);
        storehouse.userID = selectedUser._id;
        const newStorehouse = await storehouse.save();
        res.json(newStorehouse);
    } catch (error) {
        next(createHttpError(500, error));
    }
}

const updateStorehouse = async (req, res, next) => {
    try {
        const storehouseID = req.params.id;
        const storehouse = await StockGroup.findByIdAndUpdate(storehouseID, req.body, { new: true, runValidators: true })
            .and([{ userID: selectedUser._id }]);
        if (storehouse) {
            res.json(storehouse);
        } else {
            next(createHttpError(400, "Storehouse not found"));
        }
    } catch (error) {
        next(createHttpError(500, error));
    }
}

const deleteStorehouse = async (req, res, next) => {
    try {
        const storehouseID = req.params.id;
        const deletedStorehouse = await StockGroup.findByIdAndDelete(storehouseID)
            .and([{ userID: selectedUser._id }]);

        if (deletedStorehouse) {
            res.json(deletedStorehouse);
        } else {
            next(createHttpError(400, "Storehouse not found"));
        }
    } catch (error) {
        next(createHttpError(500, error));
    }
}


module.exports = {
    getStocks,
    getStock,
    addStock,
    updateStock,
    deleteStock,
    getStockGroups,
    getStockGroup,
    updateStockGroup,
    deleteStockGroup,
    addStockGroup,
    getUnits,
    getUnit,
    addUnit,
    updateUnit,
    deleteUnit,
    getStorehouses,
    getStorehouse,
    addStorehouse,
    updateStorehouse,
    deleteStorehouse
}