'use strict';
module.exports = function(app) {
    const Products = require('../controllers/ProductsController'),
        Wallets = require('../controllers/WalletsController'),
        Purchases = require('../controllers/PurchasesController'),
        Users = require('../controllers/UsersController');

    app.route('/products')
      .get(Products.all)
      .post(Products.create);

    app.route('/products/:productId')
      .get(Products.read)
      .put(Products.update)
      .delete(Products.delete);

    app.route('/products/:productId/purchase')
      .post(Products.purchase);

    app.route('/wallet/:userId')
      .get(Wallets.read)
      .put(Wallets.update);

    app.route('/users/:userId')
      .get(Users.read);

    app.route('/sales/:userId/current')
      .get(Purchases.sales);
};