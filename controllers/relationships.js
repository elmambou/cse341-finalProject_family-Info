// controllers/relationships.js

const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const relationships = await mongodb.getDb().db().collection('relationships').aggregate([
            {
                $lookup: {
                    from: 'individuals', // The name of the collection you want to join
                    localField: 'individual1_id',
                    foreignField: '_id',
                    as: 'individual1'
                }
            },
            {
                $lookup: {
                    from: 'individuals',
                    localField: 'individual2_id',
                    foreignField: '_id',
                    as: 'individual2'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user'
                }
            }
            // Add more lookup stages if you want to join more collections
        ]).toArray();

        res.json(relationships);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getSingle = async (req, res) => {
  const relationshipId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('relationships').find({ _id: relationshipId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createRelationship = async (req, res) => {
  const relationship = {
    individual1_id: req.body.individual1_id,
    individual2_id: req.body.individual2_id,
    relationship_type: req.body.relationship_type,
    user_id: req.body.user_id,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt
  };
  const response = await mongodb.getDb().db().collection('relationships').insertOne(relationship);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the relationship.');
  }
};

const updateRelationship = async (req, res) => {
  const relationshipId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const relationship = {
    individual1_id: req.body.individual1_id,
    individual2_id: req.body.individual2_id,
    relationship_type: req.body.relationship_type,
    user_id: req.body.user_id,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('relationships')
    .replaceOne({ _id: relationshipId }, relationship);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the relationship.');
  }
};

const deleteRelationship = async (req, res) => {
  const relationshipId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('relationships').remove({ _id: relationshipId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the relationship.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createRelationship,
  updateRelationship,
  deleteRelationship
};
