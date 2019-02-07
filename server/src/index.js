const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const winston = require("winston");
require("winston-daily-rotate-file");
const fs = require("fs");
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { Pool } = require("pg");
const redis = require("redis");
const passport = require("passport");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const getBlogInfo = require("./api/getBlogInfo");
const getPinnedArticles = require("./api/getPinnedArticles");
const addArticle = require("./api/addArticle");
const addComment = require("./api/addComment");
const register = require("./api/register");
const getNumOfArticles = require("./api/getNumOfArticles");
const getArticles = require("./api/getArticles");
const getComments = require("./api/getComments");
const getArticle = require("./api/getArticle");
const auth = require("./auth");
const logDir = path.resolve(__dirname, "../logs");
const port = process.env.PORT || 4000;

const dbPool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

dbPool.on("error", err => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

const redisClient = redis.createClient();

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const infofile = new winston.transports.DailyRotateFile({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    winston.format.printf(info => `${info.timestamp} ${info.message}`)
  ),
  filename: `${logDir}/%DATE%-info.log`,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "100m",
  maxFiles: "14d"
});

const errorfile = new winston.transports.DailyRotateFile({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    winston.format.errors({ stack: true }),
    winston.format.printf(error => `${error.timestamp} ${error.message}`)
  ),
  filename: `${logDir}/%DATE%-error.log`,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "30d"
});

const logger = winston.createLogger({
  transports: [infofile, errorfile]
});

process.on("uncaughtException", error => {
  logger.log("error", error);
  process.exit(-1);
});

process.on("unhandledRejection", error => {
  logger.log("error", error);
  process.exit(-1);
});

auth(passport, dbPool);

const server = express();
server.use(helmet());
server.use(express.json({ limit: "50mb" }));
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(cookieParser());
server.use(
  session({
    secret: "seakrit",
    resave: true,
    saveUninitialized: false,
    store: new RedisStore({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_HOST,
      client: redisClient
    })
  })
);
server.use(passport.initialize());
server.use(passport.session());

if (process.env.NODE_ENV !== "production") {
  server.use(morgan("combined"));
}

function checkAuthentication (req, res, next) {
  if (req.isAuthenticated()) next();
  else res.status(401).send("Unauthorized");
}

server.get("/api/blogInfo", (req, res) => getBlogInfo(req, res, dbPool));
server.post("/api/register", (req, res) => register(req, res, dbPool));
server.post("/api/login", passport.authenticate("local"), (req, res) => {
  const { id, name, email, avatar, role } = req.user;
  res.json({ id, name, email, avatar, role });
});
server.get("/api/loggedIn", checkAuthentication, (req, res) => {
  const { id, name, email, avatar, role } = req.user;
  res.json({ id, name, email, avatar, role });
});
server.post("/api/logout", (req, res) => {
  req.logout();
  res.json(true);
});
server.post("/api/submitArticle", checkAuthentication, (req, res) =>
  addArticle(req, res, dbPool)
);
server.post("/api/submitComment", checkAuthentication, (req, res) =>
  addComment(req, res, dbPool)
);

server.get("/api/article/:id", (req, res) => getArticle(req, res, dbPool));
server.get("/api/articles/:from", (req, res) => getArticles(req, res, dbPool));
server.get("/api/comments/:articleId-:from", (req, res) =>
  getComments(req, res, dbPool)
);
server.get("/api/numOfArticles", (req, res) =>
  getNumOfArticles(req, res, dbPool)
);

server.get("/api/pinnedArticles", (req, res) =>
  getPinnedArticles(req, res, dbPool)
);

server.listen(port, () =>
  console.log(`Server running in ${server.get("env")} mode on port ${port}`)
);
