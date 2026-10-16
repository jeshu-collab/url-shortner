const express = require('express');
const urlRoute = require('./router/rouet');
const {mongooseConnect} = require('./connect');
const URL = require('./models/url');

const app = express();
const PORT = 8001;

app.use(express.json());
app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        {shortId: shortId},
        {
            $push: {
                visitsHistory: {
                    timestamp: Date.now()
                }
            }
        }
    );

    if (!entry) {
        return res.status(404).json({ error: 'Short URL not found' });
    }

    res.redirect(entry.redirectUrl);
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

mongooseConnect("mongodb://127.0.0.1:27017/url-shortener")
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message);
    });