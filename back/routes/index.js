const express = require('express');
const router = express.Router();
const { connect, client } = require('../utils/mongoConn');

(async () => {
    await connect();
})();

router.get('/', async (req, res) => {
    try {
        const db = client.db();
        const collection = db.collection('urls');
        const urls = await collection.find().toArray();
        res.json(urls);
    } catch (err) {
        console.error('Failed to fetch URLs', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

