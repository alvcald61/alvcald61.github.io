//gps-entity-place="latitude: <add-your-latitude>; longitude: <add-your-longitude>;"

let Latitude = -11.997557;
let Longitude = -77.075887;

var imagen = document.querySelector("a-entity");
var pokemon = document.querySelector("#pokemon");
var baguette = document.querySelector("#baguette");

navigator.geolocation.getCurrentPosition((point) => {
  Latitude = point.coords.latitude;
  Longitude = point.coords.longitude;

  pokemon.setAttribute(
    "gps-entity-place",
    `latitude: ${Latitude}; longitude: ${Longitude};`
  );

  baguette.setAttribute(
    "gps-entity-place",
    `latitude: ${Latitude}; longitude: ${Longitude};`
  );
});
