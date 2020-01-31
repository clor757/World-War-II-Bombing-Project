//convert an array to CSV
// const arrayToCSV = (arr, delimiter = ',') =>
//     arr.map(v => v.map(x => `"${x}"`).join(delimiter)).join('\n');


var sourceLoc = [41.068178502813595, -99.5606025];
var targetLoc = [ [-106.503961875, 33.051502817366334],
  [-97.27544625, 34.29490081496779],
  [-92.793024375, 34.837711658059135],
  [-100.3076728125, 41.85852354782116],
  [-104.6143134375, 43.18636214435451],
  [-106.152399375, 45.57291634897],
  [-105.5811103125, 42.3800618087319],
  [-74.610651328125, 42.160561343227656],
  [-78.148248984375, 40.20112201100485],
  [-81.795709921875, 39.89836713516883],
  [-91.738336875, 42.1320516230261],
  [-93.902643515625, 39.89836713516886],
  [-146.68645699218752, 62.84587613514389],
  [-151.03704292968752, 62.3197734579205],
  [-150.50969917968752, 68.0575087745829],
  [-155.58278180000002, 19.896766200000002],
  [-155.41249371406252, 19.355435189875685],
  [-156.22204876777346, 20.77817385333129],
  [-156.08334637519533, 20.781383752662176],
  [-119.41793240000001, 36.77826099999999],
  [-111.73848904062501, 34.311442605956636],
  [-118.62691677500001, 39.80409417718468],
  [-115.56173122812501, 44.531552843807575],
  [-107.13521755625001, 43.90164233696157]
];
//-------------------------------------
function drawLines(source, destination, overlay) {

	for (var  i= 0; i < destination.length; i++) {
		L.polyline([source,  [destination[i][1], destination[i][0]]], {
			snakingSpeed: 300,
			color: "red",
			weight: 1
		}).addTo(overlay).snakeIn();
	};
} //--------------------------------

//create tile layers
baseMapPre = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
});

baseMap1939 = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
});

var myMap = L.map("map", {
	center: [40, -100],
	zoom: 3,
	layers: [baseMapPre]  // show default layer
});

//create base layers
var baseLayers = {
	"Pre WW II": baseMapPre,
	"WW II 1939": baseMap1939
};

var groupedLines = []
for (var  i= 0; i < targetLoc.length; i++) {
	x = L.polyline([sourceLoc,  [targetLoc[i][1], targetLoc[i][0]]]);
	groupedLines.push(x);
};

//overlay1 = L.marker([0,0]).addTo(myMap);  //empty array to hold line data
overlay1 = L.layerGroup(groupedLines)//.snakeIn();
overlay2 = L.marker([10,10]).addTo(myMap);

L.circle([20, 20], {radius: 200}).addTo(myMap);

//drawLines(sourceLoc, targetLoc, myMap);

var x = L.polyline([
    [[45.51, -122.68], [37.77, -122.43]],
    [[40.78, -73.91], [41.83, -87.62]]], {
			snakingSpeed: 1500,
			color: "red",
			weight: 1
	}).addTo(myMap).snakeIn()
;

//create a marker for each coordinate
var y = []; //create array to hold markers
markers = [];
for (i = 0; i < targetLoc.length; i++) {
	y = L.circle([targetLoc[i][1], targetLoc[i][0]]), {
		stroke: false,
		fillOpacity: 1,
		color: "green",
		radius: 15
	}
	markers.push(y);	
};
console.log(markers);
var groupedMarkers = L.layerGroup(markers);


// linesToLayer = L.polyline(linesGrouped, {
// 	snakingSpeed: 300,
// 	color: "red",
// 	weight: 1
//})//.addTo(overlay).snakeIn();

//create overlays
var overlayMaps = {
	Overlay1: overlay1,
	Overlay2: overlay2,
	Markers: groupedMarkers
};



//add layer control
L.control.layers(baseLayers, overlayMaps, {
	collapsed: false
	}).addTo(myMap) // add layer control to the map
;


