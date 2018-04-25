process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const Product = require('../api/models/Product');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();

chai.use(chaiHttp);

const totalItems = 1000;

/**
 * Input data.
 */
const uuid = 384849301;
const productId = "5ae0a84bd8b68c31845ac1ac";

/**
 * Purchase products to company wallet.
 * It is a stress test.
 */
describe('Starting a stress test', () => {
    for(var iter = 1; iter <= totalItems; iter++) {
    describe('/GET:id user', () => {
        it('it should GET user by ID', (done) => {

        chai.request(server)
            .get('/users/' + uuid)
            .end((err, user_res) => {           
                if(user_res.should.have.status(200) && user_res.body[0]) {
                    done();

                    let user = user_res.body[0];
                    describe('/GET:id product', () => {
                        it('it should GET product by ID', (done) => {
                            chai.request(server)
                                .get('/products/' + productId)
                                .end((err, product_res) => {

                                    if(product_res.should.have.status(200) && product_res.body) {
                                        done();

                                        let productData = product_res.body;

                                        describe('/GET:id wallet', () => {
                                            it('it should GET user wallet by ID', (done) => {
                                            let userWallet = null;
                                            
                                            chai.request(server)
                                                .get('/wallet/' + user.uuid)
                                                .end((err, wallet_res) => {           
                                                    if(wallet_res.should.have.status(200) && wallet_res.body[0]) {
                                                        done();

                                                        userWallet = wallet_res.body[0];
                                                        describe('/POST purchase', () => {
                                                            it('it should POST purchase', (done) => {
                                                                let purchase = {
                                                                    uuid: user.uuid,
                                                                }
                                                                chai.request(server)
                                                                    .post('/products/' + productId + '/purchase')
                                                                    .send(purchase)
                                                                    .end((err, purchase_res) => {
                                                                        if(purchase_res.should.have.status(200) && purchase_res.body) {
                                                                            done();
                                                                            
                                                                            describe('/PUT:id wallet', () => {
                                                                                it('it should PUT user wallet by ID', (done) => {

                                                                                    let purchasedProduct = purchase_res.body;
                                                                                    let newBalance = userWallet.balance - productData.price;
                                                                                    if(userWallet.balance && userWallet.balance > 0 && newBalance > 0) {
                                                                                        let userWallet = {
                                                                                            balance: newBalance
                                                                                        };
                                                                                        
                                                                                        chai.request(server)
                                                                                            .put('/wallet/' + user.uuid)
                                                                                            .send(userWallet)
                                                                                            .end((err, wallet_res_second) => {           
                                                                                                if(wallet_res_second.should.have.status(200) && wallet_res_second.body) {
                                                                                                    done();

                                                                                                    describe('/GET:id company wallet', () => {
                                                                                                        it('it should GET user wallet by ID = 1', (done) => {
                                                                                                            chai.request(server)
                                                                                                                .get('/wallet/' + 1)
                                                                                                                .end((err, company_wallet_res) => {    
    
                                                                                                                    if(company_wallet_res.should.have.status(200) && company_wallet_res.body) {
                                                                                                                        done();                                                                                                            

                                                                                                                        describe('/PUT:id company wallet', () => {
                                                                                                                            it('it should PUT user wallet by ID = 1', (done) => {
                                                                                                                                let newCompanyBalance = {
                                                                                                                                    balance: company_wallet_res.body[0].balance + newBalance
                                                                                                                                };
                                                                                                                                chai.request(server)
                                                                                                                                    .put('/wallet/' + 1)
                                                                                                                                    .send(newCompanyBalance)
                                                                                                                                    .end((err, company_wallet_res_second) => {
                                                                                                                                        
                                                                                                                                        console.log("Current company balance: " + company_wallet_res_second.body.balance);
                                                                                                                                        done();
                                                                                                                                    });
                                                                                                                                });
                                                                                                                            });
                                                                                                                    }
                                                                                                                });
                                                                                                            });
                                                                                                        });
                                                                                                }
                                                                                            });
                                                                                    } else {
                                                                                        console.warn('Insufficient funds for wallet ID ' + userWallet._id);
                                                                                        done();
                                                                                    }                                                            
                                                                                });
                                                                            });
                                                                        }                                            
                                                                    });
                                                                });
                                                        });
                                    
                                                    }
                                                });
                                            });
                                        });
                                    }
                                    
                                });
                        });
                    });
                }
            });
        });
    }); 
    }

    describe('/GET:id sales', () => {
        it('it should GET sales by user ID', (done) => {
            chai.request(server)
                .get('/sales/' + uuid + '/current')
                .end((err, sales_res) => {
                    console.log(sales_res);
                    done();
                });
            });
        });
});