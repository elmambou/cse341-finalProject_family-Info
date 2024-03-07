const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('individuals').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const individualId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('individuals').find({ _id: individualId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createIndividual = async (req, res) => {
  const individual = {
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    country: req.body.country,
    user_id: req.body.userId,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt
  };
  const response = await mongodb.getDb().db().collection('individuals').insertOne(individual);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the individual.');
  }
};

const updateIndividual = async (req, res) => {
  const individualId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const individual = {
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    country: req.body.country,
    user_id: req.body.userId,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('individuals')
    .replaceOne({ _id: individualId }, individual);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the individual.');
  }
};

const deleteIndividual = async (req, res) => {
  const individualId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('individuals').remove({ _id: individualId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the individual.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createIndividual,
  updateIndividual,
  deleteIndividual
};
