const express = require("express");
const app = express();
const fs = require("fs");

const cors = require("cors");
const PORT = 2445;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/getData", (req, res) => {
  console.log("Read request");
  const data = fs.readFileSync("./data.json", "utf-8");
  res.json(JSON.parse(data));
});

app.post("/setData/:person", (req, res) => {
  const tmpData = JSON.parse(fs.readFileSync("./data.json", "utf-8"));

  console.log(tmpData);
  tmpData[req.params.person] = req.body;

  fs.writeFileSync("./data.json", JSON.stringify(tmpData, null, 2));
  res.send("All good");
});

app.get("/demo/getData", (req, res) => {
  console.log("Read request for the Demo site!");
  const data = fs.readFileSync("./demo-data.json", "utf-8");
  res.json(JSON.parse(data));
});

app.post("/demo/setData/:person", (req, res) => {
  const rawReadData = fs.readFileSync("./demo-data.json", "utf-8");
  const tmpData = JSON.parse(rawReadData);

  if (rawReadData.length > 20000) {
    res.send("Too many Entries!");
    console.log("Too many Entries!");
    return;
  }

  tmpData[req.params.person] = req.body;
  console.log("Added new Entrie!");
  fs.writeFileSync("./demo-data.json", JSON.stringify(tmpData, null, 2));
  res.send("All good");
});

app.listen(PORT, console.log("Listening on port " + PORT));
