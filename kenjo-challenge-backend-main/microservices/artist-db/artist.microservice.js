const mongo = require('mongodb');
const ArtistModel = require('./artist.model');
const check = require('check-types');
const httpStatusCodes = require('http-status-codes').StatusCodes;

/**
 * @class AlbumDbMicroservice
 * @classdesc Artist Database Microservice
 */
class ArtistDbMicroservice {
    /***************************************************************
     ********************* STANDARD METHODS ************************
     ***************************************************************/

    /**
     * @summary Create new document
     * @description Create and insert a new document in a collection.
     * @param {express.Request} req is the request of the operation
     * @param {express.Response} res is the response of the operation
     * @param {express.Next} next is the middleware to continue with code execution
     * @returns {Array} with created document
     */
    create = async (req, res, next) => {
        if (check.not.assigned(req.body) || check.not.object(req.body) || check.emptyObject(req.body)) {
            const error = new Error('A non-empty JSON body is mandatory.');
            next(error);
            return;
        }

        try {
            const artist = new ArtistModel(req.body);
            const createdDocument = await artist.save();

            res.status(httpStatusCodes.OK).send(createdDocument);
        } catch (error) {
            next(error);
            return;
        }
    }

    /**
     * @summary Find documents from a collection
     * @description Get documents
     * @param {express.Request} req is the request of the operation
     * @param {express.Response} res is the response of the operation
     * @param {express.Next} next is the middleware to continue with code execution
     * @returns {Array} with all documents matching the conditions
     */
    find = async (req, res, next) => {
        try {
            const findResult = await ArtistModel.find({}).lean().exec();

            res.status(httpStatusCodes.OK).send(findResult);
        } catch (error) {
            next(error);
        }
    }


    /**
     * @summary Update a document
     * @description Update a document by id
     * @param {express.Request} req is the request of the operation
     * @param {express.Response} res is the response of the operation
     * @param {express.Next} next is the middleware to continue with code execution
     * @returns {Object} Empty object if the operation went well
     */
    updateById = async (req, res, next) => {
    }

    /**
     * @summary Delete a document
     * @description Delete a document by id
     * @param {express.Request} req is the request of the operation
     * @param {express.Response} res is the response of the operation
     * @param {express.Next} next is the middleware to continue with code execution
     * @returns {Object} Empty object if the operation went well
     */
    deleteById = async (req, res, next) => {

        let documentId = req.params.id;
        let deleteQuery = {_id: documentId};

        ArtistModel.deleteOne(deleteQuery).then(deleteResult => {
            if (check.not.assigned(deleteResult)) {
                let error = new Error('Document to delete was not found.');
                next(error);
                return;
            }

            res.status(httpStatusCodes.OK).send({});
        }).catch(error => {
            next(error);
        });
    }
}

module.exports = ArtistDbMicroservice;
