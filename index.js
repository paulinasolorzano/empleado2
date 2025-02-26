
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());  
app.use(cors()); 

app.use(express.static(__dirname));

// Ruta de fallback para servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// Conexión a la base de datos con mysql2
/*const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',        
  password: '',        
  database: 'bdempleados',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
*/

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

// Ruta de registro de empleados
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

// Inicia el servidor
const PORT = 3306;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
