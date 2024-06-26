const { MongoClient } = require('mongodb');
const uri = "mongodb://root:shorties@mongo:27017/urlshortener?authSource=admin";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

module.exports = { connect, client };

