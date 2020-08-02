'use strict'
const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');
const authService = require('../services/auth-service');

router.get('/', authService.authorize, controller.get);

router.post('/', authService.authorize, controller.post);

router.delete('/del/:id', authService.authorize, controller.delete);


module.exports = router;