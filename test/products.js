process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const Product = require('../api/models/Product');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();

chai.use(chaiHttp);

const productId = "";

/**
 * Products
 * Before each test we empty the database.
 */
describe('Product', () => {
    beforeEach((done) => { 
        Product.remove({}, (err) => { 
           done();         
        });     
    });

    describe('/GET products', () => {
        it('it should GET all products', (done) => {
        chai.request(server)
            .get('/products')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
    });

    describe('/GET:id product', () => {
        it('it should GET all products', (done) => {
        chai.request(server)
            .get('/products/' + productId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
    });

    describe('/POST products', () => {
        it('it should POST new product', (done) => {
        let product = {
            name: "Santa Cruz - Test",
            brand: "Santa Cruz",
            model: "Test model",
            sku: "TEST-001",
            type: "TEST",
            price: "0.0",
            currency: "USD",
            status: "sale"
        }
        chai.request(server)
            .post('/products')
            .send(product)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                //res.body.should.have.property('errors');
                //res.body.errors.should.have.property('sku');
                //res.body.errors.pages.should.have.property('price').eql('required');
            done();
            });
        });
    });

    /*describe('/PUT product', () => {
        it('it should PUT existed product', (done) => {
        let product = {
            name: "Santa Cruz - Test Update",
            brand: "Santa Cruz",
            model: "Test model updated",
            sku: "TEST-001-UPDATE",
            type: "TEST-UPDATE",
            price: "0.0",
            currency: "USD",
            status: "sale"
        }
        chai.request(server)
            .put('/products')
            .send(product)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                //res.body.should.have.property('errors');
                //res.body.errors.should.have.property('sku');
                //res.body.errors.pages.should.have.property('price').eql('required');
            done();
            });
        });
    });*/
});