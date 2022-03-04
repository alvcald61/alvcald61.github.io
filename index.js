//gps-entity-place="latitude: <add-your-latitude>; longitude: <add-your-longitude>;"

const imagen = document.querySelector("a-entity");
const image = document.querySelector("#image");
let modelIndex = 0;
let models = [
  {
    name: "magnamite",
    url: "./assets/magnemite/scene.gltf",
    rotation: "0 180 0",
    scale: "0.10 0.10 0.10",
    position: "1 10 -10",
  },
  {
    name: "dgsdf",
    url: "assets/uploads_files_2894278_Robot.glb",
    rotation: "0 180 0",
    scale: "0.10 0.10 0.10",
    position: "1 10 -10",
  },
  {
    name: "magnaghfghjmite",
    url: "assets/uploads_files_2100846_Alien-Animal_1_5_Baked(1).gltf",
    rotation: "0 180 0",
    scale: "0.10 0.10 0.10",
    position: "1 10 -10",
  },
  {
    name: "Baguette",
    url: "./assets/baguette/scene.gltf",
    rotation: "0 180 0",
    scale: "1 1 1",
    position: "1 2 -1",
  },
];

window.onload = () => {
  const button = document.querySelector('button[data-action="change"]');
  loadModel(models[modelIndex]);
  button.addEventListener("click", () => {
    modelIndex++;
    let newIndex = modelIndex % models.length;
    console.log(newIndex);
    loadModel(models[newIndex]);
  });
};

function loadModel(model) {
  document.getElementById("text").innerText = model.name;
  image.setAttribute("gltf-model", model.url);
  image.setAttribute("position", model.position);
  image.setAttribute("scale", model.scale);
  image.setAttribute("rotation", model.rotation);
  setLocation(image);
}

async function setLocation(component) {
  let Latitude = -11.997557;
  let Longitude = -77.075887;
  await navigator.geolocation.getCurrentPosition((point) => {
    Latitude = point.coords.latitude;
    Longitude = point.coords.longitude;
    component.setAttribute(
      "gps-entity-place",
      `latitude: ${Latitude}; longitude: ${Longitude};`
    );
  });
}
