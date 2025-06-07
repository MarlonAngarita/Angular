import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cursos-profesor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cursos.html',
  styleUrls: ['./cursos.css']
})
export class CursosProfesor {
  modalCrearActivo = false;
  modalDetallesActivo = false;
  modalEdicionActivo = false;
  modalConfirmacionActivo = false;
  cursoSeleccionado: any = null;
  materialApoyo: File | null = null;

  cursosCreados = [
    { nombre: 'Angular Avanzado', descripcion: 'Curso sobre servicios y módulos.', contenido: 'Inyección de dependencias, Lazy Loading.' },
    { nombre: 'Optimización CSS', descripcion: 'Mejores prácticas en rendimiento CSS.', contenido: 'Metodologías como BEM y Tailwind.' }
  ];

  nuevoCurso = { nombre: '', descripcion: '', contenido: '' };

  abrirModalCrear() {
    this.modalCrearActivo = true;
  }

  cerrarModalCrear() {
    this.modalCrearActivo = false;
  }

  crearCurso() {
    if (this.nuevoCurso.nombre.trim() && this.nuevoCurso.descripcion.trim() && this.nuevoCurso.contenido.trim()) {
        const nuevoCurso = { ...this.nuevoCurso };
        this.cursosCreados.push(nuevoCurso); // Agrega el curso a la lista correctamente
        this.nuevoCurso = { nombre: '', descripcion: '', contenido: '' }; // Limpia el formulario
        this.modalCrearActivo = false;
        this.modalConfirmacionActivo = true; // Muestra el modal de confirmación
    }
  }

  cerrarModalConfirmacion() {
    this.modalConfirmacionActivo = false;
  }

  abrirModalDetalles(curso: any) {
    this.cursoSeleccionado = { ...curso }; // Clona el curso para evitar referencias directas
    this.modalDetallesActivo = true;
  }

  cerrarModalDetalles() {
    this.modalDetallesActivo = false;
    this.cursoSeleccionado = null;
  }

  eliminarCurso(curso: any) {
    this.cursosCreados = this.cursosCreados.filter(c => c !== curso);
  }

  editarCurso(curso: any) {
    this.cursoSeleccionado = JSON.parse(JSON.stringify(curso)); // Clona el objeto para evitar referencias directas
    this.modalEdicionActivo = true;
  }

  guardarEdicionCurso() {
    const index = this.cursosCreados.findIndex(c => c.nombre === this.cursoSeleccionado.nombre);
    if (index !== -1) {
      this.cursosCreados[index] = { ...this.cursoSeleccionado }; // Actualiza los datos en la lista
      this.modalEdicionActivo = false;
      this.modalConfirmacionActivo = true; // Activa el modal de confirmación
    }
  }

  cerrarModalEdicion() {
    this.modalEdicionActivo = false;
    this.modalDetallesActivo = true; // Vuelve al modal de detalles si cancela
  }

  cerrarTodosLosModales() {
    this.modalConfirmacionActivo = false;
    this.modalDetallesActivo = false;
    this.modalEdicionActivo = false;
    this.cursoSeleccionado = null;
  }

  agregarMaterial(event: any) {
    this.materialApoyo = event.target.files[0];
  }
}
