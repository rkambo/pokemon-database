const MongoClient = require('mongodb').MongoClient;
const mongoUtil = require('./mongoUtil.js');

require('dotenv').config({path: '\.env'});

const dbName = process.env.DB_NAME;
console.log(process.env.DB_USERNAME);
const collName = process.env.DB_COLLECTION;
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-kq00f.azure.mongodb.net/test?retryWrites=true&w=majority`;
const db = '';

/**
 * 
 */
async function main() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */


  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);


