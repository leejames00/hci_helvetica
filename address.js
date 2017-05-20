var config = {
  apiKey: "AIzaSyAqbt-WXCdum0_Hfxh4tWSUOOYDHROswdE",
  databaseURL: "https://hevetica-e4d31.firebaseio.com/"
}

firebase.initializeApp(config);
var database = firebase.database();
var userRef = database.ref("user")

window.onload = function() { 


	userRef.orderByChild("user_id").equalTo("0").on("child_added", function(snapshot) {

		document.getElementById("user_name").innerHTML = snapshot.val().user_name
		
		document.getElementById("user_account").innerHTML = snapshot.val().user_email
		document.getElementById("user_phonenum").innerHTML = snapshot.val().user_phonenum
	})
};


function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: -34.397, lng: 150.644},
	  zoom: 6
	});
	var geocoder = new google.maps.Geocoder;
	var infoWindow = new google.maps.InfoWindow({map: map});

	// Try HTML5 geolocation.
	
	
	$("#get_location").on("click", "#current", function(event) {
	
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(position) {
		var pos = {
		  lat: position.coords.latitude,
		  lng: position.coords.longitude
		};
		console.log(pos)
		infoWindow.setPosition(pos);
		var input = position.coords.latitude + "," + position.coords.longitude
		//infoWindow.setContent('Current location')
		map.setCenter(pos);
		//map.setZoom(15);
		geocodeLatLng(geocoder, map, infoWindow, input);
	  }, function() {
		handleLocationError(true, infoWindow, map.getCenter());
	  });
	} else {
	  // Browser doesn't support Geolocation
	  handleLocationError(false, infoWindow, map.getCenter());
	}
	})
	
	/* document.getElementById('submit').addEventListener('click', function() {
          geocodeLatLng(geocoder, map, infoWindow);
        }); */
	
	
  }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
						  'Error: The Geolocation service failed.' :
						  'Error: Your browser doesn\'t support geolocation.');
  }
  
  
$("#get_location").on("click", "#new_address", function(event) {
		document.getElementById("addr1").value = "";
		document.getElementById("city").value = "";
		document.getElementById("state").value = "";
		document.getElementById("zip").value = "";
		document.getElementById("country").value = "";
		document.getElementById("country").focus();
})

 
function geocodeLatLng(geocoder, map, infowindow, input) {
	var latlngStr = input.split(',', 2);
	var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
	
	geocoder.geocode({'location': latlng}, function(results, status) {
	  if (status === 'OK') {
		if (results[0]) {
		  map.setZoom(15);
		  
		  var marker = new google.maps.Marker({
			position: latlng,
			map: map
		  });
		  infowindow.setContent(results[0].formatted_address);
		  var address = results[0].formatted_address.split(", ")
		  console.log(address)
		  
		  document.getElementById("country").value = address[0]
		  document.getElementById("city").value = address[1]
		  document.getElementById("state").value = address[2]
		  document.getElementById("zip").value = results[0].address_components[5].long_name
		  document.getElementById("addr1").value = address[3]
		  //document.getElementById("addr2").value = address[4]
				  
		  infowindow.open(map, marker);
		} else {
		  window.alert('No results found');
		}
	  } else {
		window.alert('Geocoder failed due to: ' + status);
	  }
	});
}

$("#submit_btn").on("click", "#buy_now", function(event) {
	alert("Address Info submitted!")
})	