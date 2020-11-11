const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql");

require("dotenv").config();

app.use("/js", express.static(path.resolve(__dirname, "public/js")));
app.use(express.static(path.resolve(__dirname, "public/assets")));
app.use(express.json()); // 응답데이터(문자열)을 JSON 데이터로 파싱해줌
app.use(express.urlencoded({ extended: true }));
app.use(cors()); //CORS 헤더를 알아서 사용해줌

const pagesRouter = require("./routers/pages/pages.router");
const apiRouter = require("./routers/api/api.router");

app.use("", pagesRouter);
app.use("/api", apiRouter);

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});

connection.connect(function (err) {
  if (err) console.error("connect error: " + err);
});

connection.query("select * from log", (error, rows) => {
  if (error) console.log(error);
  console.log("dbconnect:", rows);
});

const http = require("http").createServer(app);
const io = require("socket.io").listen(http);

let temp = ["", ""];
let data = ["", ""];
let traffic_light1 = "";
let traffic_light2 = "";

io.on("connection", (socket) => {
  fileload();
  console.log(data);
  socket.interval = setInterval(() => {
    if (temp[0] != data[0] || temp[1] != data[1]) {
      socket.emit("edge1", data);

      temp = data;

      console.log("if 안", temp[0]);
    } else {
      console.log("파일변경 없음");
      fileload();
    }

    // socket.emit("edge2", traffic_light2);
  }, 3000);
});

function fileload() {
  const jsonFile1 = fs.readFileSync("./realtime/realtime_1.json", "utf8");
  const jsonData1 = JSON.parse(jsonFile1);

  traffic_light1 = jsonData1.traffic_light;
  // socket.emit("edge1", traffic_light1);

  const jsonFile2 = fs.readFileSync("./realtime/realtime_2.json", "utf8");
  const jsonData2 = JSON.parse(jsonFile2);

  traffic_light2 = jsonData2.traffic_light;

  data = [traffic_light1, traffic_light2];
}

module.exports = http;
// module.exports = app;
