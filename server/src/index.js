const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const { Pool, Client } = require("pg");
const getBlogInfo = require("./api/getBlogInfo");
const addArticle = require("./api/addArticle");
const addComment = require("./api/addComment");
const login = require("./api/login");
const register = require("./api/register");
const getNumOfArticles = require("./api/getNumOfArticles");
const getArticles = require("./api/getArticles");
const getComments = require("./api/getComments");
const getArticle = require("./api/getArticle");
const dbConfig = require("./database/dbConfig.json");
let db = require("./database/dbPool");
const port = 4000;

db.pool = new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.database,
  password: dbConfig.password,
  port: dbConfig.port
});

db.pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

const server = express();
// server.use(express.static("public"));

server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

server.get("/api/blogInfo", getBlogInfo);
server.post("/api/login", login);
server.post("/api/register", register);
server.get("/api/logout", async (req, res) => res.json(true));
server.post("/api/submitDraft", addArticle);
server.post("/api/submitComment", addComment);
server.get("/api/article/:id", getArticle);
server.get("/api/articles/:from", getArticles);
server.get("/api/comments/:articleId-:from", getComments);
server.get("/api/numOfArticles", getNumOfArticles);

server.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

server.listen(port, () => console.log(`Server started on port ${port}`));
