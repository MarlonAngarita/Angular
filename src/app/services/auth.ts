import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: string = ''; // Variable para almacenar el rol del usuario

  constructor(private router: Router) {}

  login(userRole: string) {
    this.userRole = userRole; // Guardamos el rol del usuario

    if (userRole === 'usuario') {
      this.router.navigate(['/usuario/cursos']); // Redirigir a usuario
    } else if (userRole === 'profesor') {
      this.router.navigate(['/profesores/cursos']); // Redirigir a profesor
    }
  }

  getUserRole(): string {
    return this.userRole; // Obtener el rol del usuario
  }

  logout() {
    this.userRole = ''; // Limpiar el rol al cerrar sesión
    this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }
}
