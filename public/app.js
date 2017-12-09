var app = function(){

var container = document.getElementById('main-map');
var mymap = new OpenMap(container);
var url = "https://www.metaweather.com/api/location/44418/";
makeRequest(url, requestComplete);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
};

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var forecast = JSON.parse(jsonString);
  populateDisplay(forecast);
  populateWordCloud(forecast);
  var button = document.getElementById("city-btn");
  button.addEventListener('click', function(){
      handleButton(forecast, mymap);
}.bind(this));
  console.log(forecast);
};

var populateDisplay = function(forecast){
  var city = document.getElementById("city-name");
  var time = document.getElementById("time");
  var weather = document.getElementById("weather-today");
  var selected = forecast.consolidated_weather[0];
  city.innerText = forecast.title;
  time.innerText = forecast.time;
  weather.innerText = selected.weather_state_name;
  var temp = document.getElementById("temp-today");
  temp.innerText = `${selected.max_temp.toFixed(2)} \u2103 max, ${selected.min_temp.toFixed(2)} \u2103 min`;
  imageChoice(selected);
  var country = document.createElement('ul');
  country.innerText = forecast.parent.title;
  temp.appendChild(country);
}

var imageChoice = function(forecast){
  var image = document.getElementById("image-weather-today");
  if(forecast.weather_state_name.includes("windy")){
    image.src = url('windy.jpg');
  }
}

var populateWordCloud = function(forecast){
  var forecastString = [];
  forecast.consolidated_weather.forEach(function(result){
    forecastString.push(result.weather_state_name);
  });
  var wordcontainer = document.querySelector("#word-cloud");
  var title = "wordcloud";
  var wordcloud = new WordCloud(wordcontainer, title, forecastString);
  }

var handleButton = function(forecast, mymap){
  var choice = document.getElementById("city-input").value;
  var url = "https://www.metaweather.com/api/location/" + choice;
  makeRequest(url, requestComplete);
}





window.addEventListener('load', app);
