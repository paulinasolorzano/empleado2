const API_URL = "http://localhost:3000";

// Alta de empleado
document.getElementById('formEmpleado')?.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const puesto = document.getElementById('puesto').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const curp = document.getElementById('curp').checked; // Checkbox
    const rfc = document.getElementById('rfc').checked;   // Checkbox
    const nss = document.getElementById('nss').checked;   // Checkbox
    const genero = document.getElementById('genero').value;
    const tipoContrato = document.querySelector('input[name="tipoContrato"]:checked').value;

    const data = { 
      nombre, 
      email, 
      puesto, 
      fechaNacimiento, 
      curp, 
      rfc, 
      nss, 
      genero, 
      tipoContrato 
    };

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status} - ${response.statusText}`);
      }

      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error('❌ Error al enviar la petición:', error);
      alert("Hubo un problema al registrar el empleado.");
    }
});

// Actualización de empleado
document.getElementById('formActualizar')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const idEmpleado = document.getElementById('idEmpleado').value;
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const puesto = document.getElementById('puesto').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const curp = document.getElementById('curp').checked; // Checkbox
    const rfc = document.getElementById('rfc').checked;   // Checkbox
    const nss = document.getElementById('nss').checked;   // Checkbox
    const genero = document.getElementById('genero').value;
    const tipoContrato = document.querySelector('input[name="tipoContrato"]:checked')?.value;

    const data = { 
      nombre, 
      email, 
      puesto, 
      fechaNacimiento, 
      curp, 
      rfc, 
      nss, 
      genero, 
      tipoContrato 
    };

    try {
      const response = await fetch(`${API_URL}/update/${idEmpleado}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status} - ${response.statusText}`);
      }

      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error('❌ Error al actualizar empleado:', error);
      alert("Hubo un problema al actualizar el empleado.");
    }
});

// Buscar empleado por ID y llenar formulario
document.getElementById('buscarEmpleado')?.addEventListener('click', async () => {
    const idEmpleado = document.getElementById('idEmpleado').value;
    if (!idEmpleado) {
        alert("Por favor ingresa un ID válido");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/empleado/${idEmpleado}`);
        if (!response.ok) {
            throw new Error(`Empleado no encontrado (Código: ${response.status})`);
        }

        const empleado = await response.json();

        // Rellenar el formulario con los datos obtenidos
        document.getElementById('nombre').value = empleado.nombre;
        document.getElementById('email').value = empleado.email;
        document.getElementById('puesto').value = empleado.puesto;
        document.getElementById('fechaNacimiento').value = empleado.fechaNacimiento.split('T')[0]; // Formato YYYY-MM-DD
        document.getElementById('curp').checked = empleado.curp || false; // Checkbox
        document.getElementById('rfc').checked = empleado.rfc || false;   // Checkbox
        document.getElementById('nss').checked = empleado.nss || false;   // Checkbox
        document.getElementById('genero').value = empleado.genero || '';
        
        if (empleado.tipoContrato === "Tiempo completo") {
            document.getElementById('tiempoCompleto').checked = true;
        } else if (empleado.tipoContrato === "Medio tiempo") {
            document.getElementById('medioTiempo').checked = true;
        } else if (empleado.tipoContrato === "Por proyecto") {
            document.getElementById('porProyecto').checked = true;
        }

        // Mostrar el formulario de actualización
        document.getElementById('formActualizar').style.display = 'block';
    } catch (error) {
        console.error('❌ Error al buscar empleado:', error);
        alert("Empleado no encontrado o error en la búsqueda.");
    }
});