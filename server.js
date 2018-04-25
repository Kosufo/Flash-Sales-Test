'use strict';

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),

    Product = require('./api/models/Product'),
    Wallet = require('./api/models/Wallet'),
    Purchase = require('./api/models/Purchase'),
    User = require('./api/models/User'),

    bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/flash_api'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/*app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});*/

const routes = require('./api/routes/routes');
routes(app);

app.listen(port);

console.log('RESTful API server started on: ' + port);

module.exports = app;