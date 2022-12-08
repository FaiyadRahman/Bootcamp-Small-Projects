require("dotenv").config();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const XMLHttpRequest = require("xhr2");
var apiKey = process.env.WEATHER_API_KEY;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log("Server is Running on port 3000");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var city = req.body.cityName;
  var cityUrlVersion = city.replace(/ /g, "%20");
  var geoUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityUrlVersion +
    "&appid=" +
    apiKey;
  console.log("send req to: " + geoUrl);

  GetHttpRequest(geoUrl).then((result) => {
    console.log(result);
    var latitude = result[0].lat;
    var longitude = result[0].lon;

    var units = "metric";
    var weatherUrl =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey +
      "&units=" +
      units;

    https.get(weatherUrl, function (response) {
      // console.log(weatherUrl);
      console.log(response.statusCode);
      response.on("data", function (weatherDataJson) {
        const weatherData = JSON.parse(weatherDataJson);

        var temperature = weatherData.main.temp;
        var description = weatherData.weather[0].description;
        var iconID = weatherData.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/" + iconID + "@2x.png";
        res.write(
          "<h1>The weather in " + city + " is " + temperature + "&degC</h1>"
        );
        res.write("<p>" + description + "</p>");
        res.write("<img src=" + iconUrl + ">");
        res.send();

        console.log(temperature);
        console.log(description);
      });
    });
  });
});

function GetHttpRequest(url) {
  // console.log("send req to: " + url);
  // var request = new XMLHttpRequest();
  // request.open("GET", url);
  // request.send();
  // var data = JSON.parse(request.responseText);
  // console.log(data);

  const promise = new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url);

    request.responseType = "json";

    request.onload = function () {
      // console.log(request.response);
      resolve(request.response);
    };

    request.send();
  });
  return promise;
}
