import { Component } from '@angular/core';

@Component({
  selector: 'app-cursos-estudiante',
  standalone: true,
  templateUrl: './cursos.html',
  styleUrls: ['./cursos.css']
})
export class Cursos {
  vistaActual = 'disponibles';
  modalActivo = false;
  cursoSeleccionado: any = null;

  cursosDisponibles = [
    { titulo: 'Angular Básico', descripcion: 'Aprende lo esencial de Angular.', contenido: 'Introducción a componentes y servicios.' },
    { titulo: 'CSS Avanzado', descripcion: 'Domina animaciones y efectos.', contenido: 'Flexbox, Grid y Transiciones.' },
    { titulo: 'JavaScript Moderno', descripcion: 'Deep dive en ES6+.', contenido: 'Async/Await, Promesas y más.' }
  ];

  cursosInscritos: any[] = [];

  mostrarDisponibles() {
    this.vistaActual = 'disponibles';
  }

  mostrarInscritos() {
    this.vistaActual = 'inscritos';
  }

  abrirDetalles(curso: any) {
    this.cursoSeleccionado = curso;
    this.modalActivo = true;
  }

  cerrarModal() {
    this.modalActivo = false;
    this.cursoSeleccionado = null;
  }

  inscribirseCurso() {
    if (!this.cursosInscritos.includes(this.cursoSeleccionado)) {
      this.cursosInscritos.push(this.cursoSeleccionado);
    }
    this.cerrarModal();
  }

  verMasCurso() {
    alert('Más información próximamente.');
  }
}
