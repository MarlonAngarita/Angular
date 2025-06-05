import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Navbar } from '../../core/navbar/navbar'; 
import { Footer } from '../../core/footer/footer'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, Footer],
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

  onLogin(userRole: string) {
    this.authService.login(userRole);

    if (this.nombreUsuario && this.contrasenaUsuario) {
      console.log('Inicio de sesión presionado, pero sin redirección por ahora.');
      //this.router.navigate(['/inicio']); // Redirige a la página de inicio después del login
    }
  }
}
