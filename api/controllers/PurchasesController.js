'use strict';

const mongoose = require('mongoose'),
    Wallet = mongoose.model('Wallet'),
    Purchase = mongoose.model('Purchase');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.sales = function(req, res) {    
    Wallet.find({uuid: req.params.userId}, function(err, wallet) {
        Purchase.find({uuid: wallet[0].uuid}, function(err, purchases) {
            if (err)
                res.send(err);

            let result = null;
            let total = purchases.length;
            
            result = {
                uuid: wallet[0].uuid,
                total: total,
                balance: wallet[0].balance
            }
            
            res.json(result);
        });
    });
};