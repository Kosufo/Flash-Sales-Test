'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 */
var PurchaseSchema = new Schema({
    uuid: {
        type: Number,
        required: 'User UUID field is required.'
    },
    product_id: {
        type: String,
        required: 'Product ID is required.'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
});
  
module.exports = mongoose.model('Purchase', PurchaseSchema);