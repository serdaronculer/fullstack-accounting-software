const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId
    },
    companyName: {
        type: String,
        required: true
    },
    personGroup: {
        type: Schema.Types.ObjectId,
    },
    authorizedName: {
        type: String,
    },
    authorizedSurname: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    province: {
        type: String,
    },
    district: {
        type: String,
    },
    isPersonActive: {
        type: Boolean,
        default: true
    }
}, { collection: 'Persons', timestamps: true });

const Person = mongoose.model('person', PersonSchema);

module.exports = Person;