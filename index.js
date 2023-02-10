const express = require('express');
const path = require('path');
const connectMongoDb = require('./connection.js');
const URL = require('./models/url');
const {restrictLoggedInUser,checkAuth } = require('./middleware/auth')


const urlRoute = require('./routes/url.js');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 8001;

connectMongoDb('mongodb://127.0.0.1:27017/url-shortener')
    .then(() => console.log("mongodb connected successfully"))
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.get('/test', async(req, res) => {
    const allUrls = await URL.find({});
    return res.render('home', {
        urls: allUrls,
    });
})

app.use('/url',restrictLoggedInUser, urlRoute);
app.use('/',checkAuth, staticRoute);
app.use('/user', userRoute);


app.get('/url/:shortId', async(req,res) => {
    const givenid = req.params.shortId;
    const filter = { shortId: givenid };
    const opts = { new: true };
    const result =await URL.findOneAndUpdate(
        filter, {
            $inc: { clicksCount: 1 },
            $push: {clicksHistory:{timestamp:Date.now()}}
    },opts);
    console.log(result);
    res.redirect(result.redirectUrl);
});

app.listen(PORT,()=>{console.log("Server started on PORT : " + PORT)});