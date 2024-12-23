const mongoose = require('mongoose');

const COLLECTION_NAME = 'album-db';

const albumSchema = {
    /* title: { type: String, required: true, trim: true },
     artist: { type: String, required: true, trim: true },
     photoUrl: { type: String, trim: true },
     year: { type: Number, required: true },
     genre: { type: String, required: true },
     score: { type: Number } // Modify this field as you need
     // Add any  fields you need*/


    title: {type: String, required: true, trim: true},
    artistId: {type: mongoose.Schema.Types.ObjectId, ref: 'Artist'},
    coverUrl: {type: String, trim: true},
    year: {type: Number, required: true},
    genre: {type: String, required: true},
    score: {type: Number, required: true},


};

const albumDbModel = mongoose.model(COLLECTION_NAME, albumSchema);

// Creating unique index
const compoundIndex = {
    title: 1,
    artistId: 1,
};
albumDbModel.schema.index(compoundIndex, {unique: true});

module.exports = albumDbModel;
