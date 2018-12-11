//The project made by Mapbox GL Api
//The subway station data is from Open Data New York 
//https://data.cityofnewyork.us/Transportation/Subway-Stations/arq3-7z49

//geojson name = array name --> play song  
//menu name = geojson name 

console.log("Tinsley Huo 12/05/2018");


//navigator 
let station_show = document.getElementsByClassName("train");
let i;
for (i = 0; i < station_show.length; i++) {
    station_show[i].addEventListener("click", function (e) {
        let station_item = this.nextElementSibling;
        if (station_item.style.display === "block") {
            station_item.style.display = "none";
        } else {
            $(station_item).fadeIn("slow");
        }
    });
}



//let year_show = document.getElementsByClassName("timeline")[0];
//let i;
//
//year_show.addEventListener("click", function (e) {
//    console.log(e.target);
//    let year_item = e.target.nextElementSibling;
//    console.log(year_item);
//    year_item.style.display = block;
//       console.log(year_item.style.display);
//    if (year_item.style.display === "block") {
//        year_item.style.display = "none";
//    } else {
//        year_item.style.display === "block";
//    }
//});

//songlist array  
const songlists = [{
        name: "Lexington Ave - 53rd St",
        url: "data/51.mp3",
}, {
        name: "Lexington Ave - 59th St",
        url: "data/59.mp3",
}, {
        name: "Canal St",
        url: "data/Canal.mp3",
}, {
        name: "Jay St - MetroTech",
        url: "data/Jay.mp3",
},

    {
        name: "57th St",
        url: "data/57.mp3",
}, {
        name: "14th St",
        url: "data/14.mp3",
}, {
        name: "Metropolitan Ave",
        url: "data/GrandCentral.mp3",
}, {
        name: "Hoyt - Schermerhorn Sts",
        url: "data/Hoyt.mp3",
},
    {
        name: "Times Sq - 42nd St",
        url: "data/TimesSquare.mp3",
}, {
        name: "Lower East Side - 2nd Ave",
        url: "data/2.mp3",
}, {
        name: "Bleecker St",
        url: "data/bleecker.mp3",
}, {
        name: "Bedford Ave",
        url: "data/Bedford.mp3",
},
    {
        name: "W 4th St - Washington Sq (Lower)",
        url: "data/West4.mp3",
}, {
        name: "Grand Central - 42nd St",
        url: "data/GC.mp3",
}, {
        name: "Union Sq - 14th St",
        url: "data/UnionSquare.mp3",
}, {
        name: "World Trade Center",
        url: "data/WTC.mp3",
},
    {
        name: "59th St - Columbus Circle",
        url: "data/ColumbusCircle.mp3",
}, {
        name: "34th St - Penn Station",
        url: "data/Lexington.mp3",
}, {
        name: "Broadway - Lafayette St",
        url: "data/BL.mp3",
}, {
        name: "Atlantic Av - Barclay's Center",
        url: "data/Atlantic.mp3",

},
  ];




//map - using mapbox api  
const maxBounds = [[-73.968, 40.733], [-73.868, 40.833]];

mapboxgl.accessToken = 'pk.eyJ1IjoidGluc2xleWZvayIsImEiOiJjam9rZzVibzMwNXVnM3FvNHZ5eHh4MWo4In0.iYRMgrgBQTlKgA9r9Pc4ng';
var map = new mapboxgl.Map({
    container: 'map',
    style: "mapbox://styles/tinsleyfok/cjp9fszua8h3i2ro7p1cx41p9",
    center: [-73.968, 40.733],
    zoom: 13,
    maxBounds: [
      [maxBounds[0][0] - 0.1, maxBounds[0][1] - 0.1],
      [maxBounds[1][0] + 0.1, maxBounds[1][1] + 0.1]
    ]
});

var data = {}


$.getJSON("js/station.geojson", function (json) {
    console.log(json);
    data = json;
    drawData();
})





