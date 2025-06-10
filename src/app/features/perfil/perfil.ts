import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  providers: [AuthService], 
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil implements OnInit {
  user = { name: '', email: '', password: '', fotoPerfil: '' };
  fotoPerfil = 'https://www.w3schools.com/howto/img_avatar.png'; /* Imagen predeterminada */
  modalActivo = false;
  modalCerrarSesionActivo = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
        this.user = this.authService.getUserData() || { name: '', email: '', password: '', fotoPerfil: '' };
    } else {
        this.user = { name: '', email: '', password: '', fotoPerfil: '' };
    }
  }

  actualizarPerfil() {
    this.authService.updateUserData(this.user);
    this.modalActivo = true;
  }

  cambiarFoto(event: any) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.user.fotoPerfil = e.target.result; /* Guarda la nueva foto */
            this.authService.updateUserData(this.user); /* Actualiza la información */
        };
        reader.readAsDataURL(file);
    }
  }

  abrirModalCerrarSesion() {
      this.modalCerrarSesionActivo = true;
  }

  cerrarModalCerrarSesion() {
      this.modalCerrarSesionActivo = false;
  }

  cerrarModal() {
    this.modalActivo = false;
  }

  cerrarSesion() {
    console.log('Cerrando sesión...');

    localStorage.removeItem('userRole'); /* Borra el rol del usuario */
    localStorage.removeItem('usuarioRegistrado'); /* Borra los datos de usuario */

    setTimeout(() => {
        this.router.navigate(['/login']).then(() => {
            setTimeout(() => {
                window.location.reload(); /* Recarga la página después de la navegación */
            }, 300); /* Espera breve para asegurar la carga */
        });
    }, 500); /* Pequeña espera para eliminar los datos antes de redirigir */
  }
}
