const Cita = require('../models/Cita');

// Controlador para OBTENER TODAS las citas (GET /api/citas)
exports.obtenerCitas = async (req, res) => {
  try {
    const citas = await Cita.find().sort({ fecha: 1, hora: 1 }); // Ordenar por fecha y hora
    // 200 OK
    res.status(200).json({
      success: true,
      count: citas.length,
      data: citas
    });
  } catch (error) {
    // 500 Internal Server Error
    res.status(500).json({ success: false, message: 'Error al obtener las citas.', error: error.message });
  }
};

// Controlador para OBTENER UNA cita por ID (GET /api/citas/:id)
exports.obtenerCitaPorId = async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id);

    if (!cita) {
      // 404 Not Found
      return res.status(404).json({ success: false, message: `No se encontró cita con el ID ${req.params.id}` });
    }

    // 200 OK
    res.status(200).json({ success: true, data: cita });
  } catch (error) {
    // 400 Bad Request o 500
    res.status(error.kind === 'ObjectId' ? 400 : 500).json({ success: false, message: 'Error al obtener la cita.', error: error.message });
  }
};

// Controlador para CREAR una nueva cita (POST /api/citas)
exports.crearCita = async (req, res) => {
  try {
    const nuevaCita = await Cita.create(req.body);

    // 201 Created
    res.status(201).json({
      success: true,
      message: 'Cita creada exitosamente.',
      data: nuevaCita
    });
  } catch (error) {
    // 400 Bad Request (Error de validación de Mongoose)
    res.status(400).json({
      success: false,
      message: 'Datos inválidos para crear la cita.',
      error: error.message
    });
  }
};

// Controlador para ACTUALIZAR una cita (PUT /api/citas/:id)
exports.actualizarCita = async (req, res) => {
  try {
    const cita = await Cita.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Retorna el documento modificado
      runValidators: true // Ejecuta las validaciones del esquema
    });

    if (!cita) {
      // 404 Not Found
      return res.status(404).json({ success: false, message: `No se encontró cita con el ID ${req.params.id}` });
    }

    // 200 OK
    res.status(200).json({ success: true, message: 'Cita actualizada exitosamente.', data: cita });
  } catch (error) {
    // 400 Bad Request (Error de validación) o 500
    res.status(error.kind === 'ObjectId' || error.name === 'ValidationError' ? 400 : 500).json({
      success: false,
      message: 'Error al actualizar la cita.',
      error: error.message
    });
  }
};

// Controlador para ELIMINAR una cita (DELETE /api/citas/:id)
exports.eliminarCita = async (req, res) => {
  try {
    const resultado = await Cita.findByIdAndDelete(req.params.id);

    if (!resultado) {
      // 404 Not Found
      return res.status(404).json({ success: false, message: `No se encontró cita con el ID ${req.params.id}` });
    }

    // 200 OK (sin contenido es común para DELETE, pero también 204 No Content)
    res.status(200).json({ success: true, message: 'Cita eliminada exitosamente.', data: {} });
  } catch (error) {
    // 400 Bad Request o 500
    res.status(error.kind === 'ObjectId' ? 400 : 500).json({ success: false, message: 'Error al eliminar la cita.', error: error.message });
  }
};