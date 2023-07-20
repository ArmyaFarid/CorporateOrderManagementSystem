const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
require('dotenv').config()
const url = process.env.MONGO_URI;
exports.mongoClient  = new MongoClient(url);

