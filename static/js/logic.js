
function drawLines() {  //----------------------------------

	for (var  i= 0; i < data.length; i++) {

        var source = [data[i]["Takeoff Latitude"], data[i]["Takeoff Longitude"]];
        var destination = [data[i]["Target Latitude"], data[i]["Target Longitude"]];
        //console.log(source, destination);

        // lay down color-coded markers for origin of attack
        L.circleMarker(source, {
            radius: 4,
            stroke: false,
            color: "green",
            fillOpacity: 1
        }).bindPopup(data[i]["Country"] + "<br>" + data[i]["Takeoff Base"], {
                //offset: (0,0)
            })
            .addTo(myMap)
            .on('mouseover', function (e) {
                this.openPopup()
            .on('mouseout', function (e) {
                this.closePopup();
            });
        });
        
        // lay down gray markers for target
        L.circleMarker(destination, {
            radius: 10,
            stroke: false,
            color: "gray",
            fillOpacity: 0.3
        }).bindPopup(data[i]["Target City"] + "<br>" + data[i]["Target Country"])
            .addTo(myMap)
            .on('mouseover', function (e) {
                this.openPopup()
            .on('mouseout', function (e) {
                this.closePopup();
            });
        });

        // draw attack lines
	    L.polyline([source, destination], {
	    	snakingSpeed: 10,
    		color: colors(i),
    		weight: 1
    	}).addTo(myMap).snakeIn();
    };
} //--------------------------------------------------------

function colors(i) {

    if (data[i]["Country"] == "GREAT BRITAIN") {
        return "red"
    }   else if (data[i]["Country"] == "USA") {
        return "blue"
    }   else if (data[i]["Country"] == "NEW ZEALAND") {
        return "yellow"
    }   else if (data[i]["Country"] == "SOUTH AFRICA") {
        return "orange"    
    }   else {
        return "black"
    }

}

var data;
Papa.parse('static/data/WWIIops2.csv', {
    header: true,
    download: true,
    dynamicTyping: true,
    complete: function(results) {
        console.log(results);
        data = results.data;
        //console.log(data);


        drawLines(); // Call function

    }
});

    //create base layers
// var baseMaps = {
// 	"World Map": layer0
	//"WW II 1939": baseMap1939
// };

    //create overlays
//var overlayMaps = {
    //Overlay1: overlay1
    //Overlay2: overlay2,
    //Markers: groupedMarkers
// };

var myMap = L.map("map", {
    center: [30,90],
    zoom: 3,
    layers: layer0  // change to [baseMaps, overlayMaps] show default layer
    })
;

//     //add layer control
// L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//     }).addTo(myMap) // add layer control to the map
// ;







//create tile layers
var layer0 = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
});//.addTo(myMap);
myMap.addLayer(layer0);

var scale = L.control.scale(); // Creating scale control
         scale.addTo(myMap); // Adding scale control to the map


    // baseMap1939 = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    //    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    //   maxZoom: 18,
    //   id: "mapbox.light",
    //   accessToken: API_KEY
    // });




    //overlay1 = L.marker([0,0]).addTo(myMap);  //empty array to hold line data
    //overlay1 = L.layerGroup(groupedLines)//.snakeIn();


    // overlay2 = L.marker([10,10]).addTo(myMap);

    // var circle1 = L.circle([20, 20], {radius: 100000}).addTo(myMap);
    // circle1.bindPopup('<p>Hello world!<br />This is a test popup.</p>');
    // circle1.on('mouseover', function (e) {
    //     this.openPopup()
    // });
    // circle1.on('mouseout', function (e) {
    //     this.closePopup()
    // });

    



    //create a marker for each coordinate
    // var y = []; //create array to hold markers
    // markers = [];
    // for (i = 0; i < targetLoc.length; i++) {
    // 	y = L.circle([targetLoc[i][1], targetLoc[i][0]]), {
    // 		stroke: false,
    // 		fillOpacity: 1,
    // 		color: "green",
    // 		radius: 15
    // 	}
    // 	markers.push(y);	
    // };
    // console.log(markers);
    // var groupedMarkers = L.layerGroup(markers);


    // linesToLayer = L.polyline(linesGrouped, {
    // 	snakingSpeed: 300,
    // 	color: "red",
    // 	weight: 1
    //})//.addTo(overlay).snakeIn();








