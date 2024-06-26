const express = require('express');
const router = express.Router();
const { connect, client } = require('../utils/mongoConn');

(async () => {
    await connect();
})();

router.post('/shorten', async (req, res) => {
    try {
        const db = client.db();
        const collection = db.collection('urls');
        const { originalUrl, shortUrl } = req.body;
        await collection.insertOne({ originalUrl, shortUrl });
        res.status(201).send('URL shortened successfully');
    } catch (err) {
        console.error('Failed to shorten URL', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:shortUrl', async (req, res) => {
    try {
        const db = client.db();
        const collection = db.collection('urls');
        const { shortUrl } = req.params;
        const url = await collection.findOne({ shortUrl });
        if (url) {
            res.redirect(url.originalUrl);
        } else {
            res.status(404).send('URL not found');
        }
    } catch (err) {
        console.error('Failed to fetch URL', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

