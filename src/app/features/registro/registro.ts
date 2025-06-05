import { Component } from '@angular/core';
import { Navbar } from '../../core/navbar/navbar'; 
import { Footer } from '../../core/footer/footer'; 

@Component({
  selector: 'app-registro',
  imports: [Navbar, Footer],
  standalone: true,
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {

}
