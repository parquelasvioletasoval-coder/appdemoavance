const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para archivos y JSON
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(fileUpload());

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para subir archivos (plantilla)
app.post('/upload', (req, res) => {
  if (!req.files || !req.files.file) return res.status(400).send('No se subió ningún archivo');
  
  const uploadedFile = req.files.file;
  const uploadPath = path.join(__dirname, 'uploads', uploadedFile.name);
  
  uploadedFile.mv(uploadPath, err => {
    if (err) return res.status(500).send(err);
    res.send('Archivo subido correctamente');
  });
});

// Crear carpeta uploads si no existe
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
