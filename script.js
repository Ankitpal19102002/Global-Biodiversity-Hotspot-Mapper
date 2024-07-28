var biodiversityHotspots = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [73.5, 8.0],
                    [74.0, 10.0],
                    [75.0, 12.0],
                    [76.0, 14.0],
                    [77.0, 16.0],
                    [78.0, 18.0],
                    [78.5, 20.0],
                    [78.0, 22.0],
                    [77.0, 24.0],
                    [76.0, 26.0],
                    [75.0, 24.0],
                    [74.0, 22.0],
                    [73.5, 20.0],
                    [73.0, 18.0],
                    [72.5, 16.0],
                    [72.0, 14.0],
                    [71.5, 12.0],
                    [71.0, 10.0],
                    [70.5, 8.0],
                    [73.5, 8.0]
                ]]
            },
            "properties": {
                "name": "Western Ghats",
                "description": "The Western Ghats, also known as Sahyadri, is a mountain range that runs parallel to the western coast of the Indian peninsula.",
                "image": "link_to_image.jpg"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [88.0, 26.0],
                    [89.0, 27.0],
                    [90.0, 28.0],
                    [91.0, 29.0],
                    [92.0, 30.0],
                    [93.0, 31.0],
                    [94.0, 30.0],
                    [95.0, 29.0],
                    [96.0, 28.0],
                    [97.0, 27.0],
                    [98.0, 26.0],
                    [99.0, 25.0],
                    [98.0, 24.0],
                    [97.0, 23.0],
                    [96.0, 22.0],
                    [95.0, 21.0],
                    [94.0, 20.0],
                    [93.0, 21.0],
                    [92.0, 22.0],
                    [91.0, 23.0],
                    [90.0, 24.0],
                    [89.0, 25.0],
                    [88.0, 26.0]
                ]]
            },
            "properties": {
                "name": "Eastern Himalayas"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [90.0, 10.0],
                    [91.0, 11.0],
                    [92.0, 12.0],
                    [93.0, 13.0],
                    [94.0, 14.0],
                    [95.0, 15.0],
                    [96.0, 16.0],
                    [97.0, 17.0],
                    [98.0, 18.0],
                    [99.0, 19.0],
                    [100.0, 20.0],
                    [101.0, 21.0],
                    [100.0, 20.0],
                    [99.0, 19.0],
                    [98.0, 18.0],
                    [97.0, 17.0],
                    [96.0, 16.0],
                    [95.0, 15.0],
                    [94.0, 14.0],
                    [93.0, 13.0],
                    [92.0, 12.0],
                    [91.0, 11.0],
                    [90.0, 10.0]
                ]]
            },
            "properties": {
                "name": "Western Ghats",
                "description": "The Western Ghats, also known as Sahyadri, is a mountain range that runs parallel to the western coast of the Indian peninsula.",
                "image": "link_to_image.jpg"
            }
        }
    ]
};

// Initialize the map
var map = L.map('map').setView([20, 77], 4); // Center the map on India

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add GeoJSON data to the map
L.geoJSON(biodiversityHotspots, {
    style: function (feature) {
        return {color: 'green'};
    },
    onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
            var popupContent = "<h3>" + feature.properties.name + "</h3>" +
                               "<p>" + feature.properties.description + "</p>" +
                               (feature.properties.image ? "<img src='" + feature.properties.image + "' alt='" + feature.properties.name + "' style='width:100%;'>" : "");
            layer.bindPopup(popupContent);
        }
    }
}).addTo(map);

// Function to focus on a specific hotspot
function focusOnHotspot(name) {
    biodiversityHotspots.features.forEach(function (feature) {
        if (feature.properties.name === name) {
            var coordinates = feature.geometry.coordinates[0];
            var latLngs = coordinates.map(function (coord) {
                return [coord[1], coord[0]];
            });
            var bounds = L.latLngBounds(latLngs);
            map.fitBounds(bounds);
        }
    });
}



// Base layers
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
});

var satellite = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '© OpenTopoMap contributors'
});

// Example data points for the heatmap
var heatData = [
    [28.7041, 77.1025, 0.8], // Delhi
    [19.0760, 72.8777, 0.7], // Mumbai
    [13.0827, 80.2707, 0.6], // Chennai
    [22.5726, 88.3639, 0.9], // Kolkata
    [12.9716, 77.5946, 0.5], // Bangalore
    [17.3850, 78.4867, 0.4], // Hyderabad
    [26.9124, 75.7873, 0.7], // Jaipur
    [25.3176, 82.9739, 0.6], // Varanasi
    [9.9312, 76.2673, 0.5], // Kochi
    [22.7196, 75.8577, 0.4], // Indore
    [21.1702, 72.8311, 0.3], // Surat
    [19.2183, 72.9781, 0.4], // Navi Mumbai
    [11.0168, 76.9558, 0.5], // Coimbatore
    [23.0225, 72.5714, 0.6], // Ahmedabad
    [30.7333, 76.7794, 0.7], // Chandigarh
    [18.5204, 73.8567, 0.8], // Pune
    [15.3173, 75.7139, 0.4], // Hubli
    [22.3072, 73.1812, 0.5], // Vadodara
    [16.5062, 80.6480, 0.6], // Vijayawada
    [24.5854, 73.7125, 0.5], // Udaipur
    [12.2958, 76.6394, 0.4], // Mysore
    [25.3960, 78.0798, 0.5], // Jhansi
    [22.8246, 86.2029, 0.3], // Jamshedpur
    [26.4499, 74.6399, 0.6], // Ajmer
    [26.9124, 75.7873, 0.6], // Pushkar
    [19.9975, 73.7898, 0.5], // Nashik
    [28.4089, 77.3178, 0.7], // Gurgaon
    [20.5937, 78.9629, 0.6], // Nagpur
    [23.3441, 85.3096, 0.5], // Ranchi
    [13.3611, 74.7924, 0.4]  // Mangalore
];

var heat = L.heatLayer(heatData, {
    radius: 25,
    blur: 15,
    maxZoom: 17
}).addTo(map);



// Overlay layers
var hotspotsLayer = L.geoJSON(biodiversityHotspots, {
    style: function (feature) {
        return {color: 'green'};
    },
    onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
            var popupContent = "<h3>" + feature.properties.name + "</h3>" +
                               "<p>" + feature.properties.description + "</p>" +
                               (feature.properties.image ? "<img src='" + feature.properties.image + "' alt='" + feature.properties.name + "' style='width:100%;'>" : "");
            layer.bindPopup(popupContent);
        }
    }
}).addTo(map);

var overlayMaps = {
    "Biodiversity Hotspots": hotspotsLayer
};

var baseMaps = {
    "OpenStreetMap": osm,
    "Satellite": satellite
};

L.control.layers(baseMaps, overlayMaps).addTo(map);



function searchHotspot() {
    var searchInput = document.getElementById('searchInput').value.toLowerCase();
    biodiversityHotspots.features.forEach(function (feature) {
        if (feature.properties.name.toLowerCase().includes(searchInput)) {
            var coordinates = feature.geometry.coordinates[0];
            var latLngs = coordinates.map(function (coord) {
                return [coord[1], coord[0]];
            });
            var bounds = L.latLngBounds(latLngs);
            map.fitBounds(bounds);
        }
    });
}
