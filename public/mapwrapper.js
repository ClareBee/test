// var OpenMap = function(container, coords, zoom){
//   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//   }).addTo(mymap);
//
// }
// OpenMap.prototype.onLocationFound = function(event) {
//     var radius = event.accuracy / 2;
//
//     L.marker(event.latlng).addTo(map)
//         .bindPopup("You are within " + radius + " meters from this point").openPopup();
//
//     L.circle(event.latlng, radius).addTo(map);
// }
//
// mymap.on('locationfound', onLocationFound);
//
//
// OpenMap.prototype.addMarker = function(lat, lng, text){
//   L.marker([lat, lng]).addTo(mymap)
//     .bindPopup(text)
//     .openPopup();
// }



var MapWrapper = function(container, coords, zoom, title){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom,
    mapTypeId: 'street',
  });
  this.markers = [];
  // this.getLocation();
}

MapWrapper.prototype.addMarker = function(coords){
  var marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap,
  });
  this.markers.push(marker);
  return marker;
}

MapWrapper.prototype.addClickEvent = function(){
  google.maps.event.addListener(this.googleMap,'click', function(event){
    this.addMarker({lat: event.latLng.lat(), lng: event.latLng.lng()});
  }.bind(this));
}

MapWrapper.prototype.addInfo = function(marker, contentString){
  var infoWindow = new google.maps.InfoWindow({
    content: contentString
  });
  marker.addListener('click', function(){
       infoWindow.open(this.googleMap, marker);
  });
}

MapWrapper.prototype.moveMap = function(coords, contentString){
  this.googleMap.setCenter(coords);
  var newLocation = this.addMarker(coords);
  this.addInfo(newLocation, contentString)
}

MapWrapper.prototype.getLocation = function(){
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
    var coords = {lat: position.coords.latitude, lng: position.coords.longitude };
    this.googleMap.setCenter(coords);
    var presentLocation = this.addMarker(coords);
    this.addInfo(presentLocation, "I'm here!");
  }.bind(this));
    } else {
        console.log('error');
    }
}

MapWrapper.prototype.removeMarkers = function(){
  this.markers.forEach(function(marker){
    marker.setMap(null);
  });
}

MapWrapper.prototype.removeAMarker = function(){
  if(this.markers.length >= 1){
    var last = this.markers.pop();
    last.setMap(null);
  }else{
    console.log("nothing to remove");
  }
}
