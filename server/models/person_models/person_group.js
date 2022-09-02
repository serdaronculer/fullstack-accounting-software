const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonGroupSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId
    },
    groupName: {
        type: String
    }
}, { timestamps: true, collection: "PersonGroups" });

const PersonGroup = mongoose.model("personGroup", PersonGroupSchema);

module.exports = PersonGroup;