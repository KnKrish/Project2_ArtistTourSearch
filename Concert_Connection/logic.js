var myMap = L.map("map", {
  'center': [36.77, -119.41],
    'zoom': 4,
    'layers': [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            'attribution': 'Map data &copy; OpenStreetMap contributors'
        })
    ]
});
url = 'https://api.songkick.com/api/3.0/metro_areas/31422/calendar.json?apikey=WewWUhkws9IU4phb';


L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);
var streetmap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: API_KEY,
}).addTo(myMap)
var id;


d3.csv("ArtistList.csv").then(function (artist) {

  // (function() {
    
  //   // get references to select list and display text box
  //   var art = document.getElementById('scripts');
  // })

var art = "Ariana Grande"
//var art = "Lady Gaga"
  console.log(art)
  //"Ariana Grande"
  
  artist.forEach(function (data) {
          if (art === data.artist) {
      id = data.id;
    }

  })

  //var baseURL = "https://api.songkick.com/api/3.0/events.json?apikey=WewWUhkws9IU4phb&artist_id=4971683&min_date=2018-01-01&max_date=2020-12-30";

  var baseURL = `https://api.songkick.com/api/3.0/events.json?apikey=WewWUhkws9IU4phb&artist_id=${id}&min_date=2018-01-01&max_date=2020-12-30`;
  //   //var date = "&onTourUntil=2021-01-10";
  //var country = 
  // var complaint = "&complaint_type=Rodent";
  // var limit = "&$limit=10000";
  var url = baseURL;
  console.log(url)
  d3.json(url).then(function (data) {
    var events = data.resultsPage.results.event
    console.log(data)
    console.log(events[0].start.date)
    //if(data.start.date === '2021-01-10'){
    // var markers = L.markerClusterGroup();
    var markers = L.marker();
    for (var i = 0; i < events.length; i++) {
      console.log(events[i].displayName)

      // markers.addLayer(L.marker([events[i].location.lng, events[i].location.lat]))
      console.log([events[i].location.lng, events[i].location.lat])
      var ticket = `<a href=${events[i].uri}>Tickets</a>`
      L.marker([events[i].location.lat, events[i].location.lng]).bindPopup(`events name: ${events[i].displayName}, Location: ${events[i].location.city}, url for tickets: ` + ticket).addTo(myMap)
    }
    //myMap.addLayer(markers);
    // }
  });
});

// function comparison(date){
//   if parseInt(date[0:4]) < 2021 and parseInt(date[6:8] < 1 and  )
// }

