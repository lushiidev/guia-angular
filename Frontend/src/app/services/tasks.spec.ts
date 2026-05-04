/**
 * Pruebas unitarias para el servicio Tasks
 * Verifica que el servicio haga correctamente las llamadas HTTP
 */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Tasks } from './tasks';

describe('Tasks Service - Pruebas Unitarias', () => {
  let service: Tasks;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Tasks]
    });

    service = TestBed.inject(Tasks);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('getTasks debe retornar un Observable', () => {
    localStorage.setItem('token_sesion', 'token_123');
    const observable = service.getTasks();
    expect(observable).toBeTruthy();
  });

  it('getTasks debe hacer GET a /tasks', () => {
    localStorage.setItem('token_sesion', 'token_123');
    service.getTasks().subscribe();
    
    const req = httpMock.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('getTasks debe incluir el token en headers', () => {
    const token = 'token_valido_123';
    localStorage.setItem('token_sesion', token);
    
    service.getTasks().subscribe();
    
    const req = httpMock.expectOne('http://localhost:3000/tasks');
    expect(req.request.headers.get('Authorization')).toBe(token);
    req.flush([]);
  });

  it('createTask debe hacer POST a /tasks', () => {
    localStorage.setItem('token_sesion', 'token_123');
    const nuevaTarea = { nombreTarea: 'Test', descripcion: 'Test' };
    
    service.createTask(nuevaTarea).subscribe();
    
    const req = httpMock.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('updateTask debe hacer PUT a /tasks/:id', () => {
    localStorage.setItem('token_sesion', 'token_123');
    const tarea = { nombreTarea: 'Test', descripcion: 'Test' };
    
    service.updateTask(1, tarea).subscribe();
    
    const req = httpMock.expectOne('http://localhost:3000/tasks/1');
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('deleteTask debe hacer DELETE a /tasks/:id', () => {
    localStorage.setItem('token_sesion', 'token_123');
    
    service.deleteTask(1).subscribe();
    
    const req = httpMock.expectOne('http://localhost:3000/tasks/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
