
const mongoose = require('mongoose');

const COLLECTION_NAME = 'artist-db';

const artistSchema = {
    name:      {type: String, required: true, trim: true },
    photoUrl:   { type: String, required: true, trim: true },
    birthdate:  {type: String, required: false, trim: true },
    deathDate:  {type: String, required: false, trim: true }

};

const artistDbModel = mongoose.model(COLLECTION_NAME, artistSchema);

// Creating unique index
const compoundIndex = {
    title: 1,
    album: 1
};
artistDbModel.schema.index(compoundIndex, { unique: true });

module.exports = artistDbModel;
