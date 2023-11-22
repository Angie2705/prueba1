import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userInfo: any;
  rut: any;


  constructor(
    private db: DbservicioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    /*this.activatedRoute.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.rut=this.router.getCurrentNavigation()?.extras.state?.['rut']
      }
    })*/
  }

  async ngOnInit() {
    /*this.db.fetchUsuariodatos('201352886').subscribe((userData: any) => {
      if (userData) {
        this.userInfo = userData;
        this.db.presentAlert("usuario encontrado [id:"+this.userInfo.rut+"]")
        console.log('Datos del usuario obtenidos:', this.userInfo);
      } else {
        // Manejar el caso en el que no se encontraron datos del usuario.
        this.db.presentAlert("usuario no encontrado")
        console.log('Usuario no encontrado');
      }
    });*/
    this.rut = localStorage.getItem('Datos');
    this.userInfo=await this.db.buscarUsuario(this.rut)
  }

}