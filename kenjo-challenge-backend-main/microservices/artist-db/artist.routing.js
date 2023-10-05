const express = require('express');
const ArtistDbMicroservice = require('./artist.microservice');
const artistDbMicroservice = new ArtistDbMicroservice();

const artistDbRouter = express.Router();

artistDbRouter.use(express.json({limit: '50mb'}));

// CREATE
artistDbRouter.post('/create',
    (req, res, next) => {
       artistDbMicroservice.create(req, res, next);
    });

// READ
artistDbRouter.get('/all',
    (req, res, next) => {
        artistDbMicroservice.find(req, res, next);
    });

// UPDATE
artistDbRouter.put('/:id',
    (req, res, next) => {
        artistDbMicroservice.updateById(req, res, next);
    });

// UPDATE
artistDbRouter.delete('/:id',
    (req, res, next) => {
        artistDbMicroservice.deleteById(req, res, next);
    });

module.exports = artistDbRouter;