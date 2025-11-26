const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors'); // Se importa solo una vez

// Cargar variables de entorno
dotenv.config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARES ---

// 1. CORS: Configuración permisiva para que NO falle el frontend
app.use(cors()); 

// 2. JSON: Permite leer los datos que envía el formulario
app.use(express.json()); 

// --- CONEXIÓN A BASE DE DATOS ---
const connectDB = async () => {
  try {
    // Asegúrate de que tu archivo .env tenga la variable MONGO_URI correcta
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🌱 MongoDB conectado exitosamente.');
  } catch (err) {
    console.error(`🔴 Error al conectar MongoDB: ${err.message}`);
    process.exit(1); // Sale si no hay base de datos
  }
};
connectDB();

// --- RUTAS ---
try {
    // IMPORTANTE: Asegúrate de que la carpeta 'routes' esté al lado de 'server.js'
    const citasRoutes = require('./routes/citas'); 
    
    // Montar las rutas
    app.use('/api/v1/citas', citasRoutes);
    console.log('🛣️ Rutas de citas cargadas correctamente.');
    
} catch (error) {
    console.error('🔴 Error cargando las rutas: Verifica que el archivo ./routes/citas.js exista.');
    console.error(error);
}

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

// --- INICIAR SERVIDOR ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor Express corriendo en el puerto ${PORT}`);
});