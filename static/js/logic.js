// Creating our initial map object:
let myMap = L.map("map", {
    center: [30,31],
    zoom: 2
  });
  
  // Adding a tile layer (the background map image) to our map:
  // We use the addTo() method to add objects to our map.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
// Define the link for the GeoJSON data
  const link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// Get the GeoJSON data
d3.json(link).then((data) => {
    // Loop through the data to retrieve the marker data
    for (let i = 0; i < data['features'].length; i++) {
        // Pull the latitude and longitude for the earthquake location for marker locations
        let lat = data['features'][i]['geometry']['coordinates'][1];
        let lng = data['features'][i]['geometry']['coordinates'][0];
        // Pull the depth for the earthquake for the marker color
        let depth = data['features'][i]['geometry']['coordinates'][2];
        // Pull the magnitude of the earthquake for the marker size
        let mag = data['features'][i]['properties']['mag']
        let magradius = Math.pow(8, mag);
        // Pull the info data for the popup
        let info = data['features'][i]['properties']['title'];
        // Create the marker including the popup
        L.circle ([lat, lng], {
            weight: 0.25,
            color: "black",
            fillColor: color(depth),
            fillOpacity: 0.50,
            radius: magradius
        }).bindPopup(`<h3>${info}; Depth: ${depth}</h3>`).addTo(myMap);
    };
});

// Function to select a color for the marker based on the depth of the earthquake
function color(zcoord) {
    if (zcoord <= 20) {
        depthcolor = "#333ED4";
    } else if (zcoord <= 40) {
        depthcolor = "#2FA236"
    } else if (zcoord <= 60) {
        depthcolor = "#A0D636"
    } else if (zcoord <= 80) {
        depthcolor = "#EEDE04" 
    } else if (zcoord <= 100) {
        depthcolor = "#F76915"
    } else {
        depthcolor = "#FD0100"
    };
    return depthcolor;
};

// Create a legened for the map
let legend = L.control({
    position: "bottomright"
});
legend.onAdd = function () {
    let div = L.DomUtil.create('div', 'legend');
    earthquakeDepth = [0, 20, 40, 60, 80, 100];
    colors = ["#333ED4", "#2FA236", "#A0D636", "#EEDE04", "#F76915", "#FD0100"];
    for (let i = 0; i < earthquakeDepth.length; i++) {
            div.innerHTML +=
                "<i style='background: " + colors[i] + "'></i>" +
                earthquakeDepth[i] + (earthquakeDepth[i+1] ? "-" + earthquakeDepth[i+1] + "<br>": "+");
    }
    return div;
}
legend.addTo(myMap);