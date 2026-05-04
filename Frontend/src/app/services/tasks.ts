import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Tasks {

  constructor(private http: HttpClient) {}
  
  getTasks(): Observable<any> {
  const token = localStorage.getItem('token_sesion');
  console.log('Token en getTasks:', token);
  const headers = new HttpHeaders().set('Authorization', `${token}`);
  return this.http.get('http://localhost:3000/tasks', { headers });
}

createTask(nuevaTarea:any){
  const token = localStorage.getItem('token_sesion')
  const headers = new HttpHeaders().set('Authorization', `${token}`);
  return this.http.post('http://localhost:3000/tasks', nuevaTarea, { headers });
}
  

updateTask(id: number, tareaEditada: any): Observable<any> {
  const token = localStorage.getItem('token_sesion');
  const headers = new HttpHeaders().set('Authorization', `${token}`);
  
  return this.http.put(`http://localhost:3000/tasks/${id}`,tareaEditada, { headers })
}

deleteTask(id: number): Observable<any> {
  const token = localStorage.getItem('token_sesion');
  const headers = new HttpHeaders().set('Authorization', `${token}`);
  return this.http.delete(`http://localhost:3000/tasks/${id}`, { headers });
}

}
