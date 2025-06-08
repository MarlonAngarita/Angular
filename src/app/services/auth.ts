import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface Usuario {
  nombre_usuario: string;
  correo_usuario: string;
  contraseña_usuario: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  login(correo: string, contraseña: string): Usuario | null {
    const usuarioRegistrado = localStorage.getItem('usuarioRegistrado');

    if (usuarioRegistrado) {
      const usuario: Usuario = JSON.parse(usuarioRegistrado);

      if (usuario.correo_usuario.trim() === correo.trim() && usuario.contraseña_usuario.trim() === contraseña.trim()) {
        localStorage.setItem('userRole', usuario.rol);
        sessionStorage.setItem('sesionActiva', 'true'); /* Se usa sessionStorage para confirmar sesión */
        return usuario; /* Retorna el usuario autenticado */
      } else {
        console.error('❌ Error: Credenciales incorrectas.');
      }
    } else {
      console.error('❌ Error: Usuario no encontrado en localStorage.');
    }
    return null;
  }

  getUserRole(): string {
    return localStorage.getItem('userRole') || ''; /* Previene error de tipo string | null */
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('sesionActiva') === 'true'; /* Verifica si hay sesión activa */
  }

  logout() {
    localStorage.removeItem('userRole'); /* Limpia el rol al cerrar sesión */
    localStorage.removeItem('usuarioRegistrado'); /* Borra los datos de usuario */
    sessionStorage.removeItem('sesionActiva'); /* Elimina la sesión activa */
    console.log('Sesión cerrada correctamente.');
    this.router.navigateByUrl('/login'); 
  }
}
