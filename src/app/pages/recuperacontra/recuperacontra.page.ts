import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-recuperacontra',
  templateUrl: './recuperacontra.page.html',
  styleUrls: ['./recuperacontra.page.scss'],
})
export class RecuperacontraPage implements OnInit {

  public alertButtons = ['OK'];

  email: string = '';
  errorMessages: any = {};
  emailErrorShown: boolean = false;

  constructor(
    private alertController: AlertController, 
    private router: Router,
    private db: DbservicioService
  ) {}

  //Se debe hacer una logica que busque el email ingresado y lo compare con los datos de BD.
  validateEmail() {
    if(this.email.length > 0){
          if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{4,}$/.test(this.email)) {
            this.errorMessages.email = '';
            this.emailErrorShown = false;
          } 
          else {
            if (!this.emailErrorShown) {
              this.errorMessages.email = 'Correo electrónico no válido. Debe contener un "@" y un dominio válido.';
              // this.showAlert(this.errorMessages.email);
              this.emailErrorShown = true;
            }
          }
       }
    else {
      if (!this.emailErrorShown) {
        this.errorMessages.email = 'Correo electrónico no válido. Debe contener un "@" y un dominio válido.';
        // this.showAlert(this.errorMessages.email);
        this.emailErrorShown = true;
      }
    }
  }

  // Función para mostrar alerta de validación
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error de Validación',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

   // Función para validar si todos los campos son válidos
   areAllValid(): boolean {
    // Verifica que todos los campos no tengan errores
    return (
      !this.errorMessages.email
    );
  }

  async enviaremail(){
    this.validateEmail();
    if (this.areAllValid()) {
      // Lógica en donde se debe enviar email
      this.router.navigate(['/']);
    } else {
      const alert = await this.alertController.create({
        header: 'Error de Validación',
        message: 'Por favor, revise su email.',
        buttons: ['OK'],
      });
      await alert.present();
    }

  }

  ngOnInit() {
  }

}
