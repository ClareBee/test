var app = function(){
var container = document.getElementById('main-map');
var mymap = new OpenMap(container, 51.505, -0.09);
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
  var select = document.getElementById("city-input");
  select.addEventListener('change', function(map){
    handleButton();
  });
  console.log(forecast);
};

var populateDisplay = function(forecast){
  var city = document.getElementById("city-name");
  var time = document.getElementById("time");
  var weather = document.getElementById("weather-today");
  var selected = forecast.consolidated_weather[0];
  var temp = document.getElementById("temp-today");

  city.innerText = forecast.title;
  time.innerText = forecast.time;
  weather.innerText = selected.weather_state_name;
  temp.innerText = `${selected.max_temp.toFixed(2)} \u2103 max, ${selected.min_temp.toFixed(2)} \u2103 min`;

  imageChoice(selected);

  var country = document.createElement('ul');
  country.innerText = forecast.parent.title;
  temp.appendChild(country);
//should update the map when another http request is run after a new location is selected
  var map = document.getElementById("main-map");
//says that this is not a function - the map is just the html element, so how do i change the view?
//if it try and new it up again, it says 'map container is already initialized'
//  map.movemap(forecast.latt_long);
}

var imageChoice = function(forecast){
  var image = document.getElementById("image-weather-today");
  var weather = forecast.weather_state_name;
  console.log(weather);
  if(weather.match(/ow/) || weather.match(/leet/))
      {image.src = "/snow.jpg";}
  else if(weather.match(/ind/)){
      image.src = "/windy.jpg";
  }
  else if(weather.match(/un/)){
      image.src = "/sun.jpg";
  }
  else if(weather.match(/eavy/)){
      image.src = "/heavyshower.jpg";
  }
  else if(weather.match(/[^h]ain/)){
       image.src = "/lightrain.jpg";
  }
  else {
    //default image
      image.src = "/tea.jpg";
  }
  // switch(weather){
  // case (weather.match(/ind/))
  //     image.src = "/windy.jpg";
  //     break;
  // case weather.match(/eavy/):
  //     image.src = "/heavyshower.jpg";
  //     break;
  // case weather.match(/[^h]ain/):
  //     image.src = "/lightrain.jpg";
  // case weather.match(/now/):
  //     image.src = "/snow.jpg";
  //     break;
  // case weather.match(/un/):
  //     image.src = "/sun.jpg";
  //     break;
  //   }
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

var handleButton = function(){
  var choice = document.getElementById("city-input");
  console.log(choice);
  var citycode = choice.options[choice.selectedIndex].id;
  console.log(citycode);
  var url = "https://www.metaweather.com/api/location/" + citycode + "/";
  makeRequest(url, requestComplete);
}





window.addEventListener('load', app);
