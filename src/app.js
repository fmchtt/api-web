'use strict'
const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config')

mongoose.connect(config.connectionString);

const Product = require('./models/products');
const Order = require('./models/order');
const Customer = require('./models/customer');

const app = express();
const router = express.Router();

app.use(cors());
app.options('*', cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

const route = require('./routes/index');
const product = require('./routes/product-route');
const customer = require('./routes/customer-route');
const order = require('./routes/order-route');

app.use('/', route);
app.use('/products', product);
app.use('/customers', customer);
app.use('/orders', order);


module.exports = app;