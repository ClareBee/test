// var OpenMap = L.Class.extend({
//
//     initialize: function(container, lat, long) {
//         var map = L.map(container);
//         var coords = new L.LatLng(lat, long);
//         map.setView(coords, 13);
//         L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//             attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         }).addTo(map);
//     },
//
// });
// OpenMap.include({
//
//   geolocate: function(){
//     map.locate({setView: true, maxZoom: 16});
//       L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//           attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//       }).addTo(mymap);
//       map.on('locationfound', function(e) {
//         var radius = e.accuracy / 2;
//         L.marker(e.latlng).addTo(mymap)
//             .bindPopup("You are within " + radius + " metres from this point").openPopup();
//         L.circle(e.latlng, radius).addTo(mymap);
//   });
// },
//
//   movemap: function(coords){
//     var lat = coords.split('')[0]
//     var long = coords.split('')[1]
//     var coords = new L.LatLng(lat, long);
//     this.panTo(coords, 13);
//   }
// });

// var OpenMap = function(container){
//   var mymap = L.map(container);
//   mymap.locate({setView: true, maxZoom: 16});
//   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//   }).addTo(mymap);
//   mymap.on('locationfound', function(e) {
//     var radius = e.accuracy / 2;
//     L.marker(e.latlng).addTo(mymap)
//         .bindPopup("You are within " + radius + " metres from this point").openPopup();
//     L.circle(e.latlng, radius).addTo(mymap);
//   });
// }
