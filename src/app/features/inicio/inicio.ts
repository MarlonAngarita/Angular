import { Component } from '@angular/core';
import { Navbar } from '../../core/navbar/navbar'; 
import { Footer } from '../../core/footer/footer'; 

@Component({
  selector: 'app-inicio',
  imports: [Navbar, Footer],
  standalone: true,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {

}
