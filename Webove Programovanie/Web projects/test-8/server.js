var express = require("express");
var app = express();
var server = require("http").createServer(app);
const fs = require("fs");
const data = require("./js/data.json");

app.use("/css", express.static("css"));
app.use("/js", express.static("js"));
app.use("/images", express.static(`images`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/save", (req, res) => {
  const path = `${__dirname}/js/data.json`;
  const { nova_nazov: nazov, nova_cena: cena } = { ...req.body };
  const newItem = { id: data.length + 1, nazov, cena };
  data.push(newItem);

  const modifiedData = JSON.stringify(data);

  fs.writeFileSync(path, modifiedData, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return err;
    }
  });

  console.log("JSON file has been saved.");

  res.redirect("/");
});

app.get("/*", function (req, res) {
  res.send("Stranka neexistuje");
});

server.listen(8000, function () {
  console.log("Listen on port 8000");
});
