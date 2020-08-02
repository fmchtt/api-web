'use strict'

const Mogoose = require('mongoose');
const Model = Mogoose.model('Product');

exports.get = (req, res, next) => {
    Model.find({}, '').then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send({ message: 'Erro ao cadastrar produto', data: err })
    });
}

exports.post = (req, res, next) => {
    var product = Model({
        title: req.body.title,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        slug: req.body.title.toLowerCase().replace(' ', '-')
    });
    product.save().then(x => {
        res.status(201).send("Produto Inserido!");
    }).catch(err => {
        res.status(400).send({message: 'Erro ao cadastrar produto', data: err})
    });
};

exports.getBySlug = (req, res, next) => {
    const slug = req.params.slug;
    Model.findOne({ slug: slug }, 'title price').then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send({ message: 'Erro ao cadastrar produto', data: err })
    });
};

exports.getByTag = (req, res, next) => {
    Model.find({ tags: req.params.tag }, 'title price tags').then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send({ message: 'Erro ao cadastrar produto', data: err })
    });
};

exports.put = (req, res, next) => {
    const id = req.params.id;
    Model.findByIdAndUpdate(id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        }
    }).then(data => {
        res.status(200).send('Produto Atualizado com Sucesso');
    }).catch(err => {
        res.status(400).send({ message: 'Erro ao cadastrar produto', data: err })
    });
};

exports.delete = (req, res, next) => {
    Model.findOneAndDelete({ _id: req.params.id }).then(x => {
        res.status(201).send("Produto Deletado!");
    }).catch(err => {
        res.status(400).send({ message: 'Erro ao cadastrar produto', data: err })
    });
};