
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// database connection
const mongoURI = process.env.MONGOUI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// create schema
const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
});

// create model
const Post = mongoose.model('Post', blogSchema);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    // search for posts and render to home
    Post.find(function(err, posts) {
        if (err) {
            console.log(err);

        } else {
            res.render('home', {
                posts,
            });
        }
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

// render individual posts
app.get('/posts/:postId', (req, res) => {
    const requestedPostId = req.params.postId;
    Post.findOne({ _id: requestedPostId }, (err, post) => {
        res.render('post', {
            title: post.title,
            content: post.content,
        });
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

