import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  selectedImage: any;
  nombre: string = '';
  apellido: string = '';
  rut: string = '';
  email: string = '';
  password: string = '';
  reppassword: string = '';
  telefono: string = '';
  direccion: string = '';
  PC: string = '';
  NPC: string = '';
  errorMessages: any = {};
  image: any;
  isRegistrationInProgress: boolean = false;

  arregloRoles: any;

  // Define propiedades para controlar si se ha mostrado el mensaje de error de cada campo
  nombreErrorShown: boolean = false;
  apellidoErrorShown: boolean = false;
  rutErrorShown: boolean = false;
  emailErrorShown: boolean = false;
  passwordErrorShown: boolean = false;
  reppasswordErrorShown: boolean = false;
  telefonoErrorShown: boolean = false;
  PCErrorShown: boolean = false;
  direccionErrorShown: boolean = false;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private db: DbservicioService
  ) { }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
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
      localStorage.setItem('imagenSeleccionada', this.selectedImage);
      console.log(localStorage.getItem('imagenSeleccionada'));
    }
  }

  validateNombre() {
    if (/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/.test(this.nombre) || (this.nombre.length < 1 || this.nombre.length > 14)) {
      this.errorMessages.nombre = 'Nombre no válido. Debe contener solo letras y tener entre 1 y 14 caracteres.';
      if (!this.nombreErrorShown) {
        this.nombreErrorShown = true;
        // this.showAlert(this.errorMessages.nombre);

      }
    } else {
      this.errorMessages.nombre = '';
      this.nombreErrorShown = false;
    }
  }

  validateApellido() {
    if (/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/.test(this.apellido) || (this.apellido.length < 1 || this.apellido.length > 14)) {
      this.errorMessages.apellido = 'Apellido no válido. Debe contener solo letras y tener entre 1 y 14 caracteres.';
      if (!this.apellidoErrorShown) {
        this.apellidoErrorShown = true;
        // this.showAlert(this.errorMessages.apellido);

      }
    } else {
      this.errorMessages.apellido = '';
      this.apellidoErrorShown = false;
    }
  }

  validateRut() {
    if (/^(\d{9,10}([0-9]|K))$/.test(this.rut) || (this.rut.length < 1 || this.rut.length > 10)) {
      this.errorMessages.rut = 'Rut no válido. Debe contener 10 dígitos Ej: 12345678-9 o la letra K.';
      if (!this.rutErrorShown) {
        this.rutErrorShown = true;
        // this.showAlert(this.errorMessages.rut);

      }
    } else {
      this.errorMessages.rut = '';
      this.rutErrorShown = false;
    }
  }

  validateEmail() {
    if (this.email.length > 0) {
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

  validatePassword() {
    const contraseña = this.password;
    if (this.password.length == 0) {
      if (!this.passwordErrorShown) {
        this.errorMessages.password = 'Contraseña no válida. no puede ser vacio';
        this.passwordErrorShown = true;
      }
    }
    else {
      const expresionRegular = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&+=!])(?!\s)(?!.*([0-9])\1{5,}).{8,16}$/;

      if (expresionRegular.test(contraseña)) {
        this.errorMessages.password = '';
        this.passwordErrorShown = false;
      }
      else {
        this.errorMessages.password = "Contraseña no válida. Debe seguir los normas de seguridad.";
        if (!this.passwordErrorShown) {
          this.passwordErrorShown = true;
        }
      }
    }
  }

  validateReppassword() {
    const x = this.password.length;
    if (this.reppassword.length == x) {
      if (this.password != this.reppassword) {
        this.errorMessages.reppassword = 'Las contraseñas no coinciden.';
        if (!this.reppasswordErrorShown) {
          // this.showAlert(this.errorMessages.reppassword);
          this.reppasswordErrorShown = true;
        }
      }
      else {
        this.errorMessages.reppassword = '';
        this.reppasswordErrorShown = false;
      }
    }
    else if (this.reppassword.length == 0) {
      this.errorMessages.reppassword = 'Contraseña no valida. No puede se vacia.';
      if (!this.reppasswordErrorShown) {
        // this.showAlert(this.errorMessages.reppassword);
        this.reppasswordErrorShown = true;
      }
    }
  }

  validateTelefono() {
    if (!/^\d{9}$/.test(this.telefono)) {
      this.errorMessages.telefono = 'Teléfono no válido. Debe tener 9 dígitos sin espacios ni otros caracteres.';
      if (!this.telefonoErrorShown) {
        this.telefonoErrorShown = true;
      }
    } else {
      this.errorMessages.telefono = '';
      this.telefonoErrorShown = false;
    }
  }

  validateDireccion() {
    if (!/^[a-z\s\d]{1,12}(?:[^\d]*\d){3,4}$/.test(this.direccion)) {
      this.errorMessages.direccion = 'Dirección no válida. Debe estar en minúsculas, contener entre 1 y 12 caracteres y tener 3 o 4 números.';
      if (!this.direccionErrorShown) {
        this.direccionErrorShown = true;
      }
    } else {
      this.errorMessages.direccion = '';
      this.direccionErrorShown = false;
    }
  }

  validatePC() {
    if ((this.PC != 'Conductor' && this.PC != 'Pasajero') && (this.PC != 'conductor' && this.PC != 'pasajero')) {
      this.errorMessages.PC = 'Debe ingresar textualmente: Pasajero o Conductor.';
      if (!this.PCErrorShown) {
        this.PCErrorShown = true;
      }
    } else {
      if (this.PC == 'Conductor' || this.PC == 'conductor') {
        this.NPC = '2'
      } else {
        this.NPC = '1'
      }
      this.errorMessages.PC = '';
      this.PCErrorShown = false;
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
      !this.errorMessages.nombre &&
      !this.errorMessages.apellido &&
      !this.errorMessages.rut &&
      !this.errorMessages.email &&
      !this.errorMessages.password &&
      !this.errorMessages.reppassword &&
      !this.errorMessages.telefono &&
      !this.errorMessages.direccion &&
      !this.errorMessages.PC
    );
  }

  async register() {
    this.validateNombre();
    this.validateApellido();
    this.validateRut();
    this.validateEmail();
    this.validatePassword();
    this.validateReppassword();
    this.validateTelefono();
    this.validateDireccion();
    this.validatePC();

    if (this.areAllValid()) {
      // Lógica para el registro exitoso
      // this.bdService.insertUsuario(this.rut, this.nombre, this.apellido, this.email, this.password, this.telefono, this.direccion);
      this.showRegistrationSuccessAlert();
      this.router.navigate(['/perfil']);
    } else {
      const alert = await this.alertController.create({
        header: 'Error de Validación',
        message: 'Por favor, complete todos los campos correctamente antes de registrarse',
        buttons: ['OK'],
      });
      await alert.present();
    }
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