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
  const link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson"

// Get the GeoJSON data
d3.json(link).then((data) => {
    // Verify the data is pulled by showing on the console  
    console.log(data);
    console.log(data['features'])
    for (let i = 1; i < data['features'].length; i++) {
        console.log(data.features[i])
        let lat = data['features'][i]['geometry']['coordinates'][1];
        let lng = data['features'][i]['geometry']['coordinates'][0];
        let depth = data['features'][i]['geometry']['coordinates'][2];
        let mag = data['features'][i]['properties']['mag']
        let magradius = 50000 * mag
        L.circle ([lat, lng], {
            weight: 0.25,
            color: "black",
            fillColor: "pink",
            fillOpacity: 0.50,
            radius: magradius
        }).addTo(myMap);
    };
});
