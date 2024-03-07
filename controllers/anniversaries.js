const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('anniversaries').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const anniversary = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('anniversaries').find({ _id: anniversaryId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createAnniversary = async (req, res) => {
  const anniversary = {
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    country: req.body.country,
    user_id: req.body.userId,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt
  };
  const response = await mongodb.getDb().db().collection('anniversaries').insertOne(anniversary);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the anniversary.');
  }
};

const updateAnniversary = async (req, res) => {
  const anniversaryId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const anniversary = {
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
    .collection('anniversaries')
    .replaceOne({ _id: anniversaryId }, anniversary);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the anniversary.');
  }
};

const deleteAnniversary = async (req, res) => {
  const anniversary = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('anniversaries').remove({ _id: anniversaryId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the anniversary.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createAnniversary,
  updateAnniversary,
  deleteAnniversary
};
