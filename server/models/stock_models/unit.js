const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UnitSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId
    },
    unitName: {
        type: String
    }
}, { timestamps: true, collection: "Units" });

const Unit = mongoose.model("unit", UnitSchema);

module.exports = Unit;