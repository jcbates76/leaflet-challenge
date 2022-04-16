# leaflet-challenge
Project utilizing leaflet

## Basic Visualization
This project pulls recent earthquake data from the USGS and creates a visualization of that data.  

The dataset utilized was the recent 30-day earthquake activity.  
Website = https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson  

### Markers
The latitude and longitude of the epicenter of the earthquake was used as the location of the marker.  
The marker size is based on the magnitude of the earthquake - with larger magnitudes having larger diameter markers.  
The marker color is based on the depth of the earthquake (the third coordinate provided).  
Popups (when a marker is clicked) will show the basic information of the earthquake including magnitude, location name, and depth.  

### Map
The map is initialized on the webpage.  
A legend is created based on the scale utilized to visualize the depth of the earthquake.  
