// Importamos la librería Mongoose
const mongoose = require('mongoose');

// Obtenemos la URL de conexión desde las variables de entorno
// Es una buena práctica usar variables de entorno para información sensible
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/nailsalon_db';

/**
 * Función para establecer la conexión a la base de datos.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        
        console.log('✅ Conexión exitosa a MongoDB.');

        // Opcional: Escuchar eventos de desconexión y reconexión
        mongoose.connection.on('disconnected', () => {
            console.error('❌ MongoDB se ha desconectado.');
        });
        
        mongoose.connection.on('reconnected', () => {
            console.log('🔄 MongoDB se ha reconectado.');
        });
        
    } catch (error) {
        console.error(`🚨 Error al conectar a MongoDB: ${error.message}`);
        // Detener la aplicación si la conexión inicial falla
        process.exit(1); 
    }
};

// Exportamos la función para poder usarla en 'server.js'
module.exports = connectDB;