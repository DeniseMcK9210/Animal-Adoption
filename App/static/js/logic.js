// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});


//Creates feature layer with API data input and completes map with map creator function
function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature for a pop up
  function onEachFeature(feature, layer) {
    layer.on({
      // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
      mouseover: function(event) {
        layer = event.target;
        layer.setStyle({
          fillOpacity: 1
        });
      },
      // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
      mouseout: function(event) {
        layer = event.target;
        layer.setStyle({
          fillOpacity: 0.7
        });
      }
    });

    layer.bindPopup("<img src='" + img_url + "'><h3>" + name +
      "</h3><hr><p> Age:" + age + "</p>" + "<p> Breed:"+ breed + "</p>"+"<p> Color:"+ color + "</p>"+"<p> Date Found:"+ found_date + "</p>");
  }

  //Define a function to determine cicle color on earthquake magnitude
  function chooseColor(magnitude) {
    switch (true) {
    case magnitude <= 3.9:
      return "#FFEDA0"
      break;
    case magnitude > 3.9 && magnitude <= 4.9:
      return "#FC4E2A"
      break;
    case magnitude > 4.9 && magnitude <= 5.9:
      return "#BD0026"
      break;
    case magnitude > 5.9 && magnitude <= 6.9:
      return "#7a0177"
      break;
    case magnitude > 6.9 && magnitude <= 7.9:
      return "#78184a"
      break;
    default:
      return "#000";
    }
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: feature.properties.mag ** 2 ,
        fillColor: chooseColor(feature.properties.mag),
        color: "#fff",
        fillOpacity: 0.7
      });
    },
    onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}


//Map creator and settings function 
function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      29.26, 0.24
    ],
    zoom: 2,
    layers: [streetmap, earthquakes]
  });

  var legend = L.control({ position: "bottomleft" });

  legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Magnitude</h4>";
    div.innerHTML += '<i style="background: #FFEDA0"></i><span>0-3.9</span><br>';
    div.innerHTML += '<i style="background: #FC4E2A"></i><span>4-4.9</span><br>';
    div.innerHTML += '<i style="background: #BD0026"></i><span>5-5.9</span><br>';
    div.innerHTML += '<i style="background: #78184a"></i><span>6-6.9</span><br>';
    div.innerHTML += '<i style="background: #4B0082"></i><span>7-7.9</span><br>';
    div.innerHTML += '<i style="background: #000"></i><span>8+</span><br>';
    
    return div;
  };
  legend.addTo(myMap);
}
