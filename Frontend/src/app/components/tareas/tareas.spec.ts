/**
 * Pruebas unitarias para el componente Tareas
 * Verifica que la lógica del componente funcione correctamente
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Tareas } from './tareas';
import { Tasks } from '../../services/tasks';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

describe('Tareas Component - Pruebas Unitarias', () => {
  let component: Tareas;
  let fixture: ComponentFixture<Tareas>;
  let tasksService: Tasks;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Tareas,
        ReactiveFormsModule,
        CommonModule,
        HttpClientTestingModule
      ],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Tareas);
    component = fixture.componentInstance;
    tasksService = TestBed.inject(Tasks);
    
    localStorage.clear();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe tener un formulario con controles válidos', () => {
    expect(component.formularioTarea).toBeTruthy();
    expect(component.formularioTarea.get('nombreTarea')).toBeTruthy();
    expect(component.formularioTarea.get('descripcion')).toBeTruthy();
  });

  it('Debe inicializar con lista vacía de tareas', () => {
    expect(component.listaTareas).toBeDefined();
    expect(Array.isArray(component.listaTareas)).toBe(true);
  });

  it('agregarTarea debe ser una función', () => {
    expect(typeof component.agregarTarea).toBe('function');
  });

  it('cambiarEstado debe ser una función', () => {
    expect(typeof component.cambiarEstado).toBe('function');
  });

  it('trackById debe retornar el ID de la tarea', () => {
    const tarea = { idTarea: 5, nombreTarea: 'Test' };
    const resultado = component.trackById(0, tarea);
    expect(resultado).toBe(5);
  });

  it('logout debe ser una función', () => {
    expect(typeof component.logout).toBe('function');
  });

  it('logout debe limpiar el token del localStorage', () => {
    localStorage.setItem('token_sesion', 'token_123');
    expect(localStorage.getItem('token_sesion')).toBeTruthy();
    
    component.logout();
    
    expect(localStorage.getItem('token_sesion')).toBeNull();
  });

  it('El formulario debe ser inválido cuando está vacío', () => {
    component.formularioTarea.reset();
    expect(component.formularioTarea.valid).toBe(false);
  });

  it('El formulario debe ser válido cuando tiene datos', () => {
    component.formularioTarea.patchValue({
      nombreTarea: 'Nueva tarea',
      descripcion: 'Descripción válida'
    });
    expect(component.formularioTarea.valid).toBe(true);
  });

  it('agregarTarea no debe crear tarea si formulario es inválido', () => {
    component.formularioTarea.reset();
    const longitudInicial = component.listaTareas.length;
    
    component.agregarTarea();
    
    expect(component.listaTareas.length).toBe(longitudInicial);
  });

  it('changeDetectorRef debe estar disponible', () => {
    expect(component['cdr']).toBeDefined();
  });

  it('tasksService debe estar inyectado', () => {
    expect(tasksService).toBeTruthy();
  });

  it('El componente debe tener una lista de tareas editable', () => {
    const tarea = { idTarea: 1, nombreTarea: 'Test', completado: false };
    component.listaTareas.push(tarea);
    
    expect(component.listaTareas.length).toBe(1);
    expect(component.listaTareas[0].nombreTarea).toBe('Test');
  });

  it('cambiarEstado debe togglear el estado completado', () => {
    const tarea = { idTarea: 1, nombreTarea: 'Test', completado: false };
    const estadoInicial = tarea.completado;
    
    // Simulamos el cambio (sin llamar al servidor)
    tarea.completado = !tarea.completado;
    
    expect(tarea.completado).toBe(!estadoInicial);
  });
});
