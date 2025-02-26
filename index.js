const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());  
app.use(cors()); 

// ✅ Configurar CSP ANTES de servir archivos estáticos
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;"
    );
    next();
});

// ✅ Servir archivos estáticos
app.use(express.static(__dirname));

// ✅ Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ✅ Conexión a la base de datos
const connection = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'bdempleados',
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10) || 10,
  queueLimit: 0
});

connection.getConnection((err, conn) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a MySQL con ID ' + conn.threadId);
  conn.release();
});

// ✅ CORRECCIÓN: Ruta de registro de empleados
app.post('/register', (req, res) => {
  const { nombre, email, puesto } = req.body;

  if (!nombre || !email || !puesto) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  const query = 'INSERT INTO empleados (nombre, email, puesto) VALUES (?, ?, ?)';
  connection.execute(query, [nombre, email, puesto], (error, results) => {
    if (error) {
      console.error('Error al insertar en la base de datos:', error);
      return res.status(500).send('Error al registrar empleado');
    }
    res.status(201).send('Empleado registrado correctamente');
  });
});

// ✅ Corrección del puerto para producción
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
