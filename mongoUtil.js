const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const dbName = "pokeDB"
const collName = "pokemon"
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-kq00f.azure.mongodb.net/test?retryWrites=true&w=majority`;
let _db = ""

openConn = (callback) => {
    MongoClient.connect(uri, {
        useNewUrlParser: true
    }, function (err, client) {
        _db = client.db(dbName);
        return callback(err);
    });
}

const getDb = function () {
    return _db;
}

const findDocuments = (db) => {
    // Get the documents collection
    const collection = db.collection('pokemon');
    // Find some documents
    let cursor = collection.find({});
    cursor.forEach((err, doc) => {
        if (err) {
            console.error(err);
        } else {
            console.log(doc)
        }
    })
}

const insertDocuments = (db, doc) => {
    // Get the documents collection
    const collection = db.collection('pokemon');

    if (doc == null || doc.name == null) {
        console.error("Error: Insufficient details in entry")
        return;
    }

    collection.updateOne({
        name: doc.name
    }, {
        $set: doc
    }, {
        upsert: true
    }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            console.log(`Inserted ${doc.name} successfully`)
        }
    })
}

module.exports = {
    openConn,
    getDb,
    findDocuments,
    insertDocuments
}