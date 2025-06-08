import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../services/auth';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  formulario: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.formulario = this.fb.group({
      nombre_usuario: ['', Validators.required],
      apellido_usuario: ['', Validators.required],
      correo_usuario: ['', [Validators.required, Validators.email]],
      contraseña_usuario: ['', [Validators.required, Validators.minLength(6)]],
      cedula_usuario: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }

  registrarUsuario() {
    if (this.formulario.valid) {
      const usuario: Usuario = this.formulario.value;
      localStorage.setItem('usuarioRegistrado', JSON.stringify(usuario)); /* Guarda datos en localStorage */
      localStorage.setItem('userRole', usuario.rol); /* Guarda el rol correctamente */
      console.log('Usuario registrado:', usuario);
      this.router.navigate(['/login']); /* Redirige al login */
    } else {
      console.log('Error: Formulario inválido.');
    }
  }
}
