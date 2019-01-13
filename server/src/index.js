require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const morgan = require("morgan");
// const multer = require("multer");
const { Pool } = require("pg");
const passport = require("passport");
const getBlogInfo = require("./api/getBlogInfo");
const session = require("express-session");
const addArticle = require("./api/addArticle");
const addComment = require("./api/addComment");
const register = require("./api/register");
const getNumOfArticles = require("./api/getNumOfArticles");
const getArticles = require("./api/getArticles");
const getComments = require("./api/getComments");
const getArticle = require("./api/getArticle");
const auth = require("./auth");

const port = process.env.PORT || 4000;
const dbPool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

dbPool.on("error", err => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

auth(passport, dbPool);

const server = express();
server.use("/", express.static("public"));

// server.use(morgan("combined"));
// body parser now part of express
server.use(cookieParser());
server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

server.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false
  })
);
server.use(passport.initialize());
server.use(passport.session());

// passport.authenticate('local', { failureFlash: 'Invalid username or password.' });

server.get("/api/blogInfo", (req, res) => getBlogInfo(req, res, dbPool));
server.post("/api/register", (req, res) => register(req, res, dbPool));
server.post("/api/login", passport.authenticate("local"), (req, res) => {
  const { id, name, email, avatar, role } = req.user;
  res.json({ id, name, email, avatar, role });
});
server.post("/api/logout", (req, res) => {
  req.logout();
  res.json(true);
});
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

// server.use((req, res) => {
//   res.status(404).send({ url: req.originalUrl + " not found" });
// });

server.listen(port, () => console.log(`Server started on port ${port}`));
