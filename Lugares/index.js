const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: "fsq3sW2x5IA/Hm/VMr2Y2M1EEO7yZid89vXn82tGqbkCgFc=",
  },
};

function loadPlaces(position) {
  console.log(position);
  const params = {
    radius: 300, // in places not farther than this value (in meters)
    clientId: "XTSW0QLEGBWSWE4KADVGFUTAKIAP0QWXHVLF00RRHN45JZVI",
    clientSecret: "XCPX1CO2BVFQV0UYU0GDNCIYZ4VELP1IGSPRHM02IIRMYXGF",
    version: "20300101", // foursquare versioning, required but unuseful for this demo
  };

  // CORS Proxy to avoid CORS problems
  const corsProxy = "https://cors-anywhere.herokuapp.com/";

  // Foursquare API (limit param: number of maximum places to fetch)
  //${corsProxy}
  const endpoint = `https://api.foursquare.com/v3/places/nearby?
        &ll=${position.latitude},${position.longitude}`;

  return fetch(endpoint, options)
    .then((res) => {
      return res.json().then((resp) => {
        return resp.results;
      });
    })
    .catch((err) => {
      console.error("Error with places API", err);
    });
}

window.onload = () => {
  const scene = document.querySelector("a-scene");

  navigator.geolocation.watchPosition((position) => {
    console.log("cambio posision");
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    document.querySelectorAll("a-link").forEach((link) => {
      fetch(
        `https://api.foursquare.com/v3/places/${link.getAttribute(
          "geoid"
        )}?fields=geocodes%2Cname`,
        options
      )
        .then((response) => response.json())
        .then((res) => {
          link.setAttribute(
            "title",
            res.name +
              "\n" +
              `Distancia: ${getDistance(res.geocodes.main, position.coords)}`
          );
        });
    });
  });
  // first get current user location
  return navigator.geolocation.getCurrentPosition(
    function (position) {
      // than use it to load from remote APIs some places nearby
      loadPlaces(position.coords).then((places) => {
        places.forEach((place) => {
          const latitude = place.geocodes.main.latitude;
          const longitude = place.geocodes.main.longitude;

          // add place name
          const placeText = document.createElement("a-link");
          const placeImage = document.createElement("a-image");
          fetch(
            `https://api.foursquare.com/v3/places/${place.fsq_id}/photos`,
            options
          )
            .then((response) => response.json())
            .then((response) => {
              let src;
              if (response.length > 0) {
                src = response[0].prefix + "original" + response[0].suffix;
              } else {
                src = "not-found.webp";
              }

              placeImage.setAttribute("src", src);
            });
          placeText.setAttribute("class", "caja box");
          placeText.setAttribute("geoID", place.fsq_id);
          placeText.setAttribute(
            "gps-entity-place",
            `latitude: ${latitude}; longitude: ${longitude};`
          );
          placeText.setAttribute(
            "title",
            place.name + "\n" + `Distancia: ${place.distance}`
          );
          placeText.setAttribute("scale", "15 15 15");

          placeText.addEventListener("loaded", () => {
            window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"));
          });
          placeText.appendChild(placeImage);

          scene.appendChild(placeText);
        });
      });
    },
    (err) => console.error("Error in retrieving position", err),
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 27000,
    }
  );
};

function getDistance({ lat1, lon1 }, { lat2, lon2 }) {
  rad = function (x) {
    return (x * Math.PI) / 180;
  };

  var R = 6378.137; //Radio de la tierra en km
  var dLat = rad(lat2 - lat1);
  var dLong = rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d.toFixed(3); //Retorna tres decimales en KM
}
