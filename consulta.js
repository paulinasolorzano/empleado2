async function cargarEmpleados() {
    try {
        const API_URL = "http://localhost:3000";
        const respuesta = await fetch(`${API_URL}/empleados`);
        const empleados = await respuesta.json();

        const tabla = document.getElementById('tablaEmpleados');
        tabla.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

        empleados.forEach(emp => {
            const fila = `
                <tr>
                    <td>${emp.id || ''}</td> <!-- ID del empleado -->
                    <td>${emp.nombre || ''}</td>
                    <td>${emp.email || ''}</td>
                    <td>${emp.puesto || ''}</td>
                    <td>${emp.fechaNacimiento ? emp.fechaNacimiento.split('T')[0] : ''}</td> <!-- Formato YYYY-MM-DD -->
                    <td>${emp.curp ? 'Sí' : 'No'}</td> <!-- CURP como checkbox -->
                    <td>${emp.rfc ? 'Sí' : 'No'}</td>   <!-- RFC como checkbox -->
                    <td>${emp.nss ? 'Sí' : 'No'}</td>   <!-- NSS como checkbox -->
                    <td>${emp.genero || ''}</td>
                    <td>${emp.tipoContrato || ''}</td>
                </tr>`;
            tabla.insertAdjacentHTML('beforeend', fila);
        });
    } catch (error) {
        console.error('Error al cargar empleados:', error);
        alert("Hubo un problema al cargar la lista de empleados.");
    }
}

cargarEmpleados();