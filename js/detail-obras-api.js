const obras = await getObras();
const rutas = await getRutas();

function main() {
  const url = new URL(location.href);
  const query = url.searchParams.get("q");

  if (query) {
    const filterObras = obras.filter((obra) => {
      const ruta = rutas.find((r) => r.id_ruta === obra.ruta);

      return (
        obra.descripcion.toLowerCase().includes(query.toLowerCase()) ||
        ruta.nombre.toLowerCase().includes(query.toLowerCase())
      );
    });

    mostrarObras(filterObras);
  } else {
    mostrarObras(obras);
  }
}

const contCardEl = document.querySelector("#contenedor-cards");

main();

async function getObras() {
  const response = await fetch("http://127.0.0.1:5000/api/obras");
  const obras = await response.json();

  return obras;
}

async function getRutas() {
  const response = await fetch("http://127.0.0.1:5000/api/rutas");
  const rutas = await response.json();

  return rutas;
}

// Creacion de tarjeta
function createCard(obra) {
  const ruta = rutas.find((r) => r.id_ruta === obra.ruta);

  const artEl = document.createElement("article");
  artEl.classList = "obra-card";

  const divImgEl = document.createElement("div");
  divImgEl.classList = "ctn-img-card";

  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", obra.imagen);
  imgEl.setAttribute("alt", obra.descripcion);
  imgEl.classList = "img-obra-card";

  const divDescripcionEl = document.createElement("div");
  divDescripcionEl.classList = "description-card";

  const titleEl = document.createElement("h2");
  titleEl.classList = "title-card";
  titleEl.innerText = obra.descripcion;

  divImgEl.appendChild(imgEl);
  divDescripcionEl.appendChild(titleEl);

  // -------------------------------------------------------

  const prop = ["ubicación:", "Año de inauguración:"];

  const values = [ruta.nombre, obra.anio];

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
    open(obra.gmaps);
  });

  divDescripcionEl.appendChild(btnCardEl);

  artEl.appendChild(divImgEl);
  artEl.appendChild(divDescripcionEl);

  contCardEl.appendChild(artEl);
}

function mostrarObras(obras) {
  const arrObras = obras;
  console.log(arrObras);
  arrObras.forEach((obra) => {
    createCard(obra);
  });
}
