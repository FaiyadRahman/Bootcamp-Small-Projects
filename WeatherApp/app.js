const express = require("express");
const https = require("https");

const app = express();

app.get("/", function (req, res) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=53.5462055&lon=-113.491241&appid=9c7970fea23c41b449d4854fb2479fc3&units=metric";
  https.get(url, function (response) {
    console.log(response);
  });
  res.send("Server is Running");
});

app.listen(3000, function () {
  console.log("Server is Running on port 3000");
});
