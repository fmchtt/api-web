'use strict'
const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');

router.get('/', controller.get);

router.post('/', controller.post);

router.put('/:id', controller.put);

router.delete('/del/:id', controller.delete);

router.post('/auth', controller.authenticate);


module.exports = router;