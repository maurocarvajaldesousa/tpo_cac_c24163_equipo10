const rutas = await getRutas();
poblarSelectorRutas();

async function getRutas() {
  const response = await fetch("http://127.0.0.1:5000/api/rutas");
  const rutas = await response.json();

  return rutas;
}

function poblarSelectorRutas() {
  const selectEl = document.querySelector("#rutas");
  rutas.forEach((r) => {
    const optionEl = document.createElement("option");
    optionEl.value = r.id_ruta;
    optionEl.textContent = r.nombre;

    selectEl.appendChild(optionEl);
  });
}

const categorias = await getCategorias();
poblarSelectorCategorias();

async function getCategorias() {
  const response = await fetch("http://127.0.0.1:5000/api/categorias");
  const categorias = await response.json();

  return categorias;
}

function poblarSelectorCategorias() {
  const selectEl = document.querySelector("#categoria");
  categorias.forEach((c) => {
    const optionEl = document.createElement("option");
    optionEl.value = c.id_categoria;
    optionEl.textContent = c.nombre;

    selectEl.appendChild(optionEl);
  });
}

const formEl = document.querySelector("#form-create-obra");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(formEl);

  const descripcion = data.get("descripcion");
  const anio = data.get("anio");
  const partido = data.get("partido");
  const localidad = data.get("localidad");
  const latitud = +data.get("latitud");
  const longitud = +data.get("longitud");
  const gmaps = data.get("gmaps");
  const imagen = data.get("imagen");
  const ruta = +data.get("ruta");
  const categoria = +data.get("categoria");
  const estado = +data.get("estado");

  const payload = {
    descripcion,
    ruta,
    categoria,
    estado,
    anio,
    partido,
    localidad,
    latitud,
    longitud,
    gmaps,
    imagen,
  };

  console.log(payload);

  fetch("http://127.0.0.1:5000/api/obras", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      Swal.fire({
        title: "Creaste una obra!",
        text: "You clicked the button!",
        icon: "success",
      });
      formEl.reset();
    })
    .catch((error) => {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal",
      });
    });
});
