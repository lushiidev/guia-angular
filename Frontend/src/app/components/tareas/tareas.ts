import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tareas',
  imports: [ReactiveFormsModule],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css',
})
export class Tareas {
  // 1. Nuestro formulario para agregar tareas
  formularioTarea = new FormGroup({
    nombreTarea: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required])
  });

  // 2. Una lista de tareas de prueba (imita lo que traerá PostgreSQL)
  listaTareas = [
    { idTarea: 1, nombreTarea: 'Comprar leche', descripcion: 'Ir al súper por la tarde', completado: false },
    { idTarea: 2, nombreTarea: 'Estudiar Angular', descripcion: 'Hacer la demo para el equipo', completado: true }
  ];

  // 3. Función para capturar el botón de guardar
  agregarTarea() {
    // 1. Validamos que el formulario no esté vacío
    if (this.formularioTarea.valid) {
      
      // 2. Construimos el objeto de la nueva tarea
      const nuevaTarea = {
        idTarea: this.listaTareas.length + 1, // Generamos un ID consecutivo
        nombreTarea: this.formularioTarea.value.nombreTarea!,
        descripcion: this.formularioTarea.value.descripcion!,
        completado: false // Una tarea nueva siempre inicia sin completar
      };

      // 3. AQUÍ FALTA EL CÓDIGO PARA AGREGAR LA TAREA A LA LISTA
      this.listaTareas.push(nuevaTarea);
      // 4. Limpiamos el formulario para poder escribir otra tarea
      this.formularioTarea.reset();
    }
  }
}
