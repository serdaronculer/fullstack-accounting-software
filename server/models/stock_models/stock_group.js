const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockGroupSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId
    },
    groupName: {
        type: String
    }
}, { timestamps: true, collection: "StockGroups" });

const StockGroup = mongoose.model("stockGroup", StockGroupSchema);

module.exports = StockGroup;