'use strict'
const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false');

const app = express();
const router = express.Router();

app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

const route = require('./routes/index');
const product = require('./routes/product-route')

app.use('/', route);
app.use('/product', product);


module.exports = app;