import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private router: Router, private http: HttpClient) {}

  esRegistro = false;

  // 1. Creamos la estructura lógica y las reglas de validación
  formulario = new FormGroup({
    nombre: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
});

cambiarModo() {
    this.esRegistro = !this.esRegistro;
  }

// 2. Esta función atrapará los datos al hacer clic en el botón
  onSubmit() {
    if (this.esRegistro) {
      this.registrar();
    } else {
      this.iniciarSesion();
    }
  }

  registrar() {
    console.log('Enviando datos:', this.formulario.value);
    this.http.post('http://localhost:3000/users', this.formulario.value).subscribe({
      next: (respuesta: any) => {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        this.esRegistro = false; // Volver al modo de login
        this.formulario.reset();
      },
      error: (error) => {
        console.error('Error al registrar', error);
        alert('Error al crear la cuenta');
      }
    });
  }

  iniciarSesion() {
  this.http.post('http://localhost:3000/users/login', this.formulario.value).subscribe({
    next: (respuesta: any) => {
      // 1. Guardamos el token en la "caja fuerte" 🗄️
      localStorage.setItem('token_sesion', respuesta.token);

      // 2. Ahora que tenemos el pase, podemos entrar a la app 🔑
      this.router.navigate(['/toDo']);
    },
    error: (error) => {
      // Si las credenciales son malas, avisamos al usuario ⚠️
      console.error('Error al iniciar sesión', error);
      alert('Usuario o contraseña incorrectos');
    }
  });
}
  
}
