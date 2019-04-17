
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}




var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
  });

          // Create a <script> tag and set the USGS URL as the source.
          var script = document.createElement('script');
          // This example uses a local copy of the GeoJSON stored at
          // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
          script.src = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=35.228335699999995,-80.8350273&radius=1500&type=restaurant&key=AIzaSyCI9kOmD6qcO2ZqWFHed6KFmxZ8PT6CK8E';
          document.getElementsByTagName('head')[0].appendChild(script);

          window.restaurants = function(results) {
            for (var i = 0; i < results.length; i++) {
              var coords = results.results[i].geometry.location.lat +","+ results.results[i].geometry.location.lng;
              console.log(coords)
              var latLng = new google.maps.LatLng(coords);
              var marker = new google.maps.Marker({
                position: latLng,
                map: map
              });
            }
          }

  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log(pos)

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
  console.log(response.results);
});