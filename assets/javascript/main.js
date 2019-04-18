



var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 35.228, lng: -80.835},
    zoom: 15
  });


    //  HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        // console.log(pos)
        // console.log(pos.lat)
        // console.log(pos.lng)

        // creates animated marker for users location
        var marker = new google.maps.Marker({
          position: pos,
          animation:google.maps.Animation.BOUNCE,
          icon:"./assets/images/Person.png"
        });
        // this makes the marker appear on the map
        marker.setMap(map);
        // infoWindow.setPosition(pos);
        // infoWindow.setContent('U R HERE');
        // infoWindow.open(map);
        map.setCenter(pos);

        // grabs data from places API request
        $.ajax({
          url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+ pos.lat +","+ pos.lng +"&radius=1500&type=restaurant&key=AIzaSyCI9kOmD6qcO2ZqWFHed6KFmxZ8PT6CK8E",
          method: "GET",
          type: "json",
        }).then(function(response) {
          // console.log(response.results)
          // loops through results from query and creaates a marker for each location
          for (var i = 0; i < response.results.length; i++) {
            var coords = response.results[i].geometry.location.lat;
            var coords2 = response.results[i].geometry.location.lng;
            var latLng = new google.maps.LatLng(coords,coords2);
            var marker = new google.maps.Marker({
              position: latLng,
              map: map,
              title: response.results[i].name
            });
            var contentString = "test";

            var infowindow = new google.maps.InfoWindow({
              content: contentString
            });
          
            var marker = new google.maps.Marker({
              position: latLng,
              map: map,
              title: response.results[i].name,
            });
            marker.addListener('click', function() {
              infowindow.open(map, marker);
            });

            // console.log(marker)
          }
        });
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
      
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }


          
          

  infoWindow = new google.maps.InfoWindow;


}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}


// $.ajax({
//   url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=35.228335699999995,-80.8350273&radius=1500&type=restaurant&key=AIzaSyCI9kOmD6qcO2ZqWFHed6KFmxZ8PT6CK8E",
//   method: "GET",
//   type: "json",
// }).then(function(response) {
//   // console.log(response.results);
// });

