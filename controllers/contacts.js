const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    //swagger.tags=['Contacts']
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    //swagger.tags=['Contacts']
    const userId = (req.params.id);
    const contact = await mongodb.getDatabase().db().collection('contacts').findOne({ _id: new ObjectId(userId) });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact);
    };

    const createContact = async (req, res) => {
        //swagger.tags=['Contacts']
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
        if (response.acknowledged) {
            res.status(201).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the user.');
        }
    };
    
    const updateContact = async (req, res) => {
        //swagger.tags=['Contacts']
        const userId = new ObjectId(req.params.id);
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: userId }, contact);
        if (response.modifiedCount > 0) {
            res.status(201).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the user.');
        }
    };
    
    const deleteContact = async (req, res) => {
        //swagger.tags=['Contacts']
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: userId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json(response.error || 'Some error occurred while updating the user.');
        }
    };
    

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};