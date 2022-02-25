//gps-entity-place="latitude: <add-your-latitude>; longitude: <add-your-longitude>;"

let Latitude = 0;
let Longitude = 0;

var texto = document.querySelector("a-text");
var imagen = document.querySelector("a-entity");

var textoSelect = texto.querySelector("#texto");
var pokemon = texto.querySelector("#pokemon");

navigator.geolocation.getCurrentPosition((point) => {
  Latitude = point.coords.latitude;
  Longitude = point.coords.longitude;

  texto.setAttribute(
    "gps-entity-place",
    `latitude: ${Latitude}; longitude: ${Longitude}`
  );
  pokemon.setAttribute(
    "gps-entity-place",
    `latitude: ${Latitude}; longitude: ${Longitude}`
  );
});
