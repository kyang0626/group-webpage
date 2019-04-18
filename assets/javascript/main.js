



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
        console.log(position)
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
        infoWindow.setContent('U R HERE');
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
              position: response.results[i].geometry.location.lat + "," + response.results[i].geometry.location.lng,
              map: map,
              title: response.results[i].name,
            });
            marker.addListener('click', function() {
              infowindow.open(map, marker);
            });

            var tBody = $("tbody")
              var tRow = $("<tr>");

              var restName = $("<td>").text(response.results[i].name);
              var restAddress = $("<td>").text(response.results[i].vicinity);
              var restRating = $("<td>").text(response.results[i].rating);
              var restPrice = $("<td>").text(response.results[i].price_level);
              tRow.append(restName, restAddress, restRating, restPrice)
              tBody.append(tRow)

            console.log("name: "+ response.results[i].name + " address: "+ response.results[i].vicinity + " rating: "+ response.results[i].rating + " price: "+ response.results[i].price_level)
            // $("#location]-Info").text("name: "+ response.results[i].name + " address: "+ response.results[i].vicinity + " rating: "+ response.results[i].rating + " price: "+ response.results[i].price_level)
            // console.log(marker)

            // $("#location-Info").append("name: "+ response.results[i].name + "<br>"+" address: "+ response.results[i].vicinity + "<br>"+" rating: "+ response.results[i].rating + "<br>"+" price: "+ response.results[i].price_level+"<br>" + "--------------" + "<br>")
            // console.log("name: "+ response.results[i].name + "<br>"+" address: "+ response.results[i].vicinity + "<br>"+" rating: "+ response.results[i].rating + "<br>"+" price: "+ response.results[i].price_level+"<br>" + "--------------" + "<br>")
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
var tBody = $("tbody")
var tRow = $("<tr>");

var restName = $("<td>").text(response.results[i].name);
var restAddress = $("<td>").text(response.results[i].vicinity);
var restRating = $("<td>").text(response.results[i].rating);
var restPrice = $("<td>").text(response.results[i].price_level);

tBody.append(tRow)


// $.ajax({
//   url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=35.228335699999995,-80.8350273&radius=1500&type=restaurant&key=AIzaSyCI9kOmD6qcO2ZqWFHed6KFmxZ8PT6CK8E",
//   method: "GET",
//   type: "json",
// }).then(function(response) {
//   // console.log(response.results);
// });

