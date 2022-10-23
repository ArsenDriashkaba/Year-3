var http = require("http");
var fs = require("fs");

var usernames = [];

var server = http.createServer(function (request, response) {
  fs.readFile("index.html", function (err, data) {
    if (err) {
      response.writeHead(500);
      response.end("Error loading file index.html");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(data);
    }
  });
});
var io = require("socket.io")(server);
io.on("connection", function (socket) {
  socket.on("zmaz", function (data) {
    io.emit("zmaz", true);
  });

  socket.on("paint", (data) => {
    io.emit("paint", data);
  });

  socket.on("mousedown", (data) => {
    io.emit("mousedown", data);
  });

  socket.on("mouseup", (data) => {
    io.emit("mouseup", data);
  });

  socket.on("colorChange", (data) => {
    io.emit("colorChange", data);
  });

  socket.on("userConnection", (data) => {
    usernames.push(...data);

    data.forEach((name) => console.log(`${name} connected!`));

    io.emit("userConnection", usernames);
  });

  // tu treba doplniť kód
});

server.listen(3000);

console.log("Server (with Canvas) started. Listen on port 3000.");
