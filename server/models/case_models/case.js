const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CaseSchema = new Schema({
    totalBalance: {
        type: Number
    },
    totalCashInflow: {
        type: Number
    },
    totalCashOutflow: {
        type: Number
    }
});