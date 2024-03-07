const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('households').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const householdId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('households').find({ _id: householdId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createHousehold = async (req, res) => {
  const household = {
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    country: req.body.country,
    user_id: req.body.userId,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt
  };
  const response = await mongodb.getDb().db().collection('households').insertOne(household);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the household.');
  }
};

const updateHousehold = async (req, res) => {
  const householdId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const household = {
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
    .collection('households')
    .replaceOne({ _id: householdId }, household);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the household.');
  }
};

const deleteHousehold = async (req, res) => {
  const householdId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('households').remove({ _id: householdId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the household.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createHousehold,
  updateHousehold,
  deleteHousehold
};
