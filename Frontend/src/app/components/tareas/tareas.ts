import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Tasks } from '../../services/tasks';

@Component({
  standalone: true,
  selector: 'app-tareas',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tareas.html',
  styleUrls: ['./tareas.css'],
})
export class Tareas implements OnInit{

  constructor(private tasksService: Tasks, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.tasksService.getTasks().subscribe({
      next: (datos) => {
        // 3. Guardamos lo que nos mandó el servidor en nuestra lista
        this.listaTareas = datos;
        // Forzamos la detección de cambios por si la suscripción corrió fuera de la zona
        try { this.cdr.detectChanges(); } catch (e) { /* ignore */ }
      },
      error: (error) => {
        console.error('Error al cargar las tareas', error);
        if (error && (error.status === 401 || error.status === 403)) {
          alert('Necesitas iniciar sesión para ver tus tareas.');
          this.router.navigate(['/login']);
        } else {
          alert('Error al cargar las tareas. Revisa la consola para más detalles.');
        }
      }
    });
  }

  // 1. Nuestro formulario para agregar tareas
  formularioTarea = new FormGroup({
    nombreTarea: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required])
  });

  // 2. Una lista de tareas de prueba (imita lo que traerá PostgreSQL)
  listaTareas:any[] = [];

  // 3. Función para capturar el botón de guardar
  agregarTarea() {
  if (this.formularioTarea.valid) {
    const nuevaTarea = {
      // Ya no necesitamos calcular el ID aquí, la DB lo hará por nosotros
      nombreTarea: this.formularioTarea.value.nombreTarea!,
      descripcion: this.formularioTarea.value.descripcion!,
      completado: false 
    };

      // 3. AQUÍ FALTA EL CÓDIGO PARA AGREGAR LA TAREA A LA LISTA
      this.tasksService.createTask(nuevaTarea).subscribe({
      next: (tareaCreada) => {
        console.log('Tarea creada:', tareaCreada);
        // 1. Agregamos la respuesta oficial del servidor a nuestra lista local
        this.listaTareas.push(tareaCreada);
        
        // 2. Ahora sí, limpiamos el formulario con seguridad
        this.formularioTarea.reset();
      },
      error: (err) => {
        console.error('No se pudo guardar la tarea', err);
        alert('Error al guardar la tarea');
      }
    });
    }
  }
  cambiarEstado(tarea: any) {
  // 1. Cambiamos el valor localmente (si era true pasa a false, y viceversa)
  tarea.completado = !tarea.completado;

  // 2. Usamos el servicio que acabamos de preparar
  // Pasamos el ID y el objeto completo con el nuevo estado
  this.tasksService.updateTask(tarea.idTarea, tarea).subscribe({
    next: (respuesta) => {
      console.log('Servidor actualizado:', respuesta);
      // No necesitamos hacer .push() porque el objeto ya está en 'listaTareas'
    },
    error: (err) => {
      // Si el servidor falla, revertimos el cambio en la pantalla
      tarea.completado = !tarea.completado;
      console.error('No se pudo actualizar en la base de datos', err);
      alert('Error al sincronizar con el servidor');
    }
  });
}

  trackById(index: number, tarea: any) {
    return tarea.idTarea;
  }

}
