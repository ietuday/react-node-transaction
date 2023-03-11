const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    balance: {
        type: mongoose.Decimal128,
        get: v => new mongoose.Types.Decimal128((+v.toString()).toFixed(4)),
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true,

    }
}, { timestamps: true });

walletSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      next(new Error('name must be unique'));
    } else {
      next(error);
    }
  });

module.exports = mongoose.model('wallet', walletSchema);