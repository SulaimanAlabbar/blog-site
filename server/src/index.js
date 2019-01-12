require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
// const multer = require("multer");
const { Pool } = require("pg");
const getBlogInfo = require("./api/getBlogInfo");
const addArticle = require("./api/addArticle");
const addComment = require("./api/addComment");
const login = require("./api/login");
const register = require("./api/register");
const getNumOfArticles = require("./api/getNumOfArticles");
const getArticles = require("./api/getArticles");
const getComments = require("./api/getComments");
const getArticle = require("./api/getArticle");

const port = process.env.PORT || 4000;
const dbPool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

dbPool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

const server = express();
server.use("/", express.static("public"));

// body parser now part of express
server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

server.get("/api/blogInfo", (req, res) => getBlogInfo(req, res, dbPool));
server.post("/api/login", (req, res) => login(req, res, dbPool));
server.post("/api/register", (req, res) => register(req, res, dbPool));
server.get("/api/logout", (req, res) => res.json(true));
server.post("/api/submitDraft", (req, res) => addArticle(req, res, dbPool));
server.post("/api/submitComment", (req, res) => addComment(req, res, dbPool));
server.get("/api/article/:id", (req, res) => getArticle(req, res, dbPool));
server.get("/api/articles/:from", (req, res) => getArticles(req, res, dbPool));
server.get("/api/comments/:articleId-:from", (req, res) =>
  getComments(req, res, dbPool)
);
server.get("/api/numOfArticles", (req, res) =>
  getNumOfArticles(req, res, dbPool)
);

server.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

server.listen(port, () => console.log(`Server started on port ${port}`));
