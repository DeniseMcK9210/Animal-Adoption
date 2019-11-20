// Store our data endpoint inside queryUrl
var queryUrl = "/aac_found"

// Perform a GET request to the query URL
d3.json(queryUrl, function(adoptionData) {
  
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(JSON.parse(adoptionData));
});

//Creates feature layer with API data input and completes map with map creator function
function createFeatures(adoptionData) {

  //Define a function to determine cicle color on earthquake magnitude
  function chooseColor(aac) {
    switch (true) {
    case aac == "Yes (come to the shelter)":
      return "#FF6e4e"
      break;
    default:
      return "#ffb500";
    }
  }

  var animalMarkers = []
  // Create a marker layer w/ pop up
  //loop through adoptionData to create a marker for each row
  for (var i = 0; i < adoptionData.length; i++) {
    if (adoptionData[i].Latitude !== null) {
      animalMarkers.push(
        L.circleMarker([adoptionData[i].Latitude, adoptionData[i].Longitude], {
          radius: 8,
          fillColor: chooseColor(adoptionData[i]['At AAC']),
          color: "#308ddf",
          fillOpacity: 0.7
        }).bindPopup("<p><strong> Age: </strong>" + adoptionData[i].Age + "</p><p><strong> Breed: </strong>"+ adoptionData[i]['Breed(unconfirmed)'] + 
        "</p><p><strong> Sex: </strong>"+ adoptionData[i].Found_Sex + " " + adoptionData[i].Gender_x + "</p><p><strong> Color: </strong>"+ adoptionData[i].Color_x + "</p>")
      );
    }
  }
  
  // Sending our earthquakes layer to the createMap function
  createMap(animalMarkers);
}

//Map creator and settings function 
function createMap(animalMarkers) {
  console.log(animalMarkers);

  // Define streetmap layer
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  //Marker for AAC
  var aacIcon = L.icon({
    iconUrl: 'http://www.austintexas.gov/sites/default/files/aac_logo.jpg',
    iconSize:     [87, 35], // size of the icon
    iconAnchor:   [43, 17], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
  var aac = L.marker([30.251395, -97.690429], {icon: aacIcon})
  // Create our map, giving it the streetmap and animals layers to display on load
  var myMap = L.map("found-map", {
    center: [30.2672, -97.7431],
    zoom: 11,
    layers: [streetmap, L.layerGroup(animalMarkers), aac]
  });

  //create Legend
  var legend = L.control({ position: "bottomleft" });

  legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>At AAC?</h4>";
    div.innerHTML += '<i style="background: #FF6e4e"></i><span>Yes (come to the shelter)</span><br>';
    div.innerHTML += '<i style="background: #ffb500"></i><span>No (contact for more info)</span><br>';
    
    return div;
  };
  legend.addTo(myMap);
}
