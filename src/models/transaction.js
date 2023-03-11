const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    balance: {
        type: mongoose.Decimal128,
        get: v => new mongoose.Types.Decimal128((+v.toString()).toFixed(4)),
        required: true
    },
    wallet: {
        type: mongoose.Types.ObjectId,
        ref: 'wallet',
        required: true
    },
    amount: {
        type: mongoose.Decimal128,
        get: v => new mongoose.Types.Decimal128((+v.toString()).toFixed(4)),
        required: true
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        enum: ['CREDIT', 'DEBIT']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('transaction', transactionSchema);