const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('news').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const newsId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('news').find({ _id: newsId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createNews = async (req, res) => {
  const news = {
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    country: req.body.country,
    user_id: req.body.userId,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt
  };
  const response = await mongodb.getDb().db().collection('news').insertOne(news);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the news.');
  }
};

const updateNews = async (req, res) => {
  const newsId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const news = {
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
    .collection('news')
    .replaceOne({ _id: newsId }, news);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the news.');
  }
};

const deleteNews = async (req, res) => {
  const newsId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('news').remove({ _id: newsId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the news.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createNews,
  updateNews,
  deleteNews
};
