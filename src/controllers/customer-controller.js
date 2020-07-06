'use strict'
const auth = require('../services/auth-service')
const Mogoose = require('mongoose');
const Model = Mogoose.model('Customer');
const md5 = require('md5');

exports.get = (req, res, next) => {
    Model.find({}, 'name email').then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send({ message: 'Erro ao encontrar customer', data: err })
    });

}

exports.authenticate = (req, res, next) => {
    Model.findOne({ email: req.body.email, password: md5(req.body.password + global.SALT_KEY )}).then(data => {
        if (!data) {
            res.status(404).send({ message: 'Usuario ou senha inválido', data: err })
            return
        }

        auth.generateToken({_id: data._id, name: data.name, email: data.email}).then(token => {
            res.status(201).send({token: token})
        })

    }).catch(err => {
        res.status(400).send({ message: 'Erro ao encontrar customer', data: err })
    });
}

exports.post = (req, res, next) => {
    var customer = Model({
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password + global.SALT_KEY)
    });
    customer.save().then(x => {
        res.status(201).send("Customer Inserido!");
    }).catch(err => {
        res.status(400).send({ message: 'Erro ao cadastrar customer', data: err })
    });
};

exports.put = (req, res, next) => {
    const id = req.params.id;
    Model.findByIdAndUpdate(id, {
        $set: {
            name: req.body.name,
            email: req.body.email
        }
    }).then(data => {
        res.status(200).send('Produto Atualizado com Sucesso');
    }).catch(err => {
        res.status(400).send({ message: 'Erro ao atulaizar customer', data: err })
    });
};

exports.delete = (req, res, next) => {
    Model.findOneAndDelete({ _id: req.params.id }).then(x => {
        res.status(201).send("Customer Deletado!");
    }).catch(err => {
        res.status(400).send({ message: 'Erro ao deletar customer', data: err })
    });
}