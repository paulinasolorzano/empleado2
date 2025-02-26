document.getElementById('formEmpleado').addEventListener('submit', async (e) => {
    e.preventDefault(); 
  
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const puesto = document.getElementById('puesto').value;
    const data = { nombre, email, puesto };
  
    try {
      const response = await fetch('empleados-production.up.railway.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error('Error al enviar la petición:', error);
    }
  });
  