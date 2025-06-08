import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {
  sidebarOculto = true; // Inicialmente oculto
  modalCerrarSesionActivo = false;
  userRole: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.userRole = this.authService.getUserRole() || ''; // Si es null, asigna una cadena vacía
  }

  ngOnInit() {
    this.userRole = this.authService.getUserRole() || ''; /* ✅ Obtiene el rol del usuario */
    console.log('Rol detectado:', this.userRole); /* ✅ Verifica el rol en la consola */
  }

  toggleSidebar() {
    this.sidebarOculto = !this.sidebarOculto; // Alterna entre oculto y visible
  }

  navegar(ruta: string) {
    this.router.navigate([ruta]); /* Redirige al usuario manualmente */
  }

  detenerPropagacion(event: Event) {
    event.stopPropagation(); /* Evita que el clic dentro del sidebar lo cierre */
  }

  @HostListener('document:click', ['$event'])
  cerrarSidebar(event: Event) {
    const target = event.target as HTMLElement;
    if (!this.sidebarOculto && !target.closest('.menu-toggle')) { /* Ignora el botón de menú */
      this.sidebarOculto = true;
    }
  }

  abrirModalCerrarSesion() {
    this.modalCerrarSesionActivo = true;
  }

  cerrarModalCerrarSesion() {
    this.modalCerrarSesionActivo = false;
  }

  cerrarSesion() {
    this.modalCerrarSesionActivo = false; /* Cierra el modal */
    this.authService.logout(); /* Cierra sesión */
    setTimeout(() => {
      window.location.reload(); /*Recarga la página para que la vista del login aparezca correctamente */
    }, 300); /* Pequeña espera para asegurar la redirección antes de recargar */
  }
}
