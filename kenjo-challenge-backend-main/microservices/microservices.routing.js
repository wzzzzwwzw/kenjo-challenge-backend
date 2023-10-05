const Router = require('express').Router;

const microservicesRouter = Router();


// Load and plug in album
const albumRouter = require('./album-db/album.routing');
microservicesRouter.use('/album', albumRouter);

// Load and plug in artist

const artistRouter = require('./artist-db/artist.routing');
microservicesRouter.use('/artist', artistRouter);
module.exports = microservicesRouter;