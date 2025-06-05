import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {
  sidebarOculto = true; //Inicialmente oculto
  userRole: string = '';

  constructor(private authService: AuthService) {
    this.userRole = this.authService.getUserRole(); // Obtener rol desde el servicio de autenticación
  }

  toggleSidebar() {
    this.sidebarOculto = !this.sidebarOculto; // Alterna entre oculto y visible
  }
}