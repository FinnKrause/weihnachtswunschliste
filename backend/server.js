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

app.listen(PORT, console.log("Listening on port " + PORT));
