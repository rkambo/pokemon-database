const MongoClient = require("mongodb").MongoClient;
require("dotenv").config({ path: ".env" });

const dbName = process.env.DB_NAME;
const pokemonCollection = process.env.DB_POKEMON_COLLECTION;
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-kq00f.azure.mongodb.net/test?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { monitorCommands: true });

const getDb = function () {
  return client.db(dbName);
};

const getFirstDoc = async (db) => {
  const collection = db.collection(pokemonCollection);
  return collection.findOne({
    id: 1,
  });
};

const findDocuments = async (db, collName, query, limit) => {
  if (limit === undefined) {
    limit = 5;
  }
  //const results = [];
  // Get the documents collection
  const collection = db.collection(collName);
  // Find some documents
  return collection
    .find({
      name: { $regex: `^${query}` },
    })
    .limit(limit)
    .toArray();
};

const getTopEntry = async (db) => {
  const collection = db.collection(pokemonCollection);

  return collection.findOne({ id: 1 });
};
const insertDocuments = (db, doc) => {
  // Get the documents collection
  const collection = db.collection(pokemonCollection);

  if (doc == null || doc.name == null) {
    console.error("Error: Insufficient details in entry");
    return;
  }

  collection.updateOne(
    {
      name: doc.name,
    },
    {
      $set: doc,
    },
    {
      upsert: true,
    },
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Inserted ${doc.name} successfully`);
      }
    }
  );
};

module.exports = {
  getDb,
  findDocuments,
  insertDocuments,
  getFirstDoc,
  getTopEntry,
};
