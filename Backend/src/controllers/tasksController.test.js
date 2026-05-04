/**
 * Pruebas unitarias para el controlador de tareas
 * Estas pruebas simulan peticiones HTTP y verifican las respuestas
 */

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

await jest.unstable_mockModule('../services/tasksService.js', () => ({
  getTasks: jest.fn(),
  postCrearTasks: jest.fn(),
  actualizarTarea: jest.fn(),
  eliminarTarea: jest.fn()
}));

const tasksController = await import('./tasksController.js');
const tasksService = await import('../services/tasksService.js');

describe('Tasks Controller - Pruebas Unitarias', () => {
  
  let req, res, next;

  beforeEach(() => {
    // Creamos objetos mock para request, response y next
    req = {
      usuarioId: 1,
      body: {},
      params: {}
    };

    res = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };

    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('obtenerTareas', () => {
    it('Debe obtener todas las tareas del usuario', async () => {
      const tareasEsperadas = [
        { idTarea: 1, nombreTarea: 'Tarea 1', completado: false }
      ];

      tasksService.getTasks.mockResolvedValue(tareasEsperadas);

      await tasksController.obtenerTareas(req, res, next);

      expect(tasksService.getTasks).toHaveBeenCalledWith(req.usuarioId);
      expect(res.json).toHaveBeenCalledWith(tareasEsperadas);
      expect(next).not.toHaveBeenCalled();
    });

    it('Debe manejar errores al obtener tareas', async () => {
      const error = new Error('Error en la BD');
      tasksService.getTasks.mockRejectedValue(error);

      await tasksController.obtenerTareas(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('postCrearTasks', () => {
    it('Debe crear una tarea con datos válidos', async () => {
      req.body = {
        nombreTarea: 'Nueva tarea',
        descripcion: 'Descripción'
      };

      const tareaCreada = {
        idTarea: 1,
        nombreTarea: 'Nueva tarea',
        descripcion: 'Descripción',
        completado: false
      };

      tasksService.postCrearTasks.mockResolvedValue(tareaCreada);

      await tasksController.postCrearTasks(req, res, next);

      expect(tasksService.postCrearTasks).toHaveBeenCalledWith(
        req.usuarioId,
        'Nueva tarea',
        'Descripción',
        undefined
      );
      expect(res.json).toHaveBeenCalledWith(tareaCreada);
    });

    it('Debe manejar nombres de tarea tanto en camelCase como snake_case', async () => {
      req.body = {
        nombretarea: 'Nueva tarea', // snake_case
        descripcion: 'Descripción'
      };

      tasksService.postCrearTasks.mockResolvedValue({});

      await tasksController.postCrearTasks(req, res, next);

      expect(tasksService.postCrearTasks).toHaveBeenCalledWith(
        req.usuarioId,
        'Nueva tarea',
        'Descripción',
        undefined
      );
    });
  });

  describe('putModificarTasks', () => {
    it('Debe actualizar una tarea existente', async () => {
      req.body = {
        nombreTarea: 'Tarea actualizada',
        descripcion: 'Nueva descripción',
        completado: true
      };
      req.params = { idTarea: 1 };

      const tareaActualizada = {
        idTarea: 1,
        nombreTarea: 'Tarea actualizada',
        completado: true
      };

      tasksService.actualizarTarea.mockResolvedValue(tareaActualizada);

      await tasksController.putModificarTasks(req, res, next);

      expect(tasksService.actualizarTarea).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(tareaActualizada);
    });
  });

  describe('deleteTasks', () => {
    it('Debe eliminar una tarea por ID', async () => {
      req.params = { idtarea: 1 };

      tasksService.eliminarTarea.mockResolvedValue({ success: true });

      await tasksController.deleteTasks(req, res, next);

      expect(tasksService.eliminarTarea).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalled();
    });

    it('Debe manejar errores al eliminar', async () => {
      req.params = { idtarea: 1 };
      const error = new Error('Error al eliminar');
      
      tasksService.eliminarTarea.mockRejectedValue(error);

      await tasksController.deleteTasks(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
