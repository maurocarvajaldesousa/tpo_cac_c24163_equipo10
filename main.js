const contCardEl = document.querySelector("#contenedor-cards");
const divSurEl = document.querySelector("#sur");
const divOesteEl = document.querySelector("#oeste");
const divNorteEl = document.querySelector("#norte");
const divCentroEl = document.querySelector("#centro");

async function dataObras() {
  const response = await fetch("/data/data.json");
  const obras = await response.json();

  return obras;
}

// Creacion de tarjeta
function createCard(obra) {
  const artEl = document.createElement("article");
  artEl.classList = "obra-card";

  const divImgEl = document.createElement("div");
  divImgEl.classList = "ctn-img-card";

  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", obra.imagen);
  imgEl.setAttribute("alt", obra.nombre);
  imgEl.classList = "img-obra-card";

  const divDescripcionEl = document.createElement("div");
  divDescripcionEl.classList = "description-card";

  const titleEl = document.createElement("h2");
  titleEl.classList = "title-card";
  titleEl.innerText = obra.nombre;

  divImgEl.appendChild(imgEl);
  divDescripcionEl.appendChild(titleEl);

  // -------------------------------------------------------

  const prop = ["ubicación:", "Año de inauguración:"];

  const values = [obra.ubicacion, obra.date];

  const icons = ["fa-solid fa-location-dot", "fa-solid fa-calendar-days"];

  for (let i = 0; i < prop.length; i++) {
    const divGroupEl = document.createElement("div");
    divGroupEl.classList = "group-description";

    const pEl = document.createElement("p");
    pEl.classList = "prop-card";
    pEl.innerText = prop[i];

    const iconEl = document.createElement("i");
    iconEl.classList = icons[i];

    const pValueEl = document.createElement("p");
    pValueEl.classList = "prop-value";
    pValueEl.innerText = values[i];

    divGroupEl.appendChild(iconEl);
    divGroupEl.appendChild(pEl);
    divGroupEl.appendChild(pValueEl);
    divDescripcionEl.appendChild(divGroupEl);
  }

  const btnCardEl = document.createElement("button");
  btnCardEl.classList = "btn-card";
  btnCardEl.innerText = "Visitar";

  btnCardEl.addEventListener("click", () => {
    open(obra.coordenadas);
  });

  divDescripcionEl.appendChild(btnCardEl);

  artEl.appendChild(divImgEl);
  artEl.appendChild(divDescripcionEl);

  contCardEl.appendChild(artEl);
}

async function mostrarObras(obras) {
  const arrObras = await obras;
  console.log(arrObras);
  arrObras.forEach((obra) => {
    createCard(obra);
  });
}

mostrarObras(dataObras());

// filtros
// divSurEl.addEventListener("click", async () => {
//   const obras = await dataObras();
//   const obrasSur = obras.filter((obra) => {
//     obra.ubicacion === "sur";
//   });

//   console.log(obrasSur);

//   createCard(obrasSur);
// });
