// Store our data endpoint inside queryUrl
var queryUrl = "/aac"

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data){
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data);
}).catch(error => console.log(error));


//Creates feature layer with API data input and completes map with map creator function
function createFeatures(adoptionData) {

  //Define a function to determine cicle color on earthquake magnitude
  function chooseColor(aac) {
    switch (true) {
    case aac == "Yes (come to the shelter)":
      return "#FFEDA0"
      break;
    default:
      return "#000";
    }
  }

  var animalMarkers = []
  // Create a marker layer w/ pop up
  //loop through adoptionData to create a marker for each row
  adoptionData.forEach(function(data){
    animalMarkers.push(
      L.circleMarker([data.Latitude, data.Longitude], {
        radius: 10,
        fillColor: chooseColor(data['At AAC']),
        color: "#fff",
        fillOpacity: 0.7
      }).bindPopup("<img src='" + data['Image Link'] + "'><h3>" + data['Intake Date']
      + "</h3><hr><p> Age:" + data.Age + "</p><p> Breed:"+ data['Breed(unconfirmed)'] + 
      "</p><p> Sex:"+ data.Found_Sex + data.Gender_x + "</p><p> Color:"+ data.color + "</p>")
    );
  })
  
  // Sending our earthquakes layer to the createMap function
  createMap(animalMarkers);
}

//Map creator and settings function 
function createMap(animals) {

  // Define streetmap layer
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  // Create our map, giving it the streetmap and animals layers to display on load
  var myMap = L.map("map", {
    center: [
      30.2672, 97.7431
    ],
    zoom: 10,
    layers: [streetmap, animals]
  });

  //create Legend
  var legend = L.control({ position: "bottomleft" });

  legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>At AAC?</h4>";
    div.innerHTML += '<i style="background: #FFEDA0"></i><span>Yes (come to the shelter)</span><br>';
    div.innerHTML += '<i style="background: #000"></i><span>No (contact for more info)</span><br>';
    
    return div;
  };
  legend.addTo(myMap);
}
