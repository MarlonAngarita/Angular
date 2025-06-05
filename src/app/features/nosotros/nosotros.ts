import { Component } from '@angular/core';
import { Navbar } from '../../core/navbar/navbar'; 
import { Footer } from '../../core/footer/footer'; 

@Component({
  selector: 'app-nosotros',
  imports: [Navbar, Footer],
  standalone: true,
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css'
})
export class Nosotros {

}
