/* socket\app.js */
const app = require("./app");
const PORT = 8080;
//const express = require("express");
//const app2 = express();
//const http = require("http").createServer(app2);

app.listen(PORT, () => {
  console.log(`Connected at ${PORT}`);
});

//occasion NA(정상), A(비정상)

// TODO: 1 pages
// TODO: 2 api
