const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {

    const location = req.body.cityName;
    const apiKey = "15520bfc4202d474cd9dca55790a2ccf";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + location + "&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on('data', function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            console.log(temp);
            const description = weatherData.weather[0].description;
            console.log(description);
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p> The weather condition is currently " + description + "</p>");
            res.write("<h1>The temperature in "+location+" is " + temp + " degree celcius</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    });
})


app.listen(3000, function () {
    console.log("Server is running on port 3000");
});