'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * "name"
 */
var WalletSchema = new Schema({
    uuid: {
        type: String,
        unique : true,
        required: 'Kindly enter the unique user ID.'
    },
    balance: {
        type: Number,
        required: 'Balance field is required.'
    },
    currency: {
        type: String,
        required: 'Currency field is required.'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
});
  
module.exports = mongoose.model('Wallet', WalletSchema);