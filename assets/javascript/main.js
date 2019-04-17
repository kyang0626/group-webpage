



var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
  });

  $.ajax({
    url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=35.228335699999995,-80.8350273&radius=1500&type=restaurant&key=AIzaSyCI9kOmD6qcO2ZqWFHed6KFmxZ8PT6CK8E",
    method: "GET",
    type: "json",
  }).then(function(response) {
    // console.log(response.results)
    for (var i = 0; i < response.results.length; i++) {
      var coords = response.results[i].geometry.location.lat;
      var coords2 = response.results[i].geometry.location.lng;
      var latLng = new google.maps.LatLng(coords,coords2);
      var marker = new google.maps.Marker({
        position: latLng,
        map: map,
      });
      console.log(marker)
    }
  });
          
          

  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // console.log(pos)

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

$.ajax({
  url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=35.228335699999995,-80.8350273&radius=1500&type=restaurant&key=AIzaSyCI9kOmD6qcO2ZqWFHed6KFmxZ8PT6CK8E",
  method: "GET",
  type: "json",
}).then(function(response) {
  // console.log(response.results);
});

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
