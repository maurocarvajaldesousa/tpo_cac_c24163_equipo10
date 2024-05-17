document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form-contacto');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            Swal.fire({
                icon: 'success',
                title: 'Formulario enviado',
                text: 'El formulario se ha enviado correctamente.'
            });
            // Aquí puedes agregar el código para enviar el formulario
        }
    });

    function validateForm() {
        let isValid = true;

        // Validación de nombre
        const nombre = document.getElementById('nombre').value.trim();
        if (!/^[a-zA-Z\s]+$/.test(nombre)) {
            Swal.fire({
                icon: 'error',
                title: 'Error en el nombre',
                text: 'El nombre solo debe contener letras.'
            });
            isValid = false;
        }

        // Validación de apellido
        const apellido = document.getElementById('apellido').value.trim();
        if (!/^[a-zA-Z\s]+$/.test(apellido)) {
            Swal.fire({
                icon: 'error',
                title: 'Error en el apellido',
                text: 'El apellido solo debe contener letras.'
            });
            isValid = false;
        }

        // Validación de correo electrónico
        const email = document.getElementById('email').value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Error en el correo electrónico',
                text: 'Por favor, introduce un correo electrónico válido.'
            });
            isValid = false;
        }

        // Validación de fecha de nacimiento
        const fechaNacimiento = document.getElementById('fecha_nacimiento').value;
        if (!isValidDate(fechaNacimiento)) {
            Swal.fire({
                icon: 'error',
                title: 'Error en la fecha de nacimiento',
                text: 'Por favor, introduce una fecha de nacimiento válida.'
            });
            isValid = false;
        }

        // Validación de teléfono
        const telefono = document.getElementById('telefono').value.trim();
        if (!/^\d{7,}$/.test(telefono)) {
            Swal.fire({
                icon: 'error',
                title: 'Error en el teléfono',
                text: 'El teléfono debe contener solo números y tener al menos 7 dígitos.'
            });
            isValid = false;
        }

        // Validación de ubicación
        const ubicacion = document.getElementById('ubicacion').value;
        if (ubicacion === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error en la ubicación',
                text: 'Por favor, selecciona tu ubicación.'
            });
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
