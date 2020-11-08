const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/dashboard");
});

router.get("/dashboard", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public/views/index.html"));
});

router.get("/response-e1", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public/views/response-e1.html"));
});

router.get("/response-e2", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public/views/response-e2.html"));
});

router.get("/rule-e1", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public/views/rule-e1.html"));
});

router.get("/rule-e2", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public/views/rule-e2.html"));
});

router.get("/a-log", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public/views/a-log.html"));
});

router.get("/na-log", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public/views/na-log.html"));
});

module.exports = router;
