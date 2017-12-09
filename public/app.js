var app = function(){

var url = "https://www.metaweather.com/api/location/44418/2013/4/27/";
var wordcontainer = document.querySelector("#word-cloud");
var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum erat ac justo sollicitudin, quis lacinia ligula fringilla. Pellentesque hendrerit, nisi vitae posuere condimentum, lectus urna accumsan libero, rutrum commodo mi lacus pretium erat. Phasellus pretium ultrices mi sed semper. Praesent ut tristique magna. Donec nisl tellus, sagittis ut tempus sit amet, consectetur eget erat. Sed ornare gravida lacinia. Curabitur iaculis metus purus, eget pretium est laoreet ut. Quisque tristique augue ac eros malesuada, vitae facilisis mauris sollicitudin. Mauris ac molestie nulla, vitae facilisis quam. Curabitur placerat ornare sem, in mattis purus posuere eget. Praesent non condimentum odio. Nunc aliquet, odio nec auctor congue, sapien justo dictum massa, nec fermentum massa sapien non tellus. Praesent luctus eros et nunc pretium hendrerit. In consequat et eros nec interdum. Ut neque dui, maximus id elit ac, consequat pretium tellus. Nullam vel accumsan lorem.';
var lines = text.split(/[,\. ]+/g);
var title = "wordcloud";
var wordcloud = new WordCloud(wordcontainer, title, lines);
var container = document.getElementById('main-map');
var mymap = L.map('main-map').setView([51.505, -0.09], 13);
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
  console.log(forecast);
};

var populateDisplay = function(forecast){
  var weather = document.getElementById("weather-today");
  weather.innerText = forecast[0].weather_state_name;
  var temp = document.getElementById("temp-today");
  temp.innerText = `${(forecast[0].max_temp - forecast[0].min_temp)/2}` ;
}
window.addEventListener('load', app);
