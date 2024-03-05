const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('addresses').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const addressId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('addresses').find({ _id: addressId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createAddress = async (req, res) => {
  const address = {
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    country: req.body.country,
    user_id: req.body.userId,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt
  };
  const response = await mongodb.getDb().db().collection('addresses').insertOne(address);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the address.');
  }
};

const updateAddress = async (req, res) => {
  const addressId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const address = {
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
    .collection('addresses')
    .replaceOne({ _id: addressId }, address);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the address.');
  }
};

const deleteAddress = async (req, res) => {
  const addressId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('addresses').remove({ _id: addressId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the address.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createAddress,
  updateAddress,
  deleteAddress
};
