var app = function(){

var url = "https://www.metaweather.com/api/location/21125/"
makeRequest(url, requestComplete);
};

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
}
