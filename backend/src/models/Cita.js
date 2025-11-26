const mongoose = require('mongoose');

// Define el esquema para las citas
const CitaSchema = new mongoose.Schema({
  cliente: {
    type: String,
    required: [true, 'El nombre del cliente es obligatorio.'],
    trim: true
  },
  servicio: {
    type: String,
    required: [true, 'El servicio es obligatorio.'],
    enum: ['Manicura', 'Pedicura', 'Acrílicas', 'Gelish'],
  },
  fecha: {
    type: Date,
    required: [true, 'La fecha es obligatoria.']
  },
  hora: {
    type: String, // Usamos String para manejar mejor formatos como "10:00 AM"
    required: [true, 'La hora es obligatoria.']
  },
  telefono: {
    type: String,
    required: [true, 'El teléfono es obligatorio.'],
    match: [/^\d{7,10}$/, 'Formato de teléfono no válido.'] // Ejemplo de validación básica
  },
  creadoEn: {
    type: Date,
    default: Date.now
  }
});

// Crea y exporta el modelo basado en el esquema
module.exports = mongoose.model('Cita', CitaSchema);