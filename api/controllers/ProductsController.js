'use strict';

const mongoose = require('mongoose'),
    Purchase = mongoose.model('Purchase'),
    Product = mongoose.model('Product');

/**
 * 
 * @param {*} req as request
 * @param {*} res as resource
 */
exports.all = function(req, res) {
    Product.find({}, function(err, product) {
        if (err)
            res.send(err);

        res.json(product);
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.create = function(req, res) {
  var new_product = new Product(req.body);
  new_product.save(function(err, product) {
        if (err)
            res.send(err);
            
        res.json(product);
  });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.read = function(req, res) {
    Product.findById(req.params.productId, function(err, product) {
            if (err)
                res.send(err);
            res.json(product);
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.update = function(req, res) {
    Product.findOneAndUpdate({_id: req.params.productId}, req.body, {new: true}, function(err, product) {
        if (err)
            res.send(err);

        res.json(product);
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = function(req, res) {
    Product.remove({
        _id: req.params.productId
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Product successfully deleted' });
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.purchase = function(req, res) { 
    req.body.product_id = req.params.productId;
    var new_purchase = new Purchase(req.body);
    new_purchase.save(function(err, purchase) {
        if (err)
            res.send(err);
            
        res.json(purchase);
    });
};