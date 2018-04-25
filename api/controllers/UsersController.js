'use strict';

const mongoose = require('mongoose'),
    User = mongoose.model('User');
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.read = function(req, res) {
    User.find({uuid: req.params.userId}, function(err, user) {
        if (err)
            res.send(err);
            
        res.json(user);
    });
};