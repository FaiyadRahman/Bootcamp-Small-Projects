const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
  .get((req, res) => {
    Article.find((err, foundArticles) => {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })

  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save((err) => {
      if (!err) {
        res.send("Successfully added new article");
      } else {
        res.send(err);
      }
    });
  })
  
  .delete((req, res) => {
    Article.deleteMany((err) => {
      if (!err) {
        res.send("Successfully deleted all articles");
      } else {
        res.send(err);
      }
    });
  });

app.route("/articles/:articleTitle")
  .get((req, res) => {
    const articleTitle = req.params.articleTitle;
    Article.findOne({title: articleTitle}, (err, foundArticle) => {
      if (!err){
        res.send(foundArticle);
      } else {
        res.send(err);
      }
    })
  })
  
  .put((req, res) => {
    const articleTitle = req.params.articleTitle;
    Article.findOneAndUpdate({title: articleTitle}, {title: req.body.title, content: req.body.content}, {overwrite:true}, (err) => {
      if (!err){
        res.send("updated successfully");
      } else {
        res.send(err);
      }
    })
  })

  .patch((req, res) => {
    const articleTitle = req.params.articleTitle;
    Article.findOneAndUpdate({title: articleTitle}, {$set: req.body}, (err) => {
      if (!err){
        res.send("updated successfully");
      } else {
        res.send(err);
      }
    });
  })

  .delete((req, res) => {
    const articleTitle = req.params.articleTitle;
    Article.findOneAndDelete({title: articleTitle}, (err) => {
      if (!err){
        res.send("deleted successfully");
      } else {
        res.send(err);
      }
    });
  })
  ;



app.listen(3000, () => {
  console.log("running on port 3000");
});
