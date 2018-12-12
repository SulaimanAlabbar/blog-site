const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const port = 4000;
const getBlogInfo = require("./database/getBlogInfo");
const login = require("./database/login");

const server = express();

// server.use(express.static("public"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

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

server.get("/api/comments/:articleId/:from-:to", (req, res) => {
  res.json({
    articleId: req.params.articleId,
    from: req.params.from,
    to: req.params.to
  });
});

server.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

server.listen(port, () => console.log(`Server started on port ${port}`));
