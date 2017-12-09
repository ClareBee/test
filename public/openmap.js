var OpenMap = function(container){
  var mymap = L.map(container);
  mymap.locate({setView: true, maxZoom: 16});
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mymap);
  mymap.on('locationfound', function(e) {
    var radius = e.accuracy / 2;
    L.marker(e.latlng).addTo(mymap)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();
    L.circle(e.latlng, radius).addTo(mymap);
  });
}

OpenMap.prototype.addMarker = function(lat, lng, text){
  L.marker([lat, lng]).addTo(mymap)
    .bindPopup(text)
    .openPopup();
}
