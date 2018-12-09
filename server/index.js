const express = require("express");
const multer = require("multer");
const port = 4000;

const server = express();

server.listen(port, () => console.log(`Server started on port ${port}`));
