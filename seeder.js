'use strict';

const mongoose = require('mongoose'),
    Product = require('./api/models/Product'),
    User = require('./api/models/User'),
    Wallet = require('./api/models/Wallet'),

    products = require('./data/products.json'),
    users = require('./data/users.json'),
    wallets = require('./data/wallets.json');

const server = require('./server');

mongoose.connection.collections['products'].drop( function(err) {
    console.log('Products collection dropped');
    for(var item of products) {
        var new_product = new Product(item);
        new_product.save(function(err, product) {
            if (err)
                console.log(err);
        });
    }
});

mongoose.connection.collections['users'].drop( function(err) {
    console.log('Users collection dropped');
    for(var user of users) {
        var new_user = new User(user);
        new_user.save(function(err, user) {
            if (err)
                console.log(err);
        });
    }
});

mongoose.connection.collections['wallets'].drop( function(err) {
    console.log('Wallets collection dropped');
    for(var wallet of wallets) {
        var new_wallet = new Wallet(wallet);
        new_wallet.save(function(err, wallet) {
            if (err)
                console.log(err);
        });
    }
});