var app = function(){

var container = document.getElementById('main-map');
var mymap = new OpenMap(container);
var url = "https://www.metaweather.com/api/location/44418/2013/4/27/";
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
  console.log(forecast);
};

var populateDisplay = function(forecast){
  var weather = document.getElementById("weather-today");
  weather.innerText = forecast[0].weather_state_name;
  var temp = document.getElementById("temp-today");
  temp.innerText = forecast[0].max_temp;
}


var populateWordCloud = function(forecast){
  var forecastString = [];
  forecast.forEach(function(result){
    forecastString.push(result.weather_state_name);
  });
  var wordcontainer = document.querySelector("#word-cloud");
  var title = "wordcloud";
  var wordcloud = new WordCloud(wordcontainer, title, forecastString);
  }




window.addEventListener('load', app);
