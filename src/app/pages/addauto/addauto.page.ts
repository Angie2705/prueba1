import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';


@Component({
  selector: 'app-addauto',
  templateUrl: './addauto.page.html',
  styleUrls: ['./addauto.page.scss'],
})

export class AddautoPage implements OnInit {

  selectedImage: any;

  marca: string = '';
  modelo: string = '';
  patente: string = '';
  color: string = '';
  nroChasis: string = '';
  image: any;

  errorMessages = {
    marca: '',
    modelo: '',
    patente: '',
    color: '',
    nroChasis: '',
  };

  // Define propiedades para controlar si se ha mostrado el mensaje de error de cada campo
  marcaErrorShown: boolean = false;
  modeloErrorShown: boolean = false;
  patenteErrorShown: boolean = false;
  colorErrorShown: boolean = false;
  nroChasisErrorShown: boolean = false;

  constructor(
    private alertController: AlertController,
    private router: Router
  ) { }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    // image.dataUrl contendrá el Data URL de la imagen capturada.
    this.image = image.dataUrl;
  };

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);

    }
  }

  validateModel(model: string): void {
    if (!model || model.length < 1 || model.length > 12 || !/^[A-Za-z0-9]+$/.test(model)) {
      this.errorMessages.modelo = 'El modelo debe tener entre 1 y 12 caracteres y puede incluir números y letras.';
      if (!this.modeloErrorShown) {
        // this.showAlert(this.errorMessages.modelo);
        this.modeloErrorShown = true;
      }
    } else {
      this.errorMessages.modelo = '';
      this.modeloErrorShown = false;
    }
  }

  validatecolor() {
    if (this.color) {
      this.errorMessages.color = '';
      this.colorErrorShown = false;
    } else {
      this.errorMessages.color = 'Debe seleccionar el color de su vehiculo.';
      if (!this.colorErrorShown) {
        // this.showAlert(this.errorMessages.color);
        this.colorErrorShown = true;
      }
    }
  }

  validatemarca() {
    if (this.marca) {
      this.errorMessages.marca = '';
      this.marcaErrorShown = false;
    } else {
      this.errorMessages.marca = 'Debe seleccionar una marca de vehiculo.';
      if (!this.marcaErrorShown) {
        // this.showAlert(this.errorMessages.marca);
        this.marcaErrorShown = true;
      }
    }
  }

  validatePatent(patent: string): void {
    const regexPatent = /^[A-Z]{2}-[A-Z]{2}-[0-9]{2}$/;
    if (!patent || !regexPatent.test(patent)) {
      this.errorMessages.patente = 'La patente debe tener el formato xx-xx-99.';
      if (!this.patenteErrorShown) {
        // this.showAlert(this.errorMessages.patente);
        this.patenteErrorShown = true;
      }
    } else {
      this.errorMessages.patente = '';
      this.patenteErrorShown = false;
    }
  }

  validateChassis(chassis: string): void {
    const regexChassis = /^[A-Z0-9]{1}$/;
    if (!chassis || !regexChassis.test(chassis)) {
      this.errorMessages.nroChasis = 'El número de chasis no es válido debe contener 17 caracteres.';
      if (!this.nroChasisErrorShown) {
        // this.showAlert(this.errorMessages.nroChasis);
        this.nroChasisErrorShown = true;
      }
    } else {
      this.errorMessages.nroChasis = '';
      this.nroChasisErrorShown = false;
    }
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error de Validación',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }


  areAllValid(): boolean {
    return (
      this.selectedImage !== '' &&
      this.errorMessages.modelo === '' &&
      this.errorMessages.patente === '' &&
      this.errorMessages.nroChasis === '' &&
      this.errorMessages.color === '' &&
      this.errorMessages.marca === ''
    );
  }

  agregarAuto(): void {
    this.validatePatent(this.patente);
    this.validateModel(this.modelo);
    this.validateChassis(this.nroChasis);
    this.validatemarca();
    this.validatecolor();

    if (!this.areAllValid()) {
      console.log("Las validaciones han fallado");
      return;
    } else {
      this.showRegistrationSuccessAlert();
      //Hace insersion a la BD
      this.router.navigate(['/pprincipal']);
      console.log("Auto agregado exitosamente");
    }
  }


  resetErrorMessages(): void {
    this.errorMessages = {
      modelo: '',
      patente: '',
      nroChasis: '',
      color: '',
      marca: ''
    };
  }
  // Función para mostrar alerta de registro exitoso
  async showRegistrationSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Registro exitoso',
      message: '¡Datos registrados con éxito!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  ngOnInit() {
  }

}