'use strict'

exports.post = (req, res, next) => {
    res.status(201).send(rq.body);
};

exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({ id: id, item: req.body });
});

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
});