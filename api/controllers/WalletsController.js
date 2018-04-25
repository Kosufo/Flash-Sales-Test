'use strict';

const mongoose = require('mongoose'),
    Wallet = mongoose.model('Wallet'),
    User = mongoose.model('User');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.read = function(req, res) {
    User.find({uuid: req.params.userId}, function(err, user) {
        if (err)
            return res.send(err);

        if(!user || !user[0])
            return res.json({'status': "OK", 'code': 400, 'error': "User not found."});
        
        var uuid = user[0].uuid;

        Wallet.find({uuid: uuid}, function(err, wallet) {
            if (err)
                return res.send(err);
    
            return res.json(wallet);
        });
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.update = function(req, res) {
    User.find({uuid: req.params.userId}, function(err, user) {
        if (err)
            return res.send(err);

        if(!user[0])
            return res.json({'status': "OK", 'code': 400, 'error': "User not found."});
        
        var uuid = user[0].uuid;

        Wallet.findOneAndUpdate({uuid: uuid}, req.body, {new: true}, function(err, wallet) {
            if (err)
                return res.send(err);
    
            return res.json(wallet);
        });
    });
};