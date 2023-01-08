var express = require("express");
var app = express();
var server = require("http").createServer(app);
const fs = require("fs");

app.use("/css", express.static("css"));
app.use("/js", express.static("js"));
app.use("/images", express.static(`images`));
app.use("/saves", express.static("saves"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/save", (req, res) => {
  const { saveName, meshInfo } = req.body;
  const path = `${__dirname}/saves/${saveName}.json`;

  const modifiedData = JSON.stringify(meshInfo);

  console.log(saveName, modifiedData);

  fs.writeFile(path, modifiedData, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return err;
    }
  });

  console.log("JSON file has been saved.");

  res.send("JSON file has been saved.");
});

app.get("/files/:fileName", (req, res) => {
  const { fileName } = req.params;
  const path = `${__dirname}/saves/${fileName}`;

  const data = fs.readFileSync(path, "utf8");
  const parsedData = JSON.parse(data);

  res.send(parsedData);
});

app.get("*", function (req, res) {
  res.send("Stranka neexistuje");
});

server.listen(8000, function () {
  console.log("Listen on port 8000");
});
