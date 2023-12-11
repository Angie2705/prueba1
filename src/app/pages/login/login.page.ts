import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  users:any

  email: string = '';
  password: string = '';
  errorMessages: any = {};
  isLoginInProgress: boolean = false;

  // Define propiedades para controlar si se ha mostrado el mensaje de error de cada campo
  emailErrorShown: boolean = false;
  passwordErrorShown: boolean = false;

  constructor(
    private alertController: AlertController, 
    private router: Router, 
    private db: DbservicioService
  ) {}

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

  validatePassword() 
  {
    const contraseña = this.password;
    if(this.password.length == 0)
    {
      if (!this.passwordErrorShown)
      {
      this.errorMessages.password = 'Contraseña no válida. no puede ser vacio';
      this.passwordErrorShown = true;
      }
    }
    else
    {
      const expresionRegular = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&+=!])(?!\s)(?!.*([0-9])\1{5,}).{8,16}$/;

      if (expresionRegular.test(contraseña))
      {
        this.errorMessages.password = '';
        this.passwordErrorShown = false;
      } 
      else
      {
        this.errorMessages.password = "Contraseña no válida. Debe seguir los normas de seguridad.";
        if (!this.passwordErrorShown)
          {
          this.passwordErrorShown = true;
          }
        }
    }
  }


  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Función para validar si todos los campos son válidos
  areAllValid(): boolean {
    // Verifica que todos los campos no tengan errores
    return (
    !this.errorMessages.email &&
    !this.errorMessages.password
    );
  }

  async login() {
    this.showAlert('1');

    this.validateEmail();
    this.showAlert('2');

    this.validatePassword();
    this.showAlert('3');

    if (this.areAllValid()) {
      this.showAlert('4' + this.email + this.password);
      const response = await this.db.login(this.email, this.password)
      this.showAlert('5');
      if(response){
        let usuario = await this.db.buscarUsuarioCorreo(this.email)
        // Lógica para iniciar sesión
        localStorage.setItem('Datos', usuario.rut)
        this.showAlert('Inicio de sesión exitoso');
        this.router.navigate(['/pprincipal']);
      } else {
        this.showAlert('Error en el inicio de sesión');
      }
      this.showAlert('6');
    } else {
      const alert = await this.alertController.create({
        header: 'Error de Validación',
        message: 'Por favor, complete todos los campos correctamente antes de iniciar sesión.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }


  ngOnInit() {
  }

}
