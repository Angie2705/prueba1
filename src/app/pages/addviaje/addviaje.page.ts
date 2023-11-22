import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonDatetime } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-addviaje',
  templateUrl: './addviaje.page.html',
  styleUrls: ['./addviaje.page.scss'],
})

export class AddviajePage implements OnInit {

  origen: any;
  destino: any;
  numasiento: any;
  errorMessages: any = {};
  minDateTime: any;


  @ViewChild('datePicker') datePicker!: IonDatetime;
  reloj: string = ''; //fecha seleccionada

  // Define propiedades para controlar si se ha mostrado el mensaje de error de cada campo
  origenErrorShown: boolean = false;
  destinoErrorShown: boolean = false;
  numasientoErrorShown: boolean = false;
  relojErrorShown: boolean = false;

  // private bdservice: BDService

  constructor(
    private alertController: AlertController,
    private router: Router,
    private db: DbservicioService
  ) {
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + 1); // Agrega un minuto para asegurarte de que la fecha sea futura.
    this.minDateTime = currentDate.toISOString(); // Define el valor mínimo como la fecha y hora actual.
  }

  validateOrigen() {
    if (/^[A-Za-z0-9\s]+$/.test(this.origen) && this.origen.length <= 20) {
      this.errorMessages.origen = '';
      this.origenErrorShown = false;
    } else {
      this.errorMessages.origen = 'Origen no válido.';
      if (!this.origenErrorShown) {
        this.origenErrorShown = true;
        // this.showAlert(this.errorMessages.origen);
      }
    }
  }

  validateDestino() {
    if (/^[A-Za-z0-9\s]+$/.test(this.destino) && this.destino.length <= 20) {
      this.errorMessages.destino = '';
      this.destinoErrorShown = false;
    } else {
      this.errorMessages.destino = 'Destino no válido.';
      if (!this.destinoErrorShown) {
        this.destinoErrorShown = true;
        // this.showAlert(this.errorMessages.destino);
      }
    }
  }

  validateAsiento() {
    if (parseInt(this.numasiento, 10) >= 1 && parseInt(this.numasiento, 10) <= 3) {
      this.errorMessages.numasiento = '';
      this.numasientoErrorShown = false;
    } else {
      this.errorMessages.asiento = 'Cantidad de asientos no valida.';
      if (!this.numasientoErrorShown) {
        this.numasientoErrorShown = true;
        this.showAlert(this.errorMessages.numasiento);
      }
    }

  }

  // validarFecha() {
  //   if (this.reloj) {
  //     const selectedDateObject = new Date(this.reloj);
  //     if (!isNaN(selectedDateObject.getTime())) {
  //       // La fecha es válida y se ha convertido en un objeto Date correctamente
  //       console.log('Fecha válida:', selectedDateObject);
  //       this.errorMessages.reloj = '';
  //       this.relojErrorShown = false;
  //     } else {
  //       // La fecha no es válida
  //       console.log('Fecha no válida');
  //       this.errorMessages.reloj = 'Fecha no válida.';
  //       if (!this.relojErrorShown) {
  //         this.relojErrorShown = true;
  //         this.showAlert(this.errorMessages.reloj);
  //       }
  //     } 
  //   }else {
  //     // No se seleccionó ninguna fecha
  //     console.log('No se seleccionó una fecha');
  //     this.errorMessages.reloj = 'Fecha no se seleccionó fecha.';
  //   }
  // }

  validarFecha() {
    if (this.reloj) {
      const selectedDateObject = new Date(this.reloj);
      const currentDate = new Date(); // Obtiene la fecha y hora actual

      if (selectedDateObject >= currentDate) {
        // La fecha es válida y es igual o posterior a la fecha actual
        console.log('Fecha válida:', selectedDateObject);
        this.errorMessages.reloj = '';
        this.relojErrorShown = false;
      } else {
        // La fecha no es válida
        console.log('Fecha no válida');
        this.errorMessages.reloj = 'La fecha y hora deben ser igual o posteriores a la fecha y hora actual.';
        if (!this.relojErrorShown) {
          this.relojErrorShown = true;
          this.showAlert(this.errorMessages.reloj);
        }
      }
    } else {
      // No se seleccionó ninguna fecha
      console.log('No se seleccionó una fecha');
      this.errorMessages.reloj = 'No se seleccionó una fecha y hora.';
    }
  }

  // Función para validar si todos los campos son válidos
  areAllValid(): boolean {
    // Verifica que todos los campos no tengan errores
    return (
      !this.errorMessages.origen &&
      !this.errorMessages.destino &&
      !this.errorMessages.numasiento
    );
  }

  async agregarViaje() {
    this.validateOrigen();
    this.validateDestino();
    // this.validarFecha();

    if (this.areAllValid()) {
      // Lógica para el registro exitoso
      this.showModificationSuccessAlert();
      this.router.navigate(['/pprincipal']);
    } else {
      const alert = await this.alertController.create({
        header: 'Error al crear el viaje',
        message: 'Por favor, revise los campos del formulario.',
        buttons: ['OK'],
      });
      await alert.present();
    }

  }

  // Función para mostrar alerta de registro exitoso
  async showModificationSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Viaje creado',
      message: '¡Tu viaje esta pedido!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error de Validación',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
