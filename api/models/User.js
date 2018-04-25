'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * "name":
 */
var UserSchema = new Schema({
    uuid: {
        type: Number,
        unique : true,
        required: 'Kindly enter the UUID.'
    },
    username: {
        type: String,
        required: 'Kindly enter the Username.'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
});
  
module.exports = mongoose.model('User', UserSchema);