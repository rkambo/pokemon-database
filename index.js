const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const dbName = "pokeDB"
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-kq00f.azure.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true
});

client.connect(err => {
    if (err) throw err;
    else {
        console.log("Mongo Client Connected")

        const db = client.db(dbName);
        console.log("DB Created")

        const collection = db.collection('pokemon');
        console.log("Setting Pokemon Collection");
        console.log("Setting constraints...");
        collection.createIndex({
            "name": 1
        }, {
            unique: true
        })
        let load = {
            name: "Bulbasaur",
            image: "imageURL",
            primaryType: "Grass",
            secondaryType: null,
            natDexNum: 1,
            regDexNum: 1,
            gen: 1
        }

        insertDocuments(collection, load)
    }

    // perform actions on the collection object
    client.close();
});

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

const insertDocuments = (collection, doc) => {
    // Get the documents collection
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