import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Tasks {

  constructor(private http: HttpClient) {}

  private readonly apiUrl = environment.apiUrl;
  
  getTasks(): Observable<any> {
  const token = localStorage.getItem('token_sesion');
  console.log('Token en getTasks:', token);
  const headers = new HttpHeaders().set('Authorization', `${token}`);
  return this.http.get(`${this.apiUrl}/tasks`, { headers });
}

createTask(nuevaTarea:any){
  const token = localStorage.getItem('token_sesion')
  const headers = new HttpHeaders().set('Authorization', `${token}`);
  return this.http.post(`${this.apiUrl}/tasks`, nuevaTarea, { headers });
}
  

updateTask(id: number, tareaEditada: any): Observable<any> {
  const token = localStorage.getItem('token_sesion');
  const headers = new HttpHeaders().set('Authorization', `${token}`);
  
  return this.http.put(`${this.apiUrl}/tasks/${id}`,tareaEditada, { headers })
}

deleteTask(id: number): Observable<any> {
  const token = localStorage.getItem('token_sesion');
  const headers = new HttpHeaders().set('Authorization', `${token}`);
  return this.http.delete(`${this.apiUrl}/tasks/${id}`, { headers });
}

}
