const API_URL = 'http://localhost:3000/api/v1/citas';
// Referencias del DOM
const citasList = document.getElementById('citas-list');
const citaForm = document.getElementById('cita-form');
const formTitle = document.getElementById('form-title');
const submitButton = document.getElementById('submit-button');
const cancelEditButton = document.getElementById('cancel-edit-button');
const alertMessage = document.getElementById('alert-message');
const citaIdInput = document.getElementById('cita-id');

// --- 1. FUNCIÓN PARA MOSTRAR MENSAJES (Alertas)
const showAlert = (message, type = 'success') => {
    alertMessage.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    // Opcional: Ocultar después de unos segundos
    setTimeout(() => {
        alertMessage.innerHTML = '';
    }, 5000);
};

// --- 2. FUNCIÓN PARA FORMATEAR FECHA Y HORA
const formatDateTime = (isoDate, time) => {
    const date = new Date(isoDate);
    // Formato de fecha: DD/MM/YYYY
    const formattedDate = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    // Concatenar con la hora
    return `${formattedDate} a las ${time}`;
};

// --- 3. CRUD: OBTENER TODAS LAS CITAS (GET)
const fetchCitas = async () => {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Manipulación del DOM: Renderizar la lista
        renderCitas(result.data);
    } catch (error) {
        citasList.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Error al cargar las citas: ${error.message}</td></tr>`;
        showAlert(`Error de conexión con la API: ${error.message}`, 'danger');
    }
};

// --- 4. MANIPULACIÓN DEL DOM: INYECTAR LAS CITAS EN LA TABLA
const renderCitas = (citas) => {
    citasList.innerHTML = ''; // Limpiar la lista existente

    if (citas.length === 0) {
        citasList.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No hay citas agendadas aún.</td></tr>';
        return;
    }

    citas.forEach(cita => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cita.cliente}</td>
            <td>${cita.servicio}</td>
            <td>${formatDateTime(cita.fecha, cita.hora)}</td>
            <td>${cita.telefono}</td>
            <td>
                <button class="btn btn-edit btn-sm" onclick="cargarCitaParaEdicion('${cita._id}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarCita('${cita._id}')">Eliminar</button>
            </td>
        `;
        citasList.appendChild(row);
    });
};

// --- 5. CRUD: CREAR O ACTUALIZAR CITA (POST/PUT)
citaForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener datos del formulario
    const id = citaIdInput.value;
    const citaData = {
        cliente: document.getElementById('cliente').value,
        servicio: document.getElementById('servicio').value,
        fecha: document.getElementById('fecha').value,
        hora: document.getElementById('hora').value,
        telefono: document.getElementById('telefono').value,
    };

    let url = API_URL;
    let method = 'POST';
    let successMessage = 'Cita agendada con éxito!';
    let statusCode = 201;

    // Si hay un ID, es una ACTUALIZACIÓN (PUT)
    if (id) {
        url = `${API_URL}/${id}`;
        method = 'PUT';
        successMessage = 'Cita actualizada con éxito!';
        statusCode = 200;
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(citaData),
        });

        const result = await response.json();

        if (response.status !== statusCode) {
            showAlert(`Error: ${result.message || 'Error al procesar la cita.'}`, 'danger');
            return;
        }

        showAlert(successMessage, 'success');
        citaForm.reset(); // Limpiar el formulario
        resetForm(); // Resetear el estado de edición
        fetchCitas(); // Volver a cargar la lista
    } catch (error) {
        showAlert(`Error de red: ${error.message}`, 'danger');
    }
});

// --- 6. CRUD: CARGAR DATOS PARA EDICIÓN (Preparación para PUT)
const cargarCitaParaEdicion = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        const cita = result.data;
        
        // Rellenar el formulario con los datos de la cita
        citaIdInput.value = cita._id;
        document.getElementById('cliente').value = cita.cliente;
        document.getElementById('servicio').value = cita.servicio;
        // La fecha viene como ISO string, necesitamos solo la parte de la fecha (YYYY-MM-DD)
        document.getElementById('fecha').value = new Date(cita.fecha).toISOString().substring(0, 10);
        document.getElementById('hora').value = cita.hora;
        document.getElementById('telefono').value = cita.telefono;

        // Cambiar el estado del formulario a 'Editar'
        formTitle.textContent = 'Editar Cita Existente';
        submitButton.textContent = 'Actualizar Cita';
        cancelEditButton.classList.remove('d-none');
    } catch (error) {
        showAlert(`Error al cargar datos para edición: ${error.message}`, 'danger');
    }
};

// --- 7. CRUD: ELIMINAR CITA (DELETE)
const eliminarCita = async (id) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        const result = await response.json();

        if (response.status !== 200) {
            showAlert(`Error: ${result.message || 'Error al eliminar la cita.'}`, 'danger');
            return;
        }

        showAlert('Cita eliminada con éxito.', 'warning');
        fetchCitas(); // Volver a cargar la lista
    } catch (error) {
        showAlert(`Error de red: ${error.message}`, 'danger');
    }
};

// --- 8. FUNCIÓN PARA REINICIAR EL FORMULARIO DE EDICIÓN
const resetForm = () => {
    citaIdInput.value = '';
    formTitle.textContent = 'Agendar Nueva Cita';
    submitButton.textContent = 'Agendar Cita';
    cancelEditButton.classList.add('d-none');
    citaForm.reset();
};

// Event listener para el botón de cancelar edición
cancelEditButton.addEventListener('click', resetForm);

// --- 9. INICIO DE LA APLICACIÓN
document.addEventListener('DOMContentLoaded', fetchCitas);