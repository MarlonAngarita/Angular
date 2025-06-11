import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface Usuario {
  nombre_usuario: string;
  correo_usuario: string;
  contraseña_usuario: string;
  rol: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  login(correo: string, contraseña: string): Usuario | null {
    const usuarioRegistrado = localStorage.getItem('usuarioRegistrado');

    if (usuarioRegistrado) {
      const usuario: Usuario = JSON.parse(usuarioRegistrado);

      if (
        usuario.correo_usuario.trim() === correo.trim() &&
        usuario.contraseña_usuario.trim() === contraseña.trim()
      ) {
        localStorage.setItem('userRole', usuario.rol);
        sessionStorage.setItem(
          'sesionActiva',
          'true',
        ); /* Se usa sessionStorage para confirmar sesión */
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
    return localStorage.getItem('userRole') || 'estudiante'; /* Define un rol predeterminado */
  }

  getUserName(): string {
    const userData = localStorage.getItem('user');
    if (!userData) return 'Usuario'; /* Si no hay datos, devuelve "Usuario" */

    try {
      const parsedData = JSON.parse(userData);
      return parsedData.name || 'Usuario';
    } catch (error) {
      console.error('Error al leer el nombre del usuario:', error);
      return 'Usuario';
    }
  }

  getUserEmail(): string {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    return userData.email || ''; /* Devuelve el email del usuario */
  }

  updateProfile(user: any) {
    localStorage.setItem('user', JSON.stringify(user)); /* Guarda los cambios */
    return true;
  }

  getUserData(): any {
    if (typeof window === 'undefined') {
      return {}; /* Evita acceder a `localStorage` en entornos sin ventana */
    }
    const userRole = localStorage.getItem('userRole');
    return JSON.parse(localStorage.getItem(`user_${userRole}`) || '{}');
  }

  updateUserData(user: any) {
    const userRole = localStorage.getItem('userRole');
    localStorage.setItem(
      `user_${userRole}`,
      JSON.stringify(user),
    ); /* Guarda los cambios solo para el usuario actual */
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('sesionActiva') === 'true'; /* Verifica si hay sesión activa */
  }

  logout() {
    localStorage.removeItem('userRole'); /* Elimina el rol del usuario */
    localStorage.removeItem('user_estudiante'); /* Borra datos de estudiante */
    localStorage.removeItem('user_profesor'); /* Borra datos de profesor */
    localStorage.removeItem('user'); /* Borra cualquier dato general */
    localStorage.clear(); /* Elimina TODA la información de la sesión */
    location.reload();

    setTimeout(() => {
      window.location.href = '/login'; /* Redirige al login */
    }, 500); /* Pequeña espera para asegurar que los datos se borren antes de redirigir */
  }
}
