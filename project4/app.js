const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const path = require("path");

app.use("/js", express.static(path.resolve(__dirname, "public/js")));
app.use(express.static(path.resolve(__dirname, "public/assets")));
app.use(express.json()); // 응답데이터(문자열)을 JSON 데이터로 파싱해줌
app.use(express.urlencoded({ extended: true }));
app.use(cors()); //CORS 헤더를 알아서 사용해줌

const pagesRouter = require("./routers/pages/pages.router");
const apiRouter = require("./routers/api/api.router");

app.use("", pagesRouter);
app.use("/api", apiRouter);

const http = require("http").createServer(app);
const io = require("socket.io").listen(http);

io.on("connection", (socket) => {
  socket.interval = setInterval(() => {
    const jsonFile1 = fs.readFileSync("./realtime/realtime_1.json", "utf8");
    const jsonData1 = JSON.parse(jsonFile1);

    var traffic_light1 = jsonData1.traffic_light;

    const jsonFile2 = fs.readFileSync("./realtime/realtime_2.json", "utf8");
    const jsonData2 = JSON.parse(jsonFile2);

    var traffic_light2 = jsonData2.traffic_light;

    var data = [traffic_light1, traffic_light2];

    socket.emit("edge1", data);
    console.log(data);
  }, 5000);
});

module.exports = http;
