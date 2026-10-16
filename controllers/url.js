const {nanoid} = require('shortid');
const URL = require('../models/url');


async function generateShortUrl(req, res) {
    const shortId = nanoid(6);
    await URL.create({ shortId: shortId, 
                    redirectUrl: req.body.url,
                    visitsHistory: [] });
    return res.json({id: shortId});
}

module.exports = { generateShortUrl};