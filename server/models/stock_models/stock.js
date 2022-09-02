const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockModel = new Schema({

    userID: {
        type: Schema.Types.ObjectId
    },
    barcodeNumber: {
        type: String
    },
    quantity: {
        type: Number,
        default: 0
    },
    stockCode: {
        type: String
    },
    stockName: {
        type: String
    },
    stockRack: {
        type: String
    },
    stockGroup: {
        type: Schema.Types.ObjectId
    },
    unit: {
        type: Schema.Types.ObjectId
    },
    purchasePrice: {
        type: Number,
        default: 0
    },
    salePrice: {
        type: Number,
        default: 0
    },
    vatRate: {
        type: Number
    },
    sctRate: {
        type: Number
    },
    isVatIncluded: {
        type: Boolean
    },
    isSctIncluded: {
        type: Boolean
    },
    storeHouse: {
        type: Schema.Types.ObjectId
    },
    customArea1: {
        type: String
    },
    customArea2: {
        type: String
    }
}, { timestamps: true, collection: "Stocks" });


const Stock = mongoose.model("stocks", StockModel);

module.exports = Stock;

