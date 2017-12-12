var app = function(){



var btn = document.getElementById('get-weather');

btn.addEventListener('click', function(){

  var user = document.getElementById('name').value;
  localStorage.setItem('userName', user);
  var preferred = document.getElementById("preferred-weather");
  var chosen = preferred.options[preferred.selectedIndex].value;
  localStorage.setItem('weather', chosen);
  var list = document.getElementById('question-list');
  list.style.display = "none";
  var url = "https://www.metaweather.com/api/location/21125/";
  makeRequest(url, requestComplete);
  }.bind(this)
  );
  window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
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
  var user = localStorage.getItem('userName');
  var preference = localStorage.getItem('weather');
  var greeting = document.getElementById('message');
  greeting.style.color = "#545456";
  greeting.style.lineHeight = '1.5em';
  var frame = document.getElementById('greet');
  frame.style.border = "3px solid black";
  frame.style.borderRadius = "2px";
  frame.style.padding = "10px";
  greeting.style.fontFamily = 'Archivo Black';
  greeting.innerText = `Hey, ${user}! \n So, you like ${preference.toLowerCase()} weather? Me too! \n \n Check out today's forecast... \n Then scroll down and explore weather around the world!`;
  var chat = document.getElementById("talking");
  chat.style.display = "inline-block";
  chat.src = "images/talking.jpg";
  var city = document.getElementById("city-name");
  var time = document.getElementById("time");
  var weather = document.getElementById("weather-today");
  var selected = forecast.consolidated_weather[0];
  var tempmax = document.getElementById("temp-max");
  var tempmin = document.getElementById("temp-min");

  city.innerText = forecast.title;
  var newtime = moment(forecast.time).format('MMMM Do YYYY, h:mm:ss a');

  time.innerText = newtime;
  weather.innerText = selected.weather_state_name;
  tempmax.innerText = `${selected.max_temp.toFixed(2)} \u2103 max`; tempmin.innerText = `${selected.min_temp.toFixed(2)} \u2103 min`;

  imageChoice(selected);
  soundChoice(selected);

  var label = document.getElementById('city-label');
  label.style.display = "inline-block";
  label.style.border = "5px solid #1D84B5";

  var country = document.getElementById("country-name");
  country.innerText = forecast.parent.title;
  var mapContainer = document.getElementById("main-map");
  mapContainer.style.border = "10px solid  #FED766";
  mapContainer.style.borderRadius = "8px";
  var mymap = L.map(mapContainer).setView([54.0730, 2.2898], 15);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mymap);
  var location = forecast.latt_long;
  var lat = location.split(',')[0]
  var long = location.split(',')[1]
  console.log(lat);
  var coords = new L.LatLng(lat, long);
  console.log(coords);
  //i want to use flyTo(coords)
  mymap.panTo(coords);
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
  if(weather.match(/ain/) || weather.match(/leet/) || weather.match(/how/) || weather.match(/ail/)){
    player.src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/367093184&amp;color=%231D84B5&amp;auto_play=false&amp;hide_related=true&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;show_teaser=false&amp;visual=false";
  }
  else if(weather.match(/hunder/) || weather.match(/torm/)){
    player.src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/367094444&amp;color=%231D84B5&amp;auto_play=false&amp;hide_related=true&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;show_teaser=false&amp;visual=false";
  }
  else if(weather.match(/ind/) || weather.match(/oud/)){
    player.src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/367657091&amp;color=%231D84B5&amp;auto_play=false&amp;hide_related=false&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;show_teaser=false&amp;visual=false";
  }
  else {
    player.src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/367094636&amp;color=%231D84B5&amp;auto_play=false&amp;hide_related=true&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;show_teaser=false&amp;visual=false";
  }
}


var imageChoice = function(forecast){
  var image = document.getElementById("image-weather-today");
  image.style.display = "block";
  var weather = forecast.weather_state_name;
  console.log(weather);
  if(weather.match(/[^h]ow/) || weather.match(/leet/) || weather.match(/ail/))
      {image.src = "images/snowing.jpg";}
  else if(weather.match(/ind/)){
      image.src = "images/windy.jpg";
  }
  else if(weather.match(/hund/)){
    image.src = "images/thunder.jpg";
  }
  else if(weather.match(/[^h]un/)){
      image.src = "images/sun.jpg";
  }
  else if(weather.match(/loud/)){
    image.src = "images/cloud.jpg";
  }
  else if(weather.match(/eavy[^c]/)){
      image.src = "images/heavyshower.jpg";
  }
  else if(weather.match(/[^h]ain/) || (weather.match(/how/))){
       image.src = "images/lightrain.jpg";
  }
  else {
    //default image
      image.src = "images/tea.jpg";
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
  var colorRange = [];
  if(forecast.consolidated_weather[0].weather_state_name.match(/[^h]un/)){
      colorRange = ['#FDB833', '#FED766', '#FE5F55'];
  } else {
    colorRange = ['#1D84B5', '#34F6F2', '#7D84B2'];
  }
  var wordcloud = new WordCloud(wordcontainer, title, forecastString, colorRange);
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
