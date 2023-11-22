import { Component, OnInit } from '@angular/core';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userInfo: any;

  constructor(
    private db: DbservicioService
  ) { }

  ngOnInit() {
    this.db.fetchUsuariodatos('201352886').subscribe((userData: any) => {
      if (userData) {
        this.userInfo = userData;
        console.log('Datos del usuario obtenidos:', this.userInfo);
      } else {
        // Manejar el caso en el que no se encontraron datos del usuario.
        console.log('Usuario no encontrado');
      }
    });
  }

}