const express = require('express');
const {
  obtenerCitas,
  obtenerCitaPorId,
  crearCita,
  actualizarCita,
  eliminarCita
} = require('../src/controllers/CitasController');

const router = express.Router();

// Rutas para el CRUD de Citas
router.route('/')
  .get(obtenerCitas)    // GET /api/v1/citas: Obtener todos
  .post(crearCita);     // POST /api/v1/citas: Crear uno nuevo

router.route('/:id')
  .get(obtenerCitaPorId)   // GET /api/v1/citas/:id: Obtener uno específico
  .put(actualizarCita)     // PUT /api/v1/citas/:id: Actualizar uno existente
  .delete(eliminarCita);   // DELETE /api/v1/citas/:id: Eliminar uno

module.exports = router;