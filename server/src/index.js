const express = require("express");
bodyParser = require("body-parser");
const multer = require("multer");
const port = 4000;
const getBlogInfo = require("./database/getBlogInfo");

const server = express();

// server.use(express.static("public"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get("/api/blogInfo", async (req, res) => {
  const blogInfo = await getBlogInfo();
  res.json(blogInfo);
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
