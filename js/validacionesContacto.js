document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form-contacto');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (validateForm()) {
      alert('Formulario enviado correctamente.');
      // Código para enviar el formulario
    }
  });

  function validateForm() {
    let isValid = true;

    // Validación de nombre
    const nombre = document.getElementById('nombre').value.trim();
    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
      alert('El campo nombre no debe estar vacío y debe contener letras.');
      isValid = false;
    }

    // Validación de apellido
    const apellido = document.getElementById('apellido').value.trim();
    if (!/^[a-zA-Z\s]+$/.test(apellido)) {
      alert('El campo apellido no debe estar vacío y debe contener letras.');
      isValid = false;
    }

    // Validación de correo electrónico
    const email = document.getElementById('email').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Por favor introduce un correo electrónico válido.');
      isValid = false;
    }

    // Validación de fecha de nacimiento
    const fechaNacimiento = document.getElementById('fecha_nacimiento').value;
    if (!isValidDate(fechaNacimiento)) {
      alert('Por favor, introduce una fecha de nacimiento válida.');
      isValid = false;
    }

    // Validación de teléfono
    const telefono = document.getElementById('telefono').value.trim();
    if (!/^\d{7,}$/.test(telefono)) {
      alert(
        'El campo teléfono debe contener solo números y tener al menos 7 dígitos.'
      );
      isValid = false;
    }

    // Validación de ubicación
    const ubicacion = document.getElementById('ubicacion').value;
    if (ubicacion === '') {
      alert('Por favor, selecciona tu ubicación.');
      isValid = false;
    }

    return isValid;
  }

  function isValidDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    return date instanceof Date && !isNaN(date) && date < now;
  }
});
