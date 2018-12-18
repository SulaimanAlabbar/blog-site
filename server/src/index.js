const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const validator = require("validator");
const fs = require("fs");
const port = 4000;
const getBlogInfo = require("./database/getBlogInfo");
const addArticle = require("./database/addArticle");
const login = require("./database/login");
const getNumOfArticles = require("./database/getNumOfArticles");
const getArticles = require("./database/getArticles");
const getArticle = require("./database/getArticle");

const server = express();

// server.use(express.static("public"));

server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

server.get("/api/blogInfo", async (req, res) => {
  const blogInfo = await getBlogInfo();
  res.json(blogInfo);
});

server.post("/api/login", async (req, res) => {
  //validate
  //hash passwords
  const loggedIn = await login(req.body);
  res.json(loggedIn);
});

server.get("/api/logout", async (req, res) => {
  console.log("LOGOUT");
  res.json(true);
});

server.post("/api/submitDraft", async (req, res) => {
  if (!validator.isJSON(JSON.stringify(req.body.draftContent))) {
    console.log("IS INVALID JSON");
    res.json(false);
  } else {
    const articleAdded = await addArticle({
      title: req.body.draftTitle,
      content: req.body.draftContent,
      authorId: req.body.userId
    });

    res.json(articleAdded);
  }
});

server.get("/api/article/:id", async (req, res) => {
  //verify that id is an integer
  const article = await getArticle(req.params.id);
  res.json(article);
});

server.get("/api/articles/:from", async (req, res) => {
  const articles = await getArticles(req.params.from);
  res.json(articles);
});

server.get("/api/comments/:articleId/:from-:to", (req, res) => {
  res.json({
    articleId: req.params.articleId,
    from: req.params.from,
    to: req.params.to
  });
});

server.get("/api/numOfArticles", async (req, res) => {
  const numOfArticles = await getNumOfArticles();
  res.json({
    numOfArticles
  });
});

server.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

server.listen(port, () => console.log(`Server started on port ${port}`));
