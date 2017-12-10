var app = function(){
var btn = document.getElementById('get-weather');
btn.addEventListener('click', function(){
  var url = "https://www.metaweather.com/api/location/21125/";
  makeRequest(url, requestComplete);
  }.bind(this)
  );
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
  soundChoice(selected);

  var country = document.getElementById("country-name");
  country.innerText = forecast.parent.title;
  

  var mymap = L.map('main-map').setView([51.505, -0.09], 13);
  var location = forecast.latt_long;
  var lat = location.split(',')[0]
  var long = location.split(',')[1]
  console.log(lat);
  var coords = new L.LatLng(lat, long);
  console.log(coords);
  mymap.flyTo(coords, 13);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mymap);
  var marker = L.marker(coords).addTo(mymap);
  marker.bindPopup(`Today in ${forecast.title} the weather is: ${selected.weather_state_name.toLowerCase()}`).openPopup();
  var select = document.getElementById("city-input");
  select.addEventListener('change', function(){
    //clears out the container for reuse
    mymap.remove();
    handleButton();
  }.bind(this));
}

var soundChoice = function(forecast){
  var player = document.getElementById("soundcloud");
  var weather = forecast.weather_state_name;
  if(weather.match(/ain/) || (weather.match(/leet/)) || (weather.match(/how/))){
    player.src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/367093184&amp;color=%23dbc3c3&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&amp;visual=true";
  }
  else {
    player.src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/367094636&amp;color=%23dbc3c3&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&amp;visual=true";
  }
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
  else if(weather.match(/loud/)){
    image.src = "/cloud.jpg";
  }
  else if(weather.match(/[^h]ain/)){
       image.src = "/lightrain.jpg";
  }
  else {
    //default image
      image.src = "/tea.jpg";
  }
  //why doesn't this work?
  // switch(weather){
  // case (weather.match(/ind/):
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
  var title = "";
  var wordcloud = new WordCloud(wordcontainer, title, forecastString);
  }

var handleButton = function(){
  var choice = document.getElementById("city-input");
  console.log(choice);
  var citycode = choice.options[choice.selectedIndex].value;
  console.log(citycode);
  var url = "https://www.metaweather.com/api/location/" + citycode + "/";
  makeRequest(url, requestComplete);
}





window.addEventListener('load', app);
