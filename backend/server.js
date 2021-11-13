const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

const PORT = 5000;

app.use(cors());

app.get("/getData", (req, res) => {
  console.log("Read request");
  const data = fs.readFileSync("./data.json", "utf-8");
  res.json(JSON.parse(data));
});

app.post("/setData/:person", (req, res) => {
  console.log(req.body);
  res.send("All good");
});

app.listen(PORT, console.log("Listening on port " + PORT));
