const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());  
app.use(cors()); 

// Configurar CSP para servir archivos
app.use((req, res, next) => {
  res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;"
  );
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'menu.html'));
});

// Servir archivos estáticos (JS y CSS desde la raíz)
app.use(express.static(__dirname));

// Conexión a la base de datos
const connection = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',  
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306, 
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'bdempleados',
  waitForConnections: true,
  connectionLimit: process.env.DB_CONNECTION_LIMIT ? parseInt(process.env.DB_CONNECTION_LIMIT, 10) : 10,
  queueLimit: 0
});

// Verificar conexión a la base de datos
connection.getConnection((err, conn) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a MySQL con ID ' + conn.threadId);
  conn.release();
});

// Ruta para registrar empleados
app.post('/register', (req, res) => {
  const { 
    nombre, 
    email, 
    puesto, 
    fechaNacimiento, 
    curp, 
    rfc, 
    nss, 
    genero, 
    tipoContrato 
  } = req.body;

  if (!nombre || !email || !puesto || !fechaNacimiento || !genero || !tipoContrato) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  const query = 'INSERT INTO empleados (nombre, email, puesto, fechaNacimiento, curp, rfc, nss, genero, tipoContrato) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.execute(query, [nombre, email, puesto, fechaNacimiento, curp, rfc, nss, genero, tipoContrato], (error, results) => {
    if (error) {
      console.error('Error al insertar en la base de datos:', error);
      return res.status(500).send('Error al registrar empleado');
    }
    res.status(201).send('Empleado registrado correctamente');
  });
});

app.get('/empleados', (req, res) => {
  const query = 'SELECT * FROM empleados'; // Selecciona todos los campos
  connection.query(query, (error, results) => {
      if (error) {
          console.error('Error al consultar empleados:', error);
          return res.status(500).json({ error: 'Error al obtener empleados' });
      }
      res.json(results);
  });
});

app.get('/empleado/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM empleados WHERE id = ?';
  
  connection.query(query, [id], (error, results) => {
      if (error) {
          console.error('Error al obtener empleado:', error);
          return res.status(500).json({ error: 'Error en la base de datos' });
      }
      if (results.length === 0) {
          return res.status(404).json({ error: 'Empleado no encontrado' });
      }

      // Formatear la fecha para que solo incluya YYYY-MM-DD
      const empleado = results[0];
      if (empleado.fechaNacimiento) {
          empleado.fechaNacimiento = empleado.fechaNacimiento.toISOString().split('T')[0];
      }
      console.log("Datos del empleado:", empleado); // Depuración
      res.json(empleado);
  });
});

app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const { 
    nombre, 
    email, 
    puesto, 
    fechaNacimiento, 
    curp, 
    rfc, 
    nss, 
    genero, 
    tipoContrato 
  } = req.body;

  // Si fechaNacimiento está vacío, asignar NULL
  const fechaNacimientoValida = fechaNacimiento === '' ? null : fechaNacimiento;

  const query = `
    UPDATE empleados 
    SET nombre = ?, 
        email = ?, 
        puesto = ?, 
        fechaNacimiento = ?, 
        curp = ?, 
        rfc = ?, 
        nss = ?, 
        genero = ?, 
        tipoContrato = ? 
    WHERE id = ?
  `;

  connection.execute(
    query,
    [nombre, email, puesto, fechaNacimientoValida, curp, rfc, nss, genero, tipoContrato, id],
    (error, results) => {
      if (error) {
        console.error('Error al actualizar empleado:', error);
        return res.status(500).send('Error al actualizar empleado');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('Empleado no encontrado');
      }
      res.send('Empleado actualizado correctamente');
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});