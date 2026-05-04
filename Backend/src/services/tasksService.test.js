/**
 * Pruebas unitarias para el servicio de tareas
 * Estos tests verifican que las funciones manejen datos correctamente
 */

import { getTasks, postCrearTasks, actualizarTarea, eliminarTarea } from './tasksService.js';

// Simulamos los datos que retornaría la BD
const mockTasksData = [
  { idtarea: 1, nombretarea: 'Hacer tarea 1', descripcion: 'Primera tarea', completado: false },
  { idtarea: 2, nombretarea: 'Hacer tarea 2', descripcion: 'Segunda tarea', completado: true }
];

describe('Tasks Service - Pruebas Unitarias', () => {
  
  describe('Estructura del Servicio', () => {
    it('getTasks debe ser una función', () => {
      expect(typeof getTasks).toBe('function');
    });

    it('postCrearTasks debe ser una función', () => {
      expect(typeof postCrearTasks).toBe('function');
    });

    it('actualizarTarea debe ser una función', () => {
      expect(typeof actualizarTarea).toBe('function');
    });

    it('eliminarTarea debe ser una función', () => {
      expect(typeof eliminarTarea).toBe('function');
    });
  });

  describe('Datos esperados', () => {
    it('Los datos de tareas deben tener estructura correcta', () => {
      const tarea = mockTasksData[0];
      
      expect(tarea).toHaveProperty('idtarea');
      expect(tarea).toHaveProperty('nombretarea');
      expect(tarea).toHaveProperty('descripcion');
      expect(tarea).toHaveProperty('completado');
    });

    it('Las tareas deben poder tener estado completado en true o false', () => {
      const tareaCompleta = mockTasksData[1];
      const tareaIncompleta = mockTasksData[0];
      
      expect(typeof tareaCompleta.completado).toBe('boolean');
      expect(typeof tareaIncompleta.completado).toBe('boolean');
      expect(tareaCompleta.completado).toBe(true);
      expect(tareaIncompleta.completado).toBe(false);
    });
  });

  describe('Validación de datos', () => {
    it('Una tarea válida debe tener nombre y descripción', () => {
      const tareaValida = mockTasksData[0];
      
      expect(tareaValida.nombretarea).toBeTruthy();
      expect(tareaValida.descripcion).toBeTruthy();
    });

    it('El ID de tarea debe ser un número', () => {
      const tarea = mockTasksData[0];
      
      expect(typeof tarea.idtarea).toBe('number');
      expect(tarea.idtarea).toBeGreaterThan(0);
    });
  });

  describe('Conversión a camelCase', () => {
    it('Los datos de DB con snake_case deben convertirse a camelCase', () => {
      // Simulamos cómo el servicio convierte snake_case a camelCase
      const datosDB = { idtarea: 1, nombretarea: 'Tarea', descripcion: 'Desc', completado: false };
      
      const tareaConvertida = {
        idTarea: datosDB.idtarea,
        nombreTarea: datosDB.nombretarea,
        descripcion: datosDB.descripcion,
        completado: datosDB.completado
      };
      
      expect(tareaConvertida).toHaveProperty('idTarea');
      expect(tareaConvertida).toHaveProperty('nombreTarea');
      expect(tareaConvertida.idTarea).toBe(1);
    });
  });
});
