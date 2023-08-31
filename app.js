const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
        
  
});

app.post("/",function(req,res){
    const city = req.body.cityName;
    const apiKey = "fdb92a9ce1a894c51f0abeeb4c01cd34";
    const unitType = "metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q=" + city + ",india&APPID="+ apiKey +"&units="+ unitType;
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data",function(data){const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        console.log(weatherDescription);

        res.write("<p>The weather will be " + weatherDescription + " today</p>");
        res.write("<h1>The Temparute in "+ city +" is " + temp + " degree Celsius.</h1>");
        res.write("<img src=" + imageURL +">");
        res.send();
    });
});
});




app.listen(3000,function(){console.log("Server started at 3000")});
