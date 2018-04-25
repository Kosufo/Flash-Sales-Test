'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * "name":
 * "brand":
 * "model":
 * "sku":
 * "type":
 * "price":
 * "currency":
 * "status":
 */
var ProductSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the Name of the product.'
    },
    brand: {
        type: String,
        required: 'Kindly enter the Brand of the product.'
    },
    model: {
        type: String,
        required: 'Kindly enter the Model of the product'
    },
    sku: {
        type: String,
        required: 'Kindly enter the SKU of the product'
    },
    type: {
        type: String,
        required: 'Kindly enter the Type of the product'
    },
    price: {
        type: Number,
        required: 'Kindly enter the Price of the product'
    },
    currency: {
        type: [{
            type: String,
            enum: ['USD', 'EUR', 'GPB']
        }],
        default: ['USD']
    },
    status: {
        type: [{
            type: String,
            enum: ['sale', 'empty']
        }],
        default: ['sale']
    },
    created_date: {
        type: Date,
        default: Date.now
    },
});
  
module.exports = mongoose.model('Product', ProductSchema);