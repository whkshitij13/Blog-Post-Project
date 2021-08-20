const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var posts = [];

app.get("/", function (req, res) {
    res.render("home", { posts: posts })

})


app.get("/about", function (req, res) {
    res.render("about")
})

app.get("/contact", function (req, res) {
    res.render("contact")
})
app.get("/compose", function (req, res) {
    res.render("compose")
})

app.post("/compose", function (req, res) {
    const post = {
        title: req.body.postTitle,
        content: req.body.postContent
    }
    posts.push(post);
    res.redirect("/");

})



app.get("/posts/:postName", function (req, res) {
    console.log(req.params.postName);


    var requestedTitle = _.lowerCase(req.params.postName);


    posts.forEach(function(post) {
        console.log(post.title);
        var storedTitle = _.lowerCase(post.title);
        if (storedTitle === requestedTitle) {
            console.log("match found");
            res.render("post", {
                title: post.title,
                content: post.content
            })
        }
        else {
            console.log(posts)
            console.log(requestedTitle);
            console.log("match not found");
        }
    })
})








app.listen(3000, function () {
    console.log('listening on port 3000');
});