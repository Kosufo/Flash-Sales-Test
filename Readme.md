# Flash Sales
(test application)

## 0. Requirements

* Nmp version 6.0.0 (latest)
* Node version 9.10.1 (latest)
* Mongodb 3.6.X

Create custom folder and clone this repo in this folder. Right now application server address setted to `http://localhost:3000`. Make sure this port is not listening.

#### Important! The seeder is running with the server. You need to shutdown process (`^C`) before running tests.

## 1. Prepare your environment

#### 1.1 Run node to install modules from package.json:

```
npm i
```

#### 1.2 Run mongodb service and add database with next name:

```
flash_api
```

#### 1.3. Run seeder:

```
npm run seeder
```
This command create in `flash_api` three important tables:

```
products
users
wallets
```

The script will populate tables with data.

#### 1.4 API endpoints. 

After running seeder you can test API endpoints (for ex. with Postman):

#### Important! The seeder is running with the server. You need to shutdown process (`^C`) before running tests.

```
METHOD	ENDPOINT		        PARAMS		BODY		DESCRIPTION
__________________________________________________________________________________________________

/GET	/products						                Show all products from database.
/POST	/products				            {...}		Create new product.

/GET	/products/:productId	productId			    Get product by ID. 
								                        ID is [_id] field in table.
/PUT	/products/:productId	productId	{...}		Get or update existed product. 
								                        ID is [_id] field in table. 
								                        If not existed response will be null.
/DELETE	/products/:productId	productId			    Delete product by ID from database. 
								                        ID is [_id] field in table. 
								                        If not exist response will be null.

/POST				            productId	{...}		Create new purchase from user.
/products/:productId/purchase
/GET	/wallet/:userId		    userId				    Get current wallet by User ID. 
								                        User ID is [uuid] field in table.
/PUT	/wallet/:userId		    userId		{...}		Get or update existed wallet by User ID. 
								                        User ID is [uuid] field in table.
								                        If not exist response will be null.
/GET	/users/:userId		    userId				    Get user information by User ID.
								                        User ID is [uuid] field in table.

/GET	/sales/:userId/current	userId				    Get purchased product by User ID.
								                        User ID is [uuid] field in table.
```

## 2 Unit & Integration Tests.

This platform provide user to test only products API methods by this command:

```
test-products
```

You can edit file in `/test/products.js`

## 3 Stress tests

Stress test need to be configured with some input data. Without this data test will be failed.
Open `/test/purchase.js` file and find this section.

```
/**
 * Input data.
 */
const uuid = 384849301; //Your current user UUID from users table;
const productId = "5ae0a84bd8b68c31845ac1ac"; // Product ID as _id field from products table;
```

On this step don't run seeder. Your current products will be deleted and _id will be updated to newest.

After this step you can run stress test with next command:

```
test-purchase
```

#### 4. Consclusion
The stress test will send 7 requests to API 1000 times. The last request show the company total balance. You can change number of iterations in `/test/purchase.js` by next parameter:

```
const totalItems = 1000;
```

The test will be successfull if you don't loose any data after reseting data by seeder.

My output results are:

Total items (iterations): 1000
Calls to API: 7001
Total time: 1m