const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorehouseSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId
    },
    storehouse: {
        type: String
    }
}, { timestamps: true, collection: "Storehouses" });

const Storehouse = mongoose.model("Storehouses", StorehouseSchema);

module.exports = Storehouse;