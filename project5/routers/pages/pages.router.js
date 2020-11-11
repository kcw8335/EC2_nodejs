const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/dashboard");
});

router.get("/dashboard", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public/views/index.html"));
});

// TODO: 모든 경로에 대해서 리다이렉트하도록..

// router.get("/a-log", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../../public/views/a-log.html"));
// });

// router.get("/na-log", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../../public/views/na-log.html"));
// });

module.exports = router;
