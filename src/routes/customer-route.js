'use strict'
const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
const auth = require('../services/auth-service');

router.get('/', auth.authorize, auth.isAdmin, controller.get);

router.post('/', auth.authorize, auth.isAdmin, controller.post);

router.put('/:id', auth.authorize, auth.isAdmin, controller.put);

router.delete('/del/:id', auth.authorize, auth.isAdmin, controller.delete);

router.post('/auth', auth.authorize, auth.isAdmin, controller.authenticate);


module.exports = router;