import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, Usuario } from '../../services/auth'; /* ✅ Importación correcta de Usuario */

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  nombreUsuario = '';
  contrasenaUsuario = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    console.log('Usuario:', this.nombreUsuario);
    console.log('Contraseña:', this.contrasenaUsuario);
  } 

  redirigirRegistro() {
    this.router.navigate(['/registro']); 
  }

  onLogin() {
  const usuarioRegistrado = localStorage.getItem('usuarioRegistrado');

    if (usuarioRegistrado) {
      const usuario: Usuario = JSON.parse(usuarioRegistrado);

      if (this.nombreUsuario.trim() === usuario.correo_usuario.trim() &&
          this.contrasenaUsuario.trim() === usuario.contraseña_usuario.trim()) {
        console.log(`Inicio de sesión exitoso para: ${usuario.nombre_usuario}, Rol: ${usuario.rol}`);

        localStorage.setItem('userRole', usuario.rol); /* Guarda el rol */

        //  Redirección basada en el rol
        if (usuario.rol === 'profesor') {
          this.router.navigate(['/profesores/detalle-curso']).then(() => {
            window.location.reload(); /* Recarga la página */
          });
        } else if (usuario.rol === 'estudiante') {
          this.router.navigate(['/usuario/cursos']).then(() => {
            window.location.reload(); /* Recarga la página */
          });
        }
      } else {
        console.error('❌ Credenciales incorrectas.');
      }
    } else {
      console.error('❌ Usuario no encontrado.');
    }
  }

}
