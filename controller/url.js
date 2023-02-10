const URL = require('../models/url');
const shortid = require('shortid');

async function handleGenerateNewUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(404).json({ error: "Url is required" });
    const shortedurl = shortid();
    await URL.create({
        shortId: shortedurl,
        redirectUrl: body.url,
        clicksHistory: [],
        clicksCount: 1,
        createdBy : req.user._id,
    });

    return res.render("home", {
        id: shortedurl,
    });
    // return res.status(201).json({id:shortedurl});
}

module.exports = { handleGenerateNewUrl };