function drawData() {
    map.on("load", function () {
        map.addLayer({
            id: "points",
            type: "circle",
            source: {
                type: "geojson",
                data: data
            },

            paint: {
                "circle-radius": [
                'match',
                ['get', 'line'],
                'Chinese', 15,
                'Classical', 15,
                'Jazz', 15,
                'Pop', 15,
                'Special', 15,
                /* other */
                    5
            ],


                'circle-color': [
                'match',
                ['get', 'line'],
                'Chinese', '#BC1D29',
                'Classical', '#08B250',
                'Jazz', '#D615E4',
                'Pop', '#FFD91D',
                'Special', '#6072D8',

                /* other */
                    '#FFA07A'
            ],
                'circle-opacity': [
                'match',
                ['get', 'line'],
                'Chinese', 0.8,
                'Classical', 0.8,
                'Jazz', 0.8,
                'Pop', 0.8,
                'Special', 0.8,
                /* other */
                    0.3
            ]
            }
        });
    });
}


//create pop-up information
var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

map.on('mouseenter', 'points', function (e) {
    map.getCanvas().style.cursor = 'pointer';
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.name;
    console.log(description);
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    popup.setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
});

map.on('mouseleave', 'points', function () {
    map.getCanvas().style.cursor = '';
    popup.remove();
});



//click to zoom in/center/play song
map.on('click', 'points', function (e) {
    map.flyTo({
        zoom: 15,
        center: e.features[0].geometry.coordinates
    });

    //click each feature to play song
    let stationname = e.features[0].properties.name;
    for (n = 0; n < songlists.length; n++) {
        console.log(stationname);
        let songlistname = songlists[n].name;
        console.log(songlistname);
        let audio = songlists[n].url;
        if (songlistname == stationname) {
            console.log(audio);
            playsong.src = audio;
            playsong.play();
            break;
        }

    }
    //to remove the pervious active
    let active = document.getElementsByClassName("active");
    console.log(active);
    [].forEach.call(active, function (e) {
        e.classList.remove("active");
    });

    //hide all navigator first
    let hide = document.getElementsByClassName("station");
    for (n = 0; n < hide.length; n++) {
        hide[n].style.display = "none";
        console.log(hide);
    }


    //connect to navigator
    let element_name = document.querySelectorAll('[data-name="' + stationname + '"]')[0];
    console.log(element_name);
    element_name.parentNode.style.display = "block";
    element_name.classList.add('active');

});



//Play song using the navigator 
let gt = document.getElementsByClassName("track");
let j;
let n;
let playsong = new Audio();


for (j = 0; j < songlists.length; j++) {
    gt[j].addEventListener("click", function (e) {
                e.target.classList.add('active');
                let trackname = e.target.getAttribute('data-name');
                console.log(trackname);
                for (n = 0; n < songlists.length; n++) {
                    let getarrayname = songlists[n].name;
                    console.log(getarrayname);
                    let audio = songlists[n].url;
                    if (trackname == getarrayname) {
                        console.log(audio);
                        playsong.src = audio;
                        playsong.play();
                         
                    }
                }

                let staionname = "";
                //  for (n = 0; n < data.features.length; n++) {
                stationname = data.features;
                console.log(stationname);
                console.log(trackname);
                for (n = 0; n < data.features.length; n++) {
                    if (stationname[n].properties.name == trackname) {
                        let location = stationname[n].geometry.coordinates;
                        map.flyTo({
                          zoom: 15,
                          center:location
                                                     });

                            }
                        }



                        //    console.log(stationname);
                        //        let element_name = document.querySelectorAll('["' + trackname + '""' + stationname + '"]')[0];
                        //        console.log(element_name);

                        //how to link back to geojson file?

                        //this is the json file elements:
                        //        console.log(data);

                        //this gets all name from json file:
                        //        for (n = 0; n < data.features.length; n++) {
                        //            let stationsname = data.features[n].properties.name;
                        //            }

                        //this is the station name I click from navigator:  
                        //        console.log(trackname); 

                        //I need to get "xxx.properties.name" = "trackname" 
                        //and use the "xxx.properties.name" to center the map
                        //let element_name = document.querySelectorAll('[data-name="' + stationname + '"]')[0];
                        //I don't think this works 

                        //the is the function I want to make after I get the same geolocation from json file   
                        //                                map.flyTo({
                        //                                    zoom: 15,
                        //                                    center: xxx.geometry.coordinates
                        //                                });

                    });
            }

            //still need to figure out why the navigator is not working 
            //still need to style the nagigator color when song play - I can do it by myself
