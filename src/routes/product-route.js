'use strict'
const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const auth = require('../services/auth-service');

router.get('/', controller.get);

router.get('/:slug', controller.getBySlug);

router.get('/tags/:tag', controller.getByTag);

router.post('/', auth.authorize, auth.isAdmin, controller.post);

router.put('/:id', auth.authorize, auth.isAdmin, controller.put);

router.delete('/:id', auth.authorize, auth.isAdmin, controller.delete);


module.exports = router;