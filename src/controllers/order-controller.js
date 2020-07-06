'use strict'

const Mogoose = require('mongoose');
const Model = Mogoose.model('Order');
const guid = require('guid');
const auth = require('../services/auth-service')

exports.get = (req, res, next) => {
    Model.find({}).populate('customer', 'name').populate('items.product').then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send({ message: 'Erro ao encontrar a Order', data: err })
    });

}

exports.post = async (req, res, next) => {
    let data =  await auth.decodeToken(req.headers['x-access-token']);
    var order = Model({
        customer: data._id,
        number: guid.raw().substring(0, 6),
        items: req.body.items
    });
    order.save().then(x => {
        res.status(201).send("Order Inserida!");
    }).catch(err => {
        res.status(400).send({ message: 'Erro ao cadastrar a Order', data: err })
    });
};

exports.delete = (req, res, next) => {
    Model.findByIdAndDelete({ _id: req.params.id }).then(x => {
        res.status(201).send("Order Deletada!");
    }).catch(err => {
        res.status(400).send({ message: 'Erro ao deletar a Order', data: err })
    });
}