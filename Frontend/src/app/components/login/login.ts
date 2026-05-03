import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private router: Router) {}

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
      console.log("Datos para REGISTRO:", this.formulario.value);
    } else {
      console.log("Datos para LOGIN:", this.formulario.value);
    }
      this.router.navigate(['/toDo']);
  }
}
