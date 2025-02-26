const API_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:8080"  // Para desarrollo local
  : "https://empleados-production.up.railway.app"; // Para producción en Railway

document.getElementById('formEmpleado').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const puesto = document.getElementById('puesto').value;
    const data = { nombre, email, puesto };

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